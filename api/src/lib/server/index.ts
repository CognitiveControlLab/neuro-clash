import handleJoinGame from './handleJoinGame';
import handleEEGData from './handleEEGData';
import handleToggleReady from './handleToggleReady';

import type {
  ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData,
} from './types';

export { handleEEGData, handleJoinGame, handleToggleReady };

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
