//담기메뉴 저장용 store 입니다 .. 

import { createSlice } from '@reduxjs/toolkit';
import CartList from '../pages/Cart/CartList';

const initialState: any = {
  cartItemList: []
};
export const item = createSlice({
  name: 'item',
  initialState,
  reducers: {
    //상품 상태 변경 ( 추가, 삭제)

    //카트에 상품 추가
    pushCartList: (state = initialState, action) => {
      console.log("push",action.payload)
      state.cartItemList.push(action.payload)
    },
    //카트에 상품 삭제
    deleteCartList: (state, action) => {
      console.log("삭제페이로드",action.payload)
      state.cartItemList.forEach((item: any, index: number) => {
        if (item.id === action.payload.item && item.price === action.payload.price) {
          state.cartItemList.splice(index, 1);
        }
      })
    }
  },

});
export const { pushCartList, deleteCartList } = item.actions;

export const selectCartItemList = (state: any) => state.item.cartItemList;

export default item.reducer;
