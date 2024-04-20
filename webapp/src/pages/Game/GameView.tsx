/* eslint-disable react/jsx-props-no-spreading */
import { Canvas } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box, useGLTF } from '@react-three/drei';
import { useGameClient } from '../../providers/GameClientProvider';
import { Container, OverlayContainer, StatsOverlay } from './styles';
import CorruptionChart from '../../components/CorruptionChart';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

function Robot(props: BoxProps) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./win.glb');
  console.log('Robot', nodes, materials);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      {/* <mesh geometry={nodes.Cube001.geometry} material={materials.Material} /> */}
    </group>
  );
}

function Player({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./player3.glb');
  console.log('Player', nodes, materials);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      {/* <mesh geometry={nodes.Cube001.geometry} material={materials.Material} /> */}
    </group>
  );
}

function GameView() {
  const {
    progress,
  } = useGameClient();

  const scores = useMemo(() => progress?.map((p: any, index: number) => ({
    color: index === 0 ? 'red' : 'blue',
    max: p.bank[0].max,
    value: p.bank[0].value,
  })), [progress]);

  return (
    <Container>
      <Canvas shadows>
        <ambientLight intensity={1} />
        { progress?.map(({ headPosition }: any, index : number) => (
          <Box
            position={[-4 + (index * 8), 0, 0]}
            rotation={[headPosition.x, 0, headPosition.y]}
          />
        ))}
        <Player position={[0, 0, 0]} />
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
