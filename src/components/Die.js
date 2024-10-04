import React from 'react';

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
    animation: 'fadeIn 0.5s',
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
  fadeIn: {
    animation: 'fadeIn 0.5s',
  },
};

const Die = () => {
  return (
    <div style={styles.dieContainer}>
      <div style={styles.dieMessage}>
        <h1>Oh no,!</h1>
        <h2>You have met your untimely demise!</h2>
        <img
          src="https://media.giphy.com/media/l4FGz8KX7h9xo4F4g/giphy.gif"
          alt="Funny Death GIF"
          style={{ width: '300px', height: 'auto' }} // Adjust the size as needed
        />
      </div>
    </div>
  );
};

export default Die;
