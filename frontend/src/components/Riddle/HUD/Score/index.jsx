import React from "react";
import PropTypes from "prop-types";
import Item from "../Item/index.jsx";

function Score({ stars }) {
  return (
    <Item
      label={stars}
      iconClass={"star " + (stars === 0 ? "is-empty" : String.empty)}
    ></Item>
  );
}

Score.propTypes = {
  stars: PropTypes.number,
};

export default Score;
