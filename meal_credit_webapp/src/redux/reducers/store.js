import { applyMiddleware, combineReducers, createStore } from "redux";

import rememberMeChecked from "./remember_me_checkbox";
import userLoginInfo from "./user_login_information";

const logger = store => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd(action.type);
    return result;
};
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);

let reducers = combineReducers({ rememberMeChecked, userLoginInfo });
let store = createStoreWithMiddleware(reducers);

export default store;
