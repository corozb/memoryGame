const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
  }

  inicializar(){
    btnEmpezar.classList.add('hide')
    this.level = 1
    this.colores = {
      green,
      red,
      yellow,
      blue
    }
  }

  generarSecuencia() {
  // Creamos un nuevo array con 10 valores, inicialmente serán todos ceros (.fill(0))
  // con .map la modificamos y ponemos numeros aleatorios entre 1 y 4 (Math.random()*4), 
  // Math.random() da número aleatorios en 0-1 y al multiplicar da cercanos a cuatro.
  // y para que no dé enteros (0- 3) lo redondeamos hacia abajo con Math.floor:
  // 0 = green
  // 1 = red
  // 2 = yellow
  // 3 = blue
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
