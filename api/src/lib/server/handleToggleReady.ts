import type { Route } from './types';
import Game from '../game';

function handleToggleReady(props : Route) {
  const { io, payload } = props;
  const { userId, gameId } = payload;

  if (!userId || !gameId) {
    return;
  }

  const gameInstance = Game.getOrCreate(gameId);

  gameInstance.toggleReady(userId);

  io.to(gameId).emit('users', gameInstance.getUsersArray());
  io.to(gameId).emit('status', gameInstance.getStatus());
}

export default handleToggleReady;
