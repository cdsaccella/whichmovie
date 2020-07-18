import {
  SET_CLASSIC_MODE,
  SET_TIME_TRIAL_MODE,
} from './types';
import { classicModeDifficultyReducer, classicModeInGameReducer } from "./ClassicModeReducer";
import { timeTrialInGameReducer } from "./TimeTrialReducer";
import { DIFFICULTY_EMPTY_STATE, IN_GAME_EMPTY_STATE } from './defaults';
import Log from '../services/LogService';

export const gameModeReducer = (state, action) => {
  Log.info(action, 'Game Mode Reducer');
  switch (action.type) {
    case SET_CLASSIC_MODE:
      return {
        ...state,
        title: 'Classic Mode',
        inGameReducer: classicModeInGameReducer,
        difficultyReducer: classicModeDifficultyReducer,
      };
    case SET_TIME_TRIAL_MODE:
      return {
        ...state,
        title: 'Time Trial Mode',
        inGameReducer: timeTrialInGameReducer,
      };
    default:
      return state;
  }
};