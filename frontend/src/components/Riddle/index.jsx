import React, { useEffect, useReducer, useCallback } from "react";
import { withTranslation } from "react-i18next";
import loadingImage from "assets/loading2x.gif";
import { assertRiddle, getNewRiddle } from "services/RiddleService.js";
import Stars from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import "./styles.css";
import { riddleReducer, EMPTY_STATE } from "reducers/RiddleReducer";
import {
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  RESET_GAME,
} from "reducers/types.js";
import RiddleContext from "context/RiddleContext.js";

const settings = {
  timePerRiddle: 20,
  scoreLimit: 10,
};

function Riddle({ t, i18n }) {
  const [state, dispatch] = useReducer(riddleReducer, EMPTY_STATE);

  const selectOption = async (option) => {
    const result = await assertRiddle(state.riddle.id, option);
    dispatch({ type: result ? SET_CORRECT_ANSWER : SET_WRONG_ANSWER });
  };

  const restartGame = () => {
    dispatch({ type: RESET_GAME });
    loadNewRiddle();
  };

  const loadNewRiddle = useCallback(() => {
    dispatch({ type: NEW_RIDDLE_REQUESTED });
    getNewRiddle(i18n.language).then((riddle) =>
      dispatch({ type: SET_CURRENT_RIDDLE, payload: riddle })
    );
  }, [i18n.language]);

  // get new riddle at start
  useEffect(() => {
    loadNewRiddle();
  }, [loadNewRiddle]);

  // after each response, check if new riddle is needed
  useEffect(() => {
    if (state.resolved && !state.gameOver) {
      loadNewRiddle();
    }
  }, [state.resolved, state.gameOver, loadNewRiddle]);

  return (
    <RiddleContext.Provider value={{ state, dispatch }}>
      {state.gameOver && (
        <div className="game-over-wrapper">
          <div>
            <p>{t("Game over")}</p>
            <p>{`${t("Your score was ")} ${state.score} ${t(
              "riddles guessed."
            )}`}</p>
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
    </RiddleContext.Provider>
  );
}

export default withTranslation()(Riddle);
