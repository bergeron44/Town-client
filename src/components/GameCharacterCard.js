import React from 'react';

const GameCharacterCard = ({ player, onClick, isSelected }) => {
    // Combine colors to create a red and yellow gradient background
    const cardStyle = {
        background: isSelected ? 'linear-gradient(to right, red, yellow)' : 'linear-gradient(to right, yellow, red)',
        color: 'white',
        padding: '20px',
        margin: '10px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        textAlign: 'center',
        boxShadow: isSelected ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
    };

    return (
        <div 
            className="character-card" 
            style={cardStyle}
            onClick={onClick} // Handle the click to select the player
        >
            <h3 style={{ fontSize: '2em', margin: '0' }}>{player.name}</h3>
        </div>
    );
};

export default GameCharacterCard;
