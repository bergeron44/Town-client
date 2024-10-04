// src/redux/actions.js

import { SET_GAME_CODE, SET_CHARACTER, SET_PLAYER_NAME, SET_ALIVE } from './actionTypes';

// Action Creators
export const setGameCode = (code) => ({ type: SET_GAME_CODE, payload: code });
export const setCharacter = (character) => ({ type: SET_CHARACTER, payload: character });
export const setPlayerName = (name) => ({ type: SET_PLAYER_NAME, payload: name });
export const setAlive = (isAlive) => ({ type: SET_ALIVE, payload: isAlive });
