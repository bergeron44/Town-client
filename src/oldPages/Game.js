import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketManager from '../socketManager';
import {
  addPlayer,
  updatePlayerStatus,
  updatePlayersAtTable,
  updatePlayerRole,
  updateGameCode,
} from '../redux/actions/gameActions'; // Adjust path as necessary
import PlayerCard from './RoleCard';
import './Game.css';

const Game = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gameCode = params.get('code');
  const playerName = params.get('playerName');
  const roles = params.getAll('role');
  const playerCount = parseInt(params.get('players'), 10);

  const player = useSelector((state) => state.player.player);
  const playersAtTable = useSelector((state) => state.player.playersAtTable);
  const isAlive = player.isAlive;

  useEffect(() => {
    console.log('Game component mounted. Game Code:', gameCode, 'Player Count:', playerCount);

    if (gameCode) {
      socketManager.joinGame(gameCode, playerName);
      console.log(`Attempting to join game with code: ${gameCode} as ${playerName}`);

      // Dispatching action to add player
      dispatch(addPlayer(playerName, '', gameCode, [], '', true));

      const handlePlayerJoined = (game) => {
        console.log('Player joined event received:', game);
        dispatch(updatePlayersAtTable(game.players));
        
        if (game.players.length === playerCount) {
          console.log('All players have joined. Starting the game.');
          dispatch(updateGameCode(gameCode));
          // Assuming you have some logic here to transition the game phase
          socketManager.startGame(gameCode);
        }
      };

      const handlePlayerStatusChange = (playerStatus) => {
        console.log('Player status change received:', playerStatus);
        dispatch(updatePlayerStatus(playerStatus.isAlive));
      };

      const handleRoleUpdate = (playerRole) => {
        console.log('Player role update received:', playerRole);
        dispatch(updatePlayerRole(playerRole.role));
      };

      // Register socket event handlers
      socketManager.onPlayerJoined(handlePlayerJoined);
      socketManager.onPlayerStatusChange(handlePlayerStatusChange);
      socketManager.onRoleUpdate(handleRoleUpdate);

      // Cleanup on unmount
      return () => {
        console.log('Cleaning up socket event handlers.');
        socketManager.cleanup();
      };
    }
  }, [gameCode, playerName, playerCount, dispatch]);

  return (
    <div className="game">
      <h1>Game Code: {gameCode}</h1>
      <div className="player-cards">
        {playersAtTable.map((player, index) => (
          <PlayerCard key={index} player={{ name: player.name, role: roles[index] }} />
        ))}
      </div>

      {isAlive ? <p>You are alive!</p> : <p>You have been eliminated.</p>}
    </div>
  );
};

export default Game;
