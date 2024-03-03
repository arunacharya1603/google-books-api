import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  console.log(book);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const bookData = response.data;
        setBook(bookData);
        console.log(bookData)

        // Store the fetched book details in local storage
        localStorage.setItem("bookDetails", JSON.stringify(bookData));
      } catch (error) {
        console.error("Error fetching book details:", error.message);
      }
    };

    // Check if book details are already stored in local storage
    const storedBookDetails = JSON.parse(localStorage.getItem("bookDetails"));
    if (storedBookDetails && storedBookDetails.id === id) {
      setBook(storedBookDetails);
    } else {
      fetchBookDetails(); // Fetch book details if not found in local storage or ID has changed
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h2 className="text-2xl font-bold mb-4">{book?.volumeInfo?.title}</h2>
      <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt="#" className="w-full rounded-lg shadow-md" />
    </div>
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-gray-700">{book?.volumeInfo?.description}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Author</h2>
        <p className="text-gray-700">{book?.volumeInfo?.authors?.join(", ")}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Publisher</h2>
        <p className="text-gray-700">{book?.volumeInfo?.publisher}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Published Date</h2>
        <p className="text-gray-700">{book?.volumeInfo?.publishedDate}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Page Count</h2>
        <p className="text-gray-700">{book?.volumeInfo?.pageCount}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Dimensions</h2>
        <p className="text-gray-700">
          Height: {book?.volumeInfo?.dimensions?.height}, Width:{" "}
          {book?.volumeInfo?.dimensions?.width}, Thickness:{" "}
          {book?.volumeInfo?.dimensions?.thickness}
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Categories</h2>
        <p className="text-gray-700">{book?.volumeInfo?.categories?.join(", ")}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">Preview Link</h2>
        <a href={book?.volumeInfo?.previewLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{book?.volumeInfo?.previewLink}</a>
      </div>
      <div>
        <h2 className="text-xl font-bold">Info Link</h2>
        <a href={book?.volumeInfo?.infoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{book?.volumeInfo?.infoLink}</a>
      </div>
      <div className="pb-24">
        <h2 className="text-xl font-bold">Canonical Volume Link</h2>
        <a href={book?.volumeInfo?.canonicalVolumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{book?.volumeInfo?.canonicalVolumeLink}</a>
      </div>
    </div>
  </div>
</div>

  
  
  );
};

export default BookDetails;
