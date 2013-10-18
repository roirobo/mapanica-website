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

	var ign = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  attribution: '© Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>'
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
  //var url_paramas = get_params();
  //console.log(url_paramas.mlat);

  // Initialize map
  map = new L.map('map', {
    center: [12.385,-86.1],
    zoom: 9,
    layers: [humanitarian]
  });

  // Adding hash for position in url
  new L.Hash(map);

  // Adding layer functionality
  var layers = L.control.layers(baseLayers);
  map.addControl(layers);
  // map.addControl(new L.Control.Permalink({text: 'Permalink', layers: layers}));


  //@TODO: IMPLEMENT VARIABLE CHECK

  // Adding marker
  //var marker = L.marker([url_paramas.mlat,url_paramas.mlon]).addTo(map);
}

$(document).ready(function (){
  $('.modal-garmin').bind('click',function(){
    $('#modal-garmin').modal({show:true,backdrop:true});
  });

  $('.modal-projects').bind('click',function(){
    $('#modal-projects').modal({show:true,backdrop:true});
  });

  $('.modal-events').bind('click',function(){
    $('#modal-events').modal({show:true,backdrop:true});
  });

  $('.modal-refs').bind('click',function(){
    $('#modal-refs').modal({show:true,backdrop:true});
  });

  $('#webirc').bind('click',function(){
    $('<div/>').modal({remote:'http://irc.lc/OFTC/osm-ni/invitadoweb'});
  });

  $('.modal-about').bind('click',function(){
    $('#modal-about').modal({show:true,backdrop:true});
  });

  $('.editar-en-josm').bind('click', function () {
    var bounds = map.getBounds();
    var josmstring = L.Util.getParamString({
      left: bounds.getNorthWest().lng,
      right: bounds.getSouthEast().lng,
      top: bounds.getNorthWest().lat,
      bottom: bounds.getSouthEast().lat
    });
    $('#editar-en').html('<img class="pull-right" src="/img/josm.png" width="64" alt="josm"/><p>Para utilizar el siguiente enlace, es necesario tener instalado y abierto el <a href="http://josm.openstreetmap.de" target="_blank">JOSM</a> con el </i><a href="http://josm.openstreetmap.de/wiki/Help/Preferences/RemoteControl" target="_blank">Remote Control</a></i> activado.</p><a class="btn btn-success" role="button" href="http://127.0.0.1:8111/load_and_zoom'+josmstring+'" target="_blank">Editar zona en JOSM</a>');
    $('#modal-editar').modal({show:true,backdrop:false});
  });

  $('.editar-en-id').bind('click', function () {
    var osmeditstring = [
      map.getZoom(),
      map.getCenter().wrap().lat,
      map.getCenter().wrap().lng
    ].join('/');
    $('#editar-en').html('<img class="pull-right" src="/img/iD.png" width="64" alt="iD"/><p>iD es un editor OpenStreetMap basado en JavaScript.</p><a class="btn btn-success" role="button" href="http://www.openstreetmap.org/edit?editor=id#map='+osmeditstring+'" target="_blank">Editar zona en iD Editor</a>');
    $('#modal-editar').modal({show:true,backdrop:false});
  });

  $('.editar-en-potlatch').bind('click', function () {
    var osmeditstring = [
      map.getZoom(),
      map.getCenter().wrap().lat,
      map.getCenter().wrap().lng
    ].join('/');
    $('#editar-en').html('<img class="pull-right" src="/img/P2.png" width="74" alt="P2"/><p>Potlatch 2 (o P2) es un editor OpenStreetMap basado en Flash.</p><a class="btn btn-success" role="button" href="http://www.openstreetmap.org/edit?editor=potlatch2#map='+osmeditstring+'" target="_blank">Editar zona en Potlatch 2</a>');
    $('#modal-editar').modal({show:true,backdrop:false});
  });

  var search = function(){
    $('#search-results').html('<img src="/img/loading.gif" alt="Cargando"/>');
    $('#modal-search-results').modal({show:true});
    var inp = document.getElementById("addr");
    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
    var items = [];
    $.each(data, function(key, val) {
      bb = val.boundingbox;
      items.push("<p><a href='#' onclick='elegirResultado(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></p>');
    });

    $('#search-results').empty();
      if (items.length != 0) {
        $('#search-results').html(items.join(''));
      } else {
        $('<div/>', { html: "No se encontraron resultados." }).appendTo('#search-results');
      }
    });

  }
  $('.form-inline').submit(function(e){return false;});
  $('#search').bind('click',function(){
    $('#modal-search-results').modal({show:true,backdrop:false});
    var inp = document.getElementById("addr");
    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
      var items = [];
      $.each(data, function(key, val) {
        bb = val.boundingbox;
        items.push("<p><a href='#' onclick='elegirResultado(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></p>');
      });

		  $('#search-results').empty();
      if (items.length != 0) {
        $('#search-results').html(items.join(''));
      } else {
        $('<div/>', { html: "No se encontraron resultados." }).appendTo('#search-results');
      }
    });
  });
});

function elegirResultado(lat1, lng1, lat2, lng2, osm_type) {

  $('#modal-search-results').modal('toggle');
	var loc1 = new L.LatLng(lat1, lng1);
	var loc2 = new L.LatLng(lat2, lng2);
	var bounds = new L.LatLngBounds(loc1, loc2);

	if (feature) {
	  map.removeLayer(feature);
	}

  if (osm_type == "node") {
		feature = L.circle( loc1, 16, {color: 'cyan', fill: false}).addTo(map);
    feature.bindPopup(loc1+" ");
		map.fitBounds(bounds);
		map.setZoom(18);
	} else {
    var loc3 = new L.LatLng(lat1, lng2);
    var loc4 = new L.LatLng(lat2, lng1);

    feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(map);
    feature.bindPopup(loc1+" "+loc1+" "+loc2+" "+loc3);
		map.fitBounds(bounds);
	}
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
