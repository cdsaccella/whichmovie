import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ seconds, standBy, timeoutCallback }) {
  const [color, setColor] = useState("is-success");
  const [warningValue, setWarningValue] = useState();
  const [errorValue, setErrorValue] = useState();
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!standBy) {
        setRemainingSeconds((remainingSeconds) => remainingSeconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [standBy]);

  useEffect(() => {
    setWarningValue(seconds * 0.6);
    setErrorValue(seconds * 0.2);
  }, [seconds]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      timeoutCallback();
    }
    if (standBy) {
      setRemainingSeconds(seconds);
      setColor(String.empty);
    } else if (remainingSeconds > warningValue) setColor("is-success");
    else if (remainingSeconds > errorValue) setColor("is-warning");
    else setColor("is-error");
  }, [
    standBy,
    seconds,
    timeoutCallback,
    remainingSeconds,
    warningValue,
    errorValue,
  ]);

  return (
    <>
      <progress
        className={"nes-progress " + color}
        value={remainingSeconds}
        max={seconds}
      ></progress>
    </>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
  remainingSeconds: PropTypes.number,
  standBy: PropTypes.bool,
  timeoutCallback: PropTypes.func,
};

export default Timer;
