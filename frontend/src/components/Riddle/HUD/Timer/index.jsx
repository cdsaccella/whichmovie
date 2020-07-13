import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import RiddleContext from "context/RiddleContext.js";
import { SET_TIMEOUT } from "reducers/types.js";
import Log from "services/LogService";
import Clock from "./Clock/index.jsx";

function Timer({ seconds, type }) {
  const [color, setColor] = useState("is-success");
  const [warningValue, setWarningValue] = useState();
  const [errorValue, setErrorValue] = useState();
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  const { state, dispatch } = useContext(RiddleContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.isLoading) {
        setRemainingSeconds((remainingSeconds) => remainingSeconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state.isLoading]);

  useEffect(() => {
    setWarningValue(seconds * 0.6);
    setErrorValue(seconds * 0.2);
  }, [seconds]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      Log.trace("Dispatching TIMEOUT", Timer.name);
      dispatch({ type: SET_TIMEOUT });
    }
    if (state.isLoading) {
      setRemainingSeconds(seconds);
      setColor(String.empty);
    } else if (remainingSeconds > warningValue) setColor("is-success");
    else if (remainingSeconds > errorValue) setColor("is-warning");
    else setColor("is-error");
  }, [
    state.isLoading,
    seconds,
    remainingSeconds,
    warningValue,
    errorValue,
    dispatch,
  ]);

  return (
    <>
      {type === "progress" && (
        <progress
          className={"nes-progress " + color}
          value={remainingSeconds}
          max={seconds}
        ></progress>
      )}
      {type === "clock" && <Clock second={remainingSeconds}></Clock>}
    </>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
  type: PropTypes.oneOf(["progress", "clock"]).isRequired,
};

export default Timer;
