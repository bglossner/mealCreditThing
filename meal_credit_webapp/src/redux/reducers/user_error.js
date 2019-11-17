export default function userError(state = null, action) {
    if (action.type === 'USER_ERROR') {
        // console.log("User error", action.userError)
        return action.userError;
    }
    return state;
}