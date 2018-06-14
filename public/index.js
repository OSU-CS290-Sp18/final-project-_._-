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
    var itemList = {};

    routes.forEach((airport) => {
        const location = getCoords(airport.iata);
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

        itemList[airport.iata] = {
            marker: new google.maps.Marker(markerOptions),
            polyline: new google.maps.Polyline(polylineOptions),
            infoWindow: new google.maps.InfoWindow(infoWindowOptions)
        };

        itemList[airport.iata].marker.addListener('click', function() {
            destList.value = airport.iata;
            markerClick(map, itemList, airport.iata);
        });
    });

    addEventListeners(map, itemList)
}

function addEventListeners(map, items) {
    const destList = document.getElementsByClassName('dest-list')[0];

    map.addListener('click', () => {
        resetRoutes(items);
    });

    destList.addEventListener('change', ()=> {
        markerClick(map, items, destList.value);
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

function markerClick(map, items, iata) {
    const marker = items[iata].marker;
    const polyline = items[iata].polyline;
    const infoWindow = items[iata].infoWindow;

    resetRoutes(items);

    polyline.setOptions({strokeColor: '#FFFF00'});
    infoWindow.open(map, marker);
}

function resetRoutes(items) {
    for (var key in items) {
        var item = items[key];
        item.polyline.setOptions({strokeColor: '#FF0000'});
        item.infoWindow.close();
    }
}

function buildInfoWindowContent(airport) {
    let content = '<p>Airlines: ';
    airport.airlines.forEach((airline) => {
        content += airline + ' ';
    });
    content += '</p>\n';
    content += '<a href="#" onclick="addWatchItem(\'' + airport.iata + '\')">+ Watch</a>';
    return content;
}

function addWatchItem(iata) {
    const request = new XMLHttpRequest();
    const url = '/add/' + iata;
    request.open("POST", url);

    var requestBody = JSON.stringify({
        iata: iata,
        coords: getCoords(iata)
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
}

const mapStyle = [{
    'featureType': 'administrative',
    'elementType': 'all',
    'stylers': [{
        'saturation': '-100'
    }]
}, {
    'featureType': 'administrative.province',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'off'
    }]
}, {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [{
        'saturation': -100
    }, {
        'lightness': 65
    }, {
        'visibility': 'on'
    }]
}, {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [{
        'saturation': -100
    }, {
        'lightness': '50'
    }, {
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [{
        'saturation': '-100'
    }]
}, {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [{
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'road.arterial',
    'elementType': 'all',
    'stylers': [{
        'lightness': '30'
    }]
}, {
    'featureType': 'road.local',
    'elementType': 'all',
    'stylers': [{
        'lightness': '40'
    }]
}, {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [{
        'saturation': -100
    }, {
        'visibility': 'simplified'
    }]
}, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{
        'hue': '#ffff00'
    }, {
        'lightness': -25
    }, {
        'saturation': -97
    }]
}, {
    'featureType': 'water',
    'elementType': 'labels',
    'stylers': [{
        'lightness': -25
    }, {
        'saturation': -100
    }]
}];
