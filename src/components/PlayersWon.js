import React from 'react';

const PlayersWon = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#d4edda', // Light green background color
      color: '#155724', // Darker text color
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
    },
    title: {
      fontSize: '3rem', // Large font size for title
      fontWeight: 'bold',
      margin: '0 0 10px 0',
    },
    message: {
      fontSize: '1.5rem', // Medium font size for message
      margin: '0',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#28a745', // Green button background
      color: '#fff', // White text color
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#218838', // Darker green on hover
    },
  };

  return (
    <div style={styles.container}>
      <div role="img" aria-label="Celebration emoji" style={{ fontSize: '5rem' }}>🎉</div>
      <h1 style={styles.title}>Congratulations!</h1>
      <p style={styles.message}>The players have won the game!</p>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
};

export default PlayersWon;
