window.addEventListener("load", function () {
  cargarDatosRegistro();
});

//************************************************************************************************************************************************/

// URL del JSON de ubicaciones
const jsonURL =
  "https://gist.githubusercontent.com/Anthony0912/903cf82739e8662f3e757753921bbcf3/raw/eb8298c4c77032c74c4686678c2beea191b1d30a/locations.json";

// Función para obtener la información del JSON
async function obtenerInformacion() {
  try {
    // Realizar una solicitud GET para obtener el JSON
    const response = await fetch(jsonURL);
    // Convertir la respuesta a formato JSON
    const jsonData = await response.json();
    // Devolver las provincias del JSON
    return jsonData.provincias;
  } catch (error) {
    console.error("Error al obtener la información:", error);
    return [];
  }
}

// Función para cargar las provincias en el primer select
async function cargarProvincias() {
  const provincias = await obtenerInformacion();
  const cboProvincia = document.querySelector(".cboProvincia");

  // Agregar opciones de provincias al primer select
  provincias.forEach((provincia) => {
    const option = document.createElement("option");
    option.value = provincia.numero;
    option.textContent = provincia.nombre;
    cboProvincia.appendChild(option);
  });

  // Escuchar el evento de cambio en el primer select para cargar los cantones
  cboProvincia.addEventListener("change", cargarCantones);
}

// Función para cargar los cantones en el segundo select
async function cargarCantones(event) {
  const selectedProvincia = event.target.value;
  const provincias = await obtenerInformacion();
  const provincia = provincias.find((p) => p.numero == selectedProvincia);

  const cboCanton = document.querySelector(".cboCanton");
  cboCanton.innerHTML =
    '<option value="" disabled selected hidden>Select Cantón</option>';

  // Agregar opciones de cantones al segundo select
  provincia.cantones.forEach((canton) => {
    const option = document.createElement("option");
    option.value = canton.numero;
    option.textContent = canton.nombre;
    cboCanton.appendChild(option);
  });

  // Escuchar el evento de cambio en el segundo select para cargar los distritos
  cboCanton.addEventListener("change", cargarDistritos);
}

// Función para cargar los distritos en el tercer select
async function cargarDistritos(event) {
  const selectedCanton = event.target.value;
  const selectedProvincia = document.querySelector(".cboProvincia").value;
  const provincias = await obtenerInformacion();
  const provincia = provincias.find((p) => p.numero == selectedProvincia);
  const canton = provincia.cantones.find((c) => c.numero == selectedCanton);

  const cboDistrito = document.querySelector(".cboDistrito");
  cboDistrito.innerHTML =
    '<option value="" disabled selected hidden>Select Distrito</option>';

  // Agregar opciones de distritos al tercer select
  canton.distritos.forEach((distrito) => {
    const option = document.createElement("option");
    option.value = distrito.numero;
    option.textContent = distrito.nombre;
    cboDistrito.appendChild(option);
  });
}

// Cargar las provincias al cargar la página
cargarProvincias();

//Se guarda el registro en local

