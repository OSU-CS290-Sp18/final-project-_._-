var itemList = {};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36, lng: -115 },
        zoom: 4,
        styles: mapStyle
    });

    addRoutes(map);
}

function addRoutes(map) {
    var destList = document.getElementsByClassName('dest-list')[0];

    routes.forEach((airport) => {
        var location = getCoords(airport.iata);
        const markerOptions = {
            position: location,
            map: map,
            label: {
                fontSize: '9',
                fontWeight: 'bold',
                text: airport.iata
            }
        };
        const polylineOptions = {
            path: [
                { lat: 45.5122, lng: -122.6587 },
                location
            ],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        };
        const infoWindowOptions = {
            content: buildInfoWindowContent(airport)
        };

        var marker = new google.maps.Marker(markerOptions);
        var polyline = new google.maps.Polyline(polylineOptions);
        var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

        marker.addListener('click', function() {
            destList.value = airport.iata;
            for (var key in itemList) {
                var item = itemList[key];
                item.infoWindow.close();
            }
            infoWindow.open(map, marker);
        });

        itemList[airport.iata] = {
            marker: marker,
            polyline: polyline,
            infoWindow: infoWindow
        };
    });

    destList.addEventListener('change', () => {
        var value = destList.value;
    });
}

function getCoords(iata) {
    for (let i = 0; i < coords.length; i++) {
        const airport = coords[i];
        if (iata == airport.iata) {
            return airport.coords;
        }
    }
}

function buildInfoWindowContent(airport) {
    let content = "<p>Airlines: ";
    airport.airlines.forEach((airline) => {
        content += airline + " ";
    });
    content += "</p>\n";
    content += "<a href='#' onclick='addWatchItem(" + airport.iata + ")'>+ Watch</a>"
}

function addWatchItem(iata) {
    console.log('Watching ' + iata);
}

const mapStyle = [{
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [{
        "saturation": "-100"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": 65
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": "50"
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{
        "saturation": "-100"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [{
        "lightness": "30"
    }]
}, {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [{
        "lightness": "40"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "hue": "#ffff00"
    }, {
        "lightness": -25
    }, {
        "saturation": -97
    }]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
        "lightness": -25
    }, {
        "saturation": -100
    }]
}];
