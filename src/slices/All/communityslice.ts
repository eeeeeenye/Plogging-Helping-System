import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// export interface {

export interface Community {
  community_id: number
  clientID: number
  kakaolink: string
  date: Date
  created_at: Date
  title: string
  image: string
  people: number
  city: string
}

const initialState: Community[] = []

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    saveCommunity: (state, action: PayloadAction<Community[]>) => {
      return action.payload
    },
  },
})

export const { saveCommunity } = communitySlice.actions
export default communitySlice.reducer
