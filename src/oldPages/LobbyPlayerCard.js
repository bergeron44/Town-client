// src/components/LobbyPlayerCard.js
import React from 'react';
import './LobbyPlayerCard.css'; // Create a CSS file for styling

const LobbyPlayerCard = ({ player }) => {
  return (
    <div className="lobby-player-card">
      <h3>{player.name}</h3>
      {/* You can add additional player information here if needed */}
    </div>
  );
};

export default LobbyPlayerCard;
