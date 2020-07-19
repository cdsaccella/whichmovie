import React, { useContext } from "react";
import RiddleContext from "context/RiddleContext.js";
import Score from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import Lives from "./Lives/index.jsx";
import "./styles.css";

function HUD() {
  const { state } = useContext(RiddleContext);

  return (
    <div className="section hud-container">
      <Timer type="clock"></Timer>
      <Lives lives={state.lives} />
      <Score stars={state.score} />
    </div>
  );
}

export default HUD;
