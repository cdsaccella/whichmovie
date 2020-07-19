import {
  NEW_RIDDLE_REQUESTED,
  SET_CURRENT_RIDDLE,
  SET_CORRECT_ANSWER,
  SET_WRONG_ANSWER,
  SET_TIMEOUT,
  SET_ERROR,
  RESET_GAME,
  SET_TICK,
  SET_SETTINGS,
} from './types';
import { IN_GAME_EMPTY_STATE } from './defaults';
import Log from '../services/LogService';

export const classicModeDifficultyOptions = {
  easy: {
    time: 60,
    lives: 5,
    options: 4,
    dimensions: 0,
  },
  medium: {
    time: 20,
    lives: 3,
    options: 6,
    dimensions: 0,
  },
  hard: {
    time: 10,
    lives: 1,
    options: 8,
    dimensions: 0,
  },
};

export const classicModeInGameReducer = (state, action) => {
  Log.info(action, 'Classic Mode In Game Reducer');
  switch (action.type) {
    case SET_TICK:
      return {
        ...state,
        time: state.time - 1,
      };
    case SET_SETTINGS:
      return {
        ...state,
        maxTime: action.payload.time,
        lives: action.payload.lives,
      };
    case NEW_RIDDLE_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isPlaying: false,
        time: state.maxTime,
      };
    case SET_CURRENT_RIDDLE:
      return {
        ...state,
        riddle: action.payload,
        isLoading: false,
        resolved: false,
        isPlaying: true,
      };
    case SET_CORRECT_ANSWER:
      return {
        ...state,
        score: state.score + 1,
        resolved: true,
        isPlaying: false,
      };
    case SET_WRONG_ANSWER:
      return {
        ...state,
        gameOver: state.lives === 0,
        resolved: true,
        isPlaying: false,
        lives: state.lives - 1,
      };
    case SET_TIMEOUT:
      return {
        ...state,
        gameOver: state.lives === 0,
        resolved: true,
        isPlaying: false,
        lives: state.lives - 1,
      };
    case SET_ERROR:
      return IN_GAME_EMPTY_STATE;
    case RESET_GAME:
      return {
        ...IN_GAME_EMPTY_STATE,
        maxTime: action.payload.time,
        lives: action.payload.lives,
      };
    default:
      return state;
  }
};
