import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  Filler,
  LineElement,
);

interface RadarChartProps {
  items: Array<{ label: string, value: number }>;
  maxValue: number;
}

function RadarChart(props: RadarChartProps) {
  const { items, maxValue } = props;
  return (
    <Radar
      data={{
        labels: items.map((item) => item.label),
        datasets: [
          {
            label: 'State',
            fill: true,
            data: items.map((item) => item.value),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',

          },
        ],
      }}
      options={{
        scales: {
          r: {
            min: 0,
            max: maxValue,
          },
        },
      }}
    />
  );
}

export default RadarChart;
