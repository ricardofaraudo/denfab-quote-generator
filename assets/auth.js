/* ============================================================================
   Control de acceso.
   La aplicacion arranca oculta y solo se muestra cuando hay sesion valida.
   ========================================================================== */

var sb = null;          // cliente de Supabase
var currentUser = null; // usuario con sesion iniciada
var currentProfile = null;

var AUTH_TX = {
  en: {
    title: 'Sign in', subtitle: 'DENFAB Quote Generator',
    email: 'Email', password: 'Password', submit: 'Sign in',
    signingIn: 'Signing in…', signOut: 'Sign out',
    bad: 'Incorrect email or password.',
    noConfig: 'The tool is not connected to the database yet. Contact the administrator.',
    offline: 'Could not reach the server. Check your connection and try again.',
    required: 'Enter your email and password.'
  },
  es: {
    title: 'Iniciar sesión', subtitle: 'Generador de Cotizaciones DENFAB',
    email: 'Correo', password: 'Contraseña', submit: 'Iniciar sesión',
    signingIn: 'Iniciando sesión…', signOut: 'Cerrar sesión',
    bad: 'Correo o contraseña incorrectos.',
    noConfig: 'La herramienta aún no está conectada a la base de datos. Contacte al administrador.',
    offline: 'No se pudo contactar al servidor. Revise su conexión e intente de nuevo.',
    required: 'Ingrese su correo y contraseña.'
  }
};

function authT() { return AUTH_TX[typeof lang !== 'undefined' ? lang : 'en']; }

function isConfigured() {
  return SUPABASE_CONFIG.anonKey && SUPABASE_CONFIG.anonKey.indexOf('PENDIENTE') !== 0;
}

function showGate(show) {
  document.getElementById('authGate').style.display = show ? 'flex' : 'none';
  document.getElementById('appShell').style.display = show ? 'none' : '';
}

function authError(msg) {
  var el = document.getElementById('authErr');
  el.textContent = msg || '';
  el.style.display = msg ? '' : 'none';
}

function paintAuthTexts() {
  var T = authT();
  document.getElementById('authTitle').textContent = T.title;
  document.getElementById('authSubtitle').textContent = T.subtitle;
  document.getElementById('authEmailLbl').textContent = T.email;
  document.getElementById('authPassLbl').textContent = T.password;
  document.getElementById('authSubmit').textContent = T.submit;
  var so = document.getElementById('signOutBtn');
  if (so) so.textContent = T.signOut;
}

async function doSignIn(e) {
  if (e) e.preventDefault();
  var T = authT();
  var email = document.getElementById('authEmail').value.trim();
  var pass = document.getElementById('authPass').value;
  if (!email || !pass) { authError(T.required); return; }
  if (!isConfigured()) { authError(T.noConfig); return; }

  var btn = document.getElementById('authSubmit');
  btn.disabled = true; btn.textContent = T.signingIn; authError('');
  try {
    var res = await sb.auth.signInWithPassword({ email: email, password: pass });
    if (res.error) { authError(T.bad); return; }
    await onSignedIn(res.data.user);
  } catch (err) {
    authError(T.offline);
  } finally {
    btn.disabled = false; btn.textContent = T.submit;
  }
}

async function onSignedIn(user) {
  currentUser = user;
  try {
    var r = await sb.from('profiles').select('full_name, is_admin').eq('id', user.id).single();
    currentProfile = r.data || null;
  } catch (e) { currentProfile = null; }

  var name = (currentProfile && currentProfile.full_name) || user.email;
  document.getElementById('userLabel').textContent = name;
  document.getElementById('authPass').value = '';
  showGate(false);
  if (typeof refresh === 'function') refresh();
}

async function doSignOut() {
  try { await sb.auth.signOut(); } catch (e) { /* la sesion local se limpia igual */ }
  currentUser = null; currentProfile = null;
  showGate(true);
}

async function initAuth() {
  paintAuthTexts();
  document.getElementById('authForm').addEventListener('submit', doSignIn);
  document.getElementById('signOutBtn').addEventListener('click', doSignOut);

  if (!isConfigured()) { authError(authT().noConfig); showGate(true); return; }

  sb = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

  // Una sesion previa evita volver a pedir credenciales en cada visita.
  try {
    var r = await sb.auth.getSession();
    if (r.data && r.data.session) { await onSignedIn(r.data.session.user); return; }
  } catch (e) { /* sin sesion utilizable: se pide login */ }
  showGate(true);
}
