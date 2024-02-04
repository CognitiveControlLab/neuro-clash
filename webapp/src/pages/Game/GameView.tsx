import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { useGameClient } from '../../providers/GameClientProvider';

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
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      { progress?.scores?.map(({ score }: any, index : number) => (
        <Box
          position={[-2 + (index * 4), 0, 0]}
          rotation={[score.x, 0, score.y]}
        />
      ))}
      <Stats />
    </Canvas>
  );
}

export default GameView;
