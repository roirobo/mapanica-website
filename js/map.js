var map;
var feature;


function load_map() {

  var humanitarian = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		 attribution: 'Teselas © <a href="http://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
	});
	var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  attribution: '© Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>'
	});
  var thunderforest = L.tileLayer('http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://www.opencyclemap.org/">OpenCycleMap</a>, información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var stamen_watercolor = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: 'Teselas © <a href="http://maps.stamen.com/">Stamen Design</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var stamen_boner = L.tileLayer('http://tile.stamen.com/boner/{z}/{x}/{y}.jpg', {
    attribution: 'Teselas © <a href="http://maps.stamen.com/">Stamen Design</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var pub_transport = L.tileLayer('http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://memomaps.de/">MeMoMaps</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });
  var mapbox = L.tileLayer('http://{s}.tiles.mapbox.com/v3/jaakkoh.map-4ch3dsvl/{z}/{x}/{y}.png', {
    attribution: 'Teselas © <a href="http://mapbox.com/">Mapbox</a>; Información geográfica © <a href="http://openstreetmap.org">OpenStreetMap</a>'
  });

  var baseLayers = {
    "Humanitarian": humanitarian, // H
    "OpenSteetMap": osm,  // O
    "Terreno/Español": mapbox, // M
    "Hibrido": stamen_boner,  // I
    "Transporte público": pub_transport, // T
    "Topográfico": thunderforest,  // G
    "Acuarela": stamen_watercolor  // A
  };

  // Obtain parameters from url
  var url_paramas = get_params();
  console.log(url_paramas);

  // Initial base layer
  if (typeof baseLayers[url_paramas.layers] !== 'undefined') {
    var layer = baseLayers[url_paramas.layers];
  }
  else {
    var layer = humanitarian;
  }

  // Initialize map
  map = new L.map('map', {
    center: [12.385,-86.1],
    zoom: 9,
    layers: [layer]
  });

  // Adding hash for position in url
  var hash = new L.Hash(map);

  // Adding layer functionality
  var layers = L.control.layers(baseLayers);
  map.addControl(layers);
  // map.addControl(new L.Control.Permalink({text: 'Permalink', layers: layers}));


  // Marker
  if (!isNaN(url_paramas.mlat) && !isNaN(url_paramas.mlon)) {

    // Adding marker
    var marker = L.marker([url_paramas.mlat,url_paramas.mlon]).addTo(map);

    // Popup
    if (typeof url_paramas.popup !== 'undefined') {
      if (url_paramas.popup.match(/^[^\\\/&]*$/)) {
        marker.bindPopup(url_paramas.popup).openPopup();
      }
    }
  }


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





window.onload = load_map;
