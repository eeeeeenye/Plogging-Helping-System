import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LocationState {
  position: string
}

const initialState: LocationState = {
  position: '주소 검색',
}

const locationSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    position(state, action: PayloadAction<string>) {
      state.position = action.payload
    },
  },
})

export const { position } = locationSlice.actions
export default locationSlice.reducer
