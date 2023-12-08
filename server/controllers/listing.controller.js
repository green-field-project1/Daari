const Listing = require("../models/listing.model.js");
const {errorHandler} = require("../utils/error.js")


const createListing = async (req,res,next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
      next(error);  
    }
}

const deleteListing = async (req, res, next) => {

  const listing = await Listing.findById(req.params.id)
  if(!listing){
    return next(errorHandler(404, 'Listing not found'));
  }
  if(req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'you are not allowed to delete this listing'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been successfully deleted')
  } catch (error) {
    next(error)
  }
}

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if(!listing){
    return next(errorHandler(404, 'Listing not found'));
  }
  if(req.user.id!== listing.userRef) {
    return next(errorHandler(401, 'you are not allowed to delete this listing'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error)
  }
}

module.exports.createListing = createListing;
module.exports.deleteListing = deleteListing;
module.exports.updateListing = updateListing;