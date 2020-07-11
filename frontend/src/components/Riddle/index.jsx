import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import {
  assertRiddle,
  getNewRiddle,
  NO_RIDDLE,
} from "../../services/RiddleService.js";
import Stars from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import loadingImage from "assets/loading2x.gif";
import { withTranslation } from "react-i18next";

function Riddle({ t, i18n }) {
  const MAX_POINTS = 10;
  const TIME = 200;

  const [isLoading, setIsLoading] = useState(true);
  const [riddle, setRiddle] = useState(NO_RIDDLE);
  const [option, setOption] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [newRiddle, setNewRiddle] = useState(true);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(100);
  const timerToClearSomewhere = useRef(null);

  useEffect(() => {
    if (!newRiddle) return;
    setIsLoading(true);
    if (timerToClearSomewhere) clearInterval(timerToClearSomewhere.current);
    async function getData() {
      setRiddle(await getNewRiddle(i18n.language));
      setIsLoading(false);
      setNewRiddle(false);
      setTime(TIME);
      timerToClearSomewhere.current = setInterval(() => {
        setTime((time) => time - 10);
      }, 1000);
    }
    getData();
  }, [i18n.language, newRiddle]);

  useEffect(() => {
    if (time < 0) {
      setGameOver(true);
      clearInterval(timerToClearSomewhere.current);
    }
  }, [time]);

  useEffect(() => {
    if (option === null) return;
    async function checkAnswer() {
      const result = await assertRiddle(riddle.id, option);
      if (result) {
        setScore((score) => score + 1);
        setOption(null);
        setNewRiddle(true);
      } else {
        setGameOver(true);
        clearInterval(timerToClearSomewhere.current);
      }
    }
    checkAnswer();
  }, [riddle, option]);

  const selectOption = (option) => {
    setOption(option);
  };

  const restartGame = () => {
    refreshGame();
    setNewRiddle(true);
  };

  const refreshGame = () => {
    setOption(null);
    setRiddle(NO_RIDDLE);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="riddle-host nes-container with-title is-centered">
      <p className="title">{t("Try it!")}</p>
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
              progress={isLoading ? TIME : time}
              maxValue={TIME}
              waiting={isLoading}
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
    </div>
  );
}

export default withTranslation()(Riddle);
