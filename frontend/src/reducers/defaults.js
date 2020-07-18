export const GAME_MODE_EMPTY_STATE = {
  title: '',
  inGameReducer: {},
  difficultyReducer: {},
}

export const IN_GAME_EMPTY_STATE = {
  time: 0,
  lives: 0,
  score: 0,
  isPlaying: false,
  riddle: {
    options: [],
  },
  gameOver: false,
  isLoading: false,
  resolved: false,
};
