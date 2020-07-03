import React, { useState, useEffect, useRef } from "react";
import "./Riddle.css";
import {
  assertRiddle,
  getNewRiddle,
  NO_RIDDLE,
} from "../../services/RiddleService.js";
import Stars from "./Stars.jsx";
import Timer from "./Timer.jsx";
import loadingImage from "../../assets/loadingImage.jpg";
import { Pixelify } from "react-pixelify";

function Riddle() {
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

  let riddleRef = useRef(NO_RIDDLE);

  useEffect(() => {
    if (!newRiddle) return;
    setIsLoading(true);
    if (timerToClearSomewhere) clearInterval(timerToClearSomewhere.current);
    async function getData() {
      setRiddle(await getNewRiddle());
      setIsLoading(false);
      setNewRiddle(false);
      setTime(TIME);
      timerToClearSomewhere.current = setInterval(() => {
        setTime((time) => time - 10);
      }, 1000);
    }
    getData();
  }, [newRiddle]);

  useEffect(() => {
    riddleRef.current = riddle;
  }, [riddle]);

  useEffect(() => {
    if (time < 0) {
      setGameOver(true);
      clearInterval(timerToClearSomewhere.current);
    }
  }, [time]);

  useEffect(() => {
    if (option === null) return;
    async function checkAnswer() {
      const result = await assertRiddle(riddleRef.current.id, option);
      if (result) {
        setScore((score) => score + 1);
        setNewRiddle(true);
      } else {
        setGameOver(true);
      }
    }
    checkAnswer();
  }, [option]);

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
      <p className="title">Try it!</p>

      {gameOver && (
        <div className="game-over-wrapper">
          <div>
            <p>You lost!</p>
            <button
              type="button"
              className="nes-btn"
              onClick={() => restartGame()}
            >
              Restart game
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
            {newRiddle && <p>Loading options...</p>}
          </>
        )}
        {!gameOver && !isLoading && (
          <>
            <div className="image-wrapper">
              <Pixelify src={riddle.image} centered={true} pixelSize={4} />
            </div>
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

export default Riddle;
