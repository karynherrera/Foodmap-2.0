
window.restaurants = [];
window.map;
window.infowindow;

// creamos una funcion para inicializar y crear nuestro mapa
const initMap = (() => {
  // indicamos las coordenadas segun el gps
  navigator.geolocation.getCurrentPosition((pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let myLatlng = new google.maps.LatLng(lat, lon);

    let mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions,
      {
        center: {lat: lat,
          lng: lon},
        zoom: 16
      });
    
    infowindow = new google.maps.InfoWindow();
    let request = {
      location: myLatlng,
      radius: 1000,
      types: ['restaurant']
    };

    let service = new google.maps.places.PlacesService(map);

    // ahora buscamos los lugares cercanos a las coordenadas de nuestro GPS
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        restaurants = results;
       // console.log(restaurants);
        // console.log(restaurants.name);
        for (let i = 0; i < restaurants.length; i++) {
          console.log(' Restaurantes ' + restaurants[i].name);
        }  
        
        for (let i = 0; i < results.length; i++) {
          // console.log(results[i].name);
          // mostramos la info de cada restaurante cercano 
          service.getDetails({
            placeId: results[i].place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              crearMarcador(results[i]);
              let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
              google.maps.event.addListener(marker, 'mouseover', function() {
                console.log(place);
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '</div>');
                infowindow.open(map, this);
              });
              
              // primero ordenamos los locales cercanos segun mayor a menor rating
        ordenarRest(restaurants);
        const selectRestaurant = document.getElementById('filtrarRestaurantes');
        // indicamos la calificacion de cada lugar con estrellas
        restaurants.forEach(element =>{
          
          let optionNode = document.createElement('option');
          let star = document.getElementById('stars');
          let stars = document.createElement('option');
          // console.log(element.rating);
          let num = element.rating;
          let range = num;
         
          for (let i = 0; i < range; i++) {
            if (num === undefined) {
              stars.innerHTML += ' ';
            } else {
              if (num % 1 == 0) {
                stars.innerHTML += ' ★';
              } else { 
                stars.innerHTML += '★';
                range = Math.trunc(num);
              }
            }
          }

          if (num === undefined) {
            stars.innerHTML += '/ Sin calificación';
          } else {
            stars.innerHTML += num + ' Estrellas';
          }
          
          optionNode.text = element.name + ' ';
          optionNode.appendChild(stars);
          selectRestaurant.appendChild(optionNode);
        });

            }
          });
        }
      }
    }); // fin de nearbySearch
  });
}); //fin de initMap



