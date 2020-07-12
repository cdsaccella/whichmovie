import React, { useEffect, useReducer, useCallback } from "react";
import { withTranslation } from "react-i18next";
import { getNewRiddle } from "services/RiddleService.js";
import Stars from "./Score/index.jsx";
import Timer from "./Timer/index.jsx";
import Image from "./Image/index.jsx";
import Restart from "./Restart/index.jsx";
import "./styles.css";
import { normalModeReducer, EMPTY_STATE } from "reducers/NormalModeReducer";
import { timeTrialReducer } from "reducers/TimeTrialReducer";
import { NEW_RIDDLE_REQUESTED, SET_CURRENT_RIDDLE } from "reducers/types.js";
import RiddleContext from "context/RiddleContext.js";
import Options from "./Options/index.jsx";
import Log from "services/LogService";

const settings = {
  timePerRiddle: 200,
};

const reducers = {
  timeTrial: timeTrialReducer,
  normalMode: normalModeReducer,
};

function Riddle({ t, i18n, type }) {
  const [state, dispatch] = useReducer(reducers[type], EMPTY_STATE);

  const loadNewRiddle = useCallback(() => {
    Log.trace("Calling new riddle", Riddle.name);
    dispatch({ type: NEW_RIDDLE_REQUESTED });
    getNewRiddle(i18n.language).then((riddle) => {
      Log.trace("Getting new riddle", Riddle.name);
      dispatch({ type: SET_CURRENT_RIDDLE, payload: riddle });
    });
  }, [i18n.language, dispatch]);

  // get new riddle at start
  useEffect(() => {
    Log.trace("Getting first riddle", Riddle.name);
    loadNewRiddle();
  }, [loadNewRiddle]);

  // after each answer, check if new riddle is needed
  useEffect(() => {
    if (state.resolved && !state.gameOver) {
      Log.trace("Checking for new riddle and loading", Riddle.name);
      loadNewRiddle();
    } else {
      Log.trace("No new riddle", Riddle.name);
    }
  }, [state.resolved, state.gameOver, loadNewRiddle]);

  return (
    <RiddleContext.Provider value={{ state, dispatch }}>
      <div className={state.gameOver ? "game-over-wrapper" : "content-wrapper"}>
        {state.gameOver ? (
          <Restart loadNewRiddle={() => loadNewRiddle()}></Restart>
        ) : (
          <div className="sections">
            <div className="row">
              <Timer seconds={settings.timePerRiddle} type="progress"></Timer>
              <Stars stars={state.score} />
            </div>
            <Image></Image>
            <Options></Options>
          </div>
        )}
      </div>
    </RiddleContext.Provider>
  );
}

export default withTranslation()(Riddle);
