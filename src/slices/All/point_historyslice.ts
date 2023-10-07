import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Point {
  clientID: number
  created_at: string
  points: number
  event: string
  description: string
}

const initialState: Point[] = []

// 슬라이스 생성
const pointHistorySlice = createSlice({
  name: 'pointHistory',
  initialState: initialState,
  reducers: {
    setPointHistory: (state, action: PayloadAction<Point[]>) => {
      return action.payload
    },
  },
})

// 액션 및 리듀서 내보내기
export const { setPointHistory } = pointHistorySlice.actions
export default pointHistorySlice.reducer
