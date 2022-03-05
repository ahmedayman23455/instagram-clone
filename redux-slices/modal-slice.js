import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { isOpen: false };
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = modalSlice.actions;
export const selectIsOpen = (state) => state.modal.isOpen;
export default modalSlice.reducer;
