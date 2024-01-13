import { Button, Container } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import EEGSetup from '../../components/EEGSetup/EEGSetup';
import { Header } from './styles';

function Game() {
  const [eegSetupOpen, setEEGSetupOpen] = useState(false);
  const [time, setTime] = useState('fetching');
  useEffect(() => {
    const socket = io('http://localhost:5000', { transports: ['websocket'] });
    socket.on('connect', () => console.log(socket.id));
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('time', (data) => setTime(data));
    socket.on('disconnect', () => setTime('server disconnected'));
  }, []);

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
