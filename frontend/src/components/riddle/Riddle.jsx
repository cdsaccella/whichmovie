import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Riddle.css";
import { assertRiddle, getNewRiddle } from "../../services/RiddleService.js";
import Stars from "./Stars.jsx";
import Timer from "./Timer.jsx";

function Riddle(props) {
  const MAX_POINTS = 10;

  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [riddle, setRiddle] = useState("");
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [newRiddle, setNewRiddle] = useState(true);
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(100);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!newRiddle) return;
    setIsLoading(true);
    clearInterval(intervalId);
    async function getData() {
      const newRiddle = await getNewRiddle();
      setImage(newRiddle.data.image);
      setOptions(newRiddle.data.options);
      setRiddle(newRiddle.data.riddle);
      setNewRiddle(false);
      setIsLoading(false);
    }
    getData();
    setTime(100);
    const id = setInterval(() => {
      setTime((time) => time - 10);
    }, 1000);
    setIntervalId(id);
  }, [newRiddle]);

  useEffect(() => {
    if (time < 0) {
      setGameOver(true);
      clearInterval(intervalId);
    }
  }, [intervalId, time]);

  useEffect(() => {
    if (option === null) return;
    async function checkAnswer() {
      const result = await assertRiddle(riddle, option);
      setIsLoading(false);
      setOption(null);
      if (result.data.result) {
        setCounter((counter) => counter + 1);
        setNewRiddle(true);
      } else {
        setGameOver(true);
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
    setImage("");
    setOptions([]);
    setOption(null);
    setRiddle("");
    setGameOver(false);
    setCounter(0);
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
        {!gameOver && !isLoading && <Timer progress={time}></Timer>}
        {!gameOver && (
          <div className="stars-container">
            <Stars stars={counter} maxStars={MAX_POINTS} />
          </div>
        )}
        {isLoading && (
          <>
            {newRiddle && <p>Loading new riddle...</p>}
            <progress className="nes-progress" value="90" max="100"></progress>
          </>
        )}
        {!gameOver && !isLoading && (
          <>
            <img
              className="image-wrapper image-responsive"
              style={{ imageRendering: "pixelated" }}
              src={image}
              alt="Movie"
            ></img>
            <div className="button-container">
              {options.map((option, index) => (
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

Riddle.propTypes = {
  image: PropTypes.string,
  options: PropTypes.array,
};

export default Riddle;
