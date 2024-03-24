import Game from '../game';
import type { Route } from './types';

function handleProgress(props: Route) {
  const { payload, socket } = props;

  if (!payload.gameId || !payload.userId || !payload.data) {
    return;
  }

  const { gameId, userId, data } = payload;

  const gameInstance = Game.getOrCreate(gameId);

  gameInstance.progress(userId, data);

  const scores = gameInstance.getScores();

  socket.to(gameId).emit('progress', { scores });
}

export default handleProgress;
