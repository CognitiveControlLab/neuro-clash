import type {
  Request, Response, Application,
} from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const port = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';

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
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

app.get('/', (req: Request, res: Response) => {
  console.log('GET /', req.body);
  res.send('See you space cowboy...');
});

app.listen(port);

io.on('connection', (socket) => {
  console.log('client connected: ', socket.id);

  socket.join('clock-room');

  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

setInterval(() => {
  io.to('clock-room').emit('noArg');
}, 1000);

// eslint-disable-next-line no-console
console.log(`[app] Running ... \n[app] Url: http://localhost:${port}`);
