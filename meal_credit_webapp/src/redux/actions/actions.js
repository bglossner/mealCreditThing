export const userLoginInfo = loginInfo => ({
    type: "CHANGE_LOGIN_INFO",
    loginInfo: loginInfo
});

export const changeRememberMeValue = value => ({
    type: "CHECKBOX_CHANGED",
    isChecked: value
});
