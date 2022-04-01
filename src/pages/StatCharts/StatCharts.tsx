import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Grid} from '@mui/material';
import 'antd/dist/antd.css';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {RangeValue} from 'rc-picker/lib/interface';
import S from './StatCharts.module.scss';
import {getStat} from '../../redux/slices/statSlice';
import {selectStat} from '../../redux/selectors/selectSelector';
import BarChart from '../../components/BarChart/BarChart';
import DataFilter from './DataFilter/DataFilter';

export const StatCharts = () => {
  const {t} = useTranslation();
  const stat = useSelector(selectStat);
  const startDate = stat.purchases[0]?.date || null;
  const endDate = stat.purchases[stat.purchases.length-1]?.date || null;
  const dispatch = useDispatch();
  const [firstDateRange, setFirstDateRange] = useState<RangeValue<moment.Moment> | null>(null);
  const [secondDateRange, setSecondDateRange] = useState<RangeValue<moment.Moment> | null>(null);

  useEffect(() => {
    dispatch(getStat());
  }, [dispatch]);

  const purchases = firstDateRange && secondDateRange ? [
    stat.purchases.filter(item => item.date.isSameOrAfter(firstDateRange[0]) && item.date.isSameOrBefore(firstDateRange[1])),
    stat.purchases.filter(item => item.date.isSameOrAfter(secondDateRange[0]) && item.date.isSameOrBefore(secondDateRange[1])), 
  ] : null;

  const views_to_clicks = firstDateRange && secondDateRange ? [
    stat.views_to_clicks.filter(item => item.date.isSameOrAfter(firstDateRange[0]) && item.date.isSameOrBefore(firstDateRange[1])),
    stat.views_to_clicks.filter(item => item.date.isSameOrAfter(secondDateRange[0]) && item.date.isSameOrBefore(secondDateRange[1])), 
  ] : null;

  const updateValues = (
    value: RangeValue<moment.Moment>, 
    setValue: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>,
    enoutherDate: RangeValue<moment.Moment>,
    enoutherSetValue: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>,
  ) => {
    setValue(value);
    if(enoutherDate && enoutherDate[0] && value && value[0] && value[1]) {
      const newFirstDate = enoutherDate[0].clone();
      const newLastDate = enoutherDate[0].add(value[1].diff(value[0], 'days'), 'days');
      enoutherSetValue([newFirstDate, newLastDate]);
    }
  };

  if(!stat.purchases[0]) return <p>Loading...</p>

  return <Container>
    <Grid container spacing={3} className={S.main} justifyContent="flex-end">
      <DataFilter
        startDate={startDate}
        endDate={endDate}
        firstDateRange={firstDateRange}
        secondDateRange={secondDateRange}
        updateValues={updateValues}
        setFirstDateRange={setFirstDateRange}
        setSecondDateRange={setSecondDateRange}
      />
    {purchases && views_to_clicks ? 
      <>
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
      </> : 
        <Grid item md={12}>
          <p>{t('statCharts.chooseDates')}</p>
        </Grid>
      }
    </Grid>
  </Container>
}