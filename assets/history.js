/* ============================================================================
   Historial de cotizaciones.
   Cada PDF generado queda registrado; el guardado nunca bloquea la descarga.
   ========================================================================== */

var HIST_TX = {
  en: {
    open: 'History', title: 'Quote history', close: 'Close',
    empty: 'No quotes recorded yet.',
    loading: 'Loading…',
    failed: 'Could not load the history.',
    saveFailed: 'The PDF downloaded, but the quote could not be saved to the history.',
    search: 'Search by client…',
    colDate: 'Date', colClient: 'Client', colService: 'Service',
    colAuthor: 'Issued by', colTotal: 'Total', colStatus: 'Status',
    adjusted: 'adjusted',
    status: { generated: 'Generated', sent: 'Sent', accepted: 'Accepted', declined: 'Declined', expired: 'Expired' }
  },
  es: {
    open: 'Historial', title: 'Historial de cotizaciones', close: 'Cerrar',
    empty: 'Aún no hay cotizaciones registradas.',
    loading: 'Cargando…',
    failed: 'No se pudo cargar el historial.',
    saveFailed: 'El PDF se descargó, pero la cotización no se pudo guardar en el historial.',
    search: 'Buscar por cliente…',
    colDate: 'Fecha', colClient: 'Cliente', colService: 'Servicio',
    colAuthor: 'Emitida por', colTotal: 'Total', colStatus: 'Estado',
    adjusted: 'ajustada',
    status: { generated: 'Generada', sent: 'Enviada', accepted: 'Aceptada', declined: 'Rechazada', expired: 'Vencida' }
  }
};

function histT() { return HIST_TX[lang]; }

/* Se llama justo despues de que el PDF se descarga o se envia.
   opts: { sent: true, to: 'cliente@correo.com' } cuando se envio por correo. */
async function recordQuote(cname, opts) {
  if (!sb || !currentUser) return;
  opts = opts || {};
  var isEs = lang === 'es';
  var rows = getQuoteRows(isEs);

  var payload = {
    created_by: currentUser.id,
    client_name: cname,
    client_email: (opts.to || gv('cemail').trim()) || null,
    status: opts.sent ? 'sent' : 'generated',
    sent_at: opts.sent ? new Date().toISOString() : null,
    salutation: gv('sal'),
    lawyer_name: getLaw(),
    language: lang,
    service_type: gv('svc'),
    service_config: {
      stage: gv('stage'), activity: gv('fn_act'), entity: gv('entity_sel'),
      bank_included: gv('bank_toggle') !== 'no', bank_method: gv('bank_type'),
      main_applicants: getNM(), dependents: gn('ndep'),
      fn_over12: gn('fn_o12'), fn_under12: gn('fn_u12'),
      qi_over12: gn('qi_o12'), qi_under12: gn('qi_u12'),
      property_value: gv('propval')
    },
    line_items: rows.map(function (r) { return { label: r[0], amount: r[1], adjusted: r[2] }; }),
    total: quoteTotal(rows),
    has_adjustments: rows.some(function (r) { return r[2]; })
  };

  try {
    var res = await sb.from('quotes').insert(payload);
    if (res.error) throw res.error;
  } catch (e) {
    // El PDF ya se entrego; avisamos sin interrumpir el trabajo.
    console.error('No se pudo registrar la cotizacion:', e);
    var el = document.getElementById('result');
    if (el) el.innerHTML += '<div class="warn">' + histT().saveFailed + '</div>';
  }
}

function fmtDate(iso) {
  var d = new Date(iso);
  return d.toLocaleDateString(lang === 'es' ? 'es-PA' : 'en-US',
    { year: 'numeric', month: 'short', day: '2-digit' }) +
    ' ' + d.toLocaleTimeString(lang === 'es' ? 'es-PA' : 'en-US',
    { hour: '2-digit', minute: '2-digit' });
}

function serviceLabel(key) {
  var el = document.querySelector('#svc option[value="' + key + '"]');
  return el ? el.textContent : key;
}

async function openHistory() {
  var T = histT();
  document.getElementById('histTitle').textContent = T.title;
  document.getElementById('histClose').textContent = T.close;
  document.getElementById('histSearch').placeholder = T.search;
  document.getElementById('histModal').style.display = 'flex';
  document.getElementById('histBody').innerHTML = '<p class="hist-msg">' + T.loading + '</p>';
  await loadHistory('');
}

function closeHistory() { document.getElementById('histModal').style.display = 'none'; }

async function loadHistory(term) {
  var T = histT();
  var body = document.getElementById('histBody');
  try {
    var q = sb.from('quotes_with_author')
      .select('id, created_at, client_name, service_type, author_name, lawyer_name, total, status, has_adjustments')
      .order('created_at', { ascending: false })
      .limit(200);
    if (term) q = q.ilike('client_name', '%' + term + '%');
    var res = await q;
    if (res.error) throw res.error;
    renderHistory(res.data || []);
  } catch (e) {
    console.error('Historial:', e);
    body.innerHTML = '<p class="hist-msg">' + T.failed + '</p>';
  }
}

function renderHistory(items) {
  var T = histT();
  var body = document.getElementById('histBody');
  if (!items.length) { body.innerHTML = '<p class="hist-msg">' + T.empty + '</p>'; return; }

  var h = '<table class="hist-tbl"><thead><tr>' +
    '<th>' + T.colDate + '</th><th>' + T.colClient + '</th><th>' + T.colService + '</th>' +
    '<th>' + T.colAuthor + '</th><th class="num">' + T.colTotal + '</th><th>' + T.colStatus + '</th>' +
    '</tr></thead><tbody>';
  items.forEach(function (q) {
    h += '<tr>' +
      '<td class="nowrap">' + esc(fmtDate(q.created_at)) + '</td>' +
      '<td>' + esc(q.client_name) + (q.has_adjustments ? '<span class="sr-tag">' + esc(T.adjusted) + '</span>' : '') + '</td>' +
      '<td>' + esc(serviceLabel(q.service_type)) + '</td>' +
      '<td>' + esc(q.author_name || q.lawyer_name) + '</td>' +
      '<td class="num nowrap">' + esc(fmt(q.total)) + '</td>' +
      '<td>' + esc((T.status[q.status]) || q.status) + '</td>' +
      '</tr>';
  });
  body.innerHTML = h + '</tbody></table>';
}

function initHistory() {
  document.getElementById('histBtn').addEventListener('click', openHistory);
  document.getElementById('histClose').addEventListener('click', closeHistory);
  document.getElementById('histModal').addEventListener('click', function (e) {
    if (e.target.id === 'histModal') closeHistory();
  });
  var t = null;
  document.getElementById('histSearch').addEventListener('input', function (e) {
    clearTimeout(t);
    var v = e.target.value.trim();
    t = setTimeout(function () { loadHistory(v); }, 250);
  });
}
