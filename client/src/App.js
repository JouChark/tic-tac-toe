import React from 'react';
import Board from './components/Board'
import './public/App.css';

function App() {
  return (
    <div className='App'>
      <header>
        <h1>TIC TAC TOE</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
