import React, { useContext } from "react";
import RiddleContext from "context/RiddleContext.js";
import GameSettingsContext from "context/GameSettingsContext.js";
import Score from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import "./styles.css";

function HUD() {
  // const { settings } = useContext(GameSettingsContext);
  const { state } = useContext(RiddleContext);

  return (
    <div className="hud-container">
      <Timer seconds={20} type="clock"></Timer>
      <Score stars={state.score} />
    </div>
  );
}

export default HUD;
