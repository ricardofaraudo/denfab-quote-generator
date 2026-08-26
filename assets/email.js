/* ============================================================================
   Envio de la cotizacion por Gmail, desde la cuenta del abogado.

   El correo sale de su propia cuenta @denfablaw.com: queda en su carpeta de
   Enviados y las respuestas del cliente le llegan a el. Por eso se pide un
   permiso de Google aparte del login, y solo el permiso de "enviar" —
   la herramienta nunca puede leer el correo de nadie.
   ========================================================================== */

var GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
var googleToken = null;      // token en memoria; nunca se guarda en disco
var googleTokenExp = 0;
var tokenClient = null;

var MAIL_TX = {
  en: {
    noEmail: 'Enter the client email address first.',
    noName: 'Please enter a client name.',
    notConfigured: 'Email sending is not configured yet. Contact the administrator.',
    authorizing: 'Waiting for Google authorization…',
    denied: 'Google authorization was denied, so the quote was not sent.',
    sending: 'Sending…',
    sent: 'Quote sent to ',
    failed: 'The quote could not be sent: ',
    popupBlocked: 'Your browser blocked the Google window. Allow pop-ups for this site and try again.',
    subject: 'Legal Services Quote – DENFAB',
    greeting: 'Dear ',
    body: 'Please find attached the quote for the legal services discussed.\n\n' +
          'This quote is valid for thirty (30) calendar days.\n\n' +
          'We remain at your disposal for any questions.\n\n' +
          'Kind regards,\n'
  },
  es: {
    noEmail: 'Ingrese primero el correo del cliente.',
    noName: 'Por favor ingrese el nombre del cliente.',
    notConfigured: 'El envío por correo aún no está configurado. Contacte al administrador.',
    authorizing: 'Esperando autorización de Google…',
    denied: 'Se denegó la autorización de Google, así que la cotización no se envió.',
    sending: 'Enviando…',
    sent: 'Cotización enviada a ',
    failed: 'No se pudo enviar la cotización: ',
    popupBlocked: 'El navegador bloqueó la ventana de Google. Permita ventanas emergentes en este sitio e intente de nuevo.',
    subject: 'Cotización de Servicios Legales – DENFAB',
    greeting: 'Estimado(a) ',
    body: 'Adjunto encontrará la cotización por los servicios legales conversados.\n\n' +
          'Esta cotización tiene una validez de treinta (30) días calendario.\n\n' +
          'Quedamos a su disposición para cualquier consulta.\n\n' +
          'Atentamente,\n'
  }
};

function mailT() { return MAIL_TX[lang]; }

function gmailConfigured() {
  return typeof GOOGLE_CLIENT_ID === 'string' && GOOGLE_CLIENT_ID.indexOf('PENDIENTE') !== 0;
}

function showResult(cls, msg) {
  document.getElementById('result').innerHTML = '<div class="' + cls + '">' + esc(msg) + '</div>';
}

/* Pide (o reutiliza) un token de Google con permiso unicamente de envio. */
function getGoogleToken() {
  return new Promise(function (resolve, reject) {
    if (googleToken && Date.now() < googleTokenExp - 60000) { resolve(googleToken); return; }
    if (!window.google || !google.accounts || !google.accounts.oauth2) {
      reject(new Error(mailT().notConfigured)); return;
    }
    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GMAIL_SCOPE,
        callback: function () {}   // se reasigna en cada solicitud
      });
    }
    tokenClient.callback = function (resp) {
      if (resp.error) { reject(new Error(mailT().denied)); return; }
      googleToken = resp.access_token;
      googleTokenExp = Date.now() + (parseInt(resp.expires_in, 10) || 3600) * 1000;
      resolve(googleToken);
    };
    try {
      // '' deja que Google omita el consentimiento si ya fue otorgado.
      tokenClient.requestAccessToken({ prompt: googleToken ? '' : 'consent' });
    } catch (e) { reject(new Error(mailT().popupBlocked)); }
  });
}

/* base64url sin padding, como exige la API de Gmail. */
function b64url(bytes) {
  var bin = '', chunk = 0x8000;
  for (var i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/* Codifica encabezados con acentos segun RFC 2047. */
function mimeHeader(s) {
  if (/^[\x20-\x7E]*$/.test(s)) return s;
  var utf8 = new TextEncoder().encode(s);
  return '=?UTF-8?B?' + btoa(String.fromCharCode.apply(null, utf8)) + '?=';
}

function buildMime(to, subject, bodyText, pdfBytes, filename) {
  var bd = '----denfab' + Math.random().toString(36).slice(2);
  var head =
    'To: ' + to + '\r\n' +
    'Subject: ' + mimeHeader(subject) + '\r\n' +
    'MIME-Version: 1.0\r\n' +
    'Content-Type: multipart/mixed; boundary="' + bd + '"\r\n\r\n' +
    '--' + bd + '\r\n' +
    'Content-Type: text/plain; charset="UTF-8"\r\n' +
    'Content-Transfer-Encoding: base64\r\n\r\n' +
    b64pad(new TextEncoder().encode(bodyText)) + '\r\n' +
    '--' + bd + '\r\n' +
    'Content-Type: application/pdf; name="' + filename + '"\r\n' +
    'Content-Disposition: attachment; filename="' + filename + '"\r\n' +
    'Content-Transfer-Encoding: base64\r\n\r\n';
  var tail = '\r\n--' + bd + '--\r\n';

  var enc = new TextEncoder();
  var headB = enc.encode(head), tailB = enc.encode(tail);
  var pdfB = enc.encode(chunk76(b64pad(pdfBytes)));
  var out = new Uint8Array(headB.length + pdfB.length + tailB.length);
  out.set(headB, 0); out.set(pdfB, headB.length); out.set(tailB, headB.length + pdfB.length);
  return out;
}

function b64pad(bytes) {
  var bin = '', chunk = 0x8000;
  for (var i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function chunk76(s) { return s.replace(/(.{76})/g, '$1\r\n'); }

async function sendByEmail() {
  var T = mailT();
  var cname = gv('cname').trim();
  var to = gv('cemail').trim();
  if (!cname) { showResult('err', T.noName); return; }
  if (!to || to.indexOf('@') < 1) { showResult('err', T.noEmail); return; }
  if (!gmailConfigured()) { showResult('err', T.notConfigured); return; }

  var btn = document.getElementById('mailBtn');
  btn.disabled = true;
  showResult('ok', T.authorizing);

  try {
    var token = await getGoogleToken();
    showResult('ok', T.sending);

    // El mismo PDF que descarga el boton de al lado, pero en memoria.
    var built = buildPDF(cname);
    var bodyText = T.greeting + gv('sal') + ' ' + cname + ',\n\n' + T.body + getLaw() +
                   '\nDe la Guardia, Neuman, Faraudo & Bermudez';
    var mime = buildMime(to, T.subject, bodyText, built.bytes, built.filename);

    var res = await fetch('https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=media', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'message/rfc822' },
      body: mime
    });
    if (!res.ok) {
      var detail = '';
      try { var j = await res.json(); detail = (j.error && j.error.message) || ''; } catch (e) {}
      throw new Error(detail || ('HTTP ' + res.status));
    }

    showResult('ok', '✓ ' + T.sent + to);
    recordQuote(cname, { sent: true, to: to });
  } catch (e) {
    console.error('Envio por correo:', e);
    showResult('err', T.failed + e.message);
  } finally {
    btn.disabled = false;
  }
}
