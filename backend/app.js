const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('OK!');
});

io.on('connection', (socket) => {
  socket.on('join', () => {
    socket.join('room')
  })
  socket.on('play', (id) => {
    io.to('room').emit('update', id)
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`)
})