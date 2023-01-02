//아이디 비밀번호 저장용 store 입니다 .. 

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minutes: 0,
};

export const time = createSlice({
  name: 'time',
  initialState,

  reducers: {
    //state의 시간 변경
    doTimer: (state, action) => {
      state.minutes = action.payload.t_minutes
    },
    //시간이 0분에 도달 시 
    doEnd: () => {
    },
  },

});
export const { doTimer, doEnd } = time.actions;


export const selectMinutesinfo = (state: any) => state.time.minutes;


export default time.reducer;
