//아이디 비밀번호 저장용 store 입니다 .. 

import {  createSlice } from '@reduxjs/toolkit';
import {
  Alert
} from 'react-native';

const initialState = {
  minutes:0,
  seconds:10
};

export const time = createSlice({
  name: 'time',
  initialState,

  reducers: {
    doTimer : (state, action) => {
      state.minutes = action.payload.t_minutes
      state.seconds = action.payload.t_seconds
    },
    doEnd: () => {
      Alert.alert("끝!");
    },
  },

});
export const { doTimer,doEnd } = time.actions;


export const selectMinutesinfo = (state:any) => state.time.minutes;
export const selectSecondsinfo = (state:any) => state.time.seconds;


export default time.reducer;
