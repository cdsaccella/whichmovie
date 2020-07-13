import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Item({ label, separator, iconClass }) {
  return (
    <div className="HUD-item-container">
      <i className={"nes-icon HUD-item-icon " + iconClass}></i>
      {separator ? (
        <span className="HUD-item-separator">{separator}</span>
      ) : (
        <>&nbsp;</>
      )}
      <span className="HUD-item-label">{label}</span>
    </div>
  );
}

Item.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconClass: PropTypes.string.isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Item;
