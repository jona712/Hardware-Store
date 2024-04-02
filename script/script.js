function filtrar() {
  var texto = document.getElementById("filtro").value.toLowerCase();
  var lista = document.getElementById("listaElementos");
  var elementos = lista.getElementsByTagName("li");

  lista.style.display = texto === "" ? "none" : "block";

  for (var i = 0; i < elementos.length; i++) {
    var elemento = elementos[i];
    var contenido = elemento
      .getElementsByTagName("a")[0]
      .innerHTML.toLowerCase();

    if (texto.length === 1 && contenido.startsWith(texto)) {
      elemento.style.display = "block";
    } else if (contenido.indexOf(texto) !== -1) {
      elemento.style.display = "block";
    } else {
      elemento.style.display = "none";
    }
  }
}

function LimpiarFiltro() {
  document.getElementById("filtro").value = "";
  document.getElementById("listaElementos").style.display = "none";
}

//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //Agregamos funcionalidad al boton Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener("click", agregarAlCarritoClicked);
  }

  //Agregamos funcionalidad al botón comprar
  document
    .getElementsByClassName("btn-pagar")[0]
    .addEventListener("click", pagarClicked);
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
  alert("Gracias por la compra");
  //Elimino todos los elmentos del carrito
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();
}

//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  //Aqui se obtiene el elemento HTML que desencadenó el evento (es decir, el botón "Agregar al carrito")
  var button = event.target;
  //Se obtiene el elemento principal que contiene al botón (container)
  var item = button.parentElement;
  //Obtiene el nombre, precio e imagen del producto
  var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
  var precio = item.getElementsByClassName("precio-item")[0].innerText;
  var imagenSrc = item.getElementsByClassName("img-item")[0].src;

  agregarItemAlCarrito(titulo, precio, imagenSrc);

  /*hacerVisibleCarrito();*/
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  var carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "3%";
  carrito.style.top = "23%";
  carrito.style.opacity = "1";
  carrito.style.zIndex = "10";
  carrito.style.width = "35%";

  if (carrito.style.display === "none") {
    carrito.style.display = "block"; // Mostrar el div
  } else {
    carrito.style.display = "none"; // Ocultar el div
  }
  /*
    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
    */
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  var item = document.createElement("div");
  item.classList.add = "item";
  var itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  //controlamos que el item que intenta ingresar no se encuentre en el carrito
  var nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (var i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      mostrarMensajeYaEstaCarrito();
      return;
    }
  }

  var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
  item.innerHTML = itemCarritoContenido;

  itemsCarrito.append(item);

  //Agregamos la funcionalidad eliminar al nuevo item
  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrito);

  //Agregmos al funcionalidad restar cantidad del nuevo item
  var botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
  botonRestarCantidad.addEventListener("click", restarCantidad);

  //Agregamos la funcionalidad sumar cantidad del nuevo item
  var botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  //Actualizamos total
  actualizarTotalCarrito();
  mostrarMensajeAgregarCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //la siguiente funciòn controla si hay elementos en el carrito
  //Si no hay elimino el carrito
  ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.display = "none";
    carritoVisible = false;
  }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  var carritoContenedor = document.getElementsByClassName("carrito")[0];
  var carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  var total = 0;
  //recorremos cada elemento del carrito para actualizar el total
  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];
    var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    //quitamos el simobolo peso y el punto de milesimos.
    var precio = parseFloat(
      precioElemento.innerText.replace("¢", "").replace(",", "")
    );
    var cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    console.log(precio);
    var cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "¢" + total.toLocaleString("es") + ",00";
}

function mostrarMensajeAgregarCarrito() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"
  // Usamos la función dialog() de jQuery UI para mostrar el mensaje
  $("<div>" + "¡Se agregó el producto al carrito con éxito!" + "</div>").dialog(
    {
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
    }
  );
}

function mostrarMensajeYaEstaCarrito() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"
  // Usamos la función dialog() de jQuery UI para mostrar el mensaje
  $("<div>" + "El producto ya se encuentra en el carrito" + "</div>").dialog({
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
