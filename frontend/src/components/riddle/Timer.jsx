import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ progress }) {
  const [color, setColor] = useState("is-success");

  useEffect(() => {
    if (progress > 60) setColor("is-success");
    else if (progress > 20) setColor("is-warning");
    else setColor("is-error");
  }, [progress]);

  return (
    <>
      <progress
        className={"nes-progress " + color}
        value={progress}
        max="100"
      ></progress>
    </>
  );
}

Timer.propTypes = {
  progress: PropTypes.number,
};

export default Timer;
