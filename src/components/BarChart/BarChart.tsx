import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import './BarChart.scss'
import {Purchases} from '../../api/utils/StatState';
import {getOptions} from './options';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Purchases[][],
  range: any
}

const BarChart: React.FC<BarChartProps> = ({data, range}) => {

  const labels = data[0].map((item, index) => index);
  const options = getOptions(data);
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${range[0][0].format('DD MMMM YYYY')} - ${range[0][1].format('DD MMMM YYYY')}`,
        barPercentage: 1.2,
        data: data[0].map(item => item.value),
        backgroundColor: 'rgba(11, 121, 208, 0.5)',
      },
      {
        label: `${range[1][0].format('DD MMMM YYYY')} - ${range[1][1].format('DD MMMM YYYY')}`,
        barPercentage: 1.2,
        data: data[1].map(item => item.value),
        backgroundColor: 'rgba(11, 121, 208, 0.3)',
      },
    ],
  };

  return <Bar options={options as any} data={chartData} />
}

export default BarChart;