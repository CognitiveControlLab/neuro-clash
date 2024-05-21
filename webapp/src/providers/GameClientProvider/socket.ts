import { io } from 'socket.io-client';

// @ts-ignore : This is a global variable injected by Vite.
const host = import.meta.env.VITE_NEURO_CLASH_API_HOST ?? '127.0.0.1';

// @ts-ignore : This is a global variable injected by Vite.
const port = import.meta.env.VITE_NEURO_CLASH_API_PORT ?? 5000;

const socket = io(`ws://${host}:${port}`, { transports: ['websocket'] });

export default socket;
