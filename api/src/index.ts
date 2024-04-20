import type {
  Request, Response, Application,
} from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { io as clientIo, Socket as ClientSocket } from 'socket.io-client';
import type {
  ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData,
} from './lib/server/types';
import { handleEEGData, handleJoinGame, handleToggleReady } from './lib/server';
import handleProgress from './lib/server/handleProgress';

const host = process.env.NEURO_CLASH_API_HOST ?? '0.0.0.0';
const port = process.env.NEURO_CLASH_API_PORT ?? '5000';

const webAppHost = process.env.NEURO_CLASH_WEB_APP_HOST ?? '127.0.0.1';
const webAppPort = process.env.NEURO_CLASH_WEB_APP_HOST ?? '3000';

const aiHost = process.env.NEURO_CLASH_AI_HOST ?? '127.0.0.1';
const aiPort = process.env.NEURO_CLASH_AI_HOST ?? '9090';

const origin = `http://${webAppHost}:${webAppPort}`;

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
  const proxySocket: ClientSocket = clientIo(`http://${aiHost}:${aiPort}/eeg`, { transports: ['websocket'] });

  proxySocket.on('progress', (payload: any) => {
    handleProgress({ io, socket, payload });
  });

  socket.on('disconnect', () => {
    proxySocket.disconnect();
  });

  socket.on('eegData', (payload: any) => handleEEGData({
    io, socket, payload, proxySocket,
  }));

  socket.on('join', (payload: any) => handleJoinGame({
    io, socket, payload,
  }));

  socket.on('toggleReady', (payload: any) => handleToggleReady({
    io, socket, payload,
  }));
});

server.listen(+port, host);

// eslint-disable-next-line no-console
console.log(`[app] Running ... \n[app] Url: http://${host}:${port}`);
