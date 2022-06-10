require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");
const { Dog, Temperament } = require('../db.js');
const { Op } = require("sequelize")
const { API_KEY } = process.env;

const getApiInfo = async () => {
    let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let apiInfo = apiUrl.data.map(e => {
        
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            temperament: e.temperament ? e.temperament.split(", ") : ['None'],
            weight: e.weight.metric.split(' - ').map(e => parseInt(e))
        }
    })

    let filtered = apiInfo.filter(e => {
        if(Number(e.weight[0])) return e
    })

    return filtered
}

const getDBInfo = async () => {
    let dbInfo = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    let info = dbInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: [e.minHeight, e.maxHeight],
            weight: [e.minWeight, e.maxWeight],
            life_span: e.life_span,
            temperament: e.temperaments.map(e => e.name)
        }
    })

    return info
}

const getApiInfoByName = async (name) => {
    let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)  
    let apiInfo = apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`,
            temperament: e.temperament ? e.temperament.split(", ") : ['None'],
            weight: e.weight.metric.split(' - ')
        }
    })

    return apiInfo
}

const getDBInfoByName = async (name) => {
    let dbInfo = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    let info = dbInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: [e.minHeight, e.maxHeight],
            weight: [e.minWeight, e.maxWeight],
            life_span: e.life_span,
            temperament: e.temperaments.map(e => e.name)
        }
    })

    return info
}

const apiInfoById = async (id) => {
    let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let filteredInfo = apiUrl.data.filter(e => e.id === id);
    let apiInfo = filteredInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            temperament: e.temperament ? e.temperament.split(", ") : ['None'],
            weight: e.weight.metric,
            height: e.height.metric,
            life_span: e.life_span
        }
    })
       
    return apiInfo[0]
}

const dbInfoById = async (id) => {
    let dbInfo = await Dog.findAll({
        where: {
            id: id
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    let info = dbInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            temperament: e.temperaments.map(e => e.name),
            height: e.minHeight.concat(' - ', e.maxHeight),
            weight: e.minWeight.concat(' - ', e.maxWeight),
            life_span: e.life_span.concat(' years'),
        }
    })

    return info[0]  
}

const filterByTemp = async(info, temp) => {
    if(temp === 'All') return info
    else { 
        return info.filter(e => {
        if(e.temperament.includes(temp)) return e
        })}
}

router.get('/', async (req, res) => {
    let { name, temp, created } = req.query

    if(name) {
        let apiInfo = await getApiInfoByName(name);
        let dbInfo = await getDBInfoByName(name);
        let totalInfo = apiInfo.concat(dbInfo);
        if(totalInfo.length == 0) {
            res.status(200).send({message: 'Nombre no encontrado'})
        } else {
            res.status(200).send(totalInfo)
        }
    } else {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDBInfo();
        let totalInfo = apiInfo.concat(dbInfo)
        if(temp) {
            let infoByTemp = await filterByTemp(totalInfo, temp);
            res.status(200).send(infoByTemp)
        } else if(created) {
            if(created === 'true') {
                res.status(200).send(dbInfo)
            } else {
                res.status(200).send(apiInfo)
            }
        } else res.status(200).send(totalInfo)
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params

    if(Number(id)) {
        let filteredInfo = await apiInfoById(parseInt(id));
        res.status(200).send(filteredInfo)
    } else {
        let dbInfo = await dbInfoById(id);
        res.status(200).send(dbInfo)
    }    
})

module.exports = router