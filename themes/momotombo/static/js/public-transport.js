
function load_map() {


  var humanitarian = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });http:
  var pub_transport = L.tileLayer('http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://memomaps.de/">MeMoMaps</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var mapbox = L.tileLayer('http://{s}.tiles.mapbox.com/v3/jaakkoh.map-4ch3dsvl/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://mapbox.com/">Mapbox</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });

  var baseLayers = {
    "Mapbox": mapbox,
    "Humanitarian": humanitarian,
    "OpenStreetMap": osm,
    "Transporte público": pub_transport,
  };

  // Obtain parameters from url
  var url_paramas = get_params();

  // Initialize map
  map = new L.map('map', {
    center: [12.125,-86.25],
    zoom: 13,
    layers: baseLayers[url_paramas.layers] || pub_transport
  });

  // Adding hash for position in url
  var hash = new L.Hash(map);

  // Adding layer functionality
  var layers = L.control.activeLayers(baseLayers);
  map.addControl(layers);

  //var geojsonLayer = new L.GeoJSON.AJAX("");
  //geojsonLayer.addTo(map);

  // http://leafletjs.com/examples/quick-start.html
}

function get_params(search) {
  var params = {};

  search = (search || window.location.search).replace('?', '').split(/&|;/);

  for (var i = 0; i < search.length; ++i) {
    var pair = search[i],
    j = pair.indexOf('='),
    key = pair.slice(0, j),
    val = pair.slice(++j);
    params[key] = decodeURIComponent(val);
  }

  return params;
}



$(document).ready(function() {

  load_map();
  var busDetailLayerGroup = new L.LayerGroup();
  busDetailLayerGroup.addTo(map);

  $(".bus-line-link").click (function() {

    // Mark link as active
    $('a.active').removeClass('active');
    $(this).addClass('active');

    // Clear old bus line
    busDetailLayerGroup.clearLayers();
    $("#messages").removeClass('visible');

    var myStyle = {
      "color": "#ff7800",
    }

    // Load data second file
    $.ajax({
      type: "POST",
      url: "/theme/data/" + this.text + "-2.geojson",
      dataType: 'json',
      success: function (response) {
        // Define content of popup
        geojsonLayer = L.geoJson(response, {
          style: myStyle,
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
          },
        });
        console.log(geojsonLayer);
        busDetailLayerGroup.addLayer(geojsonLayer);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (!$("#messages").hasClass("opened") ) {
          $("#messages").addClass('visible');
          $('#messages').text("Falta información sobre segunda dirección de esta ruta.");
        }
      }
    });

    // Load data from file
    $.ajax({
      type: "POST",
      url: "./data/" + this.text + "-1.geojson",
      dataType: 'json',
      success: function (response) {
          // Define content of popup
          geojsonLayer = L.geoJson(response, {
            onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.name);
          }});
          busDetailLayerGroup.addLayer(geojsonLayer);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $("#messages").addClass('visible');
        $('#messages').text("Niguna información sobre está ruta se ha encontrado.");
     }
    });

  });
});
