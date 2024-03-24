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

function RadarChart() {
  return (
    <Radar data={{
      labels: ['Exitation', 'Calme', 'Will', 'Focus', 'Stress'],
      datasets: [
        {
          label: 'State',
          fill: true,
          data: [2, 9, 3, 1, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        },
      ],
    }}
    />
  );
}

export default RadarChart;
