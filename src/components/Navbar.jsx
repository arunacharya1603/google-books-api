import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-sky-900 p-8 md:p-4">
      <div className="text-white text-2xl md:text-xl lg:text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300">
          Google Book API
        </Link>
      </div>
      <div className="flex space-x-4 text-lg md:text-base lg:text-lg">
        <Link to="/favorites" className="hover:text-gray-300">
          Your Favorites
        </Link>
        <Link to="/dropdown" className="hover:text-gray-300">
          Filter Books
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
