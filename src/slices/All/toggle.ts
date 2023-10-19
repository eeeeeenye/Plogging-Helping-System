import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Toggle {
  menuToggle: boolean
}

const initialState: Toggle = {
  menuToggle: false,
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    menuToggle(state, action: PayloadAction<Toggle>) {
      return action.payload
    },
  },
})

export const { menuToggle } = toggleSlice.actions
export default toggleSlice.reducer
