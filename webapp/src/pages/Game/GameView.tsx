import { Canvas } from '@react-three/fiber';
import { useGameClient } from '../../providers/GameClientProvider';
import { Container, OverlayContainer, StatsOverlay } from './styles';
import RadarChart from '../../components/RadarChart';
import BankChart from '../../components/BankChart';

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

  return (
    <Container>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        { progress?.scores?.map(({ score }: any, index : number) => (
          <Box
            position={[-2 + (index * 4), 0, 0]}
            rotation={[score.x, 0, score.y]}
          />
        ))}
      </Canvas>
      <OverlayContainer>
        <StatsOverlay>
          {/* Use progress from the server */}
          <RadarChart items={[
            { label: 'Concentration', value: 1 },
            { label: 'Alertness', value: 2 },
            { label: 'Will', value: 3 },
          ]}
          />
          {/* Use progress from the server */}
          <BankChart items={[
            { color: 'red', max: 100, value: 50 },
            { color: 'blue', max: 100, value: 20 },
            { color: 'yellow', max: 100, value: 20 },
          ]}
          />
        </StatsOverlay>
      </OverlayContainer>
    </Container>
  );
}

export default GameView;
