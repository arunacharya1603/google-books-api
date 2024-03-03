import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DropDown() {
  const [years, setYears] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchYears();
    fetchLanguages();
  }, []);

  const fetchYears = () => {
    // Assuming you want to fetch years for the past 10 years
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: 50 },
      (_, index) => currentYear - index
    );
    setYears(yearsArray);
  };

  const fetchLanguages = () => {
    // Fetch languages from your API or provide a predefined list
    const languagesArray = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
    setLanguages(languagesArray);
  };

  const fetchBooks = (year, language) => {
    let queryString = `https://www.googleapis.com/books/v1/volumes?q=`;
    if (year) {
      queryString += `after:${year}-01-01&before:${year}-12-31`;
    }
    if (language) {
      queryString += `+language:${language}`;
    }

    axios
      .get(queryString)
      .then((response) => {
        setBooks(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    fetchBooks(year, selectedLanguage);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    fetchBooks(selectedYear, language);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-24">
      <div className="flex items-center">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="m-2 p-2 border border-gray-300 rounded-md shadow-md"
        >
          <option value="">Select a year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="m-2 p-2 border border-gray-300 rounded-md shadow-md"
        >
          <option value="">Select a language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h2>
            <p>
              <strong>Authors:</strong>{" "}
              {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
            </p>
            {book.volumeInfo.imageLinks && (
              <img
                onClick={() => navigate(`/books/${book.id}`)}
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="Book cover"
                className="h-32 object-cover object-center"
              />
            )}
            <p>
              <strong>Publisher:</strong> {book.volumeInfo.publisher}
            </p>
            <p>
              <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
            </p>
            {/* <p>
              <strong>Description:</strong> {book.volumeInfo.description}
            </p> */}
            <p>
              <strong>Categories:</strong>{" "}
              {book.volumeInfo.categories &&
                book.volumeInfo.categories.join(", ")}
            </p>
            <p>
              <strong>Page Count:</strong> {book.volumeInfo.pageCount}
            </p>
            <p>
              <strong>Language:</strong> {book.volumeInfo.language}
            </p>
            <p>
              <strong>Preview Link:</strong>{" "}
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Preview
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropDown;
