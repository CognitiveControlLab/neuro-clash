import type { Route } from './types';
import Game from '../game';

function handleJoinGame(props : Route) {
  const { socket, payload } = props;
  const { userId, gameId } = payload;

  if (!userId || !gameId) {
    return;
  }

  const gameInstance = Game.getOrCreate(gameId);

  gameInstance.join(userId);

  socket.join(gameId);
}

export default handleJoinGame;
