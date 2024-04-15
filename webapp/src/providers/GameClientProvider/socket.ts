import { io } from 'socket.io-client';
// @ts-ignore : This is a global variable injected by Vite.
const port = import.meta.env.VITE_PORT ?? 5000;

const socket = io(`ws://127.0.0.1:${port}`, { transports: ['websocket'] });

export default socket;
