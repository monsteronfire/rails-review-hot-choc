// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require cocoon
//= require_tree .

var ready = function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&'+'libraries=places&'+'callback=init';
  document.body.appendChild(script);
};

var addMarker = function(latLng, map, infoWindowContent) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  addInfoWindow(infoWindowContent, marker, map);
  // markersArray.push(marker);
};

var infoWindow;
var addInfoWindow = function(content, marker, map) {
  if(typeof content !== 'undefined'){
    marker.addListener('click', function() {
      if (infoWindow) infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 350
      });
      infoWindow.open(map, marker);
    });
  }
};


var init = function() {
  var searchBoxElement = document.getElementById("searchbox");
  var searchBox = new google.maps.places.SearchBox(searchBoxElement);

  var gmap = document.getElementById('gmap');
  gmap = new google.maps.Map(document.getElementById('gmap'), {
    center: {lat: 3.134109, lng: 101.686671},
    zoom: 8
  });

  $.ajax({
    url: "/cafes/search",
    method: "get",
    success: function(d, e, g) {
      for(var i=0; i < d.length; i++) {
        addMarker({lat: d[i].lat, lng: d[i].lng}, gmap, d[i].name);
      }
    }
  })

  searchBox.addListener('places_changed', function(e) {
    place = searchBox.getPlaces();
    var location = place[0].geometry.location
    var lat = location.lat()
    var lng = location.lng()
    gmap.setCenter({lat: lat, lng: lng});
    addMarker({lat: lat, lng: lng}, gmap, "uhnuubu");
  });
};

$(document).ready(function() {
  ready();
})

$(document).on('page:load', function() {
  init();
});