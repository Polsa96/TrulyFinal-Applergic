const AllergenRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewAllergen, getAllAllergens, getAllergen, getAllergenFilter} = require('./Allergen.controller')


AllergenRoutes.get('/', getAllAllergens)
AllergenRoutes.get('/:id', getAllergen)
AllergenRoutes.get('/filter/:type', getAllergenFilter)
AllergenRoutes.post('/', postNewAllergen)
//VehicleRoutes.patch('/:id', [isAuth], upload.single('img'), patchVehicle)
//VehicleRoutes.delete('/:id', [isAuth], upload.single('img'), deleteVehicle)

module.exports = AllergenRoutes