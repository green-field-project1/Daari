import React from "react";
import { FaSearch } from "react-icons/fa";
import  {Link}  from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-cyan-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">D</span>
          <span className="text-slate-700">aari</span>
        </h1>
        <form className="bg-slate-100  rounded-full p-3 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-30 sm:w-64 "
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to='/' className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </Link>
          <Link to='/about' className="hidden sm:inline text-slate-700 hover:underline">
            About
          </Link>
          <Link to='/sign-in' className="text-slate-700 hover:underline">Sign in</Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;