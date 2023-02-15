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
      // console.log(action.payload);
      // for (let i in state.cartList.length) {
      //   if (state.cartList[i].includes(action.payload.id)) {
      //     state.cartItemList.splice(i, 1)
      //     state.cartItemList.push({
      //       'storeId': action.payload.id,
      //       'storeNm': action.payload.storeName,
      //       'bigItem': route.params?.menu.bigItem,
      //       'itemSize': radioButtons[0]?.smallItem,
      //       'description': route.params?.menu.description,
      //       'id': route.params?.menu.id,
      //       'image': route.params?.menu.image,
      //       'isExhausted': route.params?.menu.isExhausted,
      //       'totalAmount': totalAmount,
      //       'price': totalPrice
      //     })
      //   }

      // 'storeId': route.params?.storeId,
      // 'storeNm': route.params?.storeInfo.storeName,
      // 'bigItem': route.params?.menu.bigItem,
      // 'itemSize': radioButtons[0]?.smallItem,
      // 'description': route.params?.menu.description,
      // 'id': route.params?.menu.id,
      // 'image': route.params?.menu.image,
      // 'isExhausted': route.params?.menu.isExhausted,
      // 'totalAmount': totalAmount,
      // 'price': totalPrice

      // }
      state.cartItemList.push(action.payload)
    },
    //카트에 상품 삭제
    deleteCartList: (state, action) => {
      state.cartItemList.forEach((item: any, index: number) => {
        if (item.id === action.payload) {
          state.cartItemList.splice(index, 1);
        }
      })
    }
  },

});
export const { pushCartList, deleteCartList } = item.actions;

export const selectCartItemList = (state: any) => state.item.cartItemList;

export default item.reducer;
