'use strict'

const net = require('net')
const modbus = require('jsmodbus')
const netServer = new net.Server()
const server = new modbus.server.TCP(netServer, {
    coils: Buffer.alloc(1000),
    discrete: Buffer.alloc(1000),
    input: Buffer.alloc(1000),
    holding: Buffer.alloc(30000)})
const PORT = 502
let loop

server.on('connection', function (client) {
  console.log('Client connected...')
  function update(){
    server._holding.writeInt16LE(Math.random() * 100 - 50, Math.floor(Math.random() * 50)*2);//random values for the first 100 registers
    //console.log(server._holding)
    
  }
  loop = setInterval(update, 100); //every 100mS
})
server.on('close', function () {
  console.log('Client disconnected...')
})
console.log(`listening on ${PORT}`)
netServer.listen(PORT)