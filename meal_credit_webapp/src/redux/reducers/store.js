import { combineReducers, createStore, applyMiddleware } from "redux";
import rememberMeChecked from "./remember_me_checkbox";
import userLoginInfo from "./user_login_information";
import userError from "./user_error";
const logger = store => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd(action.type);
    return result;
};
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);

let reducers = combineReducers({ rememberMeChecked, userLoginInfo, userError });
let store = createStoreWithMiddleware(reducers);

export default store;
