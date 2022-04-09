var myMap = L.map("map", {
  center: [20.0, 5.0],
  zoom: 2,
  minZoom: 2
});

// Adding the tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

// Use this path to get the Michelin data.
var dataPath = "/michelin";

// get the data with d3
d3.json(dataPath).then(function(michelin_data){

    // create a new marker cluster group.
    var markers = L.markerClusterGroup();

    // loop throught the data
    for (var i = 0; i < michelin_data.length; i++) {
      var latitude = michelin_data[i].latitude;
      var restaurant = michelin_data[i].restaurant;
      var address = michelin_data[i].address;
      var city = michelin_data[i].city;
      var country = michelin_data[i].country;
      var continent = michelin_data[i].continent;
      var cuisine = michelin_data[i].cuisine;
      var longitude = michelin_data[i].longitude;
      var latitude = michelin_data[i].latitude;
      var website = michelin_data[i].website;
      var award = michelin_data[i].award;
      var price = michelin_data[i].price;

      // check for the location property.
      if (latitude) {
        markers.addLayer(L.marker([latitude, longitude])
          .bindPopup(michelin_data[i].restaurant));
      }
    };

    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);


});



// Use this link to get the GeoJSON data.
var dataPath = "/continents";

function chooseColor(continent) {
  switch(continent) {
    case "North America": return "yellow";
    case "South America": return "red";
    case "Europe": return "blue";
    case "Asia": return "pink";
    default: return "black";
  }
}

// Getting our GeoJSON data
d3.json(dataPath).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function (feature) {
      return {
        color: "#9a9a9a",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: chooseColor(feature.properties.continent),
        fillOpacity: 0.5,
        weight: 1.2
      };
    },
    onEachFeature: function (feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9,
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5,
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        },
      });
      // Giving each feature a popup with information that's relevant to it
      //layer.bindPopup(
      //  "<h1>" + feature.properties.admin + "</h1> <hr> <h2>" + feature.properties.economy + "</h2>"
      //);
    },
  }).addTo(myMap);
});
