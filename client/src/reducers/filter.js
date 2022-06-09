import { SET_FILTER } from "../actions/actionTypes";

export default function filter(state = 'All', action){
    switch(action.type){
        case SET_FILTER:
            return action.payload
        default:
            return state
    }
}