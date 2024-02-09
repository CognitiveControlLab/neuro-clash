import type {
  Request, Response, Application,
} from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import type {
  ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData,
} from './lib/server/types';
import { io as sio } from 'socket.io-client';
import { handleEEGData, handleJoinGame } from './lib/server';

const port = process.env.PORT ?? 6000;
const origin = process.env.ORIGIN ?? 'http://localhost:3000';

const app: Application = express();
const server = createServer(app);
const io = new Server<
ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData
>(server, {
  cors: {
    origin,
  },
});

app.get('/', (req: Request, res: Response) => {
  res.send('See you space cowboy...');
});

io.on('connection', (socket) => {
  socket.on('eegData', (payload: any) => handleEEGData({
    io, socket, payload,
  }));

  socket.on('join', (payload: any) => handleJoinGame({
    io, socket, payload,
  }));
});


server.listen(port);

const socket = sio('http://127.0.0.1:9090/eeg', {transports: ['websocket']});


socket.on("connect", () => {
  console.log("connected to server");
  socket.emit("event", "Hello from the client!");
});

// Listen for custom responses from the server
socket.on("my_response", (data) => {
  console.log("Response from server:", data);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// eslint-disable-next-line no-console
console.log(`[app] Running ... \n[app] Url: http://localhost:${port}`);

