// Check that file is being accessed
console.log("working");


// Create the map object with a center and zoom level
let map = L.map('mapid').setView([40.7, -94.5], 4);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


// An array containing each city's location, state, and population
let cityData = cities

// Add each city to the map
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: 'orange',
        lineWeight: 4
    })
    .bindPopup(`<h2>${city.city}, ${city.state}</h2><hr><h3>Population: ${city.population.toLocaleString()}</h3>`)
    .addTo(map);
});