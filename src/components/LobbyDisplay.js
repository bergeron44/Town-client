import React from 'react';

function LobbyDisplay({ players, startGame, socket, myName, Code,Creator }) {
  console.log(Creator);
  return (
    <div className="lobby-page">
      <h2>code for the game: {Code}</h2>
      <h1>NickName: {myName}</h1>
      <h3>Players:</h3>
      <ul>
        {players && players.length > 0 ? (
          players.map((player, index) => (
            <li key={index}>{player.name}</li>
          ))
        ) : (
          <li>No players in the lobby.</li>
        )}
      </ul>
      {players && Creator === "true" && (
        <button onClick={() => startGame(Code, Creator)}>Start Game</button>
      )}
    </div>
  );
}

export default LobbyDisplay;
