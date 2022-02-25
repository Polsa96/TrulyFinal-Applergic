const User = require('./user.model')
const bcrypt = require('bcrypt')
const { setError } = require('../../utils/error/error')
const { generateSign, verifyJwt } = require('../../utils/jwt/jwtUtils')

const postNewUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const userDuplicate = await User.findOne({ email: newUser.email })
        if (userDuplicate) {
            return next(setError(404, 'Email existente'))
        }
    
        const userDB = await newUser.save()
        return res.status(201).json({ name: userDB.name, email: userDB.email, phone: userDB.phone, allergen: userDB.allergen })

    } catch (error) {
        return next(error)
    }
}


const patchUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchUser = new User(req.body)
        patchUser._id = id
        if (req.file) {
            patchUser.img = req.file.path
        }
        const userDB = await User.findByIdAndUpdate(id,{$addToSet:{fav: patchUser.fav, allergen: patchUser.allergen}})
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        if (userDB.img) deleteFile(userDB.img)
        return res.status(200).json({ new: patchUser, old: userDB })
    } catch (error) {
        return next(setError(500, 'User Patch server error'))
    }
}

const pullUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchUser = new User(req.body)
        patchUser._id = id
        if (req.file) {
            patchUser.img = req.file.path
        }
        const userDB = await User.findByIdAndUpdate(id,{$set:{fav:patchUser.fav}})
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        if (userDB.img) deleteFile(userDB.img)
        return res.status(200).json({ new: patchUser, old: userDB })
    } catch (error) {
        return next(setError(500, 'User Patch server error'))
    }
}


const loginUser = async (req, res, next) => {
    try {
        
        const userDB = await User.findOne({ email: req.body.email })
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        if (bcrypt.compareSync(req.body.password, userDB.password)) {
            const token = generateSign(userDB._id, userDB.email)
            const email = userDB.email
            const user = userDB.name
            const id=userDB._id
            
            return res.status(200).json({token, user, email,id})
        }
    } catch (error) {
        error.message = 'error Login'
        return next(error)
    }
}

const logoutUser = (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        // Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const userDB = await User.findById(id)
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        return res.status(200).json({ id:userDB._id, name: userDB.name, email: userDB.email ,
             phone: userDB.phone, allergen: userDB.allergen, traces: userDB.traces, 
              fav: userDB.fav, contact:userDB.contact, //daylist=userDB.daylist,
        })

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

module.exports = {
    postNewUser, loginUser, logoutUser, getUser, patchUser, pullUser
}