import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { useGameClient } from '../../providers/GameClientProvider';
import { Container, OverlayContainer, StatsOverlay } from './styles';
import RadarChart from '../../components/RadarChart';
import BankChart from '../../components/BankChart';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const BehaviorColors = new Map([
  ['confuse', 'grey'],
  ['clarity', 'darkblue'],
  ['excitement', 'darkgreen'],
  ['boredom', 'brown'],
  ['concentrated', 'orange'],
]);

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
    me,
  } = useGameClient();

  const myProgress = useMemo(() => progress?.find((p: any) => p.id === me?.id), [progress, me]);
  const myBank = useMemo(() => myProgress?.bank.map(({ behavior, value, max } : any) => ({
    color: BehaviorColors.get(behavior) || 'black',
    max,
    value,
  })), [myProgress]);
  const myProduction = myProgress?.production.map(({ behavior, value } : any) => ({
    label: behavior,
    value,
  }));

  return (
    <Container>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        { progress?.map(({ headPosition }: any, index : number) => (
          <Box
            position={[-2 + (index * 4), 0, 0]}
            rotation={[headPosition.x, 0, headPosition.y]}
          />
        ))}
      </Canvas>
      <OverlayContainer>
        <StatsOverlay>
          <RadarChart items={myProduction} maxValue={myProduction?.at(0)?.max || 5} />
          <BankChart items={myBank} />
        </StatsOverlay>
      </OverlayContainer>
    </Container>
  );
}

export default GameView;
