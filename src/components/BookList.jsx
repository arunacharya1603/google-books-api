import React, { useEffect, useState, useRef, useMemo } from "react";
import Loader from "../assets/Loader.gif";
import { useAppContext } from "./context/appContext";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [error, setError] = useState();
  const { favorite, addToFavorites, removeFromFavorites } = useAppContext();
  const navigate = useNavigate();

  const favoriteChecker = useMemo(() => {
    return (id) => favorite.some((book) => book.id === id);
  }, [favorite]);

  const fetchData = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
          (page - 1) * 8
        }&maxResults=6&key=AIzaSyBpzg3o5pgh5J3GMdISVM-AiPiqJ-SgtEQ`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data || !data.items || data.items.length === 0) {
        setHasMore(false);
        return;
      }

      // Filter out duplicate books based on their id
      const uniqueBooks = data.items.filter(
        (item) => !books.find((book) => book.id === item.id)
      );

      setBooks((prevBooks) => [...prevBooks, ...uniqueBooks]);
      setHasMore(true);
      localStorage.setItem("books", JSON.stringify([...books, ...uniqueBooks]));



      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again."); // Set a generic error message
    } finally {
      setSearching(false);
      setLoading(false); // Reset loading state after fetching data
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }
    setBooks([]);
    setPage(1);
    setHasMore(true);
    setSearching(true);
    fetchData();
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (page > 1 || searching) {
      fetchData();
    }
  }, [page, searching]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Load data from local storage when component mounts
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center mb-4">
          <input
            className="p-2 w-full md:w-80 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {books.map((book, index) => (
            <div
              key={book.id}
              ref={index === books.length - 1 ? loader : null}
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
                  onClick={() => navigate(`/books/${book.id}`)}
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
          ))}
        </div>

        <div ref={loader} className="h-full	 flex justify-center z-50	">
          {loading && (
            <>
              <h2>loading...</h2>
              <img className="rounded-3xl" src={Loader} alt="Loading..." />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookList;
