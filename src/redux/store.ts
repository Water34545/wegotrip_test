import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterSlice from './slices/statSlice';
import statSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  stat: counterSlice,
});

const store = configureStore({
  reducer, 
  middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
});

sagaMiddleware.run(statSaga);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;