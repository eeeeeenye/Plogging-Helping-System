import { combineReducers } from 'redux';
import authReducer from './All/Authslice';
import watchReducer from './All/Watchslice';

const rootReducer = combineReducers({
  auth: authReducer,
  stopwatch: watchReducer,
  // 다른 리듀서들도 필요한 경우 여기에 추가
});


export default rootReducer;