function guardarDatosRegistro() {
  //datos a guardar
  var nombre = document.getElementsByName("nombreRegistro")[0];
  var apellidos = document.getElementsByName("apellidosRegistro")[0];

  //fecha de nacimiento
  var fechaNacimiento = document.getElementsByName("dtpFechaNacimiento")[0];
  var anoNaciento = new Date(fechaNacimiento.value);
  var mesNacimiento = anoNaciento.getMonth();
  var díaNacimiento = anoNaciento.getDate();

  //Fecha actual
  var fechaActual = new Date();
  var mesActual = fechaActual.getMonth();
  var díaActual = fechaActual.getDate();

  //varible para guarda la edad
  var edad = "";

  var correo = document.getElementsByName("correoRegistro")[0];

  var cboProvincia = document.querySelector(".cboProvincia");
  var provincia = cboProvincia.selectedIndex;

  var cboCanton = document.querySelector(".cboCanton");
  var canton = cboCanton.selectedIndex;

  var cboDistrito = document.querySelector(".cboDistrito");
  var distrito = cboDistrito.selectedIndex;

  //radios generos
  var masculino = document.getElementById("rdbMasculino");
  var femenino = document.getElementById("rdbFemenino");

  var genero = "";

  //Estudios academicos
  var chkColegio = document.getElementsByName("chkColegio")[0];
  var chkUniversidad = document.getElementsByName("chkUniversidad")[0];

  var colegio = false;
  var universidad = false;

  var contrasena = document.getElementsByName("contrasena")[0];
  var confirmarContrasena = document.getElementsByName(
    "confirmarContrasena"
  )[0];

  if (nombre.value === "") {
    alert("Debe ingresar el nombre");
    nombre.focus();
    return;
  }

  if (apellidos.value === "") {
    alert("Debe ingresar los apellidos");
    apellidos.focus();
    return;
  }

  if (fechaNacimiento.value === "") {
    alert("Debe ingresar la fecha de nacimiento");
    fechaNacimiento.focus();
    return;
  }

  if (correo.value === "") {
    alert("Debe ingresar el correo");
    correo.focus();
    return;
  }

  if (validarCorreoFormato(correo) === false) {
    alert("Ingrese un correo válido como example@example.com.");
    correo.focus();
    return;
  }

  if (cboProvincia.selectedIndex === 0) {
    alert("Debe seleccionar la provincia");
    cboProvincia.focus();
    return;
  }

  if (cboCanton.selectedIndex === 0) {
    alert("Debe seleccionar el cantón");
    cboCanton.focus();
    return;
  }

  if (cboDistrito.selectedIndex === 0) {
    alert("Debe seleccionar el distrito");
    cboDistrito.focus();
    return;
  }

  //validadmos el genero
  if (masculino.checked) {
    genero = "Masculino";
  } else if (femenino.checked) {
    genero = "Femenino";
  } else {
    alert("Debe seleccionar un genero");
    return;
  }

  if (contrasena.value === "") {
    alert("Debe ingresar una contraseña");
    contrasena.focus();
    return;
  }

  if (confirmarContrasena.value === "") {
    alert("Debe confirmar la contraseña");
    confirmarContrasena.focus();
    return;
  }

  //validamos las contrasenas
  if (contrasena.value !== confirmarContrasena.value) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  //validadmos si selecciono algun estudio
  if (chkColegio.checked) {
    colegio = true;
  }

  if (chkUniversidad.checked) {
    universidad = true;
  }

  //Calculo de la edad
  edad = fechaActual.getFullYear() - anoNaciento.getFullYear();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && díaActual < díaNacimiento)
  ) {
    edad--; // Restar un año si el cumpleaños aún no ha ocurrido este año
  }

  if (edad < 18) {
    alert("Necesita ser mayor de edad para poder registrarse.");
    return;
  }

  // Crear un objeto para almacenar los datos
  const usuario = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    edad: fechaNacimiento.value,
    correo: correo.value,
    provincia: provincia,
    canton: canton,
    distrito: distrito,
    genero: genero,
    colegio: colegio,
    universidad: universidad,
    contrasena: contrasena.value,
  };

  // Convertir el objeto a una cadena JSON
  const usuarioJSONRegistro = JSON.stringify(usuario);

  // Guardar la cadena JSON en el localStorage
  localStorage.setItem("usuarioRegistro", usuarioJSONRegistro);

  nombre = "";
  apellidos = "";
  fechaNacimiento = "";
  correo = "";
  masculino.checked = false;
  femenino.checked = false;
  chkColegio.checked = false;
  chkUniversidad.checked = false;
  contrasena = "";
  confirmarContrasena = "";

  mostrarMensaje();
}

