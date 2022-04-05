var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });

  var myGeoJSONPath = 'data/AmericasAsiaEurope.geo.json';
  var myCustomStyle = {
      stroke: false,
      fill: true,
      fillColor: '#fff',
      fillOpacity: 1
  }
  $.getJSON(myGeoJSONPath,function(data){
      var map = L.map('map').setView([39.74739, -105], 4);

      L.geoJson(data, {
          clickable: false,
          style: myCustomStyle
      }).addTo(map);
  })
 