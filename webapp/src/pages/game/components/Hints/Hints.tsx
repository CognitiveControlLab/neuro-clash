import HintPictureBox from '../../../../components/HintPictureBox/HintPictureBox';
import { Container } from './styles';

interface Hint {
  imageUrl?: string
  discoverd: boolean
}

interface HintsProps {
  hints: Hint[]
}

function Hints(props : HintsProps) {
  const {
    hints,
  } = props;

  return (
    <Container>
      { hints && hints.map(({ imageUrl, discoverd }) => (
        <HintPictureBox url={discoverd ? imageUrl : undefined} />
      ))}
    </Container>
  );
}

export default Hints;
