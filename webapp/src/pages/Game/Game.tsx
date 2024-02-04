import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConnectionStatus, useEEG } from '../../providers/EEGProvider';
import { ConnectionState, useGameClient } from '../../providers/GameClientProvider';
import GameView from './GameView';
import { Container } from './styles';

function Game() {
  const { gameId } = useParams();
  const { deviceInfo, setDataListener } = useEEG();
  const {
    connectionState,
    sendEEGData,
    join,
  } = useGameClient();

  useEffect(() => {
    if (deviceInfo.status === ConnectionStatus.CONNECTED
      && connectionState === ConnectionState.CONNECTED && gameId) {
      join(gameId);
      setDataListener((data) => {
        sendEEGData(gameId, data);
      });
    }
  }, [sendEEGData, setDataListener, join, connectionState, deviceInfo.status, gameId]);

  return (
    <Container>
      <GameView />
    </Container>
  );
}

export default Game;
