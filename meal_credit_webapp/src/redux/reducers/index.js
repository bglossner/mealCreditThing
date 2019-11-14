import { combineReducers } from 'redux';
import rememberMeChecked from './remember_me_checkbox';
import userLoginInfo from './user_login_information';

export default combineReducers ({
    rememberMeChecked,
    userLoginInfo,
});