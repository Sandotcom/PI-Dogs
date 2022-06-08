import { SET_PAGE } from "../actions/actionTypes";

export default function page(state = 1, action) {
    switch(action.type) {
        case SET_PAGE:
            return action.payload
        default:
            return state
    }
}