import Game from '../game';
import type { Route } from './types';

function handleProgress(props: Route) {
  const { payload } = props;

  if (!payload.gameId || !payload.userId || !payload.data) {
    return;
  }

  const { gameId, userId, data } = payload;

  const gameInstance = Game.getOrCreate(gameId);

  gameInstance.progress(userId, data);
}

export default handleProgress;
