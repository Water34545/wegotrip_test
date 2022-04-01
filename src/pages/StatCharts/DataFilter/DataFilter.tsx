import {Grid} from "@mui/material";
import {ConfigProvider, DatePicker} from 'antd';
import {useTranslation} from "react-i18next";
import locale from 'antd/lib/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import {RangeValue} from 'rc-picker/lib/interface';
import S from './DataFilter.module.scss';

const {RangePicker} = DatePicker;

interface DataFilterProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
  firstDateRange: RangeValue<moment.Moment> | null;
  secondDateRange: RangeValue<moment.Moment> | null;
  updateValues: (
    value: RangeValue<moment.Moment>, 
    setValue: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>,
    enoutherDate: RangeValue<moment.Moment>,
    enoutherSetValue: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>,
  ) => void;
  setFirstDateRange: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>;
  setSecondDateRange: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>;
}

const DataFilter: React.FC<DataFilterProps> = (props) => {
  const {t} = useTranslation();
  const {startDate, endDate, firstDateRange, secondDateRange, updateValues, setFirstDateRange, setSecondDateRange} = props;
  const dateFormat = 'DD.MM.YYYY';
  
  const disabledDate = (current: any) => {
    const isAvailable = current.isSameOrAfter(startDate) && current.isSameOrBefore(endDate);
    return !isAvailable;
  };

  return <>
    <Grid item xs={12} sm={4} md={3}>
      <ConfigProvider locale={locale}>
        <RangePicker
          defaultPickerValue={[moment(startDate, dateFormat), moment(startDate, dateFormat)]}
          value={firstDateRange}
          disabledDate={disabledDate}
          onChange={val => updateValues(val, setFirstDateRange, secondDateRange, setSecondDateRange)}
          format={dateFormat}
        />
      </ConfigProvider>
    </Grid>
    <Grid item xs={12} sm={2} md={1}>
      <div className={S.dataFilterText}>{t('statCharts.with')}</div>
    </Grid>
    <Grid item xs={12} sm={4} md={3}>
      <ConfigProvider locale={locale}>
        <RangePicker
          defaultPickerValue={[moment(startDate, dateFormat), moment(startDate, dateFormat)]}
          value={secondDateRange}
          disabledDate={disabledDate}
          onChange={val => updateValues(val, setSecondDateRange, firstDateRange, setFirstDateRange)}
          format={dateFormat}
        />
      </ConfigProvider>
    </Grid>
    </>
};

export default DataFilter;