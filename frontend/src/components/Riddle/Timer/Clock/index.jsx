import React from "react";

function index({ second }) {
  return (
    <span className="score">
      {Math.floor(second / 60)} : {String(second % 60).padStart(2, "0")}
    </span>
  );
}

export default index;
