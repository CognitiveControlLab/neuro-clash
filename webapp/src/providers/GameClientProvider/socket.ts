import { io } from 'socket.io-client';

const socket = io('ws://5d8c-184-160-104-184.ngrok-free.app/', { transports: ['websocket'] });

export default socket;
