// ELEMENTOS DEL LOGIN
const formularioLogin = document.getElementById("formLogin");
const campoCorreo = document.getElementById("correo");
const campoContrasenia = document.getElementById("contrasenia");


// AL DARLE "INICIAR SESIÓN"
formularioLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const correo = campoCorreo.value.trim();
  const contrasenia = campoContrasenia.value;

  // SE VALIDA CON LAS FUNCIONES DE UTILERIA.JS
  const errores = [];

  if (!validarCorreo(correo)) {
    errores.push("- Escribe un correo válido, por ejemplo ana@gmail.com.");
  }

  if (!validarPassword(contrasenia)) {
    errores.push("- La contraseña necesita mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.");
  }

  if (errores.length > 0) {
    alert("Corrige lo siguiente:\n\n" + errores.join("\n"));
    return;
  }

  alert("Datos válidos. Iniciaste sesión con " + ocultarCorreo(correo) + ".");
  formularioLogin.reset();
});