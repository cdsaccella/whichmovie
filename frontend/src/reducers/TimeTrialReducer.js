import {
  SET_EASY,
  SET_MEDIUM,
  SET_HARD,
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  SET_TIMEOUT,
  SET_ERROR,
  RESET_GAME,
} from './types';
import { IN_GAME_EMPTY_STATE } from './defaults';

export const timeTrialInGameReducer = (state, action) => {
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
        resolved: false,
      };
    case SET_CORRECT_ANSWER:
      return {
        ...state,
        score: state.score + 1,
        resolved: true,
      };
    case SET_WRONG_ANSWER:
      return {
        ...state,
        resolved: true,
      };
    case SET_TIMEOUT:
      return {
        ...state,
        resolved: true,
      };
    case SET_ERROR:
      return IN_GAME_EMPTY_STATE;
    case RESET_GAME:
      return IN_GAME_EMPTY_STATE;
    default:
      return state;
  }
};
