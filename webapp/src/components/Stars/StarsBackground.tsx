import {
  Canvas,
} from '@react-three/fiber';
import { Container, OverlayContainer } from './styles';
import StarsView from './Stars';

interface StarsBackgroundProps {
  children: React.ReactNode;
}

function StarsBackground(props: StarsBackgroundProps) {
  const { children } = props;

  return (
    <Container>
      <Canvas>
        <StarsView />
      </Canvas>
      <OverlayContainer>
        {children}
      </OverlayContainer>
    </Container>
  );
}

export default StarsBackground;
