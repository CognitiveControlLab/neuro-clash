import Game from '../game';
import type { Route } from './types';

function handleProgress(props: Route) {
  const { payload } = props;

  if (!payload.gameId || !payload.userId || payload.concentration_level == null) {
    return;
  }

  const { gameId, userId } = payload;

  const gameInstance = Game.getOrCreate(gameId);
  gameInstance.progress(userId, [0, 0, 0, 0, payload.concentration_level]);
}

export default handleProgress;
