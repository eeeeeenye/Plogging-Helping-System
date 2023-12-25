import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StopwatchState {
  isRunning: boolean
  elapsedTime: number
}

const initialState: StopwatchState = {
  isRunning: false,
  elapsedTime: 0,
}

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    start(state) {
      state.isRunning = true
    },
    stop(state) {
      state.isRunning = false
    },
    reset(state) {
      state.elapsedTime = 0
    },
    updateElapsedTime(state, action: PayloadAction<number>) {
      state.elapsedTime = state.elapsedTime + action.payload
    },
  },
})

export const { start, stop, reset, updateElapsedTime } = stopwatchSlice.actions
export default stopwatchSlice.reducer
