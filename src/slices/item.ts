//담기메뉴 저장용 store 입니다 .. 

import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cartItemList:[]
};

export const item = createSlice({
  name: 'item',
  initialState,

  reducers: {
    //상품 상태 변경 ( 추가, 삭제)
    editItemList: (state, action) => {
      state.cartItemList = action.payload.cartItemList
    },
  },

});
export const { editItemList } = item.actions;

export const selectCartItemList = (state: any) => state.item.cartItemList;

export default item.reducer;
