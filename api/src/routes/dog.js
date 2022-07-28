const router = require("express").Router();
const { Dog, Temperament } = require('../db.js');

router.post('/', async (req, res) => {
    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperament } = req.body
    
    const newDog = await Dog.create({ name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperament })
    const temperaments = await Temperament.findAll({
        where: {
            name: temperament
        }
    });

    await newDog.addTemperament(temperaments);

    const info = await Dog.findAll({
        where: {
            name: name
        }, include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }}
    )
    
    res.status(200).send(info)
})

module.exports = router