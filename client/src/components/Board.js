import React, { useEffect} from 'react';
import io from 'socket.io-client';

function Board() {
  const socket = io('https://tic-tac-toe-023.herokuapp.com/');

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

  useEffect(() => {
    socket.on('connect_error', (error) => {
      console.log(error)
      changeText('Error')
    })
  })

  useEffect(() => {
    socket.on('wait', () => {
      changeText('Waiting for opponent');
    });
  })

  function playTurn(e) {
    socket.emit('play', e.target.id);
  };

  useEffect(() => {
    socket.on('update', (turnId, mark, id) => {
      playerTurn(socket.id, turnId);
      if (mark) {
        changeMark(id, mark);
      }
    });
  });

  function playerTurn(playerId, turnId) {
    if (turnId === playerId) {
      changeText('Your turn');
    } else {
      changeText("Opponent's turn");
    }
  }

  function changeText(msg) {
    let p = document.getElementById('result');
    p.textContent = msg;
  }

  function changeMark(id, mark) {
    let cell = document.getElementById(id);
    cell.textContent = mark;
  }

  useEffect(() => {
    socket.on('winner', winner => {
      if (socket.id === winner) {
        changeText('You Won!');
      } else if (winner === 'draw') {
        changeText("It's a Draw!");
      } else if (winner) {
        changeText('You Lost!');
      }
    });
  })
  
  useEffect(() => {
    socket.on('playerDisconnected', () => {
      changeText("Your opponent disconnected");
    });
  })
  
  return (
    <React.Fragment>
      <p id='result'></p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
};

export default Board