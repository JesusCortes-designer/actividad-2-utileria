// ELEMENTOS DEL FORMULARIO
const formulario = document.getElementById("formRegistro");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoTelefono = document.getElementById("telefono");
const campoFecha = document.getElementById("fecha");
const campoContrasenia = document.getElementById("contrasenia");
const botonCorregir = document.getElementById("botonCorregir");

// ELEMENTOS DE LA VENTANA MODAL
const modal = document.getElementById("modal");
const botonCerrarModal = document.getElementById("botonCerrarModal");
const tituloModal = document.getElementById("modalTitulo");
const edadModal = document.getElementById("modalEdad");
const estadoModal = document.getElementById("modalEstado");


// BOTÓN "CORREGIR": ACOMODA EL NOMBRE CON FORMATEARNOMBRE
// SI ESTÁ VACÍO O YA ESTÁ BIEN ESCRITO, NO HACE NADA
botonCorregir.addEventListener("click", () => {
  const nombreActual = campoNombre.value;
  if (nombreActual.trim() === "") return;

  const nombreCorregido = formatearNombre(nombreActual);
  if (nombreCorregido !== nombreActual) {
    campoNombre.value = nombreCorregido;
  }
});


// FECHA: SOLO NÚMEROS Y PONE LAS DIAGONALES SOLAS (DD/MM/AAAA)
campoFecha.addEventListener("input", () => {
  const numeros = campoFecha.value.replace(/\D/g, "").slice(0, 8);

  if (numeros.length > 4) {
    campoFecha.value = numeros.slice(0, 2) + "/" + numeros.slice(2, 4) + "/" + numeros.slice(4);
  } else if (numeros.length > 2) {
    campoFecha.value = numeros.slice(0, 2) + "/" + numeros.slice(2);
  } else {
    campoFecha.value = numeros;
  }
});


// TELÉFONO: SOLO DEJA ESCRIBIR NÚMEROS, MÁXIMO 10
campoTelefono.addEventListener("input", () => {
  campoTelefono.value = campoTelefono.value.replace(/\D/g, "").slice(0, 10);
});


// CAMBIA "DD/MM/AAAA" A "AAAA-MM-DD", QUE ES LO QUE USA UTILERIA.JS
function cambiarFormatoFecha(texto) {
  const partes = texto.split("/");
  if (partes.length !== 3 || partes[2].length !== 4) return "";
  return partes[2] + "-" + partes[1] + "-" + partes[0];
}


// REVISA LA FECHA Y REGRESA EL ERROR EXACTO, O "" SI ESTÁ BIEN
function revisarFecha(texto) {
  if (texto === "") return "- Escribe tu fecha de nacimiento.";

  const fecha = cambiarFormatoFecha(texto);
  if (fecha === "") return "- La fecha debe ser DD/MM/AAAA, por ejemplo 31/12/2004.";

  const mes = Number(fecha.split("-")[1]);
  if (mes < 1 || mes > 12) return "- El mes debe ser del 01 al 12 (el formato es DD/MM/AAAA).";

  const edad = calcularEdad(fecha);
  if (edad === -1) return "- Esa fecha no existe o es del futuro.";
  if (edad > 120) return "- Revisa el año de nacimiento.";

  return "";
}


// AL DARLE "CREAR CUENTA"
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const correo = campoCorreo.value.trim();
  const telefono = campoTelefono.value.trim();
  const fecha = cambiarFormatoFecha(campoFecha.value);
  const contrasenia = campoContrasenia.value;

  // SE JUNTAN TODOS LOS ERRORES PARA MOSTRARLOS EN UN SOLO ALERT
  const errores = [];

  if (!soloLetras(nombre)) {
    errores.push("- El nombre solo debe tener letras.");
  }

  if (!validarCorreo(correo)) {
    errores.push("- Escribe un correo válido, por ejemplo ana@gmail.com.");
  }

  if (!validarLongitud(telefono, 10) || telefono.length !== 10) {
    errores.push("- El teléfono debe tener 10 dígitos.");
  }

  const errorFecha = revisarFecha(campoFecha.value);
  if (errorFecha !== "") {
    errores.push(errorFecha);
  }

  if (!validarPassword(contrasenia)) {
    errores.push("- La contraseña necesita mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.");
  }

  if (errores.length > 0) {
    alert("Corrige lo siguiente:\n\n" + errores.join("\n"));
    return;
  }

  // MUESTRA LA EDAD CALCULADA EN LA MODAL
  edadModal.textContent = calcularEdad(fecha);

  // SOLO SE REGISTRA SI ES MAYOR DE EDAD
  if (esMayorDeEdad(fecha)) {
    tituloModal.textContent = "Cuenta creada, " + formatearNombre(nombre);
    estadoModal.textContent = "Te registraste con " + ocultarCorreo(correo) + ".";
    estadoModal.className = "estado si";
    formulario.reset();
  } else {
    tituloModal.textContent = "No puedes registrarte";
    estadoModal.textContent = "Eres menor de edad. Necesitas tener 18 años o más.";
    estadoModal.className = "estado no";
  }

  modal.showModal();
});


// CERRAR LA VENTANA MODAL
botonCerrarModal.addEventListener("click", () => {
  modal.close();
});