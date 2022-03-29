import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import {getStat} from '../../../redux/slices/statSlice';
import {selectStat} from '../../../redux/selectors/selectSelector';
import {RangeValue} from 'rc-picker/lib/interface';

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
    stat.purchases.filter(item => moment(item.date).isSameOrAfter(firstDateRange[0]) && moment(item.date).isSameOrBefore(firstDateRange[1])),
    stat.purchases.filter(item => moment(item.date).isSameOrAfter(secondDateRange[0]) && moment(item.date).isSameOrBefore(secondDateRange[1])), 
  ] : null;

  const views_to_clicks = firstDateRange && secondDateRange ? [
    stat.views_to_clicks.filter(item => moment(item.date).isSameOrAfter(firstDateRange[0]) && moment(item.date).isSameOrBefore(firstDateRange[1])),
    stat.views_to_clicks.filter(item => moment(item.date).isSameOrAfter(secondDateRange[0]) && moment(item.date).isSameOrBefore(secondDateRange[1])), 
  ] : null;

  const disabledDate = (current: any) => {
    const isAvailable = moment(current).isSameOrAfter(startDate) && moment(current).isSameOrBefore(endDate);
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
    {purchases && <div style={{display: "flex"}}>
      <ul>{purchases[0].map(item => <li key={item.date}>{item.date} - {item.value}</li>)}</ul>
      <ul>{purchases[1].map(item => <li key={item.date}>{item.date} - {item.value}</li>)}</ul>
    </div>}

    {views_to_clicks && <div style={{display: "flex"}}>
      <ul>{views_to_clicks[0].map(item => <li key={item.date}>{item.date} - {item.view} - {item.click}</li>)}</ul>
      <ul>{views_to_clicks[1].map(item => <li key={item.date}>{item.date} - {item.view} - {item.click}</li>)}</ul>
    </div>}
  </div>
}