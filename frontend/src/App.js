import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [turn, setTurn] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null))

  const DisplayBoard = () => {
    const cell = [];
  
    for (let i = 0; i < 9; i++) {
        cell.push(
          <div
          key={i}
          id={i}
          className='cell'
          onClick={playTurn}>
            &nbsp;
          </div>
        );
    }
  
    return cell;
  }

  function playTurn(e) {
    let id = e.target.id

    let gameBoard = board.slice()
    if (!gameBoard[id]) {
      setTurn(turn + 1)
      gameBoard[id] = turn % 2 === 0 ? 'X' : 'O'
    }
    
    setBoard(gameBoard)
  }

  useEffect(() => {
    board.forEach((value, index) => {
      if (value) {
        let div = document.getElementById(index)
        div.textContent = value
      }
    })  
  })

  return (
    <React.Fragment>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
}

export default App;
