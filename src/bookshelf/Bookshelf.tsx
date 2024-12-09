import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import "./Bookshelf.css"
import { IBookPreview } from "../search/Search";
import BookPreview from "../book-preview/BookPreview";
import BookshelfChanger from "../bookshelf-changer/BookshelfChanger";

export interface IBookshelf {
    books: {
        wantToRead: IBookPreview[],
        currentlyReading: IBookPreview[],
        read: IBookPreview[]
    }
}

function Bookshelf() {
    const [wantToRead, setWantToRead] = useState<IBookPreview[]>([]);
    const [currentlyReading, setCurrentlyReading] = useState<IBookPreview[]>([]);
    const [read, setRead] = useState<IBookPreview[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { getToken } = useContext(AccessTokenContext);

    useEffect(() => {
        async function fetchBooks() {
            try {
                setErrorMessage("");
                const { data } = await axios.get<IBookshelf>(
                    `/api/bookshelf`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken()}`
                        }
                    }
                );
                setWantToRead(data.books.wantToRead);
                setCurrentlyReading(data.books.currentlyReading);
                setRead(data.books.read);
            }
            catch (error) {
                console.error(error);
                setErrorMessage("We are sorry, unexpected error occurred.");
            }
            finally {
            }
        }

        fetchBooks();
    }, []);

    return (
        <div className="bookshelf">
            <h3>Want to read</h3>
            <hr />
            {wantToRead.map((b, i) => 
            <>
                <BookshelfChanger book={b} key={b.id}  />
                <BookPreview key={`want-to-read${i}`} book={b} />
            </>)}
            <h3>Currently reading</h3>
            <hr />
            {currentlyReading.map((b, i) => 
            <>
                <BookshelfChanger book={b} key={b.id} />
                <BookPreview key={`currently-reading${i}`} book={b} />
            </>)}
            <h3>Read</h3>
            <hr />
            {read.map((b, i) => 
            <>
                <BookshelfChanger book={b} key={b.id} />
                <BookPreview key={`read${i}`} book={b} />
            </>)}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default Bookshelf;
