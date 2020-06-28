import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Riddle.css";
import { assertRiddle, getNewRiddle } from "../../services/RiddleService.js";

function Riddle(props) {
  const [image, setImage] = useState({});
  const [options, setOptions] = useState([]);
  const [riddle, setRiddle] = useState("");
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function getData() {
      const newRiddle = await getNewRiddle();
      setImage(newRiddle.data.image);
      setOptions(newRiddle.data.options);
      setRiddle(newRiddle.data.riddle);
      setIsLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (option === null) return;
    async function checkAnswer() {
      const result = await assertRiddle(riddle, option);
      setIsLoading(false);
      if (!result.data.result) setGameOver(true);
    }
    checkAnswer();
  }, [riddle, option]);

  const selectOption = (option) => {
    setOption(option);
  };

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Try it!</p>
      {isLoading && (
        <progress className="nes-progress" value="90" max="100"></progress>
      )}
      {!gameOver && !isLoading && <img src={image} alt="Movie"></img>}
      {!gameOver &&
        options.map((option, index) => (
          <div key={index} className="nes-field">
            <div className="button-container">
              <button
                type="button"
                className="nes-btn"
                onClick={() => selectOption(option)}
              >
                {option}
              </button>
            </div>
          </div>
        ))}
      {gameOver && <p>You lost!</p>}
    </div>
  );
}

Riddle.propTypes = {
  image: PropTypes.string,
  options: PropTypes.array,
};

export default Riddle;
