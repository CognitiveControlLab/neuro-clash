import { Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Canvas } from '@react-three/fiber';

function Game() {
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
