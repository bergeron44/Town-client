// src/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:4000');
  }
  return socket;
};
