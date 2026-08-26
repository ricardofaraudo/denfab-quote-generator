/* ============================================================================
   DENFAB — TABLA DE HONORARIOS Y GASTOS
   ----------------------------------------------------------------------------
   Este es el UNICO archivo que hay que editar para cambiar precios.
   Todos los montos estan en US$. No se requiere tocar ningun otro archivo.

   Despues de editar: guardar, hacer commit y publicar. El cambio aplica a
   todas las cotizaciones nuevas.
   ========================================================================== */

var PRICING = {

  /* --- Entidades (sociedades y fundaciones) ------------------------------ */
  entity: {
    corporation:        1400,   // Registro de Sociedad Anonima
    operatingPermit:     355,   // Permiso de Operacion
    municipalRegistry:   400,   // Registro Municipal
    foundation:         1600    // Fundacion de Interes Privado
  },

  /* --- Apertura de cuenta bancaria --------------------------------------- */
  bank: {
    panama:  750,
    remote: 1250
  },

  /* --- Visa de Pensionado / Jubilacion ----------------------------------- */
  pensionado: {
    legalFees:      2500,   // por solicitante principal
    expenses:        500,   // por solicitante principal
    depLegalFees:    800,   // por dependiente
    depExpenses:     500    // por dependiente
  },

  /* --- Tratado Bilateral con Italianos ----------------------------------- */
  bilateralTreaty: {
    legalFees:      2500,
    expenses:        600,
    depLegalFees:    800,
    depExpenses:     600
  },

  /* --- Paises Amigos — Residencia Temporal (2 anios) --------------------- */
  friendlyNationsTemporary: {
    legalFees:      2500,
    expenses:       1400,
    depLegalFees:    800,
    depExpensesOver12:  1400,
    depExpensesUnder12:  600
  },

  /* --- Paises Amigos — Residencia Permanente ----------------------------- */
  friendlyNationsPermanent: {
    legalFees:      2500,
    expenses:        400,
    depLegalFees:    800,
    depExpenses:     400
  },

  /* --- Red Carpet / Inversionista Calificado ----------------------------- */
  qualifiedInvestor: {
    legalFees:      3500,
    expenses:      10750,
    depLegalFees:    500,
    depExpensesOver12:  2400,
    depExpensesUnder12: 1400
  },

  /* --- Compra de Propiedad ----------------------------------------------- */
  realEstate: {
    dueDiligenceDefault: 1000,  // editable por cotizacion en el formulario
    powerOfAttorney:      250,
    publicDeedDefault:   1250,  // editable por cotizacion en el formulario
    registryRate:       0.003,  // % sobre el valor del inmueble
    notary:               125,
    anipUpdate:           300
  },

  /* --- Revision de Promesa de Compraventa con Promotora ------------------ */
  promiseReview: {
    dueDiligenceDefault: 1000,  // editable por cotizacion en el formulario
    powerOfAttorney:      250
  },

  /* --- Venta de Propiedad ------------------------------------------------ */
  propertySale: {
    nitRegistration:      150,
    shareholderMinute:    250,
    dueDiligenceDefault: 1000,  // editable por cotizacion en el formulario
    promiseExecution:     150,
    propertyTaxClearance: 150,
    waterGarbageClearance:100,
    waterBillClearance:   100,
    transferAndGainsTax:  300,
    saleMinute:           200,
    finalDeedExecution:   250
  },

  /* --- Pagos anuales recurrentes (informativos en el PDF) ---------------- */
  annual: {
    corporationFranchiseTax: 300,
    foundationFranchiseTax:  400,
    residentAgent:           450,
    nomineePerPerson:        200
  }
};
