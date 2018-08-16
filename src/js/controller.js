const ordenarRest = ((restaurants)=>{
  restaurants = restaurants.sort(function(localA, localB) {
    if (localA.rating !== undefined) {
      if (localB.rating !== undefined) {
        if (localA.rating < localB.rating) {
          return 1;
        }
        if (localA.rating > localB.rating) {
          return -1;
        }
        return 0;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  });
});


const crearMarcador = ((place) => {
  // Creamos marcadores para mostrar en el mapa
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    lugar: place.name
  });
}); 

  