import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducer from "../redux-slices/modal-slice";

export const store = configureStore({
  reducer: {
    modal: modalSliceReducer,
  },
});


export default store; 