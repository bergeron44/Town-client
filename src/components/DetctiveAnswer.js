import React, { useEffect, useState } from 'react';

const DetctiveAnswer = ({ isLie, setGameState }) => {
  const [bgColor, setBgColor] = useState('night'); // Initial state is night

  useEffect(() => {
    console.log("iam in the detctive answer");
    // Change background color based on lie state
    if (!isLie) {
      setBgColor('red');
    } else {
      setBgColor('green');
    }

    // Set a timer to change back to 'night' after 3 seconds
    const timer = setTimeout(() => {
      setBgColor('night');
      if (setGameState) {
        setGameState('night'); // Call the function to change the state
      }
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [isLie, setGameState]);

  return (
    <div style={{
      backgroundColor: bgColor,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      transition: 'background-color 0.5s ease'
    }}>
      <h1>{isLie ? 'מצאת את הרוצח!' : ' לא רוצח'}</h1>
    </div>
  );
};

export default DetctiveAnswer;
