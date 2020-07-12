import React from "react";
import useWindowSize from "hooks/useWindowSize";
import PropTypes from "prop-types";
import "./styles.css";

function Stars({ stars, maxStars }) {
  const size = useWindowSize();

  let content = <></>;

  if (size.width > 600) {
    const elements = [];

    for (let i = 0; i < stars; i++) {
      elements.push(
        <i key={i} className="nes-icon is-large star custom-star"></i>
      );
    }

    for (let i = 0; i < maxStars - stars; i++) {
      elements.push(
        <i
          key={maxStars - i}
          className="nes-icon is-large star custom-star is-empty"
        ></i>
      );
    }

    content = <>{elements}</>;
  } else {
    content = (
      <>
        <i
          className={
            "nes-icon is-large star custom-star " +
            (stars === 0 ? "is-empty" : String.empty)
          }
        ></i>
        <span className="score"> x {stars}</span>
      </>
    );
  }

  return content;
}

Stars.propTypes = {
  stars: PropTypes.number,
  maxStars: PropTypes.number,
};

export default Stars;
