import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [turn, setTurn] = useState(0)
  const [win, setWin] = useState(false)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [players, setPlayers] = useState(['Player 1', 'Player 2'])

  function Header() {
    return(
      <header>
        <h1>Tic Tac Toe</h1>
        <form id="form">
          <input type="text" id="player1" className="playerName" placeholder="Player 1" />
          <input type="text" id="player2" className="playerName" placeholder="Player 2" />
        </form>
        <button id="submit" onClick={changePlayerName}>Submit</button>
      </header>
    )
  }

  // Create and display the the Tic Tac Toe board
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

  // Get the id of the clicked cell and update the board and the turn
  function playTurn(e) {
    let id = e.target.id;
    let mark = turn % 2 === 0 ? 'X' : 'O';

    if (!board[id] && !win) {
      updateBoard(id, mark);
      showMark(id, mark);
      setTurn(turn + 1);
    }
  }

  function updateBoard(id, mark) {
    let gameBoard = board.slice();
    gameBoard[id] = mark;
    setBoard(gameBoard);
  }

  function showMark(id, mark) {
    let cell = document.getElementById(id);
    cell.textContent = mark;
  }

  // Verify the board if the winning condition is met and change text accordingly
  function getWinner() {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winCondition.forEach((arr) => {
      let [a, b, c] = arr
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        let winner = board[a] === 'X' ? players[0] : players[1]
        changeText(`${winner} Wins!`)
        setWin(true)
      } else if (turn === 9 && !win) {
        changeText("It's a Draw!")
      }
    })
  }

  const changePlayerName = () => {
    let player1 = document.getElementById('player1').value.trim()
    let player2 = document.getElementById('player2').value.trim()

    if (player1 === '') {player1 = 'Player 1'}
    if (player2 === '') {player2 = 'Player 2'}

    setPlayers([player1, player2])
  }

  const getPlayerTurn = () => {
    let player = turn % 2 === 0 ? players[0] : players[1]
    if (!win && turn < 8) {
      changeText(`${player}'s turn`)
    }
  }

  const changeText = (text) => {
    let p = document.getElementById('result')
    p.textContent = text
  }

  useEffect(() => {
    getWinner();
    getPlayerTurn();
  })

  return (
    <React.Fragment>
      <Header />
      <p id='result'></p>
      <main id='main'>{DisplayBoard()}</main>
    </React.Fragment>
  );
}

export default App;
