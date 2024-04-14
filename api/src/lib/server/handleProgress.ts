import Game from '../game';
import type { Route } from './types';

function handleProgress(props: Route) {
  const { payload } = props;

  if (!payload.gameId || !payload.userId || payload.concentration_level == null) {
    return;
  }

  const { gameId, userId } = payload;

  const gameInstance = Game.getOrCreate(gameId);

  // Random number between 0 and 5
  const random = Math.floor(Math.random() * 6);

  gameInstance.progress(userId, [payload.concentration_level + random]);
}

export default handleProgress;
