import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setAlive } from '../redux/action'; // Import setAlive action

// Importing styles directly
const styles = {
  dieContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background for dramatic effect
    color: 'white',
    height: '100vh', // Full viewport height
    textAlign: 'center',
  },
  dieMessage: {
    marginBottom: '20px',
  },
  restartButton: {
    backgroundColor: 'yellow', // A bright button to attract attention
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Functional Component accepting setCurrentTurn and setGameState as props
const Die = ({ setCurrentTurn, setGameState }) => {
  const dispatch = useDispatch(); // Initialize dispatch

  // useEffect to call functions when the component is mounted
  useEffect(() => {
    // Reset turn and game state when entering this component
    setCurrentTurn('die'); // Reset the current turn
    setGameState('die'); // Set the game state to 'death'
      console.log("set alive false");
    // Dispatch setAlive(false) when the player dies
    dispatch(setAlive(false));
  }, [setCurrentTurn, setGameState, dispatch]);

  // Handle Restart (Send back to the lobby)
  const handleRestart = () => {
    setCurrentTurn(null); // Optionally reset the current turn
    setGameState('lobby'); // Set the game state to 'lobby'
  };

  return (
    <div style={styles.dieContainer}>
      <div style={styles.dieMessage}>
        <h1>Oh no!</h1>
        <h2>You have met your untimely demise!</h2>
        <img
          src="https://media.giphy.com/media/l4FGz8KX7h9xo4F4g/giphy.gif"
          alt="Funny Death GIF"
          style={{ width: '300px', height: 'auto' }} // Adjust the size as needed
        />
      </div>

      {/* Restart Button */}
      <button style={styles.restartButton} onClick={handleRestart}>
        Return to Lobby
      </button>
    </div>
  );
};

export default Die;
