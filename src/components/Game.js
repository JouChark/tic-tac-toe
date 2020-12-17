import React, { useEffect } from 'react';
import io from 'socket.io-client'

function Game() {
  const socket = io('http://localhost:5000')

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

  function playTurn(e) {
    let id = e.target.id
    socket.emit('play', id)
  }

  useEffect(() => {
    socket.on('update', (id, mark, player) => {
      let p = document.getElementById('result');
      let cell = document.getElementById(id);
      cell.textContent = mark;
      p.textContent = `${player}'s turn!`
    })
  })
  
  return (
    <React.Fragment>
      <p id='result'>Player 1's turn!</p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
};

export default Game