import {takeLatest} from 'redux-saga/effects';
import {getStat} from '../slices/statSlice';
import {handleGetStat} from './handlers/handleGetStat';

export default function* statSaga() {
  yield takeLatest(getStat.type, handleGetStat);
}