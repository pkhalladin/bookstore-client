import { useState, useContext, useEffect, useCallback } from "react";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import axios from "axios";
import BookPreview from "../book-preview/BookPreview";

export interface IBookPreview {
  id: string;
  title: string;
  authors: string[];
  imageLinks: { smallThumbnail: string; }
}

interface IBookResponse {
  books: IBookPreview[];
}

function Search() {
  const { getToken } = useContext(AccessTokenContext);

  const [books, setBooks] = useState<IBookPreview[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
        <h2>Search for books</h2>
      </div>
      <div className="form-group">
        <label>🔍</label>
        <input type="text" className="form-control" onChange={async (e) => {
          if (e.target.value) {
            try {
              setErrorMessage("");
              const { data } = await axios.get<IBookResponse>(
                `api/book/search/${e.target.value}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                  }
                }
              );
              setBooks(data.books);
            }
            catch (error) {
              console.error(error);
              setErrorMessage("We are sorry, unexpected error occurred.");
            }
            finally {
            }
          }
        }} />
      </div>
      {books.map((b, i) => <BookPreview key={i} book={b} />)}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Search;
