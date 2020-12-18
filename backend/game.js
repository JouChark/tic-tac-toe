const rooms = {};
let n = 0;

function join(id) {
  let room = `room${n}`;

  if (!rooms[`${room}`]) {
    rooms[`${room}`] = {'players': {'player1': id}};
    return ([room, 'wait']);
  } else {
    rooms[`${room}`].players.player2 = id;
    rooms[`${room}`].board = Array(9).fill(null);
    rooms[`${room}`].play = true;
    rooms[`${room}`].turn = 0;
    n += 1;
    return [room, 'update', rooms[`${room}`].players.player1]
  }
}

function canPlay(socketRoom, id) {
  let room = rooms[`${socketRoom}`];
  let player = playerTurn(room);
  if (player === id && room.play) {return true};
}

function playTurn(socketRoom, id, index) {
  let room = rooms[`${socketRoom}`];

  let player = playerTurn(room);

  if (player === id && !room.board[index]) {
    let mark = room.turn % 2 === 0 ? 'X' : 'O';
    room.turn += 1;
    room.board[index] = mark;

    let winner = getWinner(socketRoom);
    return [player, mark, winner];
  }
}

function playerTurn(room) {
  if (room.turn % 2 === 0) {
    return room.players.player1;
  } else {
    return room.players.player2;
  }
}

function getWinner(socketRoom) {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  let board = rooms[`${socketRoom}`].board;
  let room = rooms[`${socketRoom}`];
  let winner = null;

  winCondition.forEach((arr) => {
    let [a, b, c] = arr;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a] === 'X' ? 
      room.players.player1: 
      room.players.player2; 
    } else if (room.turn === 9 && !room.winner) {
      winner = "draw";
    } 
  })

  if (winner) {room.play = false};

  return winner;
}

function removePlayer(room) {
  if (rooms[`${room}`]) {
    if (rooms[`${room}`].players.player2) {
      rooms[`${room}`].play = false;
      delete rooms[`${room}`].players.player2;
    } else {
      delete rooms[`${room}`];
    }
  }
}

module.exports = {join, canPlay, playTurn, removePlayer};
