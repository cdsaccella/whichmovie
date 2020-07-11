import React from "react";
import "./styles.css";

function GameWrapper(props) {
  return (
    <div className="game-wrapper nes-container with-title is-centered">
      <p className="title">{props.title}</p>
      {props.children}
    </div>
  );
}

export default GameWrapper;
