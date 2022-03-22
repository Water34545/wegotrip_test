import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StatState} from '../../api/utils/StatState';

const initialState: StatState = {
  purchases: [],
  views_to_clicks: []
}

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    getStat() {},
    setStat(state, action: PayloadAction<StatState>) {
      const statData = action.payload;
      return {...state, ...statData};
    }
  },
})

export const {getStat, setStat} = statSlice.actions;

export default statSlice.reducer;