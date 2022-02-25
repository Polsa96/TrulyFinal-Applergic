const Food = require('./Food.model')
const { setError } = require('../../utils/error/error')


const postNewFood = async (req, res, next) => {
    try {
        const newFood = new Food()
        newFood.name = req.body.name
        newFood.barcode = req.body.barcode
        newFood.qr = req.body.qr
        newFood.allergen = req.body.allergen
        newFood.traces = req.body.traces
        newFood.ingredients = req.body.ingredients
        
        if (req.file) {
            newFood.img = req.file.path
        }
        
        
        const foodDB = await newFood.save()
        return res.status(201).json(foodDB)
    } catch (error) {
        return next(setError(500, 'Food not saved'))
    }
}
//es con la query//
const getAllFoods = async (req, res, next) => {
    try {
        const foodDB = await Food.find().populate('allergen')
        res.status(200).json(foodDB)
    } catch (error) {
        return next(setError(500, 'Food failed server'))
    }
}

const getFood = async (req, res, next) => {
    try {
        const { id } = req.params
        const foodDB = await Food.findById(id).populate('allergen')
        if (!foodDB) {
            return next(setError(404, 'Food not found'))
        }
        return res.status(200).json(foodDB)
    } catch (error) {
        return next(setError(500, 'Food server error'))
    }
}




const patchFood = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchFood = new Food(req.body)
        patchFood._id = id
        if (req.file) {
            patchFood.img = req.file.path
        }
        const foodDB = await Food.findByIdAndUpdate(id, patchFood)
        if (!foodDB) {
            return next(setError(404, 'Food not found'))
        }
        if (foodDB.img) deleteFile(foodDB.img)
        return res.status(200).json({ new: patchFood, old: foodDB })
    } catch (error) {
        return next(setError(500, 'Food Patch server error'))
    }
}

const deleteFood= async (req, res, next) => {
    try {
        const { id } = req.params
        const foodDB = await Food.findByIdAndDelete(id)
        if (!foodDB) {
            return next(setError(404, 'Food not found'))
        }
        if (foodDB.img) deleteFile(foodDB.img)
        return res.status(200).json(foodDB)
    } catch (error) {
        return next(setError(500, 'Food removed server error'))
    }
}

module.exports = {
    postNewFood,
    getAllFoods,
    getFood,
    patchFood,
    deleteFood
}