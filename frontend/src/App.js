import React, { useState } from 'react'
import './App.css'

function App() {

  const DisplayBoard = () => {
    const cell = [];
  
    for (let i = 0; i < 9; i++) {
        cell.push(
          <div
          key={i}
          id={i}
          className='cell'>
            &nbsp;
          </div>
        );
    }
  
    return cell;
  }

  return (
    <main id='main'>{DisplayBoard()}</main>
  );
}

export default App;
