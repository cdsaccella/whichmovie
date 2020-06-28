import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Riddle from "./components/riddle/Riddle.jsx";

function App() {
  console.log(
    `Hey, you are running in ${process.env.REACT_APP_ENV_NAME}. It is ok?`
  );

  return (
    <div className="App-container">
      <header className="App-header">
        <Riddle image="https://picsum.photos/200/300"></Riddle>
      </header>
    </div>
  );
}

export default App;
