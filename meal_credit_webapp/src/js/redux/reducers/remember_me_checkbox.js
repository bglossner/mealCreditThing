export default function rememberMeChecked(state = false, action) {
    if (action.type === 'CHECKBOX_CHANGED') {
        //console.log(action.isChecked);
        return action.isChecked;
    }
    return state;
}