const Allergen = require('./Allergen.model')
const { setError } = require('../../utils/error/error')


 const postNewAllergen = async (req, res, next) => {
    try {
        const newAllergen = new Allergen()
        newAllergen.name = req.body.name
       
        if (req.file) {
            newAllergen.img = req.file.path
        }
        const allergenDB = await newAllergen.save()
        return res.status(201).json(allergenDB)
    } catch (error) {
        return next(setError(500, 'Allergen not saved'))
    }
} 

const getAllAllergens = async (req, res, next) => {
    try {
        const allergensDB = await Allergen.find()
        res.status(200).json(allergensDB)
    } catch (error) {
        return next(setError(500, 'Allergen failed server'))
    }
}

const getAllergen = async (req, res, next) => {
    try {
        const { id } = req.params
        const allergenDB = await Allergen.findById(id)
        if (!allergenDB) {
            return next(setError(404, 'Allergen not found'))
        }
        return res.status(200).json(allergenDB)
    } catch (error) {
        return next(setError(500, 'Allergen server error'))
    }
}

const getAllergenFilter = async (req, res, next) => {
    const { type } = req.params
    try {
        console.log(type);
        const allergenDB = await Allergen.find({
            type
        })/* .populate('vehicles') */
        if (!allergenDB) {
            return next(setError(404, ` ${id} not found`))
        }
        return res.status(200).json(allergenDB)
    } catch (error) {
        return next(setError(500, 'Allergens server error'))
    }
}





module.exports = {
    getAllergenFilter,
    postNewAllergen,
    getAllAllergens,
    getAllergen,
    
}