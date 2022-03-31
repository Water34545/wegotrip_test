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
import moment from 'moment';
import {Grid} from '@mui/material';
import {getOptions} from './options';
import S from './BarChart.module.scss';
import {getCx} from '../../utils/cx';

const cx = getCx(S);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataOptional {
  view?: number,
  click?: number
}

interface Data extends DataOptional {
  date: moment.Moment,
  value: number,
}

interface BarChartProps {
  label: string,
  data: Data[][],
  symbol: string,
}

const BarChart: React.FC<BarChartProps> = ({label, data, symbol}) => {
  const options = getOptions(data, symbol);
  const multiplier = symbol === '%' ? data[0].length*0.1 : 0.1;
  const firstSum = Math.floor(data[0].reduce((sum, item) => sum + item.value, 0)/multiplier)/10;
  const secondSum = Math.floor(data[1].reduce((sum, item) => sum + item.value, 0)/multiplier)/10;
  const increase = Math.floor(100 - (secondSum/firstSum)*100);
  const dateFormat = 'DD MMMM YYYY';
  let firstSubSum = null;
  let secondSubSum = null;

  const getSum = (data: Data[], key: keyof DataOptional) => data.reduce((sum, item) => {
    if(item[key]) {
      sum += item[key] as number;
    }
    return sum;
  }, 0);

  if(data[0][0].view) {
    const firstSubSumView = getSum(data[0], 'view');
    const firstSubSumClick = getSum(data[0], 'click');
    const secondSubSumView = getSum(data[1], 'view');
    const secondSubSumClick = getSum(data[1], 'click');
    firstSubSum = `${firstSubSumView} → ${firstSubSumClick}`;
    secondSubSum = `${secondSubSumView} → ${secondSubSumClick}`;
  }
  
  const chartData = {
    labels: data[0].map((item, index) => index),
    datasets: [
      {
        barPercentage: 1.2,
        data: data[0].map(item => item.value),
        backgroundColor: '#0a7bd1cc',
      },
      {
        barPercentage: 1.2,
        data: data[1].map(item => item.value),
        backgroundColor: '#007dff80',
      },
    ],
  };

  return <Grid item xs={12} md={6}>
    <div className={S.chart}>
      <div className={S.chartTitle}>{label}</div>
      <div className={S.chartRow}>
        <div className={S.chartSum}>{firstSum}{symbol}<span>{increase > 0 ? '+' : ''}{increase}%</span></div>
        <div className={S.chartOldSum}>{secondSum}{symbol}</div>
      </div>
      {firstSubSum && secondSubSum && <div className={S.chartRow}>
        <div className={S.chartSubSum}>{firstSubSum}</div>
        <div className={cx(S.chartOldSubSum, 'text-grey')}>{secondSubSum}</div>
      </div>}
      <div className={S.chartBody}>
        <Bar options={options as any} data={chartData} />
      </div>
      <div className={cx(S.chartRow, 'text-grey')}>
        <div>{data[0][0].date.format(dateFormat)}</div>
        <div className={S.chartLegend}>
          <div className={S.chartLegendItem}>
            {data[0][0].date.format(dateFormat)}-{data[0][data[0].length-1].date.format(dateFormat)}
          </div>
          <div className={S.chartLegendItem}>
            {data[0][0].date.format(dateFormat)}-{data[1][data[0].length-1].date.format(dateFormat)}
          </div>
        </div>
        <div>{data[0][data[0].length-1].date.format(dateFormat)}</div>
      </div>
    </div>
  </Grid>
}

export default BarChart;