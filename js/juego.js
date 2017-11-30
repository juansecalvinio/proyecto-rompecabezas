// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
/*
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
*/

var grilla = [
  [document.getElementById("pieza01"), document.getElementById("pieza02"), document.getElementById("pieza03")],
  [document.getElementById("pieza04"), document.getElementById("pieza05"), document.getElementById("pieza06")],
  [document.getElementById("pieza07"), document.getElementById("pieza08"), document.getElementById("pieza09")]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  var count = 0;
  var pieza = 1;
  while (pieza < 9) {
    for(f = 0; f <= grilla.length - 1; f ++) {
      for(c = 0; c <= grilla[f].length - 1; c ++) {
        if(grilla[f][c] === document.getElementById('pieza0'+pieza)) {
          count++;
        }
        pieza++;
      }
    }
  }

  if(count == 9) {
    return true;
  } else {
    return false;
  }
} // OK

// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
    alert('Ganaste!');
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var padre = document.getElementById('juego');
  var pieza01 = grilla[fila1][columna1];
  var clon01 = pieza01.cloneNode(true);

  var pieza02 = grilla[fila2][columna2];
  var clon02 = pieza02.cloneNode(true);

  grilla[fila1][columna1] = clon02;
  grilla[fila2][columna2] = clon01;

  padre.replaceChild(clon01, pieza02);
  padre.replaceChild(clon02, pieza01);
}


// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
    if((fila >= 0 & columna >= 0) && (fila <= 2 & columna <= 2)) {
      return true;
    } else {
      return false;
    }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}

// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(10);
  capturarTeclas();
}


iniciar();
