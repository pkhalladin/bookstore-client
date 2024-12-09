import { Link } from "react-router-dom";
import { IBookPreview } from "../search/Search";
import "./BookPreview.css"

interface IProps {
    book: IBookPreview
}

function BookPreview(props: IProps) {
    const book = props.book;
    let thumbnailUrl = book.imageLinks?.smallThumbnail;
    if (!thumbnailUrl) {
        thumbnailUrl = "https://placehold.co/128x200?text=No+image";
    }
    return (
        <div className="book-preview container">
            <Link to={`/book/${book.id}`}><img className="image" src={thumbnailUrl} /></Link>
            <Link to={`/book/${book.id}`}><p className="title">{book.title}</p></Link>
            <div>{ book.authors?.map((a, i) => <p className="author" key={i}>{a}</p>) }</div>
        </div>
    );
}

export default BookPreview;
