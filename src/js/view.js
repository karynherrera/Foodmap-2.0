//Mostrams un splash de nuestra app
window.onload = (() => {
  // hacemos funcionalidad del splash
  setTimeout(function hide() {
    $('#splash').hide('fast');
    document.getElementById('principal').style.display = 'block'; 
  }, 3000);

  initMap();
  
});




const selectRest = document.getElementById('filtrarRestaurantes');
selectRest.addEventListener('change', ()=> {
  openModal();
});


// Modal y funciones del modal
const openModal = (()=> { 
  if (sideMenu.className.indexOf('d-none') >= 0) { 
    openMenu(); 
  } else {
    closeMenu(); 
  }
});

const openModalclick = ((name,adress,src)=> { 
  //console.log(name);
  //console.log(adress);
  if (sideMenu.className.indexOf('d-none') >= 0) { 
    openMenuOther(name,adress,src); 
  } else {
    closeMenu(); 
  }
});




function openMenu() {
  sideMenu.classList.remove('d-none'); // quitando clase display-none 
  const nombreRestInput = document.getElementById('filtrarRestaurantes').value;
  let nombreRest,nombreRestSplit;
  if (nombreRestInput.search(' ★')) {
    nombreRestSplit = nombreRestInput.split(' ★');
    nombreRest = nombreRestSplit[0];
  } else if (nombreRestInput.search(' ')) {
    nombreRestSplit = nombreRestInput.split(' ');
    nombreRest = nombreRestSplit[0];
  }
 
 //  console.log(nombreRest);
  let results = window.restaurants;
  console.log(results);
  let resultRest, nameRest, adress,img;
  let foundRest = results.find(item => {
    if (nombreRest === item.name) {
      console.log(item);
      nameRest = item.name;
      adress = item.vicinity;
      if(item.photos!==undefined){
        img = item.photos[0].getUrl({ 'maxWidth': 300, 'maxHeight': 300 });
      }else{
        img=undefined;
      }
      
      return resultRest = true;
    } else {
      return resultRest = false;
    }
  });
  if (resultRest) {
    results.forEach(element => {
      const mapa = document.getElementById("map");
    mapa.style.display="none";
    const near = document.getElementById("cerca");
    near.style.display="none";
    const select = document.getElementById("filtrarRestaurantes");
      if(img !==undefined){
        const modal = document.getElementById('infoRestaurant');
      modal.style.display = 'block';
     modal.innerHTML = ` <img src="${img} id="fotoRest"> 
      <h4 id="textModal">Restaurante:<br>${nameRest}</h4>
      <h6>${adress}</h6>
      `;
      }else{
        const modal = document.getElementById('infoRestaurant');
        modal.style.display = 'block';
       modal.innerHTML = ` <img src="src/img/icon.png" id="fotoRest"> 
        <h4 id="textModal">Restaurante:<br>${name}</h4>
        <h6>${adress}</h6>
        `;
      }
      
    });
  }
}

function closeMenu() {
  const modal = document.getElementById('infoRestaurant');
  modal.innerHTML = '<div></div>';
  sideMenu.classList.add('d-none'); // añadimos la clase display-none
  const mapa = document.getElementById("map");
    mapa.style.display="block";
    const near = document.getElementById("cerca");
    near.style.display="block";
    const select = document.getElementById("filtrarRestaurantes");
    select.style.display="block";
}


/*
  const modal = document.getElementById('modalTerms');
  modal.style.display = 'block';

  modal.innerHTML = `
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
  <h2 id="textModal">Restaurante:<br>${nameRest}</h2>
  </div>
  </div>
  </div>`;*/

  function openMenuOther(name,adress,src) {
    const mapa = document.getElementById("map");
    mapa.style.display="none";
    const near = document.getElementById("cerca");
    near.style.display="none";
    const select = document.getElementById("filtrarRestaurantes");
    select.style.display="none";
    sideMenu.classList.remove('d-none'); // quitando clase display-none 
    if(src!==undefined){
      const modal = document.getElementById('infoRestaurant');
      modal.style.display = 'block';
     modal.innerHTML = ` <img src="${src} id="fotoRest"> 
      <h4 id="textModal">Restaurante:<br>${name}</h4>
      <h6>${adress}</h6>
      `;
    }else{
      const modal = document.getElementById('infoRestaurant');
      modal.style.display = 'block';
     modal.innerHTML = ` <img src="src/img/icon.png" id="fotoRest"> 
      <h4 id="textModal">Restaurante:<br>${name}</h4>
      <h6>${adress}</h6>
      `;
    }
       
      
    
  }