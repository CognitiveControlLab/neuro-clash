import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import EEGSetup from '../../components/EEGSetup/EEGSetup';
import { Header, GameScore } from './styles';
import { useEEG } from '../../providers/EEGProvider';
import { useGameClient } from '../../providers/GameClientProvider';

function Game() {
  const [eegSetupOpen, setEEGSetupOpen] = useState(false);
  const { setDataListener } = useEEG();
  const { progress, sendEEGData } = useGameClient();

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  useEffect(() => {
    if (setDataListener) {
      setDataListener((data) => {
        sendEEGData(data);
      });
    }
  }, [sendEEGData, setDataListener]);

  return (
    <Container>
      <Header>
        <Button onClick={() => onEEGSetupOpen()}> EEG SETUP HERE !!!</Button>
      </Header>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <GameScore>
        <div>X POSITION</div>
        <div>{progress?.score?.toFixed(3)}</div>
      </GameScore>
    </Container>
  );
}

export default Game;
