import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are in {process.env.REACT_APP_ENV_NAME}</p>
        <p>Are you ready for this CABRONAZO?</p>
        <a
          className="nes-btn"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's go
        </a>
      </header>
    </div>
  );
}

export default App;
