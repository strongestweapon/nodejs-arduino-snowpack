const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM5', {baudRate: 9600})
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

const express = require('express')
const app = new express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + "/build"))

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html")
});

io.on('connection', (socket) => {
    console.log('a user connected')
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

port.on('open',function() {
    console.log('port opened')
})

parser.on('data', function(value) {
    console.log(value)
    io.emit("rotation", map_range(value,0,1023,0,1) * Math.PI);
})

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}