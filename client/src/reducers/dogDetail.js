import { GET_DETAIL } from "../actions/actionTypes";

export default function dogDetail (state = [], action) {
    switch(action.type) {
        case GET_DETAIL:
            return action.payload
        default:
            return state
    }
}