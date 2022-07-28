import axios from 'axios';

export const getAll = () => axios.get(`/dogs`)
export const orderByTemp = (temp) => axios.get(`/dogs?temp=${temp}`)
export const createdInDB = (created) => axios.get(`/dogs?created=${created}`)
export const getDetail = (id) => axios.get(`/dogs/${id}`)
export const searchByName = (name) => axios.get(`/dogs?name=${name}`)
export const getTemperament = () => axios.get(`/temperament`)
export const createDog = (newDog) => axios.post(`/dog`, newDog)