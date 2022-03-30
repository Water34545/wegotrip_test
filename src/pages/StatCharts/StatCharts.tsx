import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import {getStat} from '../../redux/slices/statSlice';
import {selectStat} from '../../redux/selectors/selectSelector';
import {RangeValue} from 'rc-picker/lib/interface';
import BarChart from '../../components/BarChart/BarChart';

const {RangePicker} = DatePicker;

export const StatCharts = () => {
  const stat = useSelector(selectStat);
  const startDate = stat.purchases[0]?.date || null;
  const endDate = stat.purchases[stat.purchases.length-1]?.date || null;
  const dispatch = useDispatch();
  const [firstDateRange, setFirstDateRange] = useState<RangeValue<moment.Moment> | null>(null);
  const [secondDateRange, setSecondDateRange] = useState<RangeValue<moment.Moment> | null>(null);
  const dateFormat = 'YYYY-MM-DD';

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

  const disabledDate = (current: any) => {
    const isAvailable = current.isSameOrAfter(startDate) && current.isSameOrBefore(endDate);
    return !isAvailable;
  };

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

  return <div>
    <p>StatCharts</p>
    <RangePicker
      defaultPickerValue={[moment(startDate, dateFormat), moment(startDate, dateFormat)]}
      value={firstDateRange}
      disabledDate={disabledDate}
      onChange={val => updateValues(val, setFirstDateRange, secondDateRange, setSecondDateRange)}
      format={dateFormat}
    />
    <RangePicker
      defaultPickerValue={[moment(startDate, dateFormat), moment(startDate, dateFormat)]}
      value={secondDateRange}
      disabledDate={disabledDate}
      onChange={val => updateValues(val, setSecondDateRange, firstDateRange, setFirstDateRange)}
      format={dateFormat}
    />
    {purchases ? <BarChart data={purchases as any} range={[firstDateRange, secondDateRange]}/> : <p>Выберете диапазон сравнения</p>}
  </div>
}