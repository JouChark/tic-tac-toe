import React, { useEffect} from 'react';
import io from 'socket.io-client'

function Game() {
  const socket = io('http://localhost:5000')
  let play = false

  const DisplayBoard = () => {
    const cell = [];
  
    for (let i = 0; i < 9; i++) {
        cell.push(
          <div
          key={i}
          id={i}
          className='cell'
          onClick={playTurn}
          >
            &nbsp;
          </div>
        );
    }
  
    return cell;
  }

  useEffect(() => {
    window.addEventListener('load', () => {
      socket.emit('enter');
    });
  });

  socket.on('wait', () => {
    let msg = 'Waiting for opponent'
    changeText(msg)
  })

  function playTurn(e) {
    if (play) {
      let index = e.target.id;
      socket.emit('play', index);
    };
  };

  useEffect(() => {
    socket.on('play', (turnId) => {
      canPlay(turnId, socket.id);
    });
  });

  useEffect(() => {
    socket.on('update', (id, mark, turnId) => {
      changeMark(id, mark);
      canPlay(turnId, socket.id);
    });
  });

  socket.on('winner', winner => {
    if (socket.id === winner) {
      changeText('You Won!')
    } else if (winner) {
      changeText('You Lost!')
    }
  })
  
  socket.on('playerDisconnected', () => {
    changeText("Your opponent disconnected");
    play = false
  });

  function canPlay(turnId, playerId) {
    if (turnId === playerId) {
      play = true
      changeText('Your turn')
    } else {
      play = false
      changeText("Opponent's turn")
    }
  }

  function changeText(msg) {
    let p = document.getElementById('result');
    p.textContent = msg
  }

  function changeMark(id, mark) {
    let cell = document.getElementById(id);
    cell.textContent = mark;
  }
  
  return (
    <React.Fragment>
      <p id='result'></p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
};

export default Game