import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// export interface {
import { AutoFocus, CameraType } from 'expo-camera'

export interface Camera {
  // cameraType: string;
  cameraOn: boolean
  cameraType: string
}

const initialState: Camera = {
  cameraOn: false,
  cameraType: CameraType.back,
}

const communitySlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraOn: (state, action: PayloadAction<boolean>) => {
      state.cameraOn = action.payload
    },
    setCameraType: (state, action: PayloadAction<string>) => {
      state.cameraType = action.payload
    },
  },
})

export const { setCameraOn, setCameraType } = communitySlice.actions
export default communitySlice.reducer
