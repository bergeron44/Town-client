import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updatePlayerName, updateGameCode, addPlayer } from '../redux/actions/gameActions'; // Adjust the path as necessary
import './LoginPage.css';

const socket = io('http://localhost:4000');

const LoginPage = ({ onJoin }) => {
  const [playerName, setLocalPlayerName] = useState('');
  const [gameCode, setLocalGameCode] = useState('');
  const [error, setError] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const dispatch = useDispatch();

  const handleCreateGame = () => {
    if (!playerName) {
      setError('Please enter your name!');
      return;
    }
    socket.emit('createGame', 6, playerName); // Emit player name when creating a game
  };

  const handleJoinGame = () => {
    if (!playerName) {
      setError('Please enter your name!');
      return;
    }
    dispatch(updatePlayerName(playerName)); // Update Redux state
    dispatch(updateGameCode(gameCode)); // Update Redux state
    socket.emit('joinGame', gameCode, playerName);
  };

  useEffect(() => {
    const handleGameCreated = (code) => {
      dispatch(updateGameCode(code)); // Update game code in Redux
      dispatch(addPlayer(playerName, null, code, null, null)); // Add player to Redux store with null values for character, playersAtTable, and role
      onJoin(code, playerName);
    };

    const handlePlayerJoined = (data) => {
      dispatch(addPlayer(data.name, null, gameCode, null, null)); // Add the player who joined to Redux store
      onJoin(gameCode, playerName);
    };

    const handleError = (message) => {
      setError(message);
    };

    socket.on('gameCreated', handleGameCreated);
    socket.on('playerJoined', handlePlayerJoined);
    socket.on('error', handleError);

    return () => {
      socket.off('gameCreated', handleGameCreated);
      socket.off('playerJoined', handlePlayerJoined);
      socket.off('error', handleError);
    };
  }, [playerName, gameCode, dispatch, onJoin]);

  useEffect(() => {
    if (playerName) {
      setError('');
    }
  }, [playerName]);

  return (
    <div className="login-page">
      <h1>Mafia Game</h1>
      {!isNameSet ? (
        <div className="name-entry">
          <h2>Enter your name:</h2>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={playerName} 
            onChange={(e) => setLocalPlayerName(e.target.value)} 
            className="name-input"
          />
          {!playerName && <p className="error">{error}</p>}
          <button 
            onClick={() => {
              setIsNameSet(true);
              setError('');
            }} 
            disabled={!playerName} 
            className="set-name-button"
          >
            Set Name
          </button>
        </div>
      ) : (
        <div className="game-actions-container">
          <h2>Welcome, {playerName}!</h2>
          <div className="game-actions">
            <h2>Create a Game</h2>
            <button onClick={handleCreateGame} className="game-button">Create Game</button>
          </div>
          <div className="game-actions">
            <h2>Join a Game</h2>
            <input 
              type="text" 
              placeholder="Enter game code" 
              value={gameCode} 
              onChange={(e) => setLocalGameCode(e.target.value)} 
              className="code-input"
            />
            <button onClick={handleJoinGame} className="game-button">Join Game</button>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
