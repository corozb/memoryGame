El método bind() crea una nueva función que cuando se manda a llamar tiene un contexto "this" asignado por nosotros.

En este caso lo hacemos para que this sea el juego y no el botón.

Lo creamos acá para que así cada vez que pongamos this.elegirColor() = this.elegirColor.bind(this)