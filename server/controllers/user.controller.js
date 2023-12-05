const User = require("../models/user.model.js")
const { errorHandler } = require("../utils/error.js")
const bcryptjs = require("bcryptjs")


const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you are not allowed to update this user'))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updated = await User.findByIdAndUpdate(req.params.id,req,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        },{new:true})

        const {password,...rest} = updated._doc
        res.status(201).json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = updateUser