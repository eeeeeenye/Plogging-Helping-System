import { combineReducers } from 'redux';
import authReducer from './All/Authslice';
import watchReducer from './All/Watchslice';
import distanceReducer from './All/Distanceslice'
import uriReducer from './All/urislice'
import pointsReducer from './All/point_historyslice'
import recordReducer from './All/Recordslice'

const rootReducer = combineReducers({
  auth: authReducer,
  stopwatch: watchReducer,
  dist: distanceReducer,
  uriState: uriReducer,
  pointHistory: pointsReducer,
  record: recordReducer,
  // 다른 리듀서들도 필요한 경우 여기에 추가
});


export default rootReducer;
