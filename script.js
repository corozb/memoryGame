const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const btnEmpezar = document.getElementById('btnEmpezar')
const level = document.getElementById('level')
const LAST_LEVEL = 10


// AUDIOS
const audioLost = new Audio('./src/sounds/lost.mp3')
let audioSprite = new Audio('./src/sounds/colorsAudioSprite.mp3')

const audioTimes = {
    yellow: {
      start: 0,
      length: 0.4
  },
  blue: {
      start: 0.75,
      length: 0.4
  },
  red: {
      start: 1.45,
      length: 0.4
  },
  green: {
      start: 2.15,
      length: 0.4
  }
}

// current sprite being played
let currentSprite = {}

// --------------

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    audioSprite.addEventListener('timeupdate', this.actualizarTiempo, false)
    setTimeout(this.nextLevel, 500)
  }

  inicializar(){
    this.nextLevel = this.nextLevel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    // btnEmpezar.classList.add('hide')
    btnEmpezar.classList.toggle('hide') // Así para que agrege o quite la clase según el estado
    this.level = 1
    this.colores = {
      green,
      red,
      yellow,
      blue
    }
  }

  actualizarTiempo() {
    if (this.currentTime >= currentSprite.start + currentSprite.length) {
      this.pause()
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
  }

  nextLevel(){
    this.sublevel = 0
    setTimeout(() => {
      level.innerHTML = this.level;  //Ésta línea permite imprimir el nivel en el background
      this.brightSequence()
      this.agregarEventoClick()},
      1000)
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

  changeColorToNumber(color) {
    switch (color) {
      case 'green':
        return 0
      case 'red':
        return 1
      case 'yellow':
        return 2
      case 'blue':
        return 3
      }
    }

  brightSequence() {
    for (let i = 0; i < this.level; i++){
      const color = this.changeNumberToColor(this.secuencia[i])
      setTimeout(() => {
        this.turnOnColor(color)
        this.playAudio(color)
      }, 600 * i)
    }
  }

  playAudio(id) {
    if (audioTimes[id] && audioTimes[id].length) {
      currentSprite = audioTimes[id]

      audioSprite.currentTime = currentSprite.start
      audioSprite.play()
      setTimeout(() => {
        if(!audioSprite.pause) {
          audioSprite.pause()}
        }, 500)
      }
    }
  

  turnOnColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => this.turnOffColor(color), 250)
  }

  turnOffColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventoClick(){
    this.colores.green.addEventListener('click', this.elegirColor)
    this.colores.red.addEventListener('click', this.elegirColor)
    this.colores.yellow.addEventListener('click', this.elegirColor)
    this.colores.blue.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.green.removeEventListener('click', this.elegirColor)
    this.colores.red.removeEventListener('click', this.elegirColor)
    this.colores.yellow.removeEventListener('click', this.elegirColor)
    this.colores.blue.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const colorName = ev.target.dataset.color
    const colorNumber = this.changeColorToNumber(colorName)
    this.turnOnColor(colorName)

    if (colorNumber === this.secuencia[this.sublevel]) {
      this.playAudio(colorName)
      this.sublevel++
      if (this.sublevel === this.level) {
        this.level++
        this.eliminarEventosClick()
        if(this.level == (LAST_LEVEL+1)) {
          // Ganó
          this.youWon()
        } else {
            // setTimeout(this.nextLevel.bind(this), 2000)
            setTimeout(this.nextLevel, 1000)
        }
      }
    } else {
      // Perdió
      audioLost.play()
      this.youLost()
    }
  }

  youWon() {
    swal('Simon Says', 'CONGRATULATIONS, You Won!', 'success')
      .then(this.inicializar.bind(this))
  }

  youLost() {
    swal('Simon Says', 'PAY ATTENTION!!!, You Lost the Game', 'error')
      .then(() => {
        location.reload()
        // this.eliminarEventosClick()
        // this.inicializar()
      })
  }

}

function empezarJuego() {

  window.juego = new Juego()
}
