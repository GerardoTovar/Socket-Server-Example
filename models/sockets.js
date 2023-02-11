class Sockets {
  constructor (io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', (socket) => {
      // Escuchar evento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        console.log(data)
        // Emite el mensaje al que disparo el evento
        socket.emit('mensaje-from-server', data)
        // Emite a todos los que esten en este namespace io
        // this.io.emit('mensaje-from-server', data)
      })
    })
  }
}

module.exports = Sockets
