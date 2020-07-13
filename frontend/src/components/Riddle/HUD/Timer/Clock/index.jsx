import React, { useEffect, useState } from "react";
import Item from "../../Item/index.jsx";

function Clock({ second }) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const minutes = Math.floor(second / 60);
    const seconds = second % 60;
    const padStart = (text) => String(text).padStart(2, "0");
    setTimeString(`${padStart(minutes)}:${padStart(seconds)}`);
  }, [second]);

  return <Item label={timeString} iconClass="clock"></Item>;
}

export default Clock;