function cargarDatosRegistro() {
  const usuarioJSON = localStorage.getItem("usuarioRegistro");

  if (usuarioJSON) {
    // Convertir la cadena JSON a un objeto JavaScript
    const usuario = JSON.parse(usuarioJSON);

    // Utilizar los datos recuperados del localStorage
    if (usuario.nombre) {
      document.getElementsByName("nombreRegistro")[0].value = usuario.nombre;
    }
    if (usuario.apellidos) {
      document.getElementsByName("apellidosRegistro")[0].value =
        usuario.apellidos;
    }
    if (usuario.edad) {
      document.getElementsByName("dtpFechaNacimiento")[0].value = usuario.edad;
    }
    if (usuario.correo) {
      document.getElementsByName("correoRegistro")[0].value = usuario.correo;
    }

    var selectElement = document.getElementById("cboProvincia");
    var selectCanton = document.querySelector(".cboCanton");

    for (var i = 0; i < selectElement.options.length; i++) {
      if (parseInt(selectElement.options[i].value) === usuario.provincia) {
        selectElement.options[i].selected = true;

        // Disparar el evento 'change' manualmente
        var event = new Event("change");
        selectElement.dispatchEvent(event);

        break;
      }
    }

    // Selecciona el elemento por su clase
    for (var i = 0; i < selectCanton.options.length; i++) {
      if (parseInt(selectCanton.options[i].value) === usuario.canton) {
        selectCanton.options[i].selected = true;

        // Disparar el evento 'change' manualmente
        var event = new Event("change");
        selectCanton.dispatchEvent(event);

        break;
      }
    }

    if (usuario.genero === "Masculino") {
      document.getElementById("rdbMasculino").checked = true;
    } else {
      document.getElementById("rdbFemenino").checked = true;
    }

    if (usuario.colegio === true) {
      document.getElementsByName("chkColegio")[0].checked = true;
    }

    if (usuario.universidad === true) {
      document.getElementsByName("chkUniversidad")[0].checked = true;
    }

    if (usuario.contrasena) {
      document.getElementsByName("contrasena")[0].value = usuario.contrasena;
    }
  }
}

function validarCorreoFormato(correo) {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(correo.value);
}

//************************************************************************************************************************************************/
//Mensaje de formulario de registrarse
function mostrarMensaje() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"
  $("#formSignUp").modal("hide");
  // Usamos la función dialog() de jQuery UI para mostrar el mensaje

  $("<div>" + "¡Se registró con éxito!" + "</div>").dialog({
    resizable: false,
    height: "auto",
    width: isMobile ? "100%" : 400,
    modal: true,
    buttons: {
      Aceptar: function () {
        $(this).dialog("close");
      },
    },
    close: function () {
      $(this).remove(); // Eliminamos el diálogo después de cerrarlo
    },
  });
}

//************************************************************************************************************************************************/
//Mostrar Horarios
// Función para mostrar el mensaje
function mostrarHorarios() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"
  // Usamos la función dialog() de jQuery UI para mostrar el mensaje
  $(`<div class="container-table">
  <h2>Horarios de atención</h2>
  <table>
      <tbody>
          <tr>
              <th>Lunes:</th>
              <td>7:00 - 18:00</td>
          </tr>
          <tr>
              <th>Martes:</th>
              <td>7:00 - 18:00</td>
          </tr>
          <tr>
              <th>Miercoles:</th>
              <td>7:00 - 18:00</td>
          </tr>
          <tr>
              <th>Jueves:</th>
              <td>7:00 - 18:00</td>
          </tr>
          <tr>
              <th>Viernes:</th>
              <td>7:00 - 18:00</td>
          </tr>
          <tr>
              <th>Sábado:</th>
              <td>7:00 - 16:00</td>
          </tr>
          <tr>
              <th>Domingo:</th>
              <td>Cerrado</td>
          </tr>
      </tbody>
  </table>            
</div>`).dialog({
    resizable: false,
    height: "auto",
    width: isMobile ? "100%" : 400,
    modal: true,
    buttons: {
      Aceptar: function () {
        $(this).dialog("close");
      },
    },
    close: function () {
      $(this).remove(); // Eliminamos el diálogo después de cerrarlo
    },
  });
}

function mostrarPedidos() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"

  var contenidoDialogo =
    "<div style='padding: 5px; text-align: center;'>" +
    "<p>Realiza tus pedidos por llamada telefónica</p>" +
    "<p style='font-weight: bold;'>27678879 / 27675898</p>" +
    "</div>";

  var dialogOptions = {
    resizable: false,
    height: "auto",
    width: isMobile ? "100%" : 400,
    modal: true,
    buttons: {
      Aceptar: function () {
        $(this).dialog("close");
      },
    },
    close: function () {
      $(this).dialog("destroy").remove(); // Eliminamos el diálogo después de cerrarlo
    },
  };

  $("<div>").html(contenidoDialogo).dialog(dialogOptions);
}

// script.js
function mostrarAlerta() {
  alert("Se envió el mensaje con éxito. Pronto nos pondremos en contacto.");
}

const buttons = document.querySelectorAll(
  'input[type="submit"][value="Enviar Mensaje"]'
);
buttons.forEach((button) => {
  button.addEventListener("click", mostrarAlerta);
});
