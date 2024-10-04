import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setGameCode, setCharacter, setPlayerName } from './redux/action';
import LobbyDisplay from './components/LobbyDisplay';
import NightPhase from './components/NightPhase';
import DayPhase from './components/DayPhase';
import KillerWon from './components/KillerWon';  // New component
import PlayersWon from './components/PlayersWon';  // New component
import MutedPage from './components/MutedPage';  // New component
import Die from './components/Die';  // New component
import './App.css';

const socket = io('https://town-server.onrender.com', {
  transports: ['websocket'],
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
  alert('Connection failed. Please try again.');
});

function App() {
  const dispatch = useDispatch();
  const gameCode = useSelector((state) => state.gameCode);    // Correctly selecting gameCode from the state
  const character = useSelector((state) => state.character);  // Correctly selecting character from the state
  const playerName = useSelector((state) => state.playerName); // Correctly selecting playerName from the state
  const isAlive = useSelector((state) => state.isAlive);  

  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('menu');
  const [creator, setCreator] = useState('false');
  const [currentTurn, setCurrentTurn] = useState(null);
  const [nightResults, setNightResults] = useState(null);
  const [detectiveAnswer, setDetctiveAnswer] = useState(false);
  const [phase, setPhase] = useState('waiting'); 


  useEffect(() => {
    console.log('Setting up socket listeners...');
    
    const handleGameCreated = ({ gameCode, players }) => {
      console.log('Game created with code:', gameCode);
      dispatch(setGameCode(gameCode));
      setCreator("true");
      setPlayers(players);
      setGameState('lobby');
      console.log('Players in lobby:', players);
    };

    socket.on('gameCreated', handleGameCreated);
    socket.on('playerJoined', ({ players }) => {
      setPlayers(players);
      setGameState('lobby');
      console.log('Player joined. Updated players list:', players);
    });
    socket.on('gameStarted', ({ players,role,gameCode }) => {
      dispatch(setCharacter(role));
      setPhase('roleAction');
      console.log('roleAction phase update and Role assigned:', role);
      setPlayers(players);
      if (role === 'Killer' ) {
        console.log('Killer game started.');
        socket.emit('killerAction', { gameCode:gameCode,role: role});
      }
      else
      {
        setGameState('night');
      }

      console.log('Game started. Transitioning to night phase.');
    });
    socket.on('gameResume', ({ players,role,gameCode }) => {
      console.log('game resume');
      console.log('Role :', role);
      setPhase('roleAction');
      setCurrentTurn('Killer');
      setPlayers(players);
      if (role === 'Killer' ) {
        console.log('Killer game started.');
        socket.emit('killerAction', { gameCode:gameCode,role: role});
      }
      else
      {
        setGameState('night');
      }

      console.log('Game resume go night phase.');
    });
    socket.on('killerTurn', () => {
      console.log(character);
      setCurrentTurn('Killer');
      console.log('Current turn: Killer');
      setGameState('day');
    });
    socket.on('doctorTurn', () => {
      console.log('Current turn: Doctor');
      console.log(isAlive);
      console.log(phase);
      if(!isAlive|| phase==='die')
      {
        console.log('Doctor is dead moving next player');
        socket.emit('roleAction', {
          gameCode: gameCode,
          targetId: '0',
          role: character,
        });
      }
      else
      {
        console.log(character);
        setCurrentTurn('Doctor'); 
        setGameState('day');
      }
     
    });
    socket.on('detectiveTurn', () => {
      console.log('Current turn: detective');
      if(!isAlive|| phase==='die')
        {
          console.log('detective is dead moving next player');
          socket.emit('roleAction', {
            gameCode: gameCode,
            targetId: '0',
            role: character,
          });
        }
        else
        {
          console.log(character);
          console.log("i am started detective turn :");
          setCurrentTurn('Detective');
          setGameState('day');
        }
    });
    socket.on('detectiveResult', ({isKiller}) => {
      console.log(character);
      console.log("i am in detective answer :");
      console.log('Current turn: detective Answer is :');
      console.log(isKiller);
      setCurrentTurn('detectiveAnswer');
      setDetctiveAnswer(isKiller); 
      setGameState('day'); 
    });
    socket.on('policemanTurn', () => {
      console.log('Current turn: policeman');
      if(!isAlive|| phase==='die')
        {
          console.log('policeman is dead moving next player');
          socket.emit('roleAction', {
            gameCode: gameCode,
            targetId: '0',
            role: character,
          });
        }
        else
        {
          console.log(character);
          console.log("i am started policeman turn :");
          setCurrentTurn('Policeman');
          setGameState('day');
        }
     
    });
    socket.on('lawyerTurn', () => {
      console.log('Current turn: lawyer');
      if(!isAlive|| phase==='die')
        {
          console.log('lawyer is dead moving next player');
          socket.emit('roleAction', {
            gameCode: gameCode,
            targetId: '0',
            role: character,
          });
        }
        else
        {
          console.log(character);
          console.log("i am started lawywr turn :");
          setCurrentTurn('Lawyer');
          setGameState('day');
        }
     
    });

    // NEW SOCKET EVENTS FOR KILLER WON AND MUTED
    socket.on('killerWon', () => {
      setGameState('killerWon');
      console.log('The killer has won!');
    });
    socket.on('playersWon', () => {
      setGameState('playersWon');
      console.log('The players has won!');
    });
    socket.on('die', () => {
      setGameState('die');
      setCurrentTurn('die');
      setPhase('die');
      console.log('you are dead');
    });
    socket.on('muted', () => {
      setGameState('muted');
      console.log('You have been muted.');
    });

    socket.on('vote', (eliminatedPlayerName) => {
      if (eliminatedPlayerName) {
        setNightResults(eliminatedPlayerName);
        // Update the players list to remove the eliminated player
        setPlayers((prevPlayers) => prevPlayers.filter(player => player.id !== eliminatedPlayerName));
        console.log(`${eliminatedPlayerName} has been eliminated. Updated players list:`, players);
      }
      setCurrentTurn('voting');
      setGameState('day');
      console.log('Vote time');
    });
    socket.on('playerLeft', ({ players }) => {
      setPlayers(players);
      console.log('Player left. Updated players list:', players);
    });

    return () => {
      console.log('Cleaning up socket listeners...');
      socket.off('gameCreated', handleGameCreated);
      socket.off('playerJoined');
      socket.off('gameStarted');
      socket.off('gameResume');
      socket.off('roleAssigned');
      socket.off('killerTurn');
      socket.off('doctorTurn');
      socket.off('playerLeft');
    };
  }, [dispatch]);

  const createGame = () => {
    if (playerName) {
      socket.emit('createGame', playerName);
      console.log('Game creation requested with player name:', playerName);
    } else {
      alert('Please enter your name');
      console.warn('Name not provided for game creation.');
    }
  };

  const joinGame = () => {
    if (playerName && gameCode) {
      socket.emit('joinGame', { gameCode, playerName });
      console.log('Joining game with code:', gameCode);
    } else {
      alert('Please enter your name and game code');
      console.warn('Name or game code not provided for joining.');
    }
  };

  const startGame = (code,playerName) => {
    socket.emit('startGame',code,playerName);
    console.log('Game start requested.');
  };

  const getCharacterImage = (role) => {
    const images = {
      Killer: '/avatars/killer.jpg',        // Replace with actual path
      Doctor: '/avatars/realdoctor.jpg',        // Replace with actual path
      Detective: '/avatars/detective.jpg',  // Replace with actual path
      Lawyer: '/avatars/lawyer.avif',        // Replace with actual path
      Policeman: '/avatars/policeman.jpg',  // Replace with actual path
      Citizen: '/avatars/Citizen.jpg',      // Replace with actual path
    };
  
    return images[role] || '/images/default-image.jpg'; // Default image if role is not found
  };

  // New functions to render KillerWon and MutedPage
  const renderGamePhase = () => {
    if (gameState === 'night') {
        return <NightPhase
        gameCode={gameCode}
        currentTurn={currentTurn}
        character={character}
        nickname={playerName} // Use playerName as the nickname
        characterImage={getCharacterImage(character)} // Implement getCharacterImage function
      />;
    }
    if (gameState === 'day') {
      return <DayPhase
      phase={phase}
      gameCode={gameCode}
      setPhase={setPhase}
      setGameState={setGameState}
      setCurrentTurn={setCurrentTurn}
      players={players}
      character={character}
      nickname={playerName} 
      currentTurn={currentTurn}
      detectiveAnswer={detectiveAnswer}
       />;
    }

    if (gameState === 'killerWon') {
      return <KillerWon />; // Render killer win page
    }
    if (gameState === 'playersWon') {
      return <PlayersWon />; // Render killer win page
    }
    if (gameState === 'muted') {
      return <MutedPage />; // Render muted page
    }
    if (gameState === 'die') {
      return <Die 
      setGameState={setGameState}
      setCurrentTurn={setCurrentTurn}/>; // Render muted page
    }

    return null;
  };

  return (
    <div className="App">
      {gameState === 'menu' && (
        <div className="login-page">
          <h1>עיירה</h1>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => dispatch(setPlayerName(e.target.value))}
          />
          <button onClick={createGame}>Create Game</button>
          <input
            type="text"
            placeholder="Enter game code"
            onChange={(e) => dispatch(setGameCode(e.target.value))}
          />
          <button onClick={joinGame}>Join Game</button>
        </div>
      )}
      {gameState === 'lobby' && (
        <LobbyDisplay
          Creator={creator}
          Code={gameCode}
          players={players}
          startGame={startGame}
          socket={socket}
          myName={playerName}
        />
      )}
      {renderGamePhase()}
    </div>
  );
}

export default App;
