const ordenarRest = ((restaurants)=>{
  let newRest=[];
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

const deleteMarkers=()=> {
  clearMarkers();
  markers = [];
}

const filterByStars = ((arrayRestaurants,i)=>{
  console.log(arrayRestaurants);
  let arrayRestFilter=[];
  arrayRestaurants.forEach(element => {
    if(element.rating===i){
      arrayRestFilter.push(element);
    }else if(element.rating<i+1 && element.rating>i){
      arrayRestFilter.push(element);
    }else if(element.rating===undefined){
      arrayRestFilter.push(element);
    }
  });
  //console.log(arrayRestFilter);
  return(arrayRestFilter);
});
  