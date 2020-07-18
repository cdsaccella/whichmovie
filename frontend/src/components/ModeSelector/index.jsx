import React, { useContext } from "react";
import { SET_CLASSIC_MODE, SET_TIME_TRIAL_MODE } from "reducers/types";
import GameModeContext from "context/GameModeContext.js";

function ModeSelector({ finished }) {
  const { gameModeState, dispatchGameMode } = useContext(GameModeContext);

  const gameModes = [
    { text: "Classic mode", action: SET_CLASSIC_MODE },
    { text: "Time trial mode", action: SET_TIME_TRIAL_MODE },
  ];

  const handleClick = (action) => {
    dispatchGameMode({ type: action });
    console.log(gameModeState);
    finished();
  };

  return (
    <div>
      <p>Mode</p>
      <p>Select the mode that you want to play.</p>
      {gameModes.map((gameMode) => (
        <button
          key={gameMode.text}
          className="nes-btn"
          onClick={() => handleClick(gameMode.action)}
        >
          {gameMode.text}
        </button>
      ))}
    </div>
  );
}

export default ModeSelector;
