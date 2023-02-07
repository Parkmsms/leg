import { combineReducers ,configureStore} from "@reduxjs/toolkit";
import userSlice from "../slices/user";
import timeSlice from '../slices/time'
import itemSlice from "../slices/item"


const rootReducer = combineReducers({
  user: userSlice.reducer,
  time : timeSlice,
  item : itemSlice
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;