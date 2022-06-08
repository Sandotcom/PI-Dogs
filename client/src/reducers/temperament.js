import { GET_TEMPERAMENT } from "../actions/actionTypes";

export default function temperament(state = [], action){
    switch(action.type) {
        case GET_TEMPERAMENT:
            return action.payload
        default:
            return state
    }
}