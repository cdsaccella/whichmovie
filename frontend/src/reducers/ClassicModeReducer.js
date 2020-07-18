import {
  SET_EASY,
  SET_NORMAL,
  SET_HARD,
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  SET_TIMEOUT,
  SET_ERROR,
  RESET_GAME,
} from './types';
import { GAME_SETTINGS_EMPTY_STATE, IN_GAME_EMPTY_STATE } from './defaults';
import Log from '../services/LogService';

export const classicModeDifficultyReducer = (state, action) => {
  Log.info(action, 'Classic Mode Difficulty Reducer');
  switch (action.type) {
    case SET_EASY:
      return {
        ...state,
        time: 60,
        lives: 5,
        options: 4,
        dimensions: 0,
      };
    case SET_NORMAL:
      return {
        ...state,
        time: 120,
        lives: 3,
        options: 6,
        dimensions: 0,
      };
    case SET_HARD:
      return {
        ...state,
        time: 10,
        lives: 1,
        options: 8,
        dimensions: 0,
      };
    default:
      return GAME_SETTINGS_EMPTY_STATE;
  }
}

export const classicModeInGameReducer = (state, action) => {
  Log.info(action, 'Classic Mode In Game Reducer');
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
        gameOver: true,
        resolved: true,
      };
    case SET_TIMEOUT:
      return {
        ...state,
        gameOver: true,
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
