import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Riddle(props) {
  const [riddle, setRiddle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/riddles`)
      .then((res) => res.json())
      .then((res) => {
        setRiddle(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="nes-container with-title">
      <p className="title">Try it!</p>
      {isLoading && (
        <progress class="nes-progress" value="90" max="100"></progress>
      )}
      <img src={riddle.image}></img>
    </div>
  );
}

Riddle.propTypes = {
  image: PropTypes.string,
  options: PropTypes.array,
};

export default Riddle;
