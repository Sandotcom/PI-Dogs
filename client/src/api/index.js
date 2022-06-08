import axios from 'axios';

const URL = 'http://localhost:3001';

export const getAll = () => axios.get(`${URL}/dogs`)
export const orderByTemp = (temp) => axios.get(`${URL}/dogs?temp=${temp}`)
export const createdInDB = (created) => axios.get(`${URL}/dogs?created=${created}`)
export const getDetail = (id) => axios.get(`${URL}/dogs/${id}`)
export const searchByName = (name) => axios.get(`${URL}/dogs?name=${name}`)
export const getTemperament = () => axios.get(`${URL}/temperament`)
export const createDog = (newDog) => axios.post(`${URL}/dog`, newDog)