import { combineReducers,createStore } from "redux";
import ReducerSKU from './reducer/ReducerSKU';

const rootReducer = combineReducers({
    ReducerSKU
})

const store = createStore(rootReducer);

export default store;
