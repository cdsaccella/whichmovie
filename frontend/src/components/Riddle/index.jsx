import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import loadingImage from "assets/loading2x.gif";
import {
  assertRiddle,
  getNewRiddle,
  NO_RIDDLE,
} from "services/RiddleService.js";
import Stars from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import "./styles.css";

function Riddle({ t, i18n }) {
  const MAX_POINTS = 10;
  const TIME = 20;

  const [isLoading, setIsLoading] = useState(true);
  const [riddle, setRiddle] = useState(NO_RIDDLE);
  const [gameOver, setGameOver] = useState(false);
  const [newRiddle, setNewRiddle] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!newRiddle) return;
    setIsLoading(true);
    async function getData() {
      setRiddle(await getNewRiddle(i18n.language));
      setIsLoading(false);
      setNewRiddle(false);
    }
    getData();
  }, [i18n.language, newRiddle]);

  const selectOption = async (option) => {
    const result = await assertRiddle(riddle.id, option);
    if (result) {
      setScore((score) => score + 1);
      setNewRiddle(true);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    refreshGame();
    setNewRiddle(true);
  };

  const refreshGame = () => {
    setRiddle(NO_RIDDLE);
    setGameOver(false);
    setScore(0);
  };

  // ---

  const riddleTimeout = () => {
    setGameOver(true);
  };

  return (
    <>
      {gameOver && (
        <div className="game-over-wrapper">
          <div>
            <p>{t("Game over")}</p>
            <button
              type="button"
              className="nes-btn"
              onClick={() => restartGame()}
            >
              {t("Restart game")}
            </button>
          </div>
        </div>
      )}
      <div className="content-wrapper">
        {!gameOver && (
          <div className="section">
            <Timer
              seconds={TIME}
              standBy={isLoading}
              timeoutCallback={() => riddleTimeout()}
            ></Timer>
          </div>
        )}
        {!gameOver && (
          <div className="section">
            <Stars stars={score} maxStars={MAX_POINTS} />
          </div>
        )}
        {isLoading && (
          <>
            <div className="section">
              <img className="image-wrapper" src={loadingImage} alt="Loading" />
            </div>
            {newRiddle && <p>{t("Loading")}...</p>}
          </>
        )}
        {!gameOver && !isLoading && riddle && riddle.image !== undefined && (
          <>
            <img className="image-wrapper" src={riddle.image} alt="Movie" />
            <div className="button-container">
              {riddle.options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className="nes-btn"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default withTranslation()(Riddle);
