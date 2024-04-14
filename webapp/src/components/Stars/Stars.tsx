/* eslint-disable no-param-reassign */
import { Stars, Stats } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function StarsView() {
  const ref1: any = useRef();
  const ref2: any = useRef();
  const ref3: any = useRef();
  const ref4: any = useRef();
  const ref5: any = useRef();
  const ref6: any = useRef();
  const ref7: any = useRef();
  const ref8: any = useRef();

  useFrame((state, delta: any) => {
    if (ref1.current.position.z === ref2.current.position.z) {
      [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8].forEach((ref : any, index) => {
        ref.current.position.z = -200 * index;
      });
    }
    [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8].forEach((ref : any) => {
      if (ref.current.position.z > 0) {
        ref.current.position.z = -1500;
      }
      ref.current.position.z += delta * 150;
    });
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <Stars radius={250} count={10000} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref1} position={[0, -100, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref2} position={[50, 0, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref3} position={[0, 40, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref4} position={[100, 0, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref5} position={[0, -70, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref6} position={[80, 0, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref7} position={[20, 20, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <mesh ref={ref8} position={[60, 20, 0]}>
        <Stars radius={50} count={200} speed={0.1} factor={10} fade />
      </mesh>
      <Stats />
    </group>

  );
}

export default StarsView;
