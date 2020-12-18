const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

let port = process.env.PORT || 5000;

const rooms = {};
let n = 0;

app.get('/', (req, res) => {
  console.log('OK!');
});

io.on('connection', (socket) => {
  socket.on('enter', () => {
    let room = `room${n}`;
    socket.join(room);

    if (!rooms[`${room}`]) {
      rooms[`${room}`] = {'players': {'player1': socket.id}};
      io.to(room).emit('wait')
    } else {
      rooms[`${room}`].players.player2 = socket.id;
      rooms[`${room}`].board = Array(9).fill(null);
      rooms[`${room}`].turn = 0;
      n += 1;
      io.to(room).emit('play', rooms[`${room}`].players.player1)
    }
  });

  socket.on('play', (id) => {
    let room = Array.from(socket.rooms)[1];
    if (!rooms[`${room}`].board[id]) {
      let turnId;
      let mark;

      if (rooms[`${room}`].turn % 2 === 0) {
        mark = 'X'
        turnId = rooms[`${room}`].players.player2
      } else {
        mark = 'O'
        turnId = rooms[`${room}`].players.player1
      }

      rooms[`${room}`].turn += 1;
      rooms[`${room}`].board[id] = mark
      io.to(room).emit('update', id, mark, turnId);
    }
  });

  socket.on('disconnecting', () => {
    let room = Array.from(socket.rooms)[1];
    if (rooms[`${room}`]) {
      if (rooms[`${room}`].players.player2) {
        delete rooms[`${room}`].players.player2;
        io.to(room).emit('playerDisconnected');
      } else {
        delete rooms[`${room}`];
      }
    }
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});