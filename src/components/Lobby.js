import React from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerName, setGameCode } from '../redux/action'; // Ensure this path is correct

function Lobby({ createGame, joinGame }) {
  const dispatch = useDispatch();

  return (
    <div className="lobby-page">
      <h1>Welcome to the Lobby!</h1>
      <input
        type="text"
        placeholder="Your Name"
        onChange={(e) => dispatch(setPlayerName(e.target.value))}
        className="lobby-input"
      />
      <button onClick={createGame} className="lobby-button">Create Game</button>
      <input
        type="text"
        placeholder="Game Code"
        onChange={(e) => dispatch(setGameCode(e.target.value))}
        className="lobby-input"
      />
      <button onClick={joinGame} className="lobby-button">Join Game</button>
    </div>
  );
}

export default Lobby;
