import {call, put} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {setStat} from '../../slices/statSlice';
import {statService} from '../../../api/statService';
import {StatState} from '../../../api/utils/StatState';

export function* handleGetStat() {
  try {
    const response: AxiosResponse<StatState, any> = yield call(statService.get);
    const {data} = response;
    yield put(setStat({...data}));
  } catch (err) {
    console.log(`something wrong in handleGetStat ${err}`);
  }
}