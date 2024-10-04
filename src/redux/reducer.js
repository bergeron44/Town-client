// src/redux/reducers.js

import { combineReducers } from 'redux';
import { SET_GAME_CODE, SET_CHARACTER, SET_PLAYER_NAME, SET_ALIVE } from './actionTypes';

const gameCodeReducer = (state = '', action) => {
  switch (action.type) {
    case SET_GAME_CODE:
      return action.payload;
    default:
      return state;
  }
};

const characterReducer = (state = null, action) => {
  switch (action.type) {
    case SET_CHARACTER:
      return action.payload;
    default:
      return state;
  }
};

const playerNameReducer = (state = '', action) => {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return action.payload;
    default:
      return state;
  }
};

const aliveReducer = (state = true, action) => {
  switch (action.type) {
    case SET_ALIVE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  gameCode: gameCodeReducer,
  character: characterReducer,
  playerName: playerNameReducer,
  isAlive: aliveReducer,
});

export default rootReducer;
