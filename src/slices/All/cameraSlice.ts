import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// export interface {
import { AutoFocus, CameraType } from 'expo-camera'

export interface Camera {
  // cameraType: string;
  cameraOn: boolean
  cameraType: string
  cameraImages: string
  previewVisible: boolean
}

const initialState: Camera = {
  cameraOn: false,
  cameraType: CameraType.back,
  cameraImages: '',
  previewVisible: false,
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
    setCameraImage: (state, action: PayloadAction<string>) => {
      state.cameraImages = action.payload
    },
    setPreviewVisible: (state, action: PayloadAction<boolean>) => {
      state.previewVisible = action.payload
    },
  },
})

export const { setCameraOn, setCameraType, setCameraImage, setPreviewVisible } =
  communitySlice.actions
export default communitySlice.reducer
