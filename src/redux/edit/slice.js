import { createSlice } from "@reduxjs/toolkit";
// import { deleteContact } from "../contacts/operations";

const initialState = {
  editIsOpen: false,
  editContact: null,
  editOnConfirm: null,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    openEditModal: (state, action) => {
      console.log(action.payload, "EDIT ACTION");
      state.editIsOpen = true;
      state.editContact = action.payload;
      state.editOnConfirm = true;
    },
    closeEditModal: (state) => {
      state.editIsOpen = false;
      state.editContact = initialState.contact;
      state.editOnConfirm = null;
    },
  },
});

export const { openEditModal, closeEditModal } = editSlice.actions;
export const editModalReducer = editSlice.reducer;
