import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {RangeValue} from 'rc-picker/lib/interface';
import S from './StatCharts.module.scss';
import {selectStat} from '../../redux/selectors/selectSelector';
import {getStat} from '../../redux/slices/statSlice';
import DataFilter from './DataFilter/DataFilter';
import Charts from './Charts/Charts';

const StatCharts = () => {
  const dispatch = useDispatch();
  const stat = useSelector(selectStat);
  const {t} = useTranslation();
  const [firstDateRange, setFirstDateRange] = useState<RangeValue<moment.Moment> | null>(null);
  const [secondDateRange, setSecondDateRange] = useState<RangeValue<moment.Moment> | null>(null);
  const startDate = stat.purchases[0]?.date || null;
  const endDate = stat.purchases[stat.purchases.length-1]?.date || null;

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
      <Charts purchases={purchases} views_to_clicks={views_to_clicks}/> : 
      <Grid item md={12}><p>{t('statCharts.chooseDates')}</p></Grid>
    }
    </Grid>
  </Container>
};

export default StatCharts;