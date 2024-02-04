import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import EEGSetup from '../../components/EEGSetup/EEGSetup';
import { Header, GameScore } from './styles';
import { ConnectionStatus, useEEG } from '../../providers/EEGProvider';
import { ConnectionState, useGameClient } from '../../providers/GameClientProvider';
import { EEGDataType } from '../../types/EEGData';

// Will need to be set in cookie or something
const userId = `Player#${uuidv4().slice(0, 5)}`;

function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [eegSetupOpen, setEEGSetupOpen] = useState(false);
  const { deviceInfo, setDataListener } = useEEG();
  const {
    connectionState,
    progress,
    sendEEGData,
    join,
  } = useGameClient();

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  useEffect(() => {
    if (deviceInfo.status === ConnectionStatus.CONNECTED
      && connectionState === ConnectionState.CONNECTED && gameId) {
      join(userId, gameId);
      setDataListener((data) => {
        sendEEGData(userId, gameId, data);
      });
    }
  }, [sendEEGData, setDataListener, join, connectionState, deviceInfo.status, gameId]);

  // Delete this once you have the EEG
  useEffect(() => {
    if (connectionState === ConnectionState.CONNECTED && gameId) {
      join(userId, gameId);
      setInterval(() => {
        sendEEGData(userId, gameId, {
          data: {
            sequenceId: 1,
            samples: [{ x: Math.random(), y: Math.random(), z: Math.random() }],
          },
          type: EEGDataType.ACCELEROMETER,
        });
      }, 1000);
    }
  }, [sendEEGData, gameId, connectionState, join]);

  const onGameStart = () => {
    navigate(`/${uuidv4()}`);
  };

  return (
    <Container>
      <Header>
        <div>{userId}</div>
        <Button onClick={() => onEEGSetupOpen()}> EEG SETUP HERE !!!</Button>
        {!gameId && <Button onClick={onGameStart}>START</Button> }
      </Header>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <GameScore>
        <div>X POSITION</div>
        {progress?.scores?.map((score: any) => (
          // Red for me and blue for others
          <div key={score.userId} style={{ color: score.userId === userId ? 'red' : 'blue' }}>
            <div>{score.userId}</div>
            <div>{Number(score.score).toFixed(3)}</div>
          </div>
        ))}
      </GameScore>
    </Container>
  );
}

export default Game;
