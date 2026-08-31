var lang = 'en';

var NW = {
  en: ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'],
  es: ['Cero','Uno','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve','Diez','Once','Doce']
};

function nw(n) { return NW[lang][n] || String(n); }
function fmt(n) { return 'US$ ' + Number(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }
function gv(id) { var e = document.getElementById(id); return e ? e.value : ''; }
function gn(id) { return parseInt(gv(id)) || 0; }
function getNM() { return Math.max(1, gn('nmain')); }
function getLaw() { var v = gv('lawyer'); return v === 'other' ? (gv('lother') || 'Ricardo A. Faraudo') : v; }
function tog() { document.getElementById('ow').style.display = gv('lawyer') === 'other' ? 'flex' : 'none'; }
function sT(t) {
  if (t === 'fn') document.getElementById('fn_tot').value = gn('fn_o12') + gn('fn_u12');
  else document.getElementById('qi_tot').value = gn('qi_o12') + gn('qi_u12');
}

var TX = {
  en: {
    lc:'Client Information', ls:'Salutation', ln:'Client Full Name', lce:'Client Email', ll:'Issuing Lawyer', lo:'Lawyer Name',
    o_oth:'Other...', lsv:'Service Details', lst:'Service Type',
    o_pen:'Pensionado / Retirement Visa', o_fn:'Friendly Nations Visa',
    o_bt:'Bilateral Treaty with Italians', o_qi:'Red Carpet / Qualified Investor Visa',
    o_re:'Real Estate Purchase', o_ppr:'Review and Execution of Promise of Purchase Agreement with Developer', o_ps:'Real Estate Transaction Sale of Property', o_corp:'Panamanian Corporation', o_found:'Private Interest Foundation',
    d_stg:'Visa Stage', l_stg:'Stage', o_tmp:'Two (2) Year Temporary Residency', o_prm:'Permanent Residency',
    d_act:'Economic Activity', l_act:'Type of Activity', o_td:'Time Deposit', o_wc:'Work Contract', o_rep:'Real Estate Purchase',
    l_bnk:'Bank Account Opening', o_bkp:'In Panama \u2013 US$ 750.00', o_bkr:'Remotely \u2013 US$ 1,250.00',
    d_ent:'Corporation / Foundation', l_ent:'Include Entity', o_ent_n:'None', o_ent_c:'Corporation \u2013 US$ 1,400.00', o_ent_cp:'Corporation + Operating Permit \u2013 US$ 2,155.00', o_ent_f:'Private Interest Foundation \u2013 US$ 1,600.00',
    d_bkt:'Bank Account Service', l_bkt:'Include Bank Account Opening', o_bkt_y:'Yes \u2013 Include', o_bkt_n:'No \u2013 Exclude', l_bkt2:'Method', o_bkt_p:'In Panama \u2013 US$ 750.00', o_bkt_r:'Remotely \u2013 US$ 1,250.00',
    l_dd:'Due Diligence Fee (US$)', l_deed:'Public Deed Fee (US$)',
    d_ppr:'Promise of Purchase Agreement Details', l_dd_ppr:'Due Diligence Fee (US$)', l_poa:'Include Power of Attorney (US$ 250.00)', o_poa_n:'No', o_poa_y:'Yes \u2013 Add US$ 250.00',
    d_ps:'Sale of Property Details', l_dd_ps:'Legal Work / Due Diligence Fee (US$)',
    d_prop:'Property Details', l_pv:'Property Value (US$)', d_main:'Main Applicants', l_main:'Number of Main Applicants',
    d_dep:'Dependents', d_depfn:'Dependents', d_depqi:'Dependents', l_dep:'Number of Dependents',
    l_o12fn:'Over 12', h_o12fn:'US$ 1,400 each', l_u12fn:'Under 12', h_u12fn:'US$ 600 each',
    l_o12qi:'Over 12', h_o12qi:'US$ 2,400 each', l_u12qi:'Under 12', h_u12qi:'US$ 1,400 each',
    l_tfn:'Total', l_tqi:'Total', l_sum:'Quote Summary', grand:'Grand Total',
    btn_txt:'Generate & Download PDF Quote', mail_txt:'Send by email to client',
    fix_corp:'Fixed fee \u2014 no additional fields required.',
    fix_found:'Fixed fee \u2014 no additional fields required.',
    FEES:'Legal Fees', EXP:'Expenses', DEP:'Dependent(s)', MAIN:'Main Applicant', MAINS:'Main Applicants',
    EACH:'each', REGARDS:'Kindest Regards,', LOC:'Panama, Rep. of Panama',
    SEC1:'I.   Services included in the present quote:',
    SEC2:'II.  Legal Fees and Expenses Involved in the Process',
    SEC3:'III.  Method of Payment on the Fees and Expenses',
    GTOTAL:'GRAND TOTAL',
    editHint:'Edit this amount to adjust the fee for this quote only',
    resetFees:'Restore standard fees', adjusted:'adjusted'
  },
  es: {
    lc:'Informaci\u00f3n del Cliente', ls:'Tratamiento', ln:'Nombre Completo del Cliente', lce:'Correo del Cliente', ll:'Abogado Emisor', lo:'Nombre del Abogado',
    o_oth:'Otro...', lsv:'Detalles del Servicio', lst:'Tipo de Servicio',
    o_pen:'Visa de Pensionado / Jubilaci\u00f3n', o_fn:'Visa de Pa\u00edses Amigos',
    o_bt:'Tratado Bilateral con Italianos', o_qi:'Visa Red Carpet / Inversionista Calificado',
    o_re:'Compra de Propiedad', o_ppr:'Revisi\u00f3n y Ejecuci\u00f3n de Promesa de Compraventa con Promotora', o_ps:'Transacci\u00f3n Inmobiliaria \u2013 Venta de Propiedad', o_corp:'Sociedad An\u00f3nima Paname\u00f1a', o_found:'Fundaci\u00f3n de Inter\u00e9s Privado',
    d_stg:'Etapa de Visa', l_stg:'Etapa', o_tmp:'Residencia Temporal de Dos (2) A\u00f1os', o_prm:'Residencia Permanente',
    d_act:'Actividad Econ\u00f3mica', l_act:'Tipo de Actividad', o_td:'Dep\u00f3sito a Plazo', o_wc:'Contrato de Trabajo', o_rep:'Compra de Propiedad',
    l_bnk:'Apertura de Cuenta Bancaria', o_bkp:'En Panam\u00e1 \u2013 US$ 750.00', o_bkr:'Remotamente \u2013 US$ 1,250.00',
    d_ent:'Sociedad / Fundaci\u00f3n', l_ent:'Incluir Entidad', o_ent_n:'Ninguna', o_ent_c:'Sociedad An\u00f3nima \u2013 US$ 1,400.00', o_ent_cp:'Sociedad An\u00f3nima + Permiso de Operaci\u00f3n \u2013 US$ 2,155.00', o_ent_f:'Fundaci\u00f3n de Inter\u00e9s Privado \u2013 US$ 1,600.00',
    d_bkt:'Servicio de Cuenta Bancaria', l_bkt:'Incluir Apertura de Cuenta Bancaria', o_bkt_y:'S\u00ed \u2013 Incluir', o_bkt_n:'No \u2013 Excluir', l_bkt2:'M\u00e9todo', o_bkt_p:'En Panam\u00e1 \u2013 US$ 750.00', o_bkt_r:'Remotamente \u2013 US$ 1,250.00',
    l_dd:'Honorarios Debida Diligencia (US$)', l_deed:'Honorarios Escritura P\u00fablica (US$)',
    d_ppr:'Detalles de Promesa de Compraventa', l_dd_ppr:'Honorarios Debida Diligencia (US$)', l_poa:'Incluir Poder Especial (US$ 250.00)', o_poa_n:'No', o_poa_y:'S\u00ed \u2013 Agregar US$ 250.00',
    d_ps:'Detalles de Venta de Propiedad', l_dd_ps:'Honorarios Trabajo Legal / Debida Diligencia (US$)',
    d_prop:'Detalles del Inmueble', l_pv:'Valor del Inmueble (US$)', d_main:'Solicitantes Principales', l_main:'N\u00famero de Solicitantes Principales',
    d_dep:'Dependientes', d_depfn:'Dependientes', d_depqi:'Dependientes', l_dep:'N\u00famero de Dependientes',
    l_o12fn:'Mayores de 12', h_o12fn:'US$ 1,400 c/u', l_u12fn:'Menores de 12', h_u12fn:'US$ 600 c/u',
    l_o12qi:'Mayores de 12', h_o12qi:'US$ 2,400 c/u', l_u12qi:'Menores de 12', h_u12qi:'US$ 1,400 c/u',
    l_tfn:'Total', l_tqi:'Total', l_sum:'Resumen de Cotizaci\u00f3n', grand:'Total General',
    btn_txt:'Generar y Descargar Cotizaci\u00f3n PDF', mail_txt:'Enviar por correo al cliente',
    depNoteTitle:'Dependientes Adicionales (nota que sale en la cotizaci\u00f3n)',
    depNoteHint:'Monto por dependiente adicional. Sigue al rubro cotizado; escriba aqu\u00ed para fijarlo.',
    depNoteFoot:'Aparece al final del PDF como el costo de agregar un dependiente m\u00e1s.',
    fix_corp:'Tarifa fija \u2014 no se requieren campos adicionales.',
    fix_found:'Tarifa fija \u2014 no se requieren campos adicionales.',
    FEES:'Honorarios Legales', EXP:'Gastos', DEP:'Dependiente(s)', MAIN:'Solicitante Principal', MAINS:'Solicitantes Principales',
    EACH:'c/u', REGARDS:'Atentamente,', LOC:'Panam\u00e1, Rep. de Panam\u00e1',
    SEC1:'I.   Servicios incluidos en la presente cotizaci\u00f3n:',
    SEC2:'II.  Honorarios Legales y Gastos del Proceso',
    SEC3:'III.  M\u00e9todo de Pago de Honorarios y Gastos',
    GTOTAL:'TOTAL GENERAL',
    editHint:'Edite este monto para ajustar el rubro solo en esta cotización',
    resetFees:'Restaurar honorarios estándar', adjusted:'ajustado'
  }
};

function setLang(l) {
  lang = l;
  document.getElementById('btn_en').className = 'lb' + (l === 'en' ? ' on' : '');
  document.getElementById('btn_es').className = 'lb' + (l === 'es' ? ' on' : '');
  var T = TX[l];
  var ids = ['lc','ls','ln','lce','ll','lo','o_oth','lsv','lst','o_pen','o_fn','o_bt','o_qi','o_re','o_corp','o_found',
             'd_stg','l_stg','o_tmp','o_prm','d_act','l_act','o_td','o_wc','o_rep','l_bnk','o_bkp','o_bkr',
             'd_bkt','l_bkt','o_bkt_y','o_bkt_n','l_bkt2','o_bkt_p','o_bkt_r',
             'd_ent','l_ent','o_ent_n','o_ent_c','o_ent_cp','o_ent_f',
             'l_dd','l_deed',
             'd_ppr','l_dd_ppr','l_poa','o_poa_n','o_poa_y','o_ppr',
             'd_ps','l_dd_ps','o_ps',
             'd_prop','l_pv','d_main','l_main','d_dep','d_depfn','d_depqi','l_dep','l_tfn','l_tqi','l_sum','btn_txt','mail_txt'];
  ids.forEach(function(id) { var el = document.getElementById(id); if (el && T[id]) el.textContent = T[id]; });
  document.getElementById('l_o12fn').innerHTML = T.l_o12fn + ' <span class="lh" id="h_o12fn">' + T.h_o12fn + '</span>';
  document.getElementById('l_u12fn').innerHTML = T.l_u12fn + ' <span class="lh" id="h_u12fn">' + T.h_u12fn + '</span>';
  document.getElementById('l_o12qi').innerHTML = T.l_o12qi + ' <span class="lh" id="h_o12qi">' + T.h_o12qi + '</span>';
  document.getElementById('l_u12qi').innerHTML = T.l_u12qi + ' <span class="lh" id="h_u12qi">' + T.h_u12qi + '</span>';
  var svc = gv('svc');
  if (svc === 'corporation') document.getElementById('fix_txt').textContent = T.fix_corp;
  if (svc === 'foundation') document.getElementById('fix_txt').textContent = T.fix_found;
  // Los botones del encabezado y del login viven fuera de este formulario.
  if (typeof paintAuthTexts === 'function') paintAuthTexts();
  refresh();
}

function refresh() {
  var svc = gv('svc'), stage = gv('stage'), T = TX[lang];
  var all = ['r_fns','r_fna','r_re','r_main','r_deps','r_depfn','r_depqi','r_fix','r_bank_toggle','r_ppr','r_ps','r_entity'];
  all.forEach(function(id) { document.getElementById(id).classList.add('hidden'); });

  // Show bank toggle for all visa programs (not corporation/foundation/real_estate)
  if (svc !== 'corporation' && svc !== 'foundation' && svc !== 'real_estate' && svc !== 'promise_review' && svc !== 'property_sale') {
    document.getElementById('r_bank_toggle').classList.remove('hidden');
    // Set default: include for FN work_contract, exclude for others unless already set
    var btEl = document.getElementById('bank_toggle');
    if (btEl.dataset.svc !== svc) {
      btEl.value = (svc === 'friendly_nations' || svc === 'bilateral_treaty') ? 'yes' : 'no';
      btEl.dataset.svc = svc;
    }
    var bType = document.getElementById('r_bk_type');
    if (bType) bType.style.display = btEl.value === 'no' ? 'none' : '';
    // keep legacy fn_bank in sync so any remaining reference matches the visible control
    var fnb = document.getElementById('fn_bank');
    if (fnb) fnb.value = document.getElementById('bank_type').value;

  }

  // Entity selector: available on every quote type except Corporation / Foundation themselves
  if (svc !== 'corporation' && svc !== 'foundation') {
    document.getElementById('r_entity').classList.remove('hidden');
    var enEl = document.getElementById('entity_sel');
    var entKey = svc + '|' + gv('fn_act');
    if (enEl.dataset.key !== entKey) {
      if (svc === 'friendly_nations' && stage === 'temporary' && gv('fn_act') === 'work_contract') enEl.value = 'corp_permit';
      else if (svc === 'bilateral_treaty') enEl.value = 'corp';
      else enEl.value = 'none';
      enEl.dataset.key = entKey;
    }
  }

  if (svc === 'corporation' || svc === 'foundation') {
    document.getElementById('r_fix').classList.remove('hidden');
    document.getElementById('fix_txt').textContent = svc === 'corporation' ? T.fix_corp : T.fix_found;
  } else if (svc === 'real_estate') {
    document.getElementById('r_re').classList.remove('hidden');
  } else if (svc === 'promise_review') {
    document.getElementById('r_ppr').classList.remove('hidden');
  } else if (svc === 'property_sale') {
    document.getElementById('r_ps').classList.remove('hidden');
  } else {
    document.getElementById('r_main').classList.remove('hidden');
    if (svc === 'friendly_nations') {
      document.getElementById('r_fns').classList.remove('hidden');
      if (stage === 'temporary') {
        document.getElementById('r_fna').classList.remove('hidden');
        document.getElementById('r_depfn').classList.remove('hidden');
      } else {
        document.getElementById('r_deps').classList.remove('hidden');
      }
    } else if (svc === 'qualified_investor') {
      document.getElementById('r_depqi').classList.remove('hidden');
    } else {
      document.getElementById('r_deps').classList.remove('hidden');
    }
  }
  buildSummary();
}

function entRows(isEs) {
  var v = gv('entity_sel');
  if (v === 'corp') return [[isEs ? 'Registro de Sociedad An\u00f3nima' : 'Corporation Registration', PRICING.entity.corporation]];
  if (v === 'corp_permit') return [
    [isEs ? 'Registro de Sociedad An\u00f3nima' : 'Corporation Registration', PRICING.entity.corporation],
    [isEs ? 'Permiso de Operaci\u00f3n' : 'Operation Permit', PRICING.entity.operatingPermit],
    [isEs ? 'Registro Municipal' : 'Municipality Registration', PRICING.entity.municipalRegistry]];
  if (v === 'foundation') return [[isEs ? 'Registro de Fundaci\u00f3n de Inter\u00e9s Privado' : 'Private Interest Foundation Registration', PRICING.entity.foundation]];
  return [];
}
function entSvcs(isEs) {
  var v = gv('entity_sel');
  if (v === 'corp') return isEs ? ['Registro de Sociedad An\u00f3nima Paname\u00f1a'] : ['Registration of Panamanian Corporation'];
  if (v === 'corp_permit') return isEs ? ['Registro de Sociedad An\u00f3nima Paname\u00f1a','Permiso de Operaci\u00f3n','Registro Municipal']
                                       : ['Registration of Panamanian Corporation','Operation Permit','Municipality Registration'];
  if (v === 'foundation') return isEs ? ['Registro de Fundaci\u00f3n de Inter\u00e9s Privado'] : ['Registration of Private Interest Foundation'];
  return [];
}

/* --- Ajustes manuales por rubro ------------------------------------------
   `overrides` guarda los montos que el abogado sobrescribio a mano, indexados
   por posicion de fila. Se descartan al cambiar la configuracion de la
   cotizacion, porque en ese caso las filas ya no son las mismas.            */
var overrides = {};
var overridesKey = null;

/* Que fila corresponde a cada concepto de dependientes. Lo llena
   computeFeeRows() y lo lee la nota de "Dependientes Adicionales". */
var rowRoles = {};

/* Montos por dependiente que el abogado escribio a mano en esa nota. */
var noteOverrides = {};

function configSignature() {
  return [gv('svc'), gv('stage'), gv('fn_act'), gv('entity_sel'), gv('bank_toggle'),
          gv('bank_type'), gv('poa_toggle'), getNM(), gn('ndep'), gn('fn_o12'),
          gn('fn_u12'), gn('qi_o12'), gn('qi_u12'), gv('propval'), gv('fee_dd'),
          gv('fee_deed'), gv('fee_dd_ppr'), gv('fee_dd_ps')].join('|');
}

function syncOverrides() {
  var sig = configSignature();
  if (sig !== overridesKey) { overrides = {}; noteOverrides = {}; overridesKey = sig; }
}

function hasNoteOverrides() {
  for (var k in noteOverrides) { if (noteOverrides.hasOwnProperty(k)) return true; }
  return false;
}

function hasOverrides() {
  syncOverrides();
  for (var k in overrides) { if (overrides.hasOwnProperty(k)) return true; }
  return false;
}

function resetOverrides() { overrides = {}; noteOverrides = {}; overridesKey = configSignature(); buildSummary(); }

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Fuente unica de verdad de los rubros: la usan tanto el resumen en pantalla
   como el PDF, para que cualquier ajuste manual llegue al documento final. */
function computeFeeRows(isEs) {
  var svc = gv('svc'), stage = gv('stage'), act = gv('fn_act'), T = TX[lang];
  var nm = getNM(), ndep = gn('ndep');
  var fno = gn('fn_o12'), fnu = gn('fn_u12'), fnnt = fno + fnu;
  var qio = gn('qi_o12'), qiu = gn('qi_u12'), qint = qio + qiu;
  var pv = parseFloat(gv('propval')) || 350000;
  var bkInclude = gv('bank_toggle') !== 'no';
  var bkMethod = gv('bank_type');
  var bk = bkMethod === 'remote' ? PRICING.bank.remote : PRICING.bank.panama;
  var ml = nm > 1 ? nw(nm) + ' (' + nm + ') ' + T.MAINS : T.MAIN;
  // Las etiquetas NO llevan el precio unitario. Si el abogado ajusta el monto
  // de un rubro a mano, un "(US$ 500 c/u)" incrustado en el texto quedaria
  // contradiciendo la cifra de al lado. El monto de la fila es la unica cifra.
  function mlb(p) { return ml; }
  function ea(p) { return ''; }
  function bankLabel() {
    return isEs ? 'Apertura de Cuenta Bancaria (' + (bkMethod === 'remote' ? 'Remotamente' : 'En Panamá') + ')'
                : 'Bank Account Opening (' + (bkMethod === 'remote' ? 'Remotely' : 'In Panama') + ')';
  }
  // Se anota en que fila quedo cada concepto de dependientes, para que la nota
  // de "Dependientes Adicionales" pueda leer el monto realmente cotizado
  // (incluido el que el abogado haya ajustado a mano) en vez de repetir el
  // precio de lista.
  var roles = {};
  function tag(role) { roles[role] = rows.length - 1; }
  var F = T.FEES, G = T.EXP, D = T.DEP;
  var rows = [], pr;

  if (svc === 'corporation') {
    rows = [[isEs ? 'Incorporación de Sociedad Anónima Panameña' : 'Incorporation of Panamanian Corporation', PRICING.entity.corporation]];

  } else if (svc === 'foundation') {
    rows = [[isEs ? 'Incorporación de Fundación de Interés Privado' : 'Incorporation of Private Interest Foundation', PRICING.entity.foundation]];

  } else if (svc === 'pensionado') {
    pr = PRICING.pensionado;
    rows = [[F + ' – ' + mlb(pr.legalFees), pr.legalFees * nm],
            [G + ' – ' + mlb(pr.expenses), pr.expenses * nm]];
    if (ndep > 0) {
      rows.push([F + ' – ' + ndep + ' ' + D + ea(pr.depLegalFees), pr.depLegalFees * ndep]); tag('depLegalFees');
      rows.push([G + ' – ' + ndep + ' ' + D + ea(pr.depExpenses), pr.depExpenses * ndep]); tag('depExpenses');
    }

  } else if (svc === 'bilateral_treaty') {
    pr = PRICING.bilateralTreaty;
    if (bkInclude) rows.push([isEs ? 'Servicio de Apertura de Cuenta Bancaria y Carta de Referencia Bancaria' : 'Service for Opening Bank Account and Obtaining Bank Reference Letter', bk]);
    entRows(isEs).forEach(function(r) { rows.push(r); });
    rows.push([F + ' – ' + mlb(pr.legalFees), pr.legalFees * nm],
              [G + ' – ' + mlb(pr.expenses), pr.expenses * nm]);
    if (ndep > 0) {
      rows.push([F + ' – ' + ndep + ' ' + D + ea(pr.depLegalFees), pr.depLegalFees * ndep]); tag('depLegalFees');
      rows.push([G + ' – ' + ndep + ' ' + D + ea(pr.depExpenses), pr.depExpenses * ndep]); tag('depExpenses');
    }

  } else if (svc === 'friendly_nations' && stage === 'temporary') {
    pr = PRICING.friendlyNationsTemporary;
    rows = entRows(isEs);
    if (act === 'work_contract') { if (bkInclude && fnnt > 0) rows.push([bankLabel(), bk]); }
    else if (bkInclude) rows.push([bankLabel(), bk * nm]);
    rows.push([F + ' – ' + mlb(pr.legalFees), pr.legalFees * nm],
              [G + ' – ' + mlb(pr.expenses), pr.expenses * nm]);
    if (fnnt > 0) { rows.push([F + ' – ' + fnnt + ' ' + D + ea(pr.depLegalFees), pr.depLegalFees * fnnt]); tag('depLegalFees'); }
    if (fno > 0) { rows.push([G + ' – ' + fno + ' ' + (isEs ? 'Dep. mayores de 12' : 'Dep. over 12') + ea(pr.depExpensesOver12), pr.depExpensesOver12 * fno]); tag('depExpensesOver12'); }
    if (fnu > 0) { rows.push([G + ' – ' + fnu + ' ' + (isEs ? 'Dep. menores de 12' : 'Dep. under 12') + ea(pr.depExpensesUnder12), pr.depExpensesUnder12 * fnu]); tag('depExpensesUnder12'); }

  } else if (svc === 'friendly_nations' && stage === 'permanent') {
    pr = PRICING.friendlyNationsPermanent;
    rows = [[F + ' – ' + mlb(pr.legalFees), pr.legalFees * nm],
            [G + ' – ' + mlb(pr.expenses), pr.expenses * nm]];
    if (ndep > 0) {
      rows.push([F + ' – ' + ndep + ' ' + D + ea(pr.depLegalFees), pr.depLegalFees * ndep]); tag('depLegalFees');
      rows.push([G + ' – ' + ndep + ' ' + D + ea(pr.depExpenses), pr.depExpenses * ndep]); tag('depExpenses');
    }

  } else if (svc === 'qualified_investor') {
    pr = PRICING.qualifiedInvestor;
    rows = [[F + ' – ' + mlb(pr.legalFees), pr.legalFees * nm],
            [G + ' – ' + mlb(pr.expenses), pr.expenses * nm]];
    if (qint > 0) { rows.push([F + ' – ' + nw(qint) + ' (' + qint + ') ' + D + ea(pr.depLegalFees), pr.depLegalFees * qint]); tag('depLegalFees'); }
    if (qio > 0) { rows.push([G + ' – ' + qio + ' ' + (isEs ? 'Dep. mayores de 12' : 'Dep. over 12') + ea(pr.depExpensesOver12), pr.depExpensesOver12 * qio]); tag('depExpensesOver12'); }
    if (qiu > 0) { rows.push([G + ' – ' + qiu + ' ' + (isEs ? 'Dep. menores de 12' : 'Dep. under 12') + ea(pr.depExpensesUnder12), pr.depExpensesUnder12 * qiu]); tag('depExpensesUnder12'); }

  } else if (svc === 'real_estate') {
    pr = PRICING.realEstate;
    var reg = Math.round(pv * pr.registryRate * 100) / 100;
    var ddFee = parseFloat(gv('fee_dd')) || pr.dueDiligenceDefault;
    var deedFee = parseFloat(gv('fee_deed')) || pr.publicDeedDefault;
    var pvs = Math.round(pv).toLocaleString('en-US');
    rows = isEs ? [
      ['Anticipo de Trabajo Legal para Debida Diligencia, Redacción o Revisión de Promesa de Compraventa', ddFee],
      ['Poder Especial para Promesa de Compraventa y Firma de Escritura Definitiva', pr.powerOfAttorney],
      ['Servicios Legales para Confección y Registro de Escritura Pública de Cambio de Título', deedFee],
      ['Gastos Estimados de Registro en el Registro Público (Calculados para valor de US$' + pvs + ')', reg],
      ['Gastos de Notaría para el Cierre de Escritura Pública', pr.notary],
      ['Actualización de Valor y Nombre del Inmueble en ANIP para efectos de Impuesto de Inmuebles', pr.anipUpdate]
    ] : [
      ['Advance of Legal Work for Due Diligence, Draft or Review of Promise of Purchase Agreement', ddFee],
      ['Special Power of Attorney for Promise of Purchase Agreement and Signature of Final Deed', pr.powerOfAttorney],
      ['Legal Services for Confection and Registration of Public Deed for change of title', deedFee],
      ['Estimated Registration Expenses at Public Registry (Calculated for value of US$' + pvs + ')', reg],
      ['Notary Expenses for Closing of Public Deed', pr.notary],
      ['Update of Property Value and Name at ANIP for Property Tax purposes', pr.anipUpdate]
    ];
    entRows(isEs).reverse().forEach(function(r) { rows.unshift(r); });

  } else if (svc === 'promise_review') {
    pr = PRICING.promiseReview;
    var ddP = parseFloat(gv('fee_dd_ppr')) || pr.dueDiligenceDefault;
    rows = isEs ? [['Trabajo Legal para Debida Diligencia, Revisión y Ejecución de Promesa de Compraventa con Promotora', ddP]]
                : [['Legal Work for Due Diligence, Review and Execution of Promise of Purchase Agreement with Developer', ddP]];
    if (gv('poa_toggle') === 'yes') {
      rows.push(isEs ? ['Poder Especial para Promesa de Compraventa', pr.powerOfAttorney]
                     : ['Special Power of Attorney for Promise of Purchase Agreement', pr.powerOfAttorney]);
    }
    entRows(isEs).reverse().forEach(function(r) { rows.unshift(r); });

  } else if (svc === 'property_sale') {
    pr = PRICING.propertySale;
    var ddS = parseFloat(gv('fee_dd_ps')) || pr.dueDiligenceDefault;
    rows = isEs ? [
      ['Registro de NIT de la Propiedad', pr.nitRegistration],
      ['Confección de Acta de Accionistas para la Venta de la Propiedad y nombramiento de persona para firmar en nombre de la sociedad o Poder Especial', pr.shareholderMinute],
      ['Trabajo Legal para Confección o Revisión de Documentos y Contratos de la Promesa de Compraventa', ddS],
      ['Ejecución de la Promesa de Compraventa en Representación del Cliente', pr.promiseExecution],
      ['Cálculo, Pago y Obtención de Paz y Salvo de Impuesto de Inmueble de la propiedad', pr.propertyTaxClearance],
      ['Obtención de Paz y Salvo de la Empresa de Agua y Basura de la propiedad', pr.waterGarbageClearance],
      ['Pago y Obtención de Paz y Salvo de la Cuenta de Agua de la propiedad', pr.waterBillClearance],
      ['Cálculo, Pago y Obtención del Impuesto de Transferencia de Título (2%) e Impuesto de Ganancia de Capital (10%) de la propiedad', pr.transferAndGainsTax],
      ['Confección de Acta de Venta de la Propiedad', pr.saleMinute],
      ['Ejecución de la Escritura Final de Venta en Representación del Cliente', pr.finalDeedExecution]
    ] : [
      ['Registration of NIT for Property', pr.nitRegistration],
      ['Confection of Minute of Shareholders for Sale of Property and naming person to sign on behalf of the corporation or Special Power of Attorney', pr.shareholderMinute],
      ['Legal Work for Confection or Review of Documents and Contracts for the Promise of Purchase Agreement', ddS],
      ['Execution of Promise of Purchase Agreement on Behalf of Client', pr.promiseExecution],
      ['Calculating, Paying and Obtaining Good Standing Certificate for Property Tax for property', pr.propertyTaxClearance],
      ['Obtaining Good Standing Certificate from the Water & Garbage Company for property', pr.waterGarbageClearance],
      ['Paying and Obtaining Good Standing on Water Bill for property', pr.waterBillClearance],
      ['Calculating, Paying and Obtaining Transfer of Title Tax (2%) and Capital Gains Tax (10%) for property', pr.transferAndGainsTax],
      ['Confection of Minute of Sale of Property', pr.saleMinute],
      ['Execution of Final Deed of Sale on Behalf of Client for property', pr.finalDeedExecution]
    ];
    entRows(isEs).reverse().forEach(function(r) { rows.unshift(r); });
  }

  // Programas donde la cuenta bancaria y la entidad se anteponen al bloque de honorarios.
  var prepended = 0;
  if (svc === 'pensionado' || (svc === 'friendly_nations' && stage === 'permanent') || svc === 'qualified_investor') {
    if (bkInclude) { rows.unshift([bankLabel(), bk]); prepended++; }
    var er = entRows(isEs);
    for (var ei = er.length - 1; ei >= 0; ei--) { rows.unshift(er[ei]); prepended++; }
  }
  // Cada unshift corre las filas hacia abajo, asi que los indices anotados con
  // tag() hay que desplazarlos o apuntarian a la fila equivocada.
  rowRoles = {};
  for (var rk in roles) {
    if (roles.hasOwnProperty(rk)) rowRoles[rk] = roles[rk] + prepended;
  }
  return rows;
}

/* Rubros finales = calculados + ajustes manuales. Tercer elemento = editado. */
function getQuoteRows(isEs) {
  syncOverrides();
  return computeFeeRows(isEs).map(function(r, i) {
    var edited = overrides.hasOwnProperty(i);
    return [r[0], edited ? overrides[i] : r[1], edited];
  });
}

function quoteTotal(rows) {
  return rows.reduce(function(s, r) { return s + r[1]; }, 0);
}

/* --- Nota de "Dependientes Adicionales" -----------------------------------
   Los montos salen de lo que realmente se cotizo: el total de la fila de
   dependientes dividido entre cuantos son. Asi, si el abogado ajusta esa fila
   a mano, la nota lo sigue. Cuando no hay dependientes cotizados no hay de
   donde dividir, y se cae al precio de lista.
   El abogado puede ademas escribir un monto propio, que manda sobre todo. */

/* Cuantos dependientes hay detras de cada concepto. */
function depCounts() {
  var svc = gv('svc');
  if (svc === 'friendly_nations' && gv('stage') === 'temporary') {
    return { depLegalFees: gn('fn_o12') + gn('fn_u12'),
             depExpensesOver12: gn('fn_o12'), depExpensesUnder12: gn('fn_u12') };
  }
  if (svc === 'qualified_investor') {
    return { depLegalFees: gn('qi_o12') + gn('qi_u12'),
             depExpensesOver12: gn('qi_o12'), depExpensesUnder12: gn('qi_u12') };
  }
  return { depLegalFees: gn('ndep'), depExpenses: gn('ndep') };
}

/* Que conceptos muestra la nota en cada programa, su precio de lista, y a
   quienes se considera dependiente. El texto entre parentesis se define por
   programa porque las categorias no son iguales en todas las visas. */
var DEP_WHO = {
  spouseAndMinors: { en: 'Spouse or Children Under 18', es: 'Cónyuge o Hijos Menores de 18 años' },
  minors:          { en: 'Children under 18 years old', es: 'Hijos Menores de 18 años' },
  generic:         { en: 'per additional dependent',    es: 'por dependiente adicional' }
};

function depNoteSpec() {
  var svc = gv('svc'), stage = gv('stage');
  if (svc === 'pensionado') {
    return { pr: PRICING.pensionado, who: 'spouseAndMinors', keys: ['depLegalFees', 'depExpenses'] };
  }
  if (svc === 'bilateral_treaty') {
    return { pr: PRICING.bilateralTreaty, who: 'minors', keys: ['depLegalFees', 'depExpenses'] };
  }
  if (svc === 'friendly_nations' && stage === 'temporary') {
    return { pr: PRICING.friendlyNationsTemporary, who: 'minors',
             keys: ['depLegalFees', 'depExpensesOver12', 'depExpensesUnder12'] };
  }
  if (svc === 'friendly_nations' && stage === 'permanent') {
    return { pr: PRICING.friendlyNationsPermanent, who: 'minors', keys: ['depLegalFees', 'depExpenses'] };
  }
  if (svc === 'qualified_investor') {
    // Sin parentesis: las categorias de dependiente de esta visa no son las
    // mismas que las de las demas, y no conviene afirmarlas de mas.
    return { pr: PRICING.qualifiedInvestor, who: null,
             keys: ['depLegalFees', 'depExpensesOver12', 'depExpensesUnder12'] };
  }
  return null;
}

function depNoteAmounts(isEs) {
  var spec = depNoteSpec();
  if (!spec) return null;
  syncOverrides();
  var rows = getQuoteRows(isEs), counts = depCounts(), out = {};
  spec.keys.forEach(function(k) {
    if (noteOverrides.hasOwnProperty(k)) { out[k] = noteOverrides[k]; return; }
    var idx = rowRoles[k], n = counts[k];
    out[k] = (idx !== undefined && rows[idx] && n > 0) ? rows[idx][1] / n : spec.pr[k];
  });
  return out;
}

function depNoteText(isEs) {
  var spec = depNoteSpec();
  if (!spec) return '';
  var a = depNoteAmounts(isEs);
  var who = spec.who ? DEP_WHO[spec.who][isEs ? 'es' : 'en'] : '';
  var L = {
    depLegalFees:       isEs ? 'Honorarios Legales' : 'Legal Fees',
    depExpenses:        isEs ? 'Gastos' : 'Expenses',
    depExpensesOver12:  isEs ? 'Gastos (mayores de 12)' : 'Expenses (over 12)',
    depExpensesUnder12: isEs ? 'Gastos (menores de 12)' : 'Expenses (under 12)'
  };
  var per = isEs ? ' por dependiente.' : ' per dependent.';
  var letters = 'abcdefg';
  var base = isEs ? 'Dependientes Adicionales' : 'Additional Dependents';
  var head = (who ? base + ' (' + who + ')' : base) + ':';
  return head + '\n' + spec.keys.map(function(k, i) {
    return letters[i] + ')  ' + L[k] + ': ' + fmt(a[k]) + per;
  }).join('\n');
}

function refreshTotal() {
  var el = document.getElementById('grandTotal');
  if (el) el.textContent = fmt(quoteTotal(getQuoteRows(lang === 'es')));
  var rb = document.getElementById('resetFees');
  if (rb) rb.style.display = (hasOverrides() || hasNoteOverrides()) ? '' : 'none';
}

/* Repinta los montos de la nota sin re-renderizar el resumen completo. */
function refreshDepNoteInputs() {
  var a = depNoteAmounts(lang === 'es');
  if (!a) return;
  [].slice.call(document.querySelectorAll('#summary .dep-in')).forEach(function(inp) {
    var k = inp.dataset.k;
    if (a.hasOwnProperty(k) && !noteOverrides.hasOwnProperty(k)) inp.value = a[k];
  });
}

function buildSummary() {
  var T = TX[lang], isEs = lang === 'es';
  var rows = getQuoteRows(isEs);
  var html = '';
  rows.forEach(function(r, i) {
    html += '<div class="sr' + (r[2] ? ' edited' : '') + '">' +
              '<span class="sr-lbl">' + esc(r[0]) +
                (r[2] ? '<span class="sr-tag">' + esc(T.adjusted) + '</span>' : '') + '</span>' +
              '<span class="sr-amt">US$&nbsp;<input type="number" class="amt-in" step="0.01" min="0" ' +
                'data-i="' + i + '" value="' + r[1] + '" title="' + esc(T.editHint) + '"></span>' +
            '</div>';
  });
  html += '<div class="st"><span>' + T.grand + '</span><span id="grandTotal">' + fmt(quoteTotal(rows)) + '</span></div>';

  // Nota de "Dependientes Adicionales": sigue lo cotizado, y tambien se edita.
  var spec = depNoteSpec();
  if (spec) {
    var a = depNoteAmounts(isEs);
    var L = {
      depLegalFees:       isEs ? 'Honorarios Legales' : 'Legal Fees',
      depExpenses:        isEs ? 'Gastos' : 'Expenses',
      depExpensesOver12:  isEs ? 'Gastos (mayores de 12)' : 'Expenses (over 12)',
      depExpensesUnder12: isEs ? 'Gastos (menores de 12)' : 'Expenses (under 12)'
    };
    html += '<div class="dep-note"><div class="dep-note-hd">' + esc(T.depNoteTitle) + '</div>';
    spec.keys.forEach(function(k) {
      var edited = noteOverrides.hasOwnProperty(k);
      html += '<div class="sr' + (edited ? ' edited' : '') + '">' +
                '<span class="sr-lbl">' + esc(L[k]) +
                  (edited ? '<span class="sr-tag">' + esc(T.adjusted) + '</span>' : '') + '</span>' +
                '<span class="sr-amt">US$&nbsp;<input type="number" class="amt-in dep-in" step="0.01" min="0" ' +
                  'data-k="' + k + '" value="' + a[k] + '" title="' + esc(T.depNoteHint) + '"></span>' +
              '</div>';
    });
    html += '<p class="dep-note-ft">' + esc(T.depNoteFoot) + '</p></div>';
  }

  document.getElementById('summary').innerHTML = html;
  var rb = document.getElementById('resetFees');
  if (rb) { rb.textContent = T.resetFees; rb.style.display = (hasOverrides() || hasNoteOverrides()) ? '' : 'none'; }
}

function go() {
  var cname = gv('cname').trim();
  if (!cname) { alert(lang === 'es' ? 'Por favor ingrese el nombre del cliente.' : 'Please enter a client name.'); return; }
  var jspdfLib = window.jspdf || window.jsPDF || (typeof jspdf !== 'undefined' ? jspdf : null);
  if (!jspdfLib) { alert('PDF library failed to load. Please try a different browser (Chrome or Edge recommended).'); return; }
  var btn = document.getElementById('genBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spin"></div> ' + (lang === 'es' ? 'Generando PDF...' : 'Generating PDF...');
  document.getElementById('result').innerHTML = '';
  setTimeout(function() {
    try { makePDF(cname); }
    catch(e) { 
      console.error('PDF Error:', e); 
      document.getElementById('result').innerHTML = '<div class="err">Error: ' + e.message + '<br><small>Check browser console for details.</small></div>'; 
    }
    btn.disabled = false;
    var T = TX[lang];
    btn.innerHTML = '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg><span id="btn_txt">' + T.btn_txt + '</span>';
  }, 50);
}

/* Cuando no es null, makePDF() deja el PDF aqui en vez de descargarlo. */
var pdfCapture = null;

/* Genera el PDF en memoria y lo devuelve, sin descargarlo ni registrarlo. */
function buildPDF(cname) {
  pdfCapture = {};
  var out;
  try { makePDF(cname); out = pdfCapture; }
  finally { pdfCapture = null; }
  if (!out || !out.bytes) throw new Error('No se pudo generar el PDF.');
  return out;
}

function makePDF(cname) {
  var svc = gv('svc'), stage = gv('stage'), act = gv('fn_act'), T = TX[lang];
  var nm = getNM(), ndep = gn('ndep'), fno = gn('fn_o12'), fnu = gn('fn_u12'), fnnt = fno + fnu;
  var qio = gn('qi_o12'), qiu = gn('qi_u12'), qint = qio + qiu;
  var pv = parseFloat(gv('propval')) || 350000;
  var bkInclude = gv('bank_toggle') !== 'no';
  var bkMethod = gv('bank_type');
  var bk = bkMethod === 'remote' ? PRICING.bank.remote : PRICING.bank.panama;
  var isEs = lang === 'es';
  // Mismos rubros que muestra el resumen, con los ajustes manuales ya aplicados.
  var quoteRows = getQuoteRows(isEs);
  var jsPDF = null;
  if (window.jspdf && window.jspdf.jsPDF) jsPDF = window.jspdf.jsPDF;
  else if (window.jsPDF) jsPDF = window.jsPDF;
  else if (typeof jspdf !== 'undefined' && jspdf.jsPDF) jsPDF = jspdf.jsPDF;
  if (!jsPDF) { alert('Could not initialize PDF engine. Please use Chrome or Edge.'); return; }
  // compress reduce el PDF de ~1.35 MB a ~30 KB (el logo pesa casi todo) sin
  // cambiar nada de lo que se ve. Importa al adjuntarlo por correo.
  var doc = new jsPDF({unit:'pt', format:'letter', compress:true});
  var PW=612, PH=792, LM=60, BM=90, TM=50, CW=492;
  var C = {navy:[13,43,94], navy2:[27,79,138], dark:[26,26,26], mid:[85,85,85], lg:[244,246,249], bd:[208,216,228]};
  function sf(c){doc.setFillColor(c[0],c[1],c[2]);}
  function sd(c){doc.setDrawColor(c[0],c[1],c[2]);}
  function st(c){doc.setTextColor(c[0],c[1],c[2]);}

  function footer() {
    sf(C.navy); doc.triangle(0,PH,PW,PH,PW,PH-115,'F'); doc.rect(0,PH-80,PW*0.52,80,'F');
    sf(C.navy2); doc.triangle(0,PH,PW*0.52,PH-40,PW*0.38,PH,'F');
    st([255,255,255]);
    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.text('De la Guardia, Neuman, Faraudo',PW-60,PH-80,{align:'right'});
    doc.setFontSize(11); doc.text('DENFAB',PW-60,PH-65,{align:'right'});
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
    doc.text('Calle 61, Obarrio No. 6, Panam\u00e1',PW-60,PH-50,{align:'right'});
    doc.text('Tels.: (507) 263-1896/97',PW-60,PH-38,{align:'right'});
    st(C.navy);
    doc.text('info@denfablaw.com',PW-60,PH-16,{align:'right'});
    doc.text('www.denfablaw.com',PW-60,PH-6,{align:'right'});
  }
  function np(y,n){if(y>PH-BM-n){doc.addPage();footer();return TM;}return y;}
  function reBox(title,y){
    var lines=doc.splitTextToSize(title,CW-50); var rh=Math.max(28,lines.length*14+14);
    y=np(y,rh+12); sd(C.bd); doc.setFillColor(255,255,255); doc.setLineWidth(0.5);
    doc.roundedRect(LM,y,CW,rh,3,3,'FD');
    doc.setFont('helvetica','bold'); doc.setFontSize(9); st(C.dark); doc.text('Re:',LM+8,y+rh/2+3.5);
    doc.setFontSize(10.5); doc.text(lines,LM+38,y+(rh-(lines.length-1)*14)/2+1);
    return y+rh+14;
  }
  function fRow(desc,amt,y,isTotal,isBold){
    var ls=doc.splitTextToSize(String(desc),CW-82); var rh=Math.max(20,ls.length*13+8);
    y=np(y,rh); doc.setFillColor.apply(doc,isTotal?C.lg:[255,255,255]); sd(C.bd); doc.setLineWidth(0.5);
    doc.rect(LM,y,CW,rh,'FD');
    doc.setFont('helvetica',(isTotal||isBold)?'bold':'normal'); doc.setFontSize(isTotal?10:9.5); st(C.dark);
    doc.text(ls,LM+8,y+rh/2+(ls.length>1?-(ls.length-1)*6.5:3.5));
    doc.text(fmt(amt),LM+CW-8,y+rh/2+3.5,{align:'right'});
    return y+rh;
  }
  function tHdr(t,y){y=np(y,18);doc.setFont('helvetica','bold');doc.setFontSize(9.5);st(C.dark);doc.text(t,LM,y);return y+14;}
  function wTxt(t,y,bold,sz){
    doc.setFont('helvetica',bold?'bold':'normal'); doc.setFontSize(sz||9.5); st(C.dark);
    var ls=doc.splitTextToSize(t,CW); y=np(y,ls.length*13); doc.text(ls,LM,y); return y+ls.length*13+3;
  }
  function iTxt(t,y){
    doc.setFont('helvetica','bolditalic'); doc.setFontSize(8.5); st(C.dark);
    var ls=doc.splitTextToSize(t,CW); y=np(y,ls.length*12); doc.text(ls,LM,y); return y+ls.length*12+4;
  }
  function addl(note,y){
    note.split('\n').forEach(function(line,i){
      y=np(y,14); doc.setFont('helvetica',i===0?'bold':'normal'); doc.setFontSize(i===0?10:9.5); st(C.dark);
      var ls=doc.splitTextToSize(line,CW-16); doc.text(ls,i>0?LM+14:LM,y); y+=ls.length*13+1;
    });
    return y+6;
  }
  function pmts(list,y){
    y+=20; y=np(y,40); doc.setFont('helvetica','normal'); doc.setFontSize(10.5); st(C.dark);
    doc.text(T.SEC3,LM,y); y+=14; doc.setFontSize(9.5);
    list.forEach(function(p,i){y=np(y,14);var ls=doc.splitTextToSize((i+1)+'.  '+p,CW-20);doc.text(ls,LM+20,y);y+=ls.length*13+1;});
    return y;
  }
  function sig(y){
    y+=20; y=np(y,70); doc.setFont('helvetica','normal'); doc.setFontSize(10.5); st(C.dark);
    doc.text(T.REGARDS,LM,y); y+=28; sd(C.mid); doc.setLineWidth(0.5); doc.line(LM,y,LM+160,y); y+=8;
    doc.text(getLaw(),LM,y); y+=14; doc.text('De la Guardia, Neuman, Faraudo',LM,y); y+=14; doc.text('& Bermudez',LM,y);
    return y;
  }
  function save(cname,svc){
    var L={pensionado:'Pensionado_Visa',friendly_nations:'Friendly_Nations_Visa',bilateral_treaty:'Bilateral_Treaty_Italians',qualified_investor:'Red_Carpet_Visa',real_estate:'Real_Estate',promise_review:'Promise_Purchase_Review',property_sale:'Property_Sale',corporation:'Corporation',foundation:'Foundation'};
    var filename='Quote_'+cname.replace(/\s+/g,'_')+'_'+(L[svc]||svc)+(lang==='es'?'_ES':'')+'.pdf';
    // En modo captura el PDF se devuelve para adjuntarlo a un correo,
    // en vez de descargarse.
    if (pdfCapture) {
      pdfCapture.bytes = new Uint8Array(doc.output('arraybuffer'));
      pdfCapture.filename = filename;
      return;
    }
    doc.save(filename);
    document.getElementById('result').innerHTML='<div class="ok">'+(isEs?'\u2713 PDF descargado para '+cname:'\u2713 PDF downloaded for '+cname)+'</div>';
    // El registro va despues de la descarga y no la bloquea: si falla la red,
    // el abogado ya tiene su PDF.
    recordQuote(cname);
  }

  footer();
  var img = new Image(); img.src = LOGO;
  doc.addImage(img,'PNG',PW/2-86,TM,172,100);
  var y = TM+112;
  doc.setFont('helvetica','normal'); doc.setFontSize(10.5); st(C.dark);
  doc.text('Dear '+gv('sal')+' '+cname,LM,y); y+=16; doc.text(T.LOC,LM,y); y+=20;

  var ml = nm>1 ? nw(nm)+' ('+nm+') '+T.MAINS : T.MAIN;
  var F=T.FEES, G=T.EXP, D=T.DEP;

  if (svc === 'corporation') {
    y=reBox(isEs?'Incorporaci\u00f3n de Sociedad An\u00f3nima Paname\u00f1a':'Incorporation Panamanian Corporation',y); y+=8;
    y=tHdr(isEs?'Tabla 1. Honorarios Legales para Sociedad An\u00f3nima Paname\u00f1a':'Table 1. Legal Fees for Panamanian Corporation',y);
    quoteRows.forEach(function(r){ y=fRow(r[0],r[1],y,false,false); });
    y=fRow(T.GTOTAL,quoteTotal(quoteRows),y,true,false); y+=4;
    y=iTxt(isEs?'Nota 1  El costo no incluye el 7% de Impuesto de Transferencia sobre Honorarios Legales.':'Note 1  The cost does not include 7% Sales Tax on Legal Fees.',y); y+=6;
    y=wTxt(isEs?'Nuestro paquete corporativo incluye los siguientes documentos:':'Our corporation package includes the following documents:',y,false);
    var ci=isEs?['a)  Traducci\u00f3n al ingl\u00e9s del pacto social','b)  Acta de la reuni\u00f3n de la junta directiva emitiendo las acciones','c)  Certificados de Acciones Originales','d)  Libro de Acciones Original','e)  Registro R.U.C. & NIT']:['a)  English translation of the articles of incorporation','b)  Minutes of the board of directors meeting issuing the shares','c)  Original Share Certificates','d)  Original Share Book','e)  R.U.C. & NIT Registration'];
    ci.forEach(function(s){y=np(y,13);doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.text(s,LM+18,y);y+=13;});
    y+=12;
    y=tHdr(isEs?'Tabla 2-A. Pagos Anuales por Servicios Corporativos sin directores nominales':'Table 2-A. Annual Payments fees on Corporation Services without nominee directors',y);
    y=fRow(isEs?'Impuesto de Franquicia Gubernamental Anual':'Annual Government Franchise Tax',PRICING.annual.corporationFranchiseTax,y,false,false);
    y=fRow(isEs?'Agente Residente':'Resident Agent',PRICING.annual.residentAgent,y,false,false);
    y=fRow(T.GTOTAL,PRICING.annual.corporationFranchiseTax+PRICING.annual.residentAgent,y,true,false);
    y=fRow(isEs?'Servicio de Directores Nominales (Opcional) por director':'Service of Nominal Directors (Optional) per director',PRICING.annual.nomineePerPerson,y,false,true); y+=4;
    y=iTxt(isEs?'Nota 2  Estos honorarios se facturar\u00e1n anualmente a partir del primer a\u00f1o.':'Note 2  These fees will be billed annually after the first year.',y);
    sig(y); save(cname,svc);

  } else if (svc === 'foundation') {
    y=reBox(isEs?'Incorporaci\u00f3n de Fundaci\u00f3n de Inter\u00e9s Privado':'Incorporation Private Interest Foundation',y); y+=8;
    y=tHdr(isEs?'Tabla 1. Honorarios Legales para Fundaci\u00f3n de Inter\u00e9s Privado':'Table 1. Legal Fees for Private Interest Foundation',y);
    quoteRows.forEach(function(r){ y=fRow(r[0],r[1],y,false,false); });
    y=fRow(T.GTOTAL,quoteTotal(quoteRows),y,true,false); y+=4;
    y=iTxt(isEs?'Nota 1  El monto total no incluye el 7% de Impuesto de Transferencia.':'Note 1  The total amount does not include 7% Sales Tax.',y); y+=6;
    y=wTxt(isEs?'Nuestro paquete de fundaci\u00f3n de inter\u00e9s privado incluye los siguientes documentos:':'Our private interest foundation package includes the following documents:',y,false);
    var fi=isEs?['a)  Carta Org\u00e1nica Original de la Fundaci\u00f3n','b)  Traducci\u00f3n al ingl\u00e9s de la Carta Org\u00e1nica de la Fundaci\u00f3n','c)  Reglamento Simple']:['a)  Original Foundation Charter','b)  English translation of the Foundation Charter','c)  Simple Regulations'];
    fi.forEach(function(s){y=np(y,13);doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.text(s,LM+18,y);y+=13;});
    y+=12;
    y=tHdr(isEs?'Tabla 3-A. Pagos Anuales por Servicios de Fundaci\u00f3n de Inter\u00e9s Privado sin consejo nominal':'Table 3-A. Annual Payments fees on Private Interest Foundation Services without nominee council',y);
    y=fRow(isEs?'Impuesto de Franquicia Gubernamental Anual':'Annual Government Franchise Tax',PRICING.annual.foundationFranchiseTax,y,false,false);
    y=fRow(isEs?'Agente Residente':'Resident Agent',PRICING.annual.residentAgent,y,false,false);
    y=fRow(T.GTOTAL,PRICING.annual.foundationFranchiseTax+PRICING.annual.residentAgent,y,true,false);
    y=fRow(isEs?'Servicio de Miembros Nominales del Consejo de la Fundaci\u00f3n por miembro (Opcional)':'Service of Nominal Members of Foundation Council per member (Optional)',PRICING.annual.nomineePerPerson,y,false,true); y+=4;
    y=iTxt(isEs?'Nota 1  Estos honorarios se facturar\u00e1n anualmente a partir del primer a\u00f1o. Los Miembros Nominales del Consejo de la Fundaci\u00f3n son opcionales y se facturan a US$200.00 cada uno por a\u00f1o.':'Note 1  These fees will be billed annually after the first year. Service of Nominal Members of the Foundation Council are optional and are billed at US$200.00 each per year.',y);
    sig(y); save(cname,svc);

  } else {
    var title='', svcs=[], feeR=[], grand=0, pList=[], note1='', addlNote='';

    if (svc === 'pensionado') {
      title = isEs?'Residencia Permanente \u2013 Visa de Pensionado con Pensi\u00f3n P\u00fablica':'Tourist Pensionado Residency with Public Pension';
      svcs = isEs?['Registro de Solicitantes en Migraci\u00f3n','Traducci\u00f3n de Documentos al Espa\u00f1ol','Certificados de Salud','Gastos de Notar\u00eda Local','Solicitud de Residencia Permanente','Carn\u00e9 Temporal durante el Proceso','Permiso de M\u00faltiple Entrada y Salida','Traducci\u00f3n de Documentaci\u00f3n','Tramitaci\u00f3n de visa hasta emisi\u00f3n de Resoluci\u00f3n','Obtenci\u00f3n de Nota de C\u00e9dula tras la Residencia','Acompa\u00f1amiento al Tribunal Electoral para obtener C\u00e9dula']:['Registration of Applicants at Immigration','Translation of Documents into Spanish','Health Certificates','Local Notary Expenses','Application for Permanent Residency','Temporary ID during Process','Multiple Entry & Exit Permit','Translation of Documentation','Processing visa until Resolution has been issued','Obtaining Cedula Note After residency','Taking Client to Tribunal Electoral to obtain Cedula'];
      pList = isEs?['25% de los Honorarios Legales para iniciar la revisi\u00f3n de documentaci\u00f3n.','75% de los Honorarios Legales restantes al registrar pasaportes en Migraci\u00f3n.','100% de los Gastos tras el Registro']:['25% of Legal Fees to start reviewing documentation.','75% of remaining Legal Fees at Registration of Passports at immigration.','100% of the Expenses after Registration'];
      note1 = isEs?'Nota 1  Esta cotizaci\u00f3n es v\u00e1lida \u00fanicamente por un per\u00edodo de treinta (30) d\u00edas. No incluye Impuesto de Transferencia (7%).':'Note 1  This quote is valid only for a period of thirty (30) days. Quote does not include Sales Tax (7%).';
      addlNote = depNoteText(isEs);

    } else if (svc === 'bilateral_treaty') {
      title = isEs?('Solicitud de Residencia Indefinida bajo Tratado Bilateral con Italianos para '+ml+(ndep>0?' m\u00e1s '+ndep+' Dependiente(s)':'')):('Indefinite Residency Application under Bilateral Treaty with Italians Visa for '+ml+(ndep>0?' plus '+ndep+' Dependent(s)':''));
      var bkSvcEs = bkInclude ? ['Servicio de Apertura de Cuenta Bancaria y Obtenci\u00f3n de Carta de Referencia Bancaria.'] : [];
      var bkSvcEn = bkInclude ? ["Service for Opening up Bank Account and Obtaining Bank Reference Letter."] : [];
      svcs = isEs?[...bkSvcEs,'Registro de Corporaci\u00f3n','Obtenci\u00f3n de Certificado del Registro P\u00fablico','Registro de Solicitantes en Migraci\u00f3n','Traducci\u00f3n de Documentos al Espa\u00f1ol','Certificados de Salud','Gastos de Notar\u00eda Local','Solicitud de Carn\u00e9 de Residencia Indefinida','Carn\u00e9 Temporal durante el Proceso','Permiso de M\u00faltiple Entrada y Salida','Traducci\u00f3n de Documentaci\u00f3n','Tramitaci\u00f3n de visa hasta emisi\u00f3n de Resoluci\u00f3n.','Dos (2) Cheques de Caja a favor del Tesoro Nacional US$250.00','Todos los documentos para demostrar prop\u00f3sito econ\u00f3mico ante Migraci\u00f3n','Obtenci\u00f3n de Residencia Indefinida']:[...bkSvcEn,'Registration of Corporation','Obtaining of Public Registry Certificate','Registration of Applicants at Immigration','Translation of Documents into Spanish','Health Certificates','Local Notary Expenses','Application for Indefinite Residency ID','Temporary ID during Process','Multiple Entry & Exit Permit','Translation of Documentation','Processing visa until Resolution has been issued.',"Two (2) Cashier's Checks for National Treasury US$250.00",'All documents to prove economic purpose to Immigration','Obtaining Indefinite Residency'];
      pList = isEs?['25% de los Honorarios Legales restantes para iniciar el trabajo.','75% de los Honorarios Legales previo a la solicitud.','100% de los Gastos previo a la solicitud']:['25% of Legal Fees remaining to start working.','75% of Legal Fees prior to application.','100% of the Expenses prior to application'];
      note1 = isEs?'Nota 1  Esta cotizaci\u00f3n es v\u00e1lida \u00fanicamente por un per\u00edodo de treinta (30) d\u00edas. La cotizaci\u00f3n no incluye Impuesto de Transferencia (7%) sobre honorarios legales.':'Note 1  This quote is valid only for a period of thirty (30) days. The quote does not include Sales Tax (7%) on legal fees.';
      addlNote = depNoteText(isEs);

    } else if (svc === 'friendly_nations' && stage === 'temporary') {
      var fnnt2=fno+fnu, tc=nm+fnnt2, ic=nm+fno;
      var actLbl=isEs?(act==='work_contract'?'Contrato de Trabajo':act==='real_estate_purchase'?'Compra de Propiedad':'Dep\u00f3sito a Plazo'):(act==='work_contract'?'Work Contract':act==='real_estate_purchase'?'Real Estate Purchase':'Time Deposit');
      title = isEs?('Solicitud de Residencia Temporal de Dos (2) A\u00f1os bajo Visa de Pa\u00edses Amigos de Panam\u00e1 ('+actLbl+') para '+ml+(fnnt2>0?' m\u00e1s '+fnnt2+' Dependiente(s)':'')): ('Two (2) Year Temporary Residency Application under Countries Friendly to Panama Visa ('+actLbl+') for '+ml+(fnnt2>0?' plus '+fnnt2+' Dependent(s)':''));
      var bl=isEs?('Apertura de Cuenta Bancaria ('+(bkMethod==='remote'?'Remotamente':'En Panam\u00e1')+')'): ('Bank Account Opening ('+(bkMethod==='remote'?'Remotely':'In Panama')+')');
      var baseSvcs=isEs?['Obtenci\u00f3n de Certificado del Registro P\u00fablico','Registro de Solicitantes en Migraci\u00f3n','Traducci\u00f3n de Documentos al Espa\u00f1ol','Certificados de Salud','Gastos de Notar\u00eda Local']:['Obtaining of Public Registry Certificate','Registration of Applicants at Immigration','Translation of Documents into Spanish','Health Certificates','Local Notary Expenses'];
      var econSvcs=[];
      econSvcs=entSvcs(isEs);
      if(act==='work_contract'){ if(bkInclude&&fnnt2>0)econSvcs.push(bl+' US$'+bk+'.00'); }
      else if(bkInclude) econSvcs.push(bl+' US$'+bk+'.00');
      var endSvcs=isEs?['Solicitud de Carn\u00e9 de Residencia Temporal de Dos (2) A\u00f1os','Carn\u00e9 Temporal durante el Proceso','Permiso de M\u00faltiple Entrada y Salida','Tramitaci\u00f3n de visa hasta emisi\u00f3n de Resoluci\u00f3n.']:['Application for Two (2) Year Temporary Residency ID','Temporary ID during Process','Multiple Entry & Exit Permit','Processing visa until Resolution has been issued.'];
      if(tc>0) endSvcs.push(isEs?(nw(tc)+' ('+tc+') Cheque(s) de Caja a favor del Tesoro Nacional US$250.00'):(nw(tc)+' ('+tc+") Cashier's Check(s) for National Treasury US$250.00"));
      if(ic>0) endSvcs.push(isEs?(nw(ic)+' ('+ic+') Cheque(s) de Caja a favor del Servicio Nacional de Migraci\u00f3n US$800.00'):(nw(ic)+' ('+ic+") Cashier's Check(s) for National Service of Immigration US$800.00"));
      endSvcs=endSvcs.concat(isEs?['Todos los documentos para demostrar prop\u00f3sito econ\u00f3mico ante Migraci\u00f3n','Obtenci\u00f3n de Residencia Temporal de Dos (2) A\u00f1os']:['All documents to prove economic purpose to Immigration','Obtaining Two (2) Year Temporary Residency']);
      svcs = baseSvcs.concat(econSvcs).concat(endSvcs);
      pList = isEs?['25% de los Honorarios Legales restantes para iniciar el trabajo.','75% de los Honorarios Legales previo a la solicitud.','100% de los Gastos previo a la solicitud']:['25% of Legal Fees remaining to start working.','75% of Legal Fees prior to application.','100% of the Expenses prior to application'];
      note1 = isEs?'Nota 1  Esta cotizaci\u00f3n es v\u00e1lida \u00fanicamente por un per\u00edodo de treinta (30) d\u00edas. La cotizaci\u00f3n no incluye Impuesto de Transferencia (7%) sobre honorarios legales.':'Note 1  This quote is valid only for a period of thirty (30) days. The quote does not include Sales Tax (7%) on legal fees.';
      addlNote = depNoteText(isEs);

    } else if (svc === 'friendly_nations' && stage === 'permanent') {
      title = isEs?('Residencia Permanente bajo Visa de Pa\u00edses Amigos de Panam\u00e1 para '+ml+(ndep>0?' m\u00e1s '+ndep+' Dependiente(s)':'')):('Permanent Residency under Countries Friendly to Panama Visa for '+ml+(ndep>0?' plus '+ndep+' Dependent(s)':''));
      svcs = isEs?['Obtenci\u00f3n de Certificado del Registro P\u00fablico','Registro de Solicitantes en Migraci\u00f3n','Traducci\u00f3n de Documentos al Espa\u00f1ol','Certificados de Salud','Gastos de Notar\u00eda Local','Solicitud de Residencia Permanente','Carn\u00e9 Temporal durante el Proceso','Permiso de M\u00faltiple Entrada y Salida','Tramitaci\u00f3n de visa hasta emisi\u00f3n de Resoluci\u00f3n.','Todos los documentos para demostrar prop\u00f3sito econ\u00f3mico ante Migraci\u00f3n','Carn\u00e9 de Residencia Indefinida']:['Obtaining of Public Registry Certificate','Registration of Applicants at Immigration','Translation of Documents into Spanish','Health Certificates','Local Notary Expenses','Application for Permanent Residency','Temporary ID during Process','Multiple Entry & Exit Permit','Processing visa until Resolution has been issued.','All documents to prove economic purpose to Immigration','Indefinite Residency ID'];
      pList = isEs?['25% de los Honorarios Legales restantes para iniciar el trabajo.','75% de los Honorarios Legales previo a la solicitud.','100% de los Gastos previo a la solicitud']:['25% of Legal Fees remaining to start working.','75% of Legal Fees prior to application.','100% of the Expenses prior to application'];
      note1 = isEs?'Nota 1  Esta cotizaci\u00f3n es v\u00e1lida \u00fanicamente por un per\u00edodo de treinta (30) d\u00edas. La cotizaci\u00f3n no incluye Impuesto de Transferencia (7%) sobre honorarios legales.':'Note 1  This quote is valid only for a period of thirty (30) days. The quote does not include Sales Tax (7%) on legal fees.';
      addlNote = depNoteText(isEs);

    } else if (svc === 'qualified_investor') {
      title = isEs?('Residencia Permanente bajo Visa Red Carpet para '+ml+(qint>0?' m\u00e1s '+nw(qint)+' ('+qint+') Dependientes':'')):('Permanent Residency under Red Carpet Visa for '+ml+(qint>0?' plus '+nw(qint)+' ('+qint+') Dependents':''));
      svcs = isEs?['Traducci\u00f3n de Documentos al Espa\u00f1ol','Certificados de Salud','Gastos de Notar\u00eda Local','Solicitud de Residencia Permanente','Tramitaci\u00f3n de visa hasta emisi\u00f3n de Resoluci\u00f3n.','Un (1) Cheque de Caja al Servicio Nacional de Migraci\u00f3n por el Solicitante Principal US$5,000.00','Un (1) Cheque de Caja al Ministerio de Comercio por el Solicitante Principal US$5,000.00']:['Translation of Documents into Spanish','Health Certificates','Local Notary Expenses','Application for Permanent Residency','Processing visa until Resolution has been issued.',"One (1) Cashier's Check for National Service of Immigration for Main Applicant US$5,000.00","One (1) Cashier's Check for Ministry of Commerce for Main Applicant US$5,000.00"];
      if(qio>0) svcs.push(isEs?(nw(qio)+' ('+qio+') Cheque(s) de Caja al Servicio Nacional de Migraci\u00f3n por Dependiente(s) US$1,000.00'):(nw(qio)+' ('+qio+") Cashier's Check(s) for National Service of Immigration for Dependent(s) US$1,000.00"));
      if(qint>0) svcs.push(isEs?(nw(qint)+' ('+qint+') Cheque(s) de Caja al Ministerio de Comercio por Dependiente(s) US$1,000.00'):(nw(qint)+' ('+qint+") Cashier's Check(s) for Ministry of Commerce for Dependent(s) US$1,000.00"));
      svcs=svcs.concat(isEs?['Todos los documentos para demostrar prop\u00f3sito econ\u00f3mico ante Migraci\u00f3n','Carn\u00e9 de Residencia Permanente','C\u00e9dula']:['All documents to prove economic purpose to Immigration','Permanent Residency ID','Cedula']);
      pList = isEs?['25% de los Honorarios Legales restantes para iniciar el trabajo.','Adelanto de US$200 por persona para gastos.','75% de los Honorarios Legales previo a la solicitud.','Monto restante de Gastos previo a la solicitud.']:['25% of Legal Fees remaining to start working.','Advance of US$200 per person for expenses.','75% of Legal Fees prior to application.','Remaining amount of Expenses prior to application.'];
      addlNote = depNoteText(isEs);

    } else if (svc === 'real_estate') {
      title=isEs?'Cotizaci\u00f3n de Honorarios y Gastos en la Adquisici\u00f3n de Propiedad en Panam\u00e1':'Quote for Fees & Expenses on Property Acquisition in Panama';
      y=reBox(title,y); y+=8;
      y=wTxt(isEs?'I.   Compra de Propiedad en Panam\u00e1':'I.   Purchasing Property in Panama',y,true,10.5);
      var reParts=isEs?[['Etapa 1: La Promesa de Compraventa','Este contrato se celebra con car\u00e1cter previo al contrato de compraventa definitivo. El vendedor se obliga a vender al comprador a un precio establecido. Si el comprador decide no proceder, generalmente perder\u00e1 el dep\u00f3sito. El vendedor queda obligado a vender.'],['Etapa 2: El Contrato Definitivo','Este contrato se formaliza mediante escritura p\u00fablica y debe inscribirse en el Registro P\u00fablico de Panam\u00e1. A partir de la inscripci\u00f3n, usted se convierte en propietario. La forma m\u00e1s segura de pagar el saldo es mediante una carta de pago irrevocable emitida por un banco. Por ley, el vendedor paga el impuesto de transferencia y el comprador paga los gastos legales y de registro.']]:[ ['Stage 1: The Promise of Sale and Purchase','This contract is performed preliminary to the sale and purchase contract. The seller agrees to sell at an established price; the buyer consigns a down payment. If the buyer decides not to proceed, he will usually lose the deposit. The seller is bound to sell.'],['Stage 2: The Final Contract','This contract is done in the form of a public deed and must be registered at the Public Registry of Panama. As of registration, you become the owner. The safest way to pay the remainder is by an irrevocable letter of payment issued by a bank. Please note: the seller pays the transfer tax and the buyer pays for the legal and registration costs.']];
      reParts.forEach(function(p){y=wTxt(p[0],y,true);y=wTxt(p[1],y,false);y+=4;});
      y+=6; y=wTxt(isEs?'II.  Cotizaci\u00f3n de Honorarios y Gastos en la Adquisici\u00f3n del Inmueble':'II.  Quote for Fees & Expenses on Property Acquisition',y,true,10.5);
      var reR=quoteRows;
      grand=quoteTotal(reR);
      reR.forEach(function(r){y=fRow(r[0],r[1],y,false,false);});
      y=fRow(T.GTOTAL,grand,y,true,false); y+=4;
      y=iTxt(isEs?'Nota 1. Los gastos de Registro y Notar\u00eda son estimados y sujetos a cambio. Esta cotizaci\u00f3n es v\u00e1lida por treinta (30) d\u00edas calendario. No incluye Impuesto de Transferencia sobre Honorarios Legales (7%).':'Note 1. Registration and Notary Fees are estimates and subject to change. This quote is valid for thirty (30) calendar days. Does not include Sales Tax on Legal Fees (7%).',y); y+=4;
      var reAddl=isEs?'Nuestra Cotizaci\u00f3n incluye los siguientes servicios:\na)  Debida Diligencia sobre el Inmueble en el Registro P\u00fablico y la ANATI.\nb)  Acta de Junta Directiva autorizando la compra y nombrando a la persona para firmar.\nc)  Confecci\u00f3n o Revisi\u00f3n y Negociaci\u00f3n de la Promesa de Compraventa.\nd)  Confecci\u00f3n de Escritura P\u00fablica de Cambio de T\u00edtulo del Inmueble.\ne)  Cierre de Escritura ante Notario e Inscripci\u00f3n en el Registro P\u00fablico.\nf)  Actualizaci\u00f3n de Valor y Propietario en el Ministerio de Econom\u00eda y Finanzas.\ng)  Informe de Impuesto de Inmuebles con recomendaciones para reducirlo si aplica.':'Our Quote includes the following services:\na)  Due Diligence on Property in Public Registry and ANATI.\nb)  Minute of Foundation Council Authorizing Purchase and Naming person to sign contracts.\nc)  Confection or Review and Negotiation of Promise of Purchase Agreement.\nd)  Confection of Public Deed for Change of Title for the Property.\ne)  Closing Deed at Notary and Registering at Public Registry for Change of Title.\nf)  Update Value and Ownership at Ministry of Economy and Finance for Tax Purposes.\ng)  Property Tax Report with recommendations on how to reduce property tax if applicable.';
      y=addl(reAddl,y);
      var rePmts=isEs?['50% de los Honorarios Legales para iniciar el trabajo.','50% de los Honorarios Legales y 100% de los Gastos previo al cierre.']:['50% of Legal Fees to begin work.','50% of Legal Fees and 100% of Expenses prior to closing.'];
      y=pmts(rePmts,y); sig(y); save(cname,svc); return;
    } else if (svc === 'promise_review') {

      title=isEs?'Cotizaci\u00f3n \u2013 Revisi\u00f3n y Ejecuci\u00f3n de Promesa de Compraventa con Promotora':'Quote \u2013 Review and Execution of Promise of Purchase Agreement with Developer';
      y=reBox(title,y); y+=8;
      y=wTxt(isEs?'I.   Honorarios y Gastos':'I.   Fees & Expenses',y,true,10.5);
      var pprR=quoteRows;
      grand=quoteTotal(pprR);
      pprR.forEach(function(r){y=fRow(r[0],r[1],y,false,false);});
      y=fRow(T.GTOTAL,grand,y,true,false); y+=4;
      y=iTxt(isEs?'Nota 1. Esta cotizaci\u00f3n es v\u00e1lida por treinta (30) d\u00edas calendario. No incluye Impuesto de Transferencia sobre Honorarios Legales (7%).':'Note 1. This quote is valid for thirty (30) calendar days. Does not include Sales Tax on Legal Fees (7%).',y); y+=4;
      sig(y); save(cname,svc); return;
    } else if (svc === 'property_sale') {
      title=isEs?'Cotizaci\u00f3n \u2013 Transacci\u00f3n Inmobiliaria: Venta de Propiedad':'Quote \u2013 Real Estate Transaction: Sale of Property';
      y=reBox(title,y); y+=8;
      y=wTxt(isEs?'Honorarios y Gastos Legales por los Servicios Requeridos para completar la Venta de la Propiedad.':'Legal Fees and Expenses on Services Required in order to complete a Sale of Property.',y,false); y+=6;
      var psR=quoteRows;
      grand=quoteTotal(psR);
      psR.forEach(function(r){y=fRow(r[0],r[1],y,false,false);});
      y=fRow(T.GTOTAL,grand,y,true,false); y+=4;
      y=iTxt(isEs?'Nota 1. Cualquier trabajo adicional que se requiera ser\u00e1 cotizado posteriormente o facturado por hora. Esta cotizaci\u00f3n no incluye el 7% de ITBMS sobre Honorarios Legales.':'Note 1. Any additional work needed to be done will be quoted later or billed by the hour. This quote does not include 7% Sales Tax on Legal Fees.',y); y+=4;
      var psPmts=isEs?['Las primeras cuatro (4) l\u00edneas de la cotizaci\u00f3n para iniciar el trabajo.','Los honorarios restantes una vez firmado el contrato.']:['First four (4) lines of quote to begin working.','Remaining fees once the contract has been signed.'];
      y=pmts(psPmts,y); sig(y); save(cname,svc); return;
    }

    y=reBox(title,y); y+=8;
    doc.setFont('helvetica','normal'); doc.setFontSize(10.5); st(C.dark); doc.text(T.SEC1,LM,y); y+=14; doc.setFontSize(9.5);
    svcs.forEach(function(s,i){y=np(y,14);var ls=doc.splitTextToSize((i+1)+'.  '+s,CW-20);doc.text(ls,LM+20,y);y+=ls.length*13+1;});
    y+=8; y=np(y,30); doc.setFont('helvetica','normal'); doc.setFontSize(10.5); st(C.dark); doc.text(T.SEC2,LM,y); y+=12;
    if (svc === 'pensionado' || (svc === 'friendly_nations' && stage === 'permanent') || svc === 'qualified_investor') {
      var es2 = entSvcs(isEs);
      if (es2.length) svcs = es2.concat(svcs);
    }
    feeR = quoteRows;
    grand = quoteTotal(feeR);
    feeR.forEach(function(r){y=fRow(r[0],r[1],y,false,false);});
    y=fRow(T.GTOTAL,grand,y,true,false); y+=6;
    if(note1)y=iTxt(note1,y);
    if(addlNote)y=addl(addlNote,y);
    y=pmts(pList,y); sig(y); save(cname,svc);
  }
}
window.addEventListener("load", function() {
  document.getElementById('brandLogo').src = LOGO;
  document.getElementById('authLogo').src = LOGO;

  // El resumen se re-renderiza en cada refresh(), asi que el listener va en el
  // contenedor y no en cada input.
  document.getElementById('summary').addEventListener('input', function(e) {
    var el = e.target;
    if (!el.classList || !el.classList.contains('amt-in')) return;
    syncOverrides();
    var v = parseFloat(el.value);
    if (el.dataset.k) { noteOverrides[el.dataset.k] = (isNaN(v) || v < 0) ? 0 : v; }
    else { overrides[parseInt(el.dataset.i, 10)] = (isNaN(v) || v < 0) ? 0 : v; }
    var row = el.parentNode.parentNode;
    row.classList.add('edited');
    if (!row.querySelector('.sr-tag')) {
      var tag = document.createElement('span');
      tag.className = 'sr-tag';
      tag.textContent = TX[lang].adjusted;
      row.querySelector('.sr-lbl').appendChild(tag);
    }
    refreshTotal();
    // Ajustar un rubro de dependientes cambia el monto por persona, asi que la
    // nota tiene que seguirlo. No se repinta el campo que se esta escribiendo,
    // para no mover el cursor.
    if (!el.dataset.k) refreshDepNoteInputs();
  });

  document.getElementById('resetFees').addEventListener('click', resetOverrides);
  refresh();
  initHistory();
  initAuth();
});
