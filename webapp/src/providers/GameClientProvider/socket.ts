import { io } from 'socket.io-client';
const port = process.env.PORT ?? 5001;

const socket = io(`ws://127.0.0.1:5001`, { transports: ['websocket'] });

export default socket;
