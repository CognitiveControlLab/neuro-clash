import type { Route } from './types';
import Game from '../game';

function handleEEGData(props : Route) {
  const { io, payload } = props;
  if (!payload) {
    return;
  }

  const { data, gameId, userId } = payload;

  if (!payload.gameId || !payload.userId || !payload.data) {
    return;
  }

  const gameInstance = Game.getOrCreate(gameId);

  gameInstance.progress(userId, data);

  const scores = gameInstance.getScores();
  io.to(gameId).emit('progress', { scores });
}

export default handleEEGData;
