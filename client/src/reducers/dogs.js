import { GET_ALL, GET_NAME, ORDER_TEMPERAMENT, ORDER_NAME, ORDER_WEIGHT, CREATED_IN_DB } from '../actions/actionTypes.js'

export default function dogs (state = [], action) {
    switch(action.type) {
        case GET_ALL:
            return action.payload
        case GET_NAME:
            return action.payload
        case ORDER_NAME:
            let sortInfo =
            action.payload === "nasc"
            ? state.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
             return 0;
            })
            : state.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
            })
            return sortInfo
        case ORDER_TEMPERAMENT:
            return action.payload
        case ORDER_WEIGHT:
            let orderInfo =
            action.payload === "wasc"
            ? state.sort(function (a, b) {
            if (a.weight[0] > b.weight[0]) {
                return 1;
            }
            if (a.weight[0] < b.weight[0]) {
                return -1;
            }
             return 0;
            })
            : state.sort(function (a, b) {
            if (a.weight[0] > b.weight[0]) {
                return -1;
            }
            if (a.weight[0] < b.weight[0]) {
                return 1;
            }
            return 0;
            });
            return orderInfo
        case CREATED_IN_DB:
            return action.payload
        default:
            return state
    }
}