var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.778259, lng: -119.417931},
    zoom: 4.5
  });
  var lax = {lat: 33.9416, lng: -118.4085};
  var laxMarker = new google.maps.Marker({position: lax, map: map});

  var hnl = {lat: 21.3245, lng: -157.9251};
  var hnlMarker = new google.maps.Marker({position: hnl, map: map});

  var ewr = {lat: 40.6895, lng: -74.1745};
  var ewrMarker = new google.maps.Marker({position: ewr, map: map});

  var ord = {lat: 41.9742, lng: -87.9073};
  var ordMarker = new google.maps.Marker({position: ord, map: map});

  var sea = {lat: 47.4502, lng: -122.3088};
  var seaMarker = new google.maps.Marker({position: sea, map: map});

  var jfk = {lat: 40.6413, lng: -73.7781};
  var jfkMarker = new google.maps.Marker({position: jfk, map: map});

  var las = {lat: 36.0840, lng: -115.1537};
  var lasMarker = new google.maps.Marker({position: las, map: map});

  var sfo = {lat: 37.6213, lng: -122.3790};
  var sfoMarker = new google.maps.Marker({position: sfo, map: map});

  var den = {lat: 39.8561, lng: -104.6737};
  var denMarker = new google.maps.Marker({position: den, map: map});

  var san = {lat: 32.7338, lng: -117.1933};
  var sanMarker = new google.maps.Marker({position: san, map: map});

  var pdx = {lat: 45.5122, lng: -122.6587};
  var pdxMarker = new google.maps.Marker({position: pdx, map: map});
}
