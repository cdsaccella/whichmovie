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

export const timeTrialModeDifficultyOptions = {
  easy: {
    time: 120,
    lives: 5,
    options: 4,
    dimensions: 0,
    timeCost: 1,
  },
  medium: {
    time: 60,
    lives: 3,
    options: 6,
    dimensions: 0,
    timeCost: 3,
  },
  hard: {
    time: 30,
    lives: 1,
    options: 8,
    dimensions: 0,
    timeCost: 5,
  },
};

export const timeTrialInGameReducer = (state, action) => {
  switch (action.type) {
    case SET_TICK:
      return {
        ...state,
        time: state.time - 1,
      };
    case SET_SETTINGS:
      return {
        ...state,
        time: action.payload.time,
        lives: action.payload.lives,
        timeDiscount: action.payload.timeCost,
      };
    case NEW_RIDDLE_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isPlaying: false,
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
        resolved: true,
        isPlaying: false,
        lives: state.lives - 1,
        gameOver: state.lives === 0,
      };
    case SET_TIMEOUT:
      return {
        ...state,
        gameOver: true,
        resolved: true,
        isPlaying: false,
        lives: state.lives - 1,
      };
    case SET_ERROR:
      return IN_GAME_EMPTY_STATE;
    case RESET_GAME:
      return {
        ...IN_GAME_EMPTY_STATE,
        time: action.payload.time,
        lives: action.payload.lives,
      };
    default:
      return state;
  }
};
