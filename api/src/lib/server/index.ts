import handleJoinGame from './handleJoinGame';
import handleEEGData from './handleEEGData';
import type {
  ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData,
} from './types';

export { handleEEGData, handleJoinGame };

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
