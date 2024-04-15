import ProgressBar from './ProgressBar';
import { Container } from './styles';

interface Team {
  color: string;
  max: number;
  value: number;
}

interface CoruptionChartProps {
  items: [Team, Team];
}

function CorruptionChart(props : CoruptionChartProps) {
  const { items } = props;
  const [team1, team2] = items;

  return (
    <Container>
      <ProgressBar
        team1={team1.color}
        team2={team2.color}
        value={team1.value}
        max={team1.max + team2.max}
      />
    </Container>

  );
}

export default CorruptionChart;
