import React from "react";
import PropTypes from "prop-types";

function Stars({ stars, maxStars }) {
  const paintedStars = [];
  const emptyStars = [];

  for (let i = 0; i < stars; i++) {
    paintedStars.push(<i class="nes-icon is-large star"></i>);
  }

  for (let i = 0; i < maxStars - stars; i++) {
    emptyStars.push(<i class="nes-icon is-large star  is-empty"></i>);
  }

  return (
    <>
      {paintedStars}
      {emptyStars}
    </>
  );
}

Stars.propTypes = {
  stars: PropTypes.number,
  maxStars: PropTypes.number,
};

export default Stars;
