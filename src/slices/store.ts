import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducers'

// reducer들을 저장소에서 사용할 수 있게
const store = configureStore({
  reducer: rootReducer,
})

export default store
