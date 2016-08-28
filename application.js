const CONSUMER_KEY = "xHkW9aeTnoYk4k1lUYicCjbKY9VXjYOWxE3OsBt8";

function initMap() {
  // Toronto
  var initialLatLng =  {lat: 43.6525, lng: -79.381667};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: initialLatLng
  });

  var initialMarker = new google.maps.Marker({
    map: map,
    visible: false,
    animation: google.maps.Animation.DROP,
    position: initialLatLng
  });

  google.maps.event.addListener(map, 'dragend', function (evt) {
    initialMarker.setPosition(this.getCenter()); // set marker position to map center
 
    var lat = map.getCenter().lat().toFixed(3);
    var lng = map.getCenter().lng().toFixed(3);

    getAPI(lat, lng);
  });

  function setPhotoMarkers(photo) {
    var photoLatLng = {lat: photo.latitude, lng: photo.longitude};
    var photoMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: photoLatLng
    });

    google.maps.event.addListener(photoMarker, 'click', function() { 
      $("#image").attr("src", photo.image_url);
    }); 
  };

  function getAPI(lat,lng) {
    $.ajax({
      // https://api.500px.com/v1/photos/search?geo=49.283024,-123.108024,10km&image_size=600
      url: `https://api.500px.com/v1/photos/search?term=landmark&geo=${lat},${lng},1km&image_size=600&consumer_key=${CONSUMER_KEY}`,
      method: 'GET',
      success: function(response) {     
        response.photos.forEach(function(photo, index) { 
          console.log(photo);
          setPhotoMarkers(photo);
        });
      },
      error: function(error) {
        console.log(error); 
      }
    });
  };  
};
















