import Game from '../game';
import type { Proxy } from './types';

function handleEEGData(props : Proxy) {
  const { payload, proxySocket, io } = props;
  const { gameId, userId, data } = payload;

  if (data.type === 'eeg') {
    proxySocket.emit('eegData', payload);
  } else if (data.type === 'accelerometer' && gameId) {
    const gameInstance = Game.getOrCreate(gameId);
    const accelerometerData = data.data;

    if (accelerometerData?.samples?.length > 0) {
      const accelerometerDataSample = accelerometerData.samples[0];
      gameInstance.movePlayerHead(userId, accelerometerDataSample);
    }

    io.to(gameId).emit('progress', gameInstance.getGameProgress());
  }
}

export default handleEEGData;
