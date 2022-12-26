import { combineReducers ,configureStore} from "@reduxjs/toolkit";
import userSlice from "../slices/user";
import timeSlice from '../slices/time'


const rootReducer = combineReducers({
  user: userSlice.reducer,
  time : timeSlice
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;