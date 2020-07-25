import {
  SET_CLASSIC_MODE,
  SET_TIME_TRIAL_MODE,
  EASY,
  NORMAL,
  HARD,
  SET_EASY_MODE,
  SET_NORMAL_MODE,
  SET_HARD_MODE,
} from './types';
import { classicModeDifficultyOptions, classicModeInGameReducer } from './ClassicModeReducer';
import { timeTrialModeDifficultyOptions, timeTrialInGameReducer } from './TimeTrialReducer';
import Log from '../services/LogService';

const gameModeReducer = (state, action) => {
  Log.info(action, 'Game Mode Reducer');
  switch (action.type) {
    case SET_CLASSIC_MODE:
      return {
        ...state,
        title: 'Classic Mode',
        inGameReducer: classicModeInGameReducer,
        difficultyOptions: classicModeDifficultyOptions,
        difficulty: NORMAL,
        lives: true,
        time: true,
        score: true,
      };
    case SET_TIME_TRIAL_MODE:
      return {
        ...state,
        title: 'Time Trial Mode',
        inGameReducer: timeTrialInGameReducer,
        difficultyOptions: timeTrialModeDifficultyOptions,
        difficulty: NORMAL,
        lives: false,
        time: true,
        score: true,
      };
    case SET_EASY_MODE:
      return {
        ...state,
        difficulty: EASY,
      };
    case SET_NORMAL_MODE:
      return {
        ...state,
        difficulty: NORMAL,
      };
    case SET_HARD_MODE:
      return {
        ...state,
        difficulty: HARD,
      };
    default:
      return state;
  }
};

export default gameModeReducer;
