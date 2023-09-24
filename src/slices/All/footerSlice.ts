import { configureStore, createSlice } from '@reduxjs/toolkit'

interface FooterImage {
  id: number
  clicked: boolean
}

interface FooterImageState {
  FooterImages: FooterImage[]
}
const initialState: FooterImageState = {
  FooterImages: [
    { id: 1, clicked: false },
    { id: 2, clicked: false },
    { id: 3, clicked: false },
    { id: 4, clicked: false },
  ],
}

const footerSlice = createSlice({
  name: 'FooterImages',
  initialState,
  reducers: {
    toggleImageClick: (state, action: PayloadAction<FooterImageState>) => {
      const { id } = action.payload
      console.log(action, 'payload')
      //클릭한버튼만 true 나머진false
      state.FooterImages.forEach((button) => {
        button.clicked = button.id === id
      })
    },
  },
})

export const { toggleImageClick } = footerSlice.actions
export default footerSlice.reducer
