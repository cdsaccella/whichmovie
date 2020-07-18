import React from "react";

function DifficultySelector({ finished }) {
  const { gameModeState } = useContext(GameModeContext);

  const gameDifficulties = [
    { text: "Easy", action: SET_CLASSIC_MODE },
    { text: "Medium", action: SET_TIME_TRIAL_MODE },
    { text: "Hard", action: SET_TIME_TRIAL_MODE },
  ];

  const handleClick = (action) => {
    dispatchGameMode({ type: action });
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

export default DifficultySelector;
