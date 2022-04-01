import {useTranslation} from 'react-i18next';
import BarChart from '../../../components/BarChart/BarChart';
import 'antd/dist/antd.css';

interface ChartsProps {
  purchases: {
    date: moment.Moment;
    value: number;
  }[][]
  views_to_clicks: {
    date: moment.Moment;
    value: number;
    view: number;
    click: number;
  }[][]
}

const Charts: React.FC<ChartsProps> = ({purchases, views_to_clicks}) => {
  const {t} = useTranslation();

  return <>
    <BarChart 
      label={t('statCharts.sales')}
      data={purchases} 
      symbol={t('statCharts.currency')}
    /> 
    <BarChart 
      label={t('statCharts.balance')}
      data={purchases} 
      symbol={t('statCharts.currency')}
    /> 
    <BarChart 
      label={t('statCharts.viewsVsClicks')}
      data={views_to_clicks} 
      symbol={t('statCharts.persent')}
    /> 
    <BarChart 
      label={t('statCharts.clicksVSSales')}
      data={views_to_clicks} 
      symbol={t('statCharts.persent')}
    /> 
  </>
};

export default Charts;