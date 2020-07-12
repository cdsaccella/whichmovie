import {
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  SET_TIMEOUT,
  SET_ERROR,
  RESET_GAME,
} from './types.js';

const EMPTY_STATE = {
  score: 0,
  riddle: {},
  gameOver: false,
  isLoading: false,
};

function riddleReducer(state, action) {
  switch (action.type) {
    case NEW_RIDDLE_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case SET_CURRENT_RIDDLE:
      return {
        ...state,
        riddle: action.payload,
        isLoading: false,
      };
    case SET_CORRECT_ANSWER:
      return {
        ...state,
        score: state.score + 1,
      };
    case SET_WRONG_ANSWER:
      return {
        ...state,
        gameOver: true,
      };
    case SET_TIMEOUT:
      return {
        ...state,
        gameOver: true,
      };
    case SET_ERROR:
      return EMPTY_STATE;
    case RESET_GAME:
      return EMPTY_STATE;
    default:
      return state;
  }
}

export default riddleReducer;
