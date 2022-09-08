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
    'Satellite Streets': satellite
  };

// Create the map object with center at the San Francisco airport
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [satellite] // default layer
});

// Pass our map layers into layers control and add them to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/jmoletteire/Mapping-Earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data
d3.json(torontoHoods).then(function(data) {
    // Creating a GeoJSON layer with the data
    L.geoJSON(data).addTo(map);
});

