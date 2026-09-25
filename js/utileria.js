// LIBRERÍA DE VALIDACIONES PARA EL REGISTRO (index.html) Y EL LOGIN (login.html)


// ===================== FUNCIONES OBLIGATORIAS =====================


// VALIDA QUE EL CORREO TENGA USUARIO, @, DOMINIO Y EXTENSIÓN DE MÍNIMO 2 LETRAS, SIN ESPACIOS
// RECIBE: CORREO (TEXTO) | REGRESA: TRUE O FALSE
// EJEMPLO: validarCorreo("ana@gmail.com") -> TRUE | validarCorreo("ana@gmail") -> FALSE
function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const expresion = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return expresion.test(correo.trim());
}


// VALIDA QUE SOLO HAYA LETRAS. ACEPTA ACENTOS, Ñ, Ü Y UN ESPACIO ENTRE PALABRAS
// RECIBE: TEXTO | REGRESA: TRUE O FALSE
// EJEMPLO: soloLetras("María José") -> TRUE | soloLetras("Juan123") -> FALSE
function soloLetras(texto) {
  if (typeof texto !== "string") return false;
  const expresion = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)*$/;
  return expresion.test(texto.trim());
}


// VALIDA QUE SEAN SOLO DÍGITOS Y QUE NO PASEN DEL MÁXIMO INDICADO
// RECIBE: NUMERO (TEXTO O NÚMERO), MAXLONGITUD (NÚMERO) | REGRESA: TRUE O FALSE
// EJEMPLO: validarLongitud("9511234567", 10) -> TRUE | validarLongitud("95a1", 10) -> FALSE
function validarLongitud(numero, maxLongitud) {
  const texto = String(numero).trim();
  if (!/^\d+$/.test(texto)) return false;
  return texto.length <= maxLongitud;
}


// APOYO INTERNO: CONVIERTE "AAAA-MM-DD" A FECHA EN HORA LOCAL
// REGRESA NULL SI LA FECHA NO EXISTE (EJ. 31 DE FEBRERO)
function convertirFechaInterna(fecha) {
  if (typeof fecha !== "string") return null;
  const partes = fecha.split("-").map(Number);
  if (partes.length !== 3 || partes.some(isNaN)) return null;
  const anio = partes[0];
  const mes = partes[1];
  const dia = partes[2];
  const resultado = new Date(anio, mes - 1, dia);
  if (resultado.getMonth() !== mes - 1) return null;
  return resultado;
}


// CALCULA LOS AÑOS CUMPLIDOS. RESTA UNO SI AÚN NO LLEGA SU CUMPLEAÑOS ESTE AÑO
// RECIBE: FECHANACIMIENTO ("AAAA-MM-DD") | REGRESA: EDAD (ENTERO) O -1 SI LA FECHA ES INVÁLIDA O FUTURA
// EJEMPLO: calcularEdad("2000-01-01") -> 26 (EN 2026)
function calcularEdad(fechaNacimiento) {
  const nacimiento = convertirFechaInterna(fechaNacimiento);
  if (!nacimiento) return -1;

  const hoy = new Date();
  if (nacimiento > hoy) return -1;

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();

  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}


// REVISA SI TIENE 18 AÑOS O MÁS USANDO CALCULAREDAD
// RECIBE: FECHANACIMIENTO ("AAAA-MM-DD") | REGRESA: TRUE O FALSE
// EJEMPLO: esMayorDeEdad("2000-01-01") -> TRUE | esMayorDeEdad("2015-01-01") -> FALSE
function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}


// EXIGE MÍNIMO 8 CARACTERES, UNA MAYÚSCULA, UNA MINÚSCULA, UN NÚMERO Y UN CARÁCTER ESPECIAL
// RECIBE: PASSWORD (TEXTO) | REGRESA: TRUE O FALSE
// EJEMPLO: validarPassword("Hola123!") -> TRUE | validarPassword("hola123!") -> FALSE (SIN MAYÚSCULA)
function validarPassword(password) {
  if (typeof password !== "string") return false;
  const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;
  return expresion.test(password);
}


// ===================== SECCIÓN LIBRE =====================


// ACOMODA EL NOMBRE: QUITA ESPACIOS DE MÁS Y PONE MAYÚSCULA INICIAL EN CADA PALABRA
// RESUELVE: NOMBRES ESCRITOS DESORDENADOS COMO "  jUAN   pérez"
// RECIBE: TEXTO | REGRESA: NOMBRE ACOMODADO
// EJEMPLO: formatearNombre("  jUAN   pérez ") -> "Juan Pérez"
function formatearNombre(texto) {
  if (typeof texto !== "string") return "";
  return texto
    .trim()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}


// TAPA EL CORREO CON ASTERISCOS Y DEJA VISIBLE SOLO LA PRIMERA LETRA Y EL DOMINIO
// RESUELVE: MOSTRAR CON QUÉ CORREO SE REGISTRÓ O ENTRÓ SIN EXPONERLO COMPLETO
// RECIBE: CORREO (TEXTO) | REGRESA: CORREO OCULTO, O "" SI NO ES VÁLIDO
// EJEMPLO: ocultarCorreo("juanperez@gmail.com") -> "j********@gmail.com"
function ocultarCorreo(correo) {
  if (!validarCorreo(correo)) return "";
  const partes = correo.trim().split("@");
  const usuario = partes[0];
  const dominio = partes[1];
  return usuario.charAt(0) + "*".repeat(usuario.length - 1) + "@" + dominio;
}