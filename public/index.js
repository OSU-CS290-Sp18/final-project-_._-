function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 28.778259,
            lng: -119.417931
        },
        zoom: 4.5
    });

    var destList = document.getElementsByClassName('dest-list')[0];

    var coords = [{
        iata: "PDX",
        coords: {
            lat: 45.5122,
            lng: -122.6587
        }
    }, {
        iata: "LAX",
        coords: {
            lat: 33.9416,
            lng: -118.4085
        }
    }, {
        iata: "HNL",
        coords: {
            lat: 21.3245,
            lng: -157.9251
        }
    }, {
        iata: "EWR",
        coords: {
            lat: 40.6895,
            lng: -74.1745
        }
    }, {
        iata: "ORD",
        coords: {
            lat: 41.9742,
            lng: -87.9073
        }
    }, {
        iata: "SEA",
        coords: {
            lat: 47.4502,
            lng: -122.3088
        }
    }, {
        iata: "JFK",
        coords: {
            lat: 40.6413,
            lng: -73.7781
        }
    }, {
        iata: "LAS",
        coords: {
            lat: 36.0840,
            lng: -115.1537
        }
    }, {
        iata: "SFO",
        coords: {
            lat: 37.6213,
            lng: -122.3790
        }
    }, {
        iata: "DEN",
        coords: {
            lat: 39.8561,
            lng: -104.6737
        }
    }, {
        iata: "SAN",
        coords: {
            lat: 32.7338,
            lng: -117.1933
        }
    }];

    coords.forEach((airport) => {
        var markerOptions = {
            position: airport.coords,
            map: map
        };
        var polylineOptions = {
            path: [{
                lat: 45.5122,
                lng: -122.6587
            }, airport.coords],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        };

        var marker = new google.maps.Marker(markerOptions);
        var polyline = new google.maps.Polyline(polylineOptions);

        marker.addListener('click', function() {
            destList.value = airport.iata;
        });
    });

    destList.addEventListener('change', () => {
        var value = destList.value;
    });
}
