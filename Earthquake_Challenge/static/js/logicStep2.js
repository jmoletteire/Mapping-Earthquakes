// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Streets': streets,
    'Satellite': satellite
};

// Create the map object with center at the San Francisco airport
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets] // default layer
});

// Pass our map layers into layers control and add them to the map
L.control.layers(baseMaps).addTo(map);

let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Style the map
function styleInfo(feature) {
    return {
    color: '#000000',
    fillColor: '#ffae42',
    weight: 0.5,
    opacity: 1,
    fillOpacity: 1,
    radius: getRadius(feature.properties.mag),
    stroke: true
    };
};

// Get radius of marker using earthquake magnitude
function getRadius(magnitude) {
    // Earthquakes with magnitude 0 will be plotted with radius 1
    if (magnitude === 0) {
        return 1;
    }
    return magnitude*4;
};

// Grabbing our GeoJSON data
d3.json(earthquakes).then(function(data) {
    // Creating a GeoJSON layer with the data
    L.geoJSON(data, {
        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo
    }).addTo(map);
});

