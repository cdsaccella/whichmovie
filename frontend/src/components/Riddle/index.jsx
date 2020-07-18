import React, { useEffect, useReducer, useCallback, useContext } from "react";
import { withTranslation } from "react-i18next";
import { getNewRiddle } from "services/RiddleService.js";
import Image from "./Image/index.jsx";
import HUD from "./HUD/index.jsx";
import Restart from "./Restart/index.jsx";
import "./styles.css";
import {
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_SETTINGS,
} from "reducers/types.js";
import RiddleContext from "context/RiddleContext.js";
import Options from "./Options/index.jsx";
import Log from "services/LogService";
import GameModeContext from "context/GameModeContext.js";
import { IN_GAME_EMPTY_STATE } from "reducers/defaults";

function Riddle({ t, i18n, type }) {
  const { gameModeState } = useContext(GameModeContext);
  const [state, dispatch] = useReducer(
    gameModeState.inGameReducer,
    IN_GAME_EMPTY_STATE
  );

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
    dispatch({
      type: SET_SETTINGS,
      payload: gameModeState.difficultyOptions[gameModeState.difficulty],
    });
    loadNewRiddle();
  }, [
    loadNewRiddle,
    gameModeState.difficultyOptions,
    gameModeState.difficulty,
  ]);

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
            <HUD></HUD>
            <Image></Image>
            <Options></Options>
          </div>
        )}
      </div>
    </RiddleContext.Provider>
  );
}

export default withTranslation()(Riddle);
