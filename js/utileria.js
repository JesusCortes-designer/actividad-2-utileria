// Aquí están todas las funciones que uso en el registro y en el login


// ---------- Funciones que se pdidieron ----------


// Revisa que el correo esté bien escrito: algo@algo.com
// Si le falta el @, el punto o tiene espacios, regresa false
// validarCorreo("ana@gmail.com") da true
// validarCorreo("ana@gmail") da false
function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const expresion = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return expresion.test(correo.trim());
}


// Revisa que nada más haya letras
// Sí deja acentos, ñ y espacios para nombres como "María José"
// soloLetras("María José") da true
// soloLetras("Juan123") da false
function soloLetras(texto) {
  if (typeof texto !== "string") return false;
  const expresion = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)*$/;
  return expresion.test(texto.trim());
}


// Revisa que sean puros números y que no pasen del máximo que le digas
// La uso para que el teléfono tenga 10 dígitos
// validarLongitud("9511234567", 10) da true
// validarLongitud("95a1", 10) da false porque tiene una letra
function validarLongitud(numero, maxLongitud) {
  const texto = String(numero).trim();
  if (!/^\d+$/.test(texto)) return false;
  return texto.length <= maxLongitud;
}


// Esta es de ayuda, la usan calcularEdad y esMayorDeEdad
// Convierte "2004-12-31" en una fecha que JavaScript entiende
// Si la fecha no existe, como 31 de febrero, regresa null
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


// Saca la edad con la fecha de nacimiento
// Si todavía no le toca su cumpleaños este año, le resta uno
// Si la fecha está mal o es del futuro regresa -1
// calcularEdad("2000-01-01") da 26 (en 2026)
function calcularEdad(fechaNacimiento) {
  const nacimiento = convertirFechaInterna(fechaNacimiento);
  if (!nacimiento) return -1;

  const hoy = new Date();
  if (nacimiento > hoy) return -1;

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();

  // si no ha llegado su mes, o es su mes pero no su día, aún no cumple
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}


// Dice si ya tiene 18 o más
// Usa calcularEdad para no repetir código
// esMayorDeEdad("2000-01-01") da true
// esMayorDeEdad("2015-01-01") da false
function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}


// Revisa que la contraseña sea segura:
// mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
// validarPassword("Hola123!") da true
// validarPassword("hola123!") da false porque no tiene mayúscula
function validarPassword(password) {
  if (typeof password !== "string") return false;
  const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;
  return expresion.test(password);
}


// ---------- Mis funciones ----------


// Acomoda el nombre para que se vea bien
// Quita espacios de más y pone la primera letra de cada palabra en mayúscula
// La uso en el botón "Corregir"
// formatearNombre("jesus cortes") da "Jesus Cortes"
function formatearNombre(texto) {
  if (typeof texto !== "string") return "";
  return texto
    .trim()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}


// Tapa el correo con asteriscos para que no se vea completo
// Nada más deja ver la primera letra y lo que va después del @
// La uso para mostrar con qué correo te registraste o entraste
// ocultarCorreo("juanperez@gmail.com") da "j********@gmail.com"
function ocultarCorreo(correo) {
  if (!validarCorreo(correo)) return "";
  const partes = correo.trim().split("@");
  const usuario = partes[0];
  const dominio = partes[1];
  return usuario.charAt(0) + "*".repeat(usuario.length - 1) + "@" + dominio;
}