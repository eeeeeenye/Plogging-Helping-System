import { combineReducers } from 'redux';
import authReducer from './Authslice';

const rootReducer = combineReducers({
  auth: authReducer,
  // 다른 리듀서들도 필요한 경우 여기에 추가
});

export default rootReducer;
