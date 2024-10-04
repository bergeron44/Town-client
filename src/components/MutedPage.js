import React from 'react';

const MutedPage = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f4f8', // Light background color
      color: '#333', // Dark text color
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
      color: '#e74c3c', // Red color for title
    },
    message: {
      fontSize: '1.5rem', // Medium font size for message
      margin: '0',
      color: '#555', // Slightly lighter color for message
    },
    emoji: {
      fontSize: '5rem', // Large emoji size
      margin: '20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.emoji}>🔇</div>
      <h1 style={styles.title}>You have been muted!</h1>
      <p style={styles.message}>You cannot participate in the conversation for now.</p>
    </div>
  );
};

export default MutedPage;
