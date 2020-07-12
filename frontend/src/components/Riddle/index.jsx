import React, { useEffect, useReducer } from "react";
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
import riddleReducer from "reducers/RiddleReducer";
import {
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  SET_TIMEOUT,
  RESET_GAME,
} from "reducers/types.js";

const settings = {
  timePerRiddle: 20,
  scoreLimit: 10,
};

const initialState = {
  score: 0,
  riddle: NO_RIDDLE,
  gameOver: false,
  isLoading: false,
};

function Riddle({ t, i18n }) {
  const [state, dispatch] = useReducer(riddleReducer, initialState);

  const selectOption = async (option) => {
    const result = await assertRiddle(state.riddle.id, option);
    if (result) {
      dispatch({ type: SET_CORRECT_ANSWER });
      newRiddle();
    } else {
      dispatch({ type: SET_WRONG_ANSWER });
    }
  };

  const newRiddle = () => {
    dispatch({ type: NEW_RIDDLE_REQUESTED });
    getNewRiddle(i18n.language).then((riddle) =>
      dispatch({ type: SET_CURRENT_RIDDLE, payload: riddle })
    );
  };

  const restartGame = () => {
    dispatch({ type: RESET_GAME });
    newRiddle();
  };

  const riddleTimeout = () => {
    dispatch({ type: SET_TIMEOUT });
  };

  useEffect(newRiddle, []);

  return (
    <>
      {state.gameOver && (
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
        {!state.gameOver && (
          <>
            <div className="section">
              <Timer
                seconds={settings.timePerRiddle}
                standBy={state.isLoading}
                timeoutCallback={() => riddleTimeout()}
              ></Timer>
            </div>
            <div className="section">
              <Stars stars={state.score} maxStars={settings.scoreLimit} />
            </div>
          </>
        )}
        {state.isLoading && (
          <>
            <div className="section">
              <img className="image-wrapper" src={loadingImage} alt="Loading" />
            </div>
            <p>{t("Loading")}...</p>
          </>
        )}
        {!state.gameOver &&
          !state.isLoading &&
          state.riddle &&
          state.riddle.image !== undefined && (
            <>
              <img
                className="image-wrapper"
                src={state.riddle.image}
                alt="Movie"
              />
              <div className="button-container">
                {state.riddle.options.map((option, index) => (
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
