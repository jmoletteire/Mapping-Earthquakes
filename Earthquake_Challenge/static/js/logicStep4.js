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

let earthquakes = new L.LayerGroup();

let overlays = {
  Earthquakes: earthquakes
};

// Create the map object with center at the San Francisco airport
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 3,
    layers: [streets] // default layer
});

// Pass our map layers into layers control and add them to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Style the map
function styleInfo(feature) {
    return {
    color: '#000000',
    fillColor: getColor(feature.properties.mag),
    weight: 0.5,
    opacity: 1,
    fillOpacity: 1,
    radius: getRadius(feature.properties.mag),
    stroke: true
    };
};

// Determine color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// Determine radius of the circle based on the magnitude of the earthquake.
function getRadius(magnitude) {
    // Earthquakes with magnitude 0 will be plotted with radius 1
    if (magnitude === 0) {
        return 1;
    }
    return magnitude*4;
};

// Grabbing our GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Creating a GeoJSON layer with the data
    L.geoJSON(data, {
        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        },
        style: styleInfo
    }).addTo(earthquakes);

    // Add earthquake layer to our map
    earthquakes.addTo(map);
});

