import React from 'react'
import './App.css'
import DisplayGameBoard from './components/DisplayGameBoard.js'

function App() {
  return (
    <main id='main'>{DisplayGameBoard()}</main>
  );
}

export default App;
