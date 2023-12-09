const Listing = require("../models/listing.model.js");
const { errorHandler } = require("../utils/error.js")


const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

const deleteListing = async (req, res, next) => {

  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }
  if (req.user.id !== listing.userRef) {
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
  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'you are not allowed to delete this listing'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error)
  }
}

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

const getListings = async (req, res, next) => {
  try {

    const limit = parseInt(req.query.limit) || 9
    const startIndex = parseInt(req.query.startIndex) || 0

    let offer = req.query.offer
    let furnished = req.query.furnished
    let parking = req.query.parking
    let type = req.query.type

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] }
    }
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] }
    }
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] }
    }
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] }
    }
    const searchTerm = req.query.searchTerm || ''
    const sort = req.query.sort || 'createdAt'
    const order = req.query.order || 'desc'

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer: offer,
      furnished: furnished,
      parking: parking,
      type: type
    })
    .sort(
      { [sort]: order }
    )
    .limit(limit).skip(startIndex)

    return res.status(200).json(listings);

  } catch (error) {
    next(error)
  }
}

module.exports.createListing = createListing;
module.exports.deleteListing = deleteListing;
module.exports.updateListing = updateListing;
module.exports.getListing = getListing;
module.exports.getListings = getListings;