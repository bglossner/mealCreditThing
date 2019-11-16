export default function userError(state = null, action) {
    if (action.type === 'USER_ERROR') {
        return action.userError;
    }
    return state;
}