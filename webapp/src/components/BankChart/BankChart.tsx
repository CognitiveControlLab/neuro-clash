import ProgressBar from './ProgressBar';
import { Container } from './styles';

interface BankChartProps {
  items: Array<{ color: string, max: number, value: number }>;
}

function BankChart(props : BankChartProps) {
  const { items } = props;
  return (
    <Container>
      {items.map((item: any) => (
        <ProgressBar
          color={item.color}
          max={item.max}
          value={item.value}
        />
      ))}
    </Container>

  );
}

export default BankChart;
