const User = require("../models/user.model.js")
const Listing = require("../models/listing.model.js")
const { errorHandler } = require("../utils/error.js")
const bcryptjs = require("bcryptjs")


const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'you are not allowed to update this user'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateObject = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        };

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateObject },
            { new: true }
        );

        const { password, ...rest } = updated._doc
        res.status(201).json(rest)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) return next(errorHandler(401, 'you are not allowed to delete this account'))
    try {
        await User.findByIdAndDelete(req.user.id)
        res.clearCookie('access_token')
        res.status(200).json('User deleted successfully')
    } catch (error) {
        next(error)
    }

}

const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You are not allowed to see other users listings'));
    }
};


module.exports.getUserListings = getUserListings
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser