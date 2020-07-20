import {
  SET_CLASSIC_MODE,
  SET_TIME_TRIAL_MODE,
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
        difficulty: 'medium',
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
        difficulty: 'medium',
        lives: false,
        time: true,
        score: true,
      };
    default:
      return state;
  }
};

export default gameModeReducer;
