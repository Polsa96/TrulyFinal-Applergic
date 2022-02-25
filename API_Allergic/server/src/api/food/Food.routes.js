const FoodRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewFood, getAllFoods, getFood } = require('./Food.controller')

FoodRoutes.get('/', getAllFoods)
FoodRoutes.get('/:id', getFood)


FoodRoutes.post('/', [isAuth], upload.single('img'), postNewFood)
//FoodRoutes.patch('/:id', [isAuth], upload.single('img'), patchFood)
//FoodRoutes.delete('/:id', [isAuth], upload.single('img'), deleteFood)  

module.exports = FoodRoutes