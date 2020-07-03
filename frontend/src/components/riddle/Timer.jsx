import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ progress, waiting, maxValue }) {
  const [color, setColor] = useState("is-success");

  useEffect(() => {
    if (waiting) setColor(String.empty);
    else if (progress > 60) setColor("is-success");
    else if (progress > 20) setColor("is-warning");
    else setColor("is-error");
  }, [waiting, progress]);

  return (
    <>
      <progress
        className={"nes-progress " + color}
        value={progress}
        max={maxValue ?? 100}
      ></progress>
    </>
  );
}

Timer.propTypes = {
  progress: PropTypes.number,
  maxValue: PropTypes.number,
  waiting: PropTypes.bool,
};

export default Timer;
