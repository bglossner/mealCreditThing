export default function userLoginInfo(state = null, action) {
    if (action.type === 'CHANGE_LOGIN_INFO') {
        // console.log("storing login info", action.loginInfo)
        return action.loginInfo;
    }
    return state;
}