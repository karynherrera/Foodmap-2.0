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


  