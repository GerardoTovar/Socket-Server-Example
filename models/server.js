/* eslint-disable no-new */
// Servidor de Express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')

const Sockets = require('./sockets')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 4000
    console.log(`Server running on ${process.env.NODE_ENV} environment`)
    // Http server
    this.server = http.createServer(this.app)
    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    })
  }

  middlewares () {
    // CORS
    this.app.use(cors())
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')))
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets () {
    new Sockets(this.io)
  }

  execute () {
    // Inicializar Middlewares
    this.middlewares()

    // Inicializar sockets
    this.configurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port)
    })
  }
}

module.exports = Server
