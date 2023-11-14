import { combineReducers } from 'redux'
import authReducer from './All/Authslice'
import watchReducer from './All/Watchslice'
import distanceReducer from './All/Distanceslice'
import uriReducer from './All/urislice'
import pointsReducer from './All/point_historyslice'
import recordReducer from './All/Recordslice'
import footerReducer from './All/footerSlice'
import communityReducer from './All/communityslice'
import toggleReducer from './All/toggle'
import sliceReducer from './All/locationslice'
const rootReducer = combineReducers({
  auth: authReducer,
  stopwatch: watchReducer,
  dist: distanceReducer,
  uriState: uriReducer,
  pointHistory: pointsReducer,
  record: recordReducer,
  footer: footerReducer,
  community: communityReducer,
  toggle: toggleReducer,
  slice: sliceReducer,
  // 다른 리듀서들도 필요한 경우 여기에 추가
})

export default rootReducer
