import { GET_ALL, GET_DETAIL, GET_NAME, GET_TEMPERAMENT, SET_PAGE, ORDER_NAME, ORDER_TEMPERAMENT, ORDER_WEIGHT, CREATED_IN_DB, SET_ORDER, SET_FILTER, SET_ORDERMAX } from "./actionTypes.js";
import * as api from '../api';

export const getDogs = () => async (dispatch) => {
    try {
        const { data } = await api.getAll();
        dispatch({ type: GET_ALL, payload: data})
    } catch(e) {
        console.log(e.message)
    }
};

export const getName = (name) => async (dispatch) => {
    try {
        const { data } = await api.searchByName(name);
        dispatch({ type: GET_NAME, payload: data })
    } catch (e) {
        console.log(e.message)
    }
}

export const getDetail = (id, setLoading) => async (dispatch) => {
    try{
        const { data } = await api.getDetail(id);
        dispatch({ type: GET_DETAIL, payload: data})
        setLoading && setLoading(false)
    } catch(e){
        console.log(e.message)
    }
}

export const getTemperaments = () => async (dispatch) => {
    try{
        const { data } = await api.getTemperament();
        dispatch({ type: GET_TEMPERAMENT, payload: data})
    } catch(e) {
        console.log(e.message)
    }
}

export const orderTemp = (temp) => async (dispatch) => {
    try{
        const { data } = await api.orderByTemp(temp);
        dispatch({ type: ORDER_TEMPERAMENT, payload: data})
    } catch(e) {
        console.log(e.message)
    }
}

export const createdInDB = (created) => async (dispatch) => {
    try {
        const { data } = await api.createdInDB(created);
        dispatch( { type: CREATED_IN_DB, payload: data })
    } catch (e) {
        console.log(e.message)
    }
}

export const orderWeight = (order) => {
    return { type: ORDER_WEIGHT, payload: order}
}

export const orderName = (order) => {
    return { type: ORDER_NAME, payload: order}
}

export const setPage = (page) => {
    return { type: SET_PAGE, payload: page }
}

export const createDog = (newDog) => async(dispatch) => {
    try {
        const { data } = await api.createDog(newDog)
        dispatch({ type: 'CONCAT', payload: data })
    } catch (e) {
        console.log(e.message)
    }
}

export const setOrder = (order) => {
    return { type: SET_ORDER, payload: order}
}

export const setFilter = (filter) => {
    return { type: SET_FILTER, payload: filter }
}

export const setOrderMax = (order) => {
    return { type: SET_ORDERMAX, payload: order}
}