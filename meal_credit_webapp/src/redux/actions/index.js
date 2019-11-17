export const userLoginInfo = loginInfo => ({
    type: 'CHANGE_LOGIN_INFO',
    loginInfo: loginInfo,
});

export const createNewError = newError => {
    console.log(newError);
    return ({
        type: 'USER_ERROR',
        userError: newError,
    });
};

export const changeRememberMeValue = value => ({
    type: 'CHECKBOX_CHANGED',
    isChecked: value,
});