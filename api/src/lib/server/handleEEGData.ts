import Game from '../game';
import { GameStatus } from '../game/game';
import type { Proxy } from './types';

function handleEEGData(props : Proxy) {
  const { payload, proxySocket, io } = props;
  const { gameId, userId, data } = payload;

  const gameInstance = Game.getOrCreate(gameId);
  const status = gameInstance.getStatus();

  if (data.type === 'eeg' && status === GameStatus.STARTED && gameId) {
    proxySocket.emit('eegData', payload);
  } else if (data.type === 'accelerometer' && status === GameStatus.STARTED && gameId) {
    const accelerometerData = data.data;

    if (accelerometerData?.samples?.length > 0) {
      const accelerometerDataSample = accelerometerData.samples[0];
      gameInstance.movePlayerHead(userId, accelerometerDataSample);
    }
  }

  if (status === GameStatus.FINISHED) {
    io.to(gameId).emit('status', status);
  }

  io.to(gameId).emit('progress', gameInstance.getGameProgress());
}

export default handleEEGData;
