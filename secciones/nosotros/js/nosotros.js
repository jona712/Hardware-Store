// Inicializa el mapa cuando se cargue la página
window.onload = initMap;

const sucursalLat = 10.215312; // Coordenada latitud de la sucursal
const sucursalLng = -83.787562; // Coordenada longitud de la sucursal

function initMap() {
  // Crea un nuevo mapa de Google Maps centrado en la ubicación de la sucursal
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: sucursalLat, lng: sucursalLng },
    zoom: 10,
  });

  map.setMapTypeId('terrain');

  // Crea un marcador en la ubicación de la sucursal en el mapa
  const sucursalMarker = new google.maps.Marker({
    position: { lat: sucursalLat, lng: sucursalLng },
    map: map,
    title: "Ferreteria AJ",
  });

  if (navigator.geolocation) {
    // Obtiene la ubicación actual del cliente si la geolocalización es compatible
    navigator.geolocation.getCurrentPosition(function (position) {
      const clienteLat = position.coords.latitude;
      const clienteLng = position.coords.longitude;

      // Crea un marcador en la ubicación del cliente en el mapa
      const clienteMarker = new google.maps.Marker({
        position: { lat: clienteLat, lng: clienteLng },
        map: map,
        title: "Tu ubicación",
      });

      // Crea objetos para solicitar y renderizar direcciones en el mapa
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      // Define la solicitud de dirección desde la ubicación del cliente hasta la sucursal
      const request = {
        origin: { lat: clienteLat, lng: clienteLng },
        destination: { lat: sucursalLat, lng: sucursalLng },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Realiza la solicitud de ruta y muestra la ruta en el mapa si es exitosa
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(map);
        }
      });
    });
  } else {
    // Muestra una alerta si la geolocalización no es compatible con el navegador
    alert("Geolocation is not supported by this browser.");
  }
}
