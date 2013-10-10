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

      $('#webirc').bind('click',function(){
            $('<div/>').modal({remote:'http://irc.lc/OFTC/osm-ni/invitadoweb'});

      });

      $('.modal-about').bind('click',function(){

            $('#modal-about').modal({show:true,backdrop:true});

      });

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
