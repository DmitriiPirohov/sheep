import { combineReducers, createStore } from 'redux';
import userReducer from '../features/user';
import goodsReducer from '../features/goods';

const reducer = combineReducers({
  user: userReducer,
  goods: goodsReducer,
});
const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;