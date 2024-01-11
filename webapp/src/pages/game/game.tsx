import { Button, Container } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import EEGSetup from '../../components/EEGSetup/EEGSetup';
import { Header } from './styles';

function Game() {
  const [eegSetupOpen, setEEGSetupOpen] = useState(false);

  const onEEGSetupClose = () => {
    setEEGSetupOpen(false);
  };

  const onEEGSetupOpen = () => {
    setEEGSetupOpen(true);
  };

  return (
    <Container>
      <Header>
        <Button onClick={() => onEEGSetupOpen()}> EEG SETUP HERE !!!</Button>
      </Header>
      <EEGSetup open={eegSetupOpen} onClose={() => onEEGSetupClose()} />
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </Container>
  );
}

export default Game;
