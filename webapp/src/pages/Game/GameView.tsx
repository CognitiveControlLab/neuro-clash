import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { useGameClient } from '../../providers/GameClientProvider';
import { Container, OverlayContainer, StatsOverlay } from './styles';
import CorruptionChart from '../../components/CorruptionChart';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

function Box(props: BoxProps) {
  const { position, rotation } = props;

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function GameView() {
  const {
    progress,
  } = useGameClient();

  console.log('progress', progress);

  const scores = useMemo(() => progress?.map((p: any, index: number) => ({
    color: index === 0 ? 'red' : 'blue',
    max: p.bank[0].max,
    value: p.bank[0].value,
  })), [progress]);

  return (
    <Container>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        { progress?.map(({ headPosition }: any, index : number) => (
          <Box
            position={[-4 + (index * 8), 0, 0]}
            rotation={[headPosition.x, 0, headPosition.y]}
          />
        ))}
      </Canvas>
      <OverlayContainer>
        <StatsOverlay>
          <CorruptionChart items={scores} />
        </StatsOverlay>
      </OverlayContainer>
    </Container>
  );
}

export default GameView;
