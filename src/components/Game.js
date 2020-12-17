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

  socket.emit('join')

  function playTurn(e) {
    let id = e.target.id
    socket.emit('play', id)
  }

  useEffect(() => {
    socket.on('update', id => {
      console.log(id)
    })
  })
  
  return (
    <React.Fragment>
      <p id='result'></p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
};

export default Game