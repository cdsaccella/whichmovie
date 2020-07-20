import React, { useContext } from "react";
import RiddleContext from "context/RiddleContext.js";
import GameModeContext from "context/GameModeContext";
import Score from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import Lives from "./Lives/index.jsx";
import "./styles.css";

function HUD() {
  const { state } = useContext(RiddleContext);
  const { gameModeState } = useContext(GameModeContext);

  return (
    <div
      className="section hud-container"
      style={{ opacity: state.isPlaying ? 1 : 0.5 }}
    >
      {gameModeState.time && <Timer type="clock"></Timer>}
      {gameModeState.lives && <Lives lives={state.lives} />}
      {gameModeState.score && <Score stars={state.score} />}
    </div>
  );
}

export default HUD;
