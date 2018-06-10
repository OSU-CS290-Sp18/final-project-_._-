var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  var uluru = {lat: -25.344, lng: 131.036};
  var marker = new google.maps.Marker({position: uluru, map: map});
}
