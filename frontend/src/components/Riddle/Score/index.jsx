import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Stars({ stars }) {
  return (
    <div>
      <i
        className={
          "nes-icon is-large star custom-star " +
          (stars === 0 ? "is-empty" : String.empty)
        }
      ></i>
      <span className="score"> x {stars}</span>
    </div>
  );
}

Stars.propTypes = {
  stars: PropTypes.number,
};

export default Stars;
