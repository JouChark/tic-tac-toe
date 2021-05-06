import React, { useEffect } from 'react';
import io from 'socket.io-client';

function Board() {
  const socket = io();

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
    socket.on('connect_error', (error) => {
      console.log(error);
      changeText('Sorry! An error occurred');
    })
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('enter');
    })
  }, [socket]);

  useEffect(() => {
    socket.on('wait', () => {
      changeText('Waiting for opponent');
    });
  }, [socket])

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

    function playerTurn(playerId, turnId) {
      if (turnId === playerId) {
        changeText('Your turn');
      } else {
        changeText("Opponent's turn");
      }
    }
  }, [socket]);

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
        changeText('YOU WIN!');
      } else if (winner === 'draw') {
        changeText("It's a Draw!");
      } else if (winner) {
        changeText('YOU LOSE!');
      }
    });
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        changeText('Client disconnected');
        socket.connect();
      }
    });
  }, [socket])

  useEffect(() => {
    socket.on('opponentDisconnected', () => {
      changeText("Your opponent disconnected");
    });
  }, [socket])

  return (
    <React.Fragment>
      <p id='result'>Connecting...</p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
};

export default Board