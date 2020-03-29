import React from 'react';    
import Board from './components/Board/Board'
import './App.css';
import Score from './components/Score/Score';


function App() {

  return (
    <div className="App">
      <Score/>
      <Board/>
    </div>
  );
}

export default App;
