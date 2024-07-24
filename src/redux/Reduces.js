import { combineReducers } from 'redux';
import userReducer from './Userreducer'; 

const rootReducer = combineReducers({
  user: userReducer,

});

export default rootReducer;
