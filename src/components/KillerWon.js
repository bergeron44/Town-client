import React from 'react';

const KillerWon = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f8d7da', // Light red background color
      color: '#721c24', // Darker text color
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
    emoji: {
      fontSize: '5rem', // Large emoji size
      margin: '20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.emoji}>🎉</div>
      <h1 style={styles.title}>The Killer has won!</h1>
      <p style={styles.message}>All the other players have been eliminated. Better luck next time!</p>
    </div>
  );
};

export default KillerWon;
