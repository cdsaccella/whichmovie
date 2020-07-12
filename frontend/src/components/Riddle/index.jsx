import React, { useEffect, useReducer, useCallback } from "react";
import { withTranslation } from "react-i18next";
import { getNewRiddle } from "services/RiddleService.js";
import Stars from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import Image from "./Image/index.jsx";
import Restart from "./Restart/index.jsx";
import "./styles.css";
import { riddleReducer, EMPTY_STATE } from "reducers/RiddleReducer";
import { NEW_RIDDLE_REQUESTED, SET_CURRENT_RIDDLE } from "reducers/types.js";
import RiddleContext from "context/RiddleContext.js";
import Options from "./Options/index.jsx";

const settings = {
  timePerRiddle: 200,
};

function Riddle({ t, i18n }) {
  const [state, dispatch] = useReducer(riddleReducer, EMPTY_STATE);

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

  // after each answer, check if new riddle is needed
  useEffect(() => {
    if (state.resolved && !state.gameOver) {
      loadNewRiddle();
    }
  }, [state.resolved, state.gameOver, loadNewRiddle]);

  return (
    <RiddleContext.Provider value={{ state, dispatch }}>
      <div className={state.gameOver ? "game-over-wrapper" : "content-wrapper"}>
        {state.gameOver ? (
          <Restart loadNewRiddle={() => loadNewRiddle()}></Restart>
        ) : (
          <div className="sections">
            <Timer seconds={settings.timePerRiddle}></Timer>
            <Stars stars={state.score} />
            <Image></Image>
            <Options></Options>
          </div>
        )}
      </div>
    </RiddleContext.Provider>
  );
}

export default withTranslation()(Riddle);
