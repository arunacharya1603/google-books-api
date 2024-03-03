import React from "react";
import { useAppContext } from "./context/appContext";


const Favorites = () => {

  const { favorite, addToFavorites, removeFromFavorites } = useAppContext();
  console.log("favorites are:", favorite);

  const favoriteChecker = (id) => {
    const boolean = favorite.some((book) => book.id === id);
    return boolean;
  };

  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-24 p-8 gap-6 px-6">
    {favorite.length>0?  favorite.map((book, index) => (
            <div
              key={book.id}
              ref={index === book.length - 1 ? loader : null}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {book.volumeInfo.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  Authors:{" "}
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ")
                    : "Unknown"}
                </p>
              </div>
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Book cover"
                  className="h-32 object-cover object-center"
                />
              )}
              <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                {favoriteChecker(book.id) ? (
                  <button onClick={() => removeFromFavorites(book.id)}>
                    Remove From Favorites
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(book)}>
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          )):<h1>You don't have any favorites book yet</h1>}
  </div>;
};

export default Favorites;
