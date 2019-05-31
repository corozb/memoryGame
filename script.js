const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 1

class Juego {
  constructor() {
    this.inicializar()
  }

  inicializar(){
    btnEmpezar.classList.add('hide')
  }
}

function empezarJuego() {
  let juego = new Juego()
}
