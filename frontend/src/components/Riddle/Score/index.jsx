import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Stars({ stars }) {
  return (
    <div className="score-container">
      <i
        className={
          "nes-icon star custom-star " +
          (stars === 0 ? "is-empty" : String.empty)
        }
      ></i>
      <span className="score-cross">x</span>
      <span className="score-points">{stars}</span>
    </div>
  );
}

Stars.propTypes = {
  stars: PropTypes.number,
};

export default Stars;
