import type { Server, Socket } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';

interface ServerToClientEvents {
  progress: (data: any) => void;
  users: (data: any) => void;
  status: (data: any) => void;
}

interface ClientToServerEvents {
  eegData: (payload: any) => void;
  join: (payload: any) => void;
  toggleReady: (payload: any) => void;
}

interface InterServerEvents {
  notUsedForNow: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

interface Route {
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
  socket: Socket;
  payload: any;
}

interface Proxy extends Route {
  proxySocket: ClientSocket;
}

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
  Route,
  Proxy,
};
