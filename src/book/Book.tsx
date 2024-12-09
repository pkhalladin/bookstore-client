import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import "./Book.css"
import BookshelfChanger from "../bookshelf-changer/BookshelfChanger";

interface IBook {
    id: string;
    title: string;
    description: string;
    authors: string[];
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
        small: string;
        medium: string;
    },
    publisher: string;
    publishedDate: Date;
    pageCount: Number;
    printType: string;
    categories: string[];
    language: string;
    previewLink: string;
}

interface IBookResponse {
    book: IBook;
}

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState<IBook>();
    const [errorMessage, setErrorMessage] = useState("");
    const { getToken } = useContext(AccessTokenContext);

    useEffect(() => {
        async function fetchBook() {
            try {
                setErrorMessage("");
                const { data } = await axios.get<IBookResponse>(
                    `/api/book/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken()}`
                        }
                    }
                );
                setBook(data.book);
            }
            catch (error) {
                console.error(error);
                setErrorMessage("We are sorry, unexpected error occurred.");
            }
        }

        fetchBook();
    }, []);

    let thumbnailUrl = book?.imageLinks.medium;
    if (!thumbnailUrl) {
        thumbnailUrl = "https://placehold.co/128x200?text=No+image";
    }

    return (
        <div className="book">
            <label>Change shelf: </label>
            <BookshelfChanger book={book} />
            <h2>{book?.title}</h2>
            <div>
                <img className="book-image" src={book?.imageLinks?.thumbnail} />
            </div>
            <p className="book-description">{book?.description}</p>
            <h3>Book details</h3>
            <table className="book-table">
                <tbody>
                    <tr>
                        <td>Publisher:</td>
                        <td>{`${book?.publisher}`}</td>
                    </tr>
                    <tr>
                        <td>Published date:</td>
                        <td>{`${book?.publishedDate}`}</td>
                    </tr>
                    <tr>
                        <td>Pages:</td>
                        <td>{`${book?.pageCount}`}</td>
                    </tr>
                    <tr>
                        <td>Authors:</td>
                        <td>{`${book?.authors?.join(", ")}`}</td>
                    </tr>
                    <tr>
                        <td>Print type:</td>
                        <td>{`${book?.printType}`}</td>
                    </tr>
                    <tr>
                        <td>Language:</td>
                        <td>{`${book?.language}`}</td>
                    </tr>
                </tbody>
            </table>
            {book && <Link to={book.previewLink}>Read sample</Link> }
            
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default Book;
