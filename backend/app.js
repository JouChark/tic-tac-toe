const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const rooms = {};

let n = 0;

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('OK!');
});

io.on('connection', (socket) => {
  socket.on('enter', () => {
    let room = `room${n}`;
    socket.join(room);

    if (!rooms.room) {
      rooms.room = {players: [socket.id]};
    } else {
      rooms.room.players.push(socket.id);
      rooms.room.board = Array(9).fill(null);
      rooms.room.turn = 0;
      n += 1;
    }
  });

  socket.on('play', (id) => {
    if (!rooms.room.board[id]) {
      let room = Array.from(socket.rooms)[1];
      let playerTurn;

      if (rooms.room.turn % 2 === 0) {
        rooms.room.board[id] = 'X'
        playerTurn = 'Player 2'
      } else {
        rooms.room.board[id] = 'O'
        playerTurn = 'Player 1'
      }

      rooms.room.turn += 1;
      let mark = rooms.room.board[id]
      io.to(room).emit('update', id, mark, playerTurn);
    }
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});