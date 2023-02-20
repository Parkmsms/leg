//담기메뉴 저장용 store 입니다 .. 

import { createSlice } from '@reduxjs/toolkit';
import CartList from '../pages/Cart/CartList';

const initialState: any = {
  cartItemList: [],
  cartId: 0
};
export const item = createSlice({
  name: 'item',
  initialState,
  reducers: {
    //카트에 상품 추가시 고유 cartId번호 부여
    cartIdAdd: (state, action) => {
      state.cartId = state.cartId + action.payload
    },
    //카트에 상품 추가
    pushCartList: (state = initialState, action) => {
      state.cartItemList.push(action.payload)
    },
    //카트에 상품 삭제
    deleteCartList: (state, action) => {
      state.cartItemList.forEach((item: any, index: number) => {
        // if (item.id === action.payload.item && item.price === action.payload.price) {
        //   state.cartItemList.splice(index, 1);
        // }
        if (item.cartId === action.payload) {
          state.cartItemList.splice(index, 1);
        }
      })
    }
  },

});
export const { pushCartList, deleteCartList, cartIdAdd } = item.actions;

export const selectCartItemList = (state: any) => state.item.cartItemList;
export const selectCartId = (state: any) => state.item.cartId;

export default item.reducer;
