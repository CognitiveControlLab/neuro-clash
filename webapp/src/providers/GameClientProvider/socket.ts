import { io } from 'socket.io-client';

const socket = io('ws://127.0.0.1:5001', { transports: ['websocket'] });

export default socket;
