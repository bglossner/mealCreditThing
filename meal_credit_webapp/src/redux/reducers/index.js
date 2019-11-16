import { combineReducers } from 'redux';
import rememberMeChecked from './remember_me_checkbox';
import userLoginInfo from './user_login_information';
import userError from './user_error';

export default combineReducers ({
    rememberMeChecked,
    userLoginInfo,
    userError,
});