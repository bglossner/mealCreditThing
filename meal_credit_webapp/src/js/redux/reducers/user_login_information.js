export default function userLoginInfo(state = null, action) {
    if (action.type === 'CHANGE_LOGIN_INFO') {
        return action.loginInfo;
    }
    return state;
}