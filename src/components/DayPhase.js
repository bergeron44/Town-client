import React, { useState, useEffect } from 'react';
import GameCharacterCard from './GameCharacterCard';
import DetctiveAnswer from './DetctiveAnswer'; // Import DetectiveAnswer component
import io from 'socket.io-client';

const socket = io('https://town-server.onrender.com'); // Connect to your server

function DayPhase({ character, nightResults, players, currentTurn, setGameState, gameCode, detectiveAnswer }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [phase, setPhase] = useState('roleAction'); // Default to 'roleAction' phase
  const [showDetectiveAnswer, setShowDetectiveAnswer] = useState(false); // State to control DetectiveAnswer display

  useEffect(() => {
    if (currentTurn === 'voting') {
      setPhase('voting'); // Transition to voting phase
    }
  }, [currentTurn]);

  useEffect(() => {
    // Show DetectiveAnswer only when the currentTurn is "detectiveAnswer" and detectiveAnswer is not null
    if (currentTurn === 'detectiveAnswer' && detectiveAnswer !== null) {
      setShowDetectiveAnswer(true); // Show DetectiveAnswer component
    }
  }, [detectiveAnswer, currentTurn]);

  const handleRoleActionSubmit = (player) => {
    socket.emit('roleAction', {
      gameCode: gameCode,
      targetId: player.id,
      role: character,
    });
    setGameState('night');
  };

  const handleVoteSubmit = (player) => {
    socket.emit('vote', {
      votedPlayer:player.id,
      gameCode: gameCode,
    });
    setPhase('waiting'); // Waiting for all players to finish voting
  };

  return (
    <div>
      {showDetectiveAnswer ? (
        <DetctiveAnswer isLie={detectiveAnswer} setGameState={setGameState} />
      ) : (
        <>
          <h2>שלב המשחק</h2>
          <p>Your role: {character}</p>
          {nightResults && (
            <div>
              <p>
                {nightResults.saved
                  ? "Someone was saved last night!"
                  : `${nightResults.eliminated} was eliminated last night.`}
              </p>
              <p>Time to discuss what happened last night!</p>
            </div>
          )}

          {/* Display the player's action if it's their turn */}
          {phase === 'roleAction' && currentTurn === character && (
            <div>
              <h3>התור שלך </h3>
              <p>תבחר אחד השחקנים</p>
              <div className="character-cards">
                {players.map((player) => (
                  <GameCharacterCard
                    key={player.id}
                    player={player}
                    onClick={() => handleRoleActionSubmit(player)} // Directly call action submit on card click
                    isSelected={selectedPlayer && selectedPlayer.id === player.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show voting phase if it's voting time */}
          {phase === 'voting' && (
            <div>
              <h3>Time to vote!</h3>
              <p>Select a player to vote for elimination:</p>
              <div className="character-cards">
                {players.map((player) => (
                  <GameCharacterCard
                    key={player.id}
                    player={player}
                    onClick={() => handleVoteSubmit(player)} // Directly call vote submit on card click
                    isSelected={selectedPlayer && selectedPlayer.id === player.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show a waiting message when waiting for the next phase */}
          {phase === 'waiting' && (
            <div>
              <h3>Waiting for other players...</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DayPhase;
