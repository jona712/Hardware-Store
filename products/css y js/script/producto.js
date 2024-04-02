function confirmarCompra() {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"

  // Mostramos el cuadro de diálogo con el mensaje de confirmación personalizado
  var mensajeConfirmacion = "¿Deseas confirmar la compra de este producto?";

  // Usamos la función dialog() de jQuery UI
  $("#dialog-confirm")
    .html(mensajeConfirmacion)
    .dialog({
      resizable: false,
      height: "auto",
      width: isMobile ? "100%" : 400,
      modal: true,
      buttons: {
        Aceptar: function () {
          // Si el usuario hizo clic en "Aceptar", mostramos el mensaje de compra realizada
          var mensajeExito =
            "¡Compra realizada con éxito! Gracias por tu compra.";
          mostrarMensaje(mensajeExito);
          $(this).dialog("close");
        },
        Cancelar: function () {
          // Si el usuario hizo clic en "Cancelar", mostramos el mensaje de compra cancelada
          var mensajeCancelado =
            "Compra cancelada. Si cambias de opinión, ¡Vuelve pronto!";
          mostrarMensaje(mensajeCancelado);
          $(this).dialog("close");
        },
      },
    });
}

// Función para mostrar el mensaje
function mostrarMensaje(mensaje) {
  var isMobile = window.innerWidth <= 500; // Cambiar el valor según el punto de corte para considerar como "móvil"
  // Usamos la función dialog() de jQuery UI para mostrar el mensaje
  $("<div>" + mensaje + "</div>").dialog({
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
