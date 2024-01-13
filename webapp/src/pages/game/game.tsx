import { Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Game() {
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

  return (
    <Container>
      <FormattedMessage id="home.title" />
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
