import { Progress, Row } from './styles';

interface ProgressBarProps {
  color: string;
  max: number;
  value: number;
}

function ProgressBar(props : ProgressBarProps) {
  const { color, max, value } = props;
  const progress = (value / max) * 100;
  return (
    <Row>
      <Progress color={color} progress={progress}>
        <div />
      </Progress>
      {value}
      /
      {max}
    </Row>

  );
}

export default ProgressBar;
