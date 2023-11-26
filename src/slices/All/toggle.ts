import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Toggle {
  menuToggle: boolean
  modalToggle: boolean
}

const initialState: Toggle = {
  menuToggle: false,
  modalToggle: false,
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    menuToggle(state, action: PayloadAction<boolean>) {
      state.menuToggle = action.payload
    },
    modalToggle(state, action: PayloadAction<boolean>) {
      state.menuToggle = action.payload
    },
  },
})

export const { menuToggle, modalToggle } = toggleSlice.actions
export default toggleSlice.reducer
