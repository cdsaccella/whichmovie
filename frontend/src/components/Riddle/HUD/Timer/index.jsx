import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import RiddleContext from "context/RiddleContext.js";
import { SET_TIMEOUT, SET_TICK } from "reducers/types.js";
import Log from "services/LogService";
import Clock from "./Clock/index.jsx";

function Timer({ seconds, type }) {
  const [color, setColor] = useState("is-success");
  const [warningValue, setWarningValue] = useState();
  const [errorValue, setErrorValue] = useState();

  const { state, dispatch } = useContext(RiddleContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isPlaying) {
        dispatch({ type: SET_TICK });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state.isLoading, dispatch, state.isPlaying]);

  useEffect(() => {
    setWarningValue(seconds * 0.6);
    setErrorValue(seconds * 0.2);
  }, [seconds]);

  useEffect(() => {
    if (state.time === 0 && state.isPlaying) {
      Log.trace("Dispatching TIMEOUT", Timer.name);
      dispatch({ type: SET_TIMEOUT });
    }
    if (state.isLoading) {
      setColor(String.empty);
    } else if (state.time > warningValue) setColor("is-success");
    else if (state.time > errorValue) setColor("is-warning");
    else setColor("is-error");
  }, [
    state.isLoading,
    seconds,
    state.time,
    state.isPlaying,
    warningValue,
    errorValue,
    dispatch,
  ]);

  return (
    <>
      {type === "progress" && (
        <progress
          className={"nes-progress " + color}
          value={state.time}
          max={seconds}
        ></progress>
      )}
      {type === "clock" && <Clock second={state.time}></Clock>}
    </>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
  type: PropTypes.oneOf(["progress", "clock"]).isRequired,
};

export default Timer;
