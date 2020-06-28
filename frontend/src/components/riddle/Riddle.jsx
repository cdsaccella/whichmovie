import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Riddle.css";

function Riddle(props) {
  const [image, setImage] = useState({});
  const [options, setOptions] = useState([]);
  const [riddle, setRiddle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/riddles`)
      .then((res) => res.json())
      .then((res) => {
        setImage(res.data.image);
        setOptions(res.data.options);
        setRiddle(res.data.riddle);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Try it!</p>
      {isLoading && (
        <progress className="nes-progress" value="90" max="100"></progress>
      )}
      <img src={image}></img>
      {options.map((option, index) => (
        <div key={index} className="nes-field">
          <div className="button-container">
            <button type="button" className="nes-btn">
              {option}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

Riddle.propTypes = {
  image: PropTypes.string,
  options: PropTypes.array,
};

export default Riddle;
