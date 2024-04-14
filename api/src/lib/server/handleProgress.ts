import Game from '../game';
import type { Route } from './types';

function handleProgress(props: Route) {
  const { payload } = props;

  if (!payload.gameId || !payload.userId || !payload.data) {
    return;
  }

  const { gameId, userId } = payload;

  const gameInstance = Game.getOrCreate(gameId);
  console.log('Progress:', payload.data);
  gameInstance.progress(userId, [Math.floor(Math.random() * 5) + 1]);
}

export default handleProgress;
