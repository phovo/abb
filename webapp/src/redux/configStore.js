import { applyMiddleware,combineReducers,createStore } from "redux";
import ReducerSKU from './reducer/ReducerSKU';
import UserReducer from './reducer/UserReducer';

const rootReducer = combineReducers({
    ReducerSKU,
    UserReducer
})

const store = createStore(rootReducer);

export default store;
