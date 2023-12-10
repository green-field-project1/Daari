import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";


const Search = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading,setLoading] = useState(false)
  const [listings,setListings] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTerm = urlParams.get('searchTerm')
        const type = urlParams.get('type')
        const parking = urlParams.get('parking')
        const furnished = urlParams.get('furnished')
        const offer = urlParams.get('offer')
        const sort = urlParams.get('sort')
        const order = urlParams.get('order')

        if(
            searchTerm || 
            type || 
            parking ||
            furnished || 
            offer ||
            sort || 
            order
            ) {
               setSearchData({
                searchTerm: searchTerm || "",
                type: type || "all",
                parking: parking || false,
                furnished: furnished || false,
                offer: offer || false,
                sort: sort || "created_at",
                order: order || "desc",
               }) 

        }
        const fetchListings = async ()=>{
            setLoading(true);
            const query = urlParams.toString()
            const res = await fetch(`/api/listing/get?${query}`)
            const data = await res.json()
            setListings(data)
            setLoading(false)
            console.log(listings);
        }
        fetchListings()
  },[location.search])
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }

    console.log(searchData);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', searchData.searchTerm)
    urlParams.set('type', searchData.type)
    urlParams.set('parking', searchData.parking)
    urlParams.set('furnished', searchData.furnished)
    urlParams.set('offer', searchData.offer)
    urlParams.set('sorting', searchData.sort)
    urlParams.set('order', searchData.order)
    const query = urlParams.toString()
    navigate(`/search?${query}`)
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search term :
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="border rounded-full p-3 w-full"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={searchData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={searchData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={searchData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={searchData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={searchData.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={searchData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-full p-3"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-cyan-700 text-white p-3 rounded-full uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold border-b p-3 text-cyan-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
            {
                !loading && listings.length === 0 && (
                    <p className="text-xl text-cyan-700">No listings found !</p>
                )
            }

            {
                loading && (
                    <p className="text-xl text-cyan-700 text-center w-full">Loading...</p>
                )
            }
            {
                !loading && listings && listings.map((listing)=>{
                    console.log(listing);
                    return <ListingCard key={listing._id} listing={listing}/>
                })
            }
        </div>
      </div>
    </div>
  );
};

export default Search;
