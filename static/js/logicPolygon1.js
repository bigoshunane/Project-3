var myMap = L.map("map", {
  center: [20.0, 5.0],
  zoom: 2,
  minZoom: 2
});

// Adding the tile layer
var street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});//.addTo(myMap)

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

var baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};
//////////////////////////////////
L.control.layers(baseMaps,  {
}).addTo(myMap);
///////////////////////////////////
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
          .bindPopup("<br>Restaurant: </br>" + michelin_data[i].restaurant + "<br>Award:</br>" + michelin_data[i].award + "<br>Cuisine:</br>" + michelin_data[i].cuisine + '<br><a href="'+ michelin_data[i].website +  '">Website</a></br>' ));
      }
    };

    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);


});
let darkRed =     '#732229';
let beige =       '#F2F2F2';
let fireRed =     '#F22738';
let red =         '#A61723';
let pink =        '#F22E52';
let darkOrange =  '#E8790C';
let fireOrange =  '#FFA40D';
let redOrange =   '#FF5900';
let black =       '#000000';
let white =       '#ffffff';


// Use this link to get the GeoJSON data.
var dataPath = "/continents";

function chooseColor(continent) {
  switch(continent) {
    case "North America": return fireRed;
    case "South America": return red;
    case "Europe": return fireOrange;
    case "Asia": return pink;
    default: return redOrange;
  }
}

// Getting our GeoJSON data
d3.json(dataPath).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function (feature) {
      return {
        color: "#9a9a9a",
        // Call the chooseColor() function to decide which color to color the continents.
        fillColor: chooseColor(feature.properties.continent),
        fillOpacity: 0.5,
        weight: 1.2
      };
    },
    onEachFeature: function (feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function.
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.8,
          });
        },
        // When the cursor no longer hovers over a map feature it reverts to original
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3,
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        },
      });
      },

  }).addTo(myMap);

});

//L.control.layers(baseMaps),  {
//}).addTo(myMap);
//});
