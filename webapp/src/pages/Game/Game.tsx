import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConnectionStatus, useEEG } from '../../providers/EEGProvider';
import { ConnectionState, useGameClient } from '../../providers/GameClientProvider';
import GameView from './GameView';
import { Container } from './styles';
import Lobby from './components/Lobby/Lobby';
import EndGame from './components/EndGame/EndGame';

function Game() {
  const { gameId } = useParams();
  const { deviceInfo, setDataListener } = useEEG();
  const {
    connectionState,
    sendEEGData,
    join,
    status,
  } = useGameClient();

  useEffect(() => {
    if (gameId && connectionState === ConnectionState.CONNECTED) {
      join(gameId);
    }
  }, [gameId, join, connectionState]);

  useEffect(() => {
    if (deviceInfo.status === ConnectionStatus.CONNECTED
      && connectionState === ConnectionState.CONNECTED && gameId) {
      setDataListener((data) => {
        sendEEGData(data);
      });
    }
  }, [sendEEGData, setDataListener, connectionState, deviceInfo.status, gameId]);

  return (
    <Container>
      { status === 'waiting' && <Lobby />}
      { status === 'started' && <GameView />}
      { status === 'finished' && <EndGame />}
    </Container>
  );
}

export default Game;
