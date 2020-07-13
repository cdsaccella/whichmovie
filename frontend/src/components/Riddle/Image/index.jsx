import React, { useContext, useState, useEffect } from "react";
import RiddleContext from "context/RiddleContext";
import loadingImage from "assets/loading2x.gif";
import "./styles.css";

function RiddleImage() {
  const { state } = useContext(RiddleContext);

  const [source, setSource] = useState(null);

  useEffect(() => {
    if (state.isLoading) {
      setSource(null);
      return;
    }
    if (state.riddle.image) {
      const imageLoader = new Image();
      imageLoader.src = state.riddle.image;
      imageLoader.onload = () => {
        setSource(state.riddle.image);
      };
    }
  }, [state.isLoading, state.riddle]);

  return (
    <div
      className="image-wrapper"
      style={{ backgroundImage: `url(${source || loadingImage})` }}
    />
  );
}

export default RiddleImage;
