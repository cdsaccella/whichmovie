import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Stars.css";

function Stars({ stars, maxStars }) {
  const paintedStars = [];
  const emptyStars = [];
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

// Hook
function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
