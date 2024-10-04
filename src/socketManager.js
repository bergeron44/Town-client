import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the backend server

const socketManager = {
  // Join a game with a game code and player's name
  joinGame: (gameCode, playerName) => {
    socket.emit('joinGame', gameCode, playerName);
  },

  // Player joined event
  onPlayerJoined: (callback) => {
    socket.on('playerJoined', callback);
  },
  offPlayerJoined: (callback) => {
    socket.off('playerJoined', callback);
  },

  // Game created event
  onGameCreated: (callback) => {
    socket.on('gameCreated', callback);
  },
  offGameCreated: (callback) => {
    socket.off('gameCreated', callback);
  },

  // Killer chosen event
  onKillerChosen: (callback) => {
    socket.on('killerChosen', callback);
  },
  offKillerChosen: (callback) => {
    socket.off('killerChosen', callback);
  },

  // Doctor turn event
  onDoctorTurn: (callback) => {
    socket.on('doctorTurn', callback);
  },
  offDoctorTurn: (callback) => {
    socket.off('doctorTurn', callback);
  },

  // Doctor chosen event
  onDoctorChosen: (callback) => {
    socket.on('doctorChosen', callback);
  },
  offDoctorChosen: (callback) => {
    socket.off('doctorChosen', callback);
  },

  // Detective turn event
  onDetectiveTurn: (callback) => {
    socket.on('detectiveTurn', callback);
  },
  offDetectiveTurn: (callback) => {
    socket.off('detectiveTurn', callback);
  },

  // Detective chosen event
  onDetectiveChosen: (callback) => {
    socket.on('detectiveChosen', callback);
  },
  offDetectiveChosen: (callback) => {
    socket.off('detectiveChosen', callback);
  },

  // Wake up event for players
  onWakeUp: (callback) => {
    socket.on('wakeUp', callback);
  },
  offWakeUp: (callback) => {
    socket.off('wakeUp', callback);
  },

  // Player eliminated event
  onPlayerEliminated: (callback) => {
    socket.on('eliminated', callback);
  },
  offPlayerEliminated: (callback) => {
    socket.off('eliminated', callback);
  },

  // Request all players in the game
  requestAllPlayers: (gameCode) => {
    socket.emit('requestAllPlayers', gameCode);
  },

  // All players list event
  onAllPlayersList: (callback) => {
    socket.on('allPlayersList', callback);
  },
  offAllPlayersList: (callback) => {
    socket.off('allPlayersList', callback);
  },

  // Start game event
  startGame: (gameCode) => {
    socket.emit('startGame', gameCode); // Emit start game event
  },

  // Game started event
  onGameStarted: (callback) => {
    socket.on('gameStarted', callback); // Listen for game started event
  },
  offGameStarted: (callback) => {
    socket.off('gameStarted', callback);
  },

  // Cleanup all socket listeners
  cleanup: () => {
    socket.removeAllListeners(); // Remove all listeners
  },
};

export default socketManager;
