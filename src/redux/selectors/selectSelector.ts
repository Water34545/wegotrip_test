import moment from 'moment';
import type {RootState} from '../store';

export const selectStat = (state: RootState) => {
  const purchases = state.stat.purchases.map(item => ({...item, date: moment(item.date)}));
  const views_to_clicks = state.stat.views_to_clicks.map(item => ({...item, date: moment(item.date)}));
  return {purchases, views_to_clicks}
};