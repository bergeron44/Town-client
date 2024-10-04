// src/components/RoleCard.js
import React from 'react';
import './RoleCard.css'; // Create a CSS file for styling

const RoleCard = ({ player }) => {
    const roleImages = {
      Killer: '/public/images/killer.jpg',
      Doctor: '/public/images/realdoctor.jpg',
      Detective: '/public/images/detective.jpg',
      Civilian: '/public/images/civilian.jpg',
    };
  
    return (
      <div className="game-player-card">
        <img src={roleImages[player.role]} alt={player.role} className="role-image" />
        <h3>{player.name}</h3>
        <p>{player.role}</p>
      </div>
    );
  };

export default RoleCard;
