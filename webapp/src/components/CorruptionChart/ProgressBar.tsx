import { Progress, Row } from './styles';

interface ProgressBarProps {
  team1: string;
  team2: string;
  max: number;
  value: number;
}

function ProgressBar(props : ProgressBarProps) {
  const {
    team1, team2, max, value,
  } = props;

  const progress = (value / max) * 100;
  return (
    <Row>
      <Progress team1={team1} team2={team2} progress={progress}>
        <div />
      </Progress>
      {value}
      /
      {max}
    </Row>

  );
}

export default ProgressBar;
