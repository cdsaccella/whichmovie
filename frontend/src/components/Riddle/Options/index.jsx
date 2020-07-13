import React, { useContext, useEffect, useState } from "react";
import RiddleContext from "context/RiddleContext";
import { assertRiddle } from "services/RiddleService.js";
import { SET_CORRECT_ANSWER, SET_WRONG_ANSWER } from "reducers/types.js";
import "./styles.css";
import Log from "services/LogService";

const EMPTY_OPTION = "...";
const EMPTY_OPTIONS = new Array(6).fill(EMPTY_OPTION);

function Options() {
  const { state, dispatch } = useContext(RiddleContext);

  const [options, setOptions] = useState([]);

  const selectOption = async (option) => {
    if (option === EMPTY_OPTION) return;
    const result = await assertRiddle(state.riddle.id, option);
    Log.trace("Dispatching ANSER_RESPONSE", Options.name);
    dispatch({ type: result ? SET_CORRECT_ANSWER : SET_WRONG_ANSWER });
  };

  useEffect(() => {
    if (!state.isLoading && state.riddle.options) {
      setOptions(state.riddle.options);
    } else {
      setOptions(EMPTY_OPTIONS);
    }
  }, [state.riddle.options, state.isLoading]);

  return (
    <div className="button-container">
      {options.map((option, index) => (
        <button
          key={option + index}
          type="button"
          className="nes-btn"
          onClick={() => selectOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
