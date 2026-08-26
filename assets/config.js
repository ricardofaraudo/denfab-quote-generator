/* ============================================================================
   DENFAB Quote Generator — configuracion de conexion
   ----------------------------------------------------------------------------
   La llave `anonKey` esta disenada para vivir en el navegador: por si sola no
   da acceso a nada. Todo el control esta en las politicas de seguridad (RLS)
   definidas en supabase/schema.sql, que exigen sesion iniciada para leer o
   escribir cualquier dato.

   NUNCA poner aqui la llave `service_role`: esa ignora todas las reglas de
   seguridad y da acceso total a la base de datos.
   ========================================================================== */

var SUPABASE_CONFIG = {
  url: 'https://rdexhacdabiasktaizky.supabase.co',

  // Supabase -> Settings -> API Keys -> "Publishable key"
  anonKey: 'sb_publishable_60DvWBbC9KrMGVyj0Cx3YA_0rMgjeWP'
};

/* ----------------------------------------------------------------------------
   Envio por Gmail. El Client ID de Google es publico por diseno (va en el
   navegador); lo que protege la cuenta es la lista de origenes autorizados
   configurada en Google Cloud, no el secreto de este valor.

   La herramienta pide unicamente el permiso de ENVIAR correo. Nunca puede
   leer la bandeja de entrada de nadie.
   -------------------------------------------------------------------------- */
var GOOGLE_CLIENT_ID = '410177900382-ne3e22lljjjvumm8ksgube44qloqrikf.apps.googleusercontent.com';

