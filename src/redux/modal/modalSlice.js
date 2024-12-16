import { createSlice } from "@reduxjs/toolkit";
import { deleteContact } from "../contacts/operations";

const initialState = {
  isOpen: false,
  contact: null,
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.contact = action.payload;
      state.onConfirm = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contact = null;
      state.onConfirm = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
