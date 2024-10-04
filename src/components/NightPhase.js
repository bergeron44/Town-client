import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io('https://town-server.onrender.com'); // Connect to your server

function NightPhase({ character, nickname, characterImage, currentTurn,gameCode }) {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on component unmount
  }, [character,gameCode]); // The useEffect will re-run if the character changes


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Close Your Eyes When the Timer Ends</h2>
      <h3 style={styles.characterName}>{nickname}</h3>
      <img src={characterImage} alt={character} style={styles.characterImage} />
      <p style={styles.timer}>{timer} seconds left</p>
      <p style={styles.role}>Your role: <span style={styles.roleText}>{character}</span></p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #2A2A72, #009FFD)', // Game-like background
    color: '#fff', // White text for better contrast
    fontFamily: "'Press Start 2P', cursive", // Retro game font style
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '42px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', // Game-style text shadow
    color: '#FFD700', // Golden color for the title
  },
  characterName: {
    fontSize: '30px',
    margin: '10px 0',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)', // Shadow for depth
    color: '#00FFDD', // Neon-style color for nickname
  },
  characterImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%', // Circle shape for the character image
    border: '5px solid #FFD700', // Gold border
    margin: '20px 0',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)', // Adding a nice shadow for the image
  },
  timer: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: '#FF4500', // Bright red for emphasis
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', // Shadow for timer emphasis
  },
  role: {
    fontSize: '28px',
    marginTop: '30px',
    color: '#FFD700', // Gold color for role text
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)', // Slight shadow for depth
  },
  roleText: {
    fontWeight: 'bold',
    color: '#00FFDD', // Neon style color for the character role
  },
};

export default NightPhase;
