import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Are you ready for this?
        </p>
        <a
          className="nes-btn"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start!
        </a>
      </header>
    </div>
  );
}

export default App;
