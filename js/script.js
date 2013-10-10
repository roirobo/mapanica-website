var map;

var feature;
function cargar_mapa() {



	    var humanitarian = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		    attribution: 'Datos © Colaboradores de OpenStreetMap'
	    });
	    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '© Colaboradores de OpenStreetMap'
	    });
	    var ign = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '© Colaboradores de OpenStreetMap'
	    });

      var baseLayers = {
          "Humanitarian": humanitarian,
          "OSM.org": osm
      };

      map = new L.map('map', {
          center: [12.385,-86.1],
          zoom: 9,
          layers: [humanitarian]
      });

      var layers = L.control.layers(baseLayers);
      map.addControl(layers);
      map.addControl(new L.Control.Permalink({text: 'Permalink', layers: layers}));



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
        var idstring = [
            map.getZoom(),
            map.getCenter().wrap().lat,
            map.getCenter().wrap().lng
        ].join('/');
        $('#editar-en').html('<img class="pull-right" src="/img/iD.png" width="64" alt="iD"/><p>iD es un editor OpenStreetMap basado en JavaScript.</p><a class="btn btn-success" role="button" href="http://geowiki.com/iD/#map='+idstring+'" target="_blank">Editar zona en iD Editor</a>');
        $('#modal-editar').modal({show:true,backdrop:false});
      });

      $('.editar-en-potlatch').bind('click', function () {
        var p2string = L.Util.getParamString({
                lon: map.getCenter().wrap().lng,
                lat: map.getCenter().wrap().lat,
                zoom: map.getZoom()
        });
        $('#editar-en').html('<img class="pull-right" src="/img/P2.png" width="74" alt="P2"/><p>Potlatch 2 (o P2) es un editor OpenStreetMap basado en Flash.</p><a class="btn btn-success" role="button" href="http://open.mapquestapi.com/dataedit/index_flash.html'+p2string+'" target="_blank">Editar zona en Potlatch 2</a>');
        $('#modal-editar').modal({show:true,backdrop:false});
      });
      var buscar = function(){

        $('#resultados').html('<img src="/img/loading.gif" alt="Cargando"/>');
        $('#modal-resultados').modal({show:true});
        var inp = document.getElementById("addr");
        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
            var items = [];

            $.each(data, function(key, val) {
                bb = val.boundingbox;
                items.push("<p><a href='#' onclick='elegirResultado(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></p>');
            });

        $('#resultados').empty();
            if (items.length != 0) {
                $('#resultados').html(items.join(''));

            } else {
                $('<div/>', { html: "No se encontraron resultados." }).appendTo('#resultados');
            }

        });

      }
      $('.form-inline').submit(function(e){return false;});
      $('#buscar').bind('click',function(){
        $('#modal-resultados').modal({show:true,backdrop:false});
        var inp = document.getElementById("addr");
        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
            var items = [];

            $.each(data, function(key, val) {
                bb = val.boundingbox;
                items.push("<p><a href='#' onclick='elegirResultado(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></p>');
            });

		    $('#resultados').empty();
            if (items.length != 0) {
                $('#resultados').html(items.join(''));

            } else {
                $('<div/>', { html: "No se encontraron resultados." }).appendTo('#resultados');
            }

        });

      });


    });

    function elegirResultado(lat1, lng1, lat2, lng2, osm_type) {
        $('#modal-resultados').modal('toggle');
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


window.onload = cargar_mapa;
