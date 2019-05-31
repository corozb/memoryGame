const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    this.nextLevel()
  }

  inicializar(){
    this.elegirColor = this.elegirColor.bind(this)
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
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
  }

  nextLevel(){
    this.brightSequence()
    this.agregarEventoClick()
  }

  changeNumberToColor(number) {
    switch (number) {
      case 0:
        return 'green'
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
      }
    }

  brightSequence() {
    for (let i = 0; i < this.level; i++){
      const color = this.changeNumberToColor(this.secuencia[i])
      setTimeout(() => this.turnOnColor(color), 1000 * i)
    }
  }

  turnOnColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventoClick(){
    this.colores.green.addEventListener('click', this.elegirColor.bind(this))
    this.colores.red.addEventListener('click', this.elegirColor.bind(this))
    this.colores.yellow.addEventListener('click', this.elegirColor.bind(this))
    this.colores.blue.addEventListener('click', this.elegirColor.bind(this))
  }

  elegirColor(ev) {
    console.log(this)
  }

}

function empezarJuego() {
  window.juego = new Juego()
}
