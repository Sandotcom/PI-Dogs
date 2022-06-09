import { SET_ORDER } from "../actions/actionTypes"

export default function order (state = 'nasc', action) {
    switch(action.type){
        case SET_ORDER:
            return action.payload
        default:
            return state
    }
}