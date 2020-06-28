import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Riddle.css";
import { assertRiddle, getNewRiddle } from "../../services/RiddleService.js";
import Stars from "./Stars.jsx";

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

  useEffect(() => {
    if (!newRiddle) return;
    setIsLoading(true);
    async function getData() {
      const newRiddle = await getNewRiddle();
      setImage(newRiddle.data.image);
      setOptions(newRiddle.data.options);
      setRiddle(newRiddle.data.riddle);
      setNewRiddle(false);
      setIsLoading(false);
    }
    getData();
  }, [newRiddle]);

  useEffect(() => {
    if (option === null) return;
    async function checkAnswer() {
      const result = await assertRiddle(riddle, option);
      setIsLoading(false);
      setOption(null);
      if (result.data.result) {
        setCounter(counter + 1);
        setNewRiddle(true);
      } else {
        setGameOver(true);
      }
    }
    checkAnswer();
  }, [counter, riddle, option]);

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
    <div className="nes-container with-title is-centered">
      <p className="title">Try it!</p>
      {isLoading && (
        <progress className="nes-progress" value="90" max="100"></progress>
      )}
      {!gameOver && !isLoading && (
        <>
          <Stars stars={counter} maxStars={MAX_POINTS} />
          <img src={image} alt="Movie"></img>
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
      {gameOver && (
        <>
          <p>You lost!</p>
          <button
            type="button"
            className="nes-btn"
            onClick={() => restartGame()}
          >
            Restart game
          </button>
        </>
      )}
    </div>
  );
}

Riddle.propTypes = {
  image: PropTypes.string,
  options: PropTypes.array,
};

export default Riddle;
