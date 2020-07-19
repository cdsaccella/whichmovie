import React from "react";
import PropTypes from "prop-types";
import Item from "../Item/index.jsx";

function Lives({ lives }) {
  return (
    <Item
      label={lives}
      iconClass={"heart " + (lives === 0 ? "is-empty" : String.empty)}
    ></Item>
  );
}

Lives.propTypes = {
  stars: PropTypes.number,
};

export default Lives;
