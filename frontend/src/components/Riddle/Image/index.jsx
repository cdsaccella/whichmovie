import React, { useContext } from "react";
import RiddleContext from "context/RiddleContext";
import loadingImage from "assets/loading2x.gif";
import "./styles.css";

function RiddleImage() {
  const { state } = useContext(RiddleContext);

  return (
    <>
      {state.isLoading || !state.riddle || !state.riddle.image ? (
        <img
          key="loadingImage"
          className="image-wrapper"
          src={loadingImage}
          alt="Loading"
        />
      ) : (
        <img
          key="movieImage"
          className="image-wrapper"
          src={state.riddle.image}
          alt="Movie"
        />
      )}
    </>
  );
}

export default RiddleImage;
