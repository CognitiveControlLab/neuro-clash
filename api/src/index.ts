import type {
  Request, Response, Application,
} from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

interface ServerToClientEvents {
  progress: (data: any) => void;
}

interface ClientToServerEvents {
  eegData: (data: any) => void;
}

interface InterServerEvents {
  notUsedForNow: () => void;
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
  },
});

app.get('/', (req: Request, res: Response) => {
  console.log('GET /', req.body);
  res.send('See you space cowboy...');
});

io.on('connection', (socket) => {
  socket.on('eegData', (payload) => {
    if (payload.type === 'accelerometer') {
      socket.emit('progress', { score: payload.data?.samples?.length ? payload.data.samples[0].x : 0 });
    }
  });
});

server.listen(port);

// eslint-disable-next-line no-console
console.log(`[app] Running ... \n[app] Url: http://localhost:${port}`);
