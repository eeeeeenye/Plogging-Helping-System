import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LocationState {
  location: string
}

const initialState: LocationState = {
  location: '',
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    location(state, action: PayloadAction<string>) {
      state.location = action.payload
    },
    resetLocation(state) {
      state.location = ''
    },
  },
})

export const { location } = locationSlice.actions
export default locationSlice.reducer
