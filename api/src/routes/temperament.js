require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");
const { Temperament } = require('../db.js')
const { API_KEY } = process.env;

const getApiInfo = async () => {
    let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let apiInfo = apiUrl.data.map(e => {
        return e.temperament ? e.temperament : 'None'
    })
    let arr = []
    apiInfo.forEach(e => {
        arr = [...arr, ...e.split(', ')]        
    })
    let setArr = [...new Set(arr)]
    let seted = setArr.map(e => {
        return {
            name: e
        }
    })
    return seted
}

const createInDB = async () => {
    let temperaments = await getApiInfo();
    let db = await Temperament.findAll()
    if(!db.length) await Temperament.bulkCreate(temperaments)
}

router.get('/', async (req, res) => {
    await createInDB();
    let dbInfo = await Temperament.findAll();
    res.status(200).send(dbInfo)
})

module.exports = router