import React, {useState} from "react";
import './BooksListBlock.scss';
import {IBooksListBlockProps} from "./IBooksListBlockProps";
import {editBook} from "../BookEditBlock/BookEditBlock";
import {IBook} from "../../../Models/IBook";
import {IBookResponse} from "../../../Models/IBookResponse";
import {api} from "../../../api/Api";

const BookListBlock: React.FunctionComponent<IBooksListBlockProps> = (props: IBooksListBlockProps) => {
    const rows = [];
    props.books.items.map((book, idx) => {
        rows.push(<tr key={idx} ></tr>);
    });

    return (
        <div className="books-list-block">
            <table className="table table-dark table-striped table-bordered books-table">
                <thead>
                    <tr>
                        <td>idx</td>
                        <td>id</td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Publisher</td>
                        <td>Genre</td>
                        <td>Published</td>
                        <td>Price</td>
                        <td>Controls</td>
                    </tr>
                </thead>
                <tbody>
                    {props.books.items.map((itemBook, idx) => {

                        const [book, setBook] = useState<IBook>(itemBook);

                        const saveCallBack = (resp: IBookResponse) => resp.success ? setBook(resp.item) : null;

                        const deleteBook = () => {
                            if (confirm(`Really delete book #${book.id} "${book.title}"?`)) {
                                api.delete('Book', book.id).then((resp: IBookResponse) => {
                                    if (resp.success) {
                                        if (confirm(`${resp.message}\nUpdate books from server?`)) {
                                            props.updateFromServer();
                                        }
                                    } else alert(resp.message);
                                });
                            }
                        }

                        return (
                            <tr key={idx} className="book-row">
                                <td className="book-cell">{idx + 1}</td>
                                <td className="book-cell">{book.id}</td>
                                <td className="book-cell"
                                    style={{cursor: "pointer"}}
                                    onClick={() => editBook(book, () => {}, true)}
                                ><strong title={book.title}>{book.title}</strong></td>
                                <td className="book-cell"><strong title={book.author}>{book.author}</strong></td>
                                <td className="book-cell">{book.publisher}</td>
                                <td className="book-cell">{book.genre}</td>
                                <td className="book-cell">{(new Date(book.published_at * 1000)).toDateString()}</td>
                                <td className="book-cell">{book.price}</td>
                                <td className="book-cell">
                                    <button className="btn btn-primary"
                                            onClick={() => editBook(book, saveCallBack)}
                                    >
                                        <i className="bi bi-pencil-fill"></i> Edit
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-danger"
                                            onClick={() => deleteBook()}
                                    >
                                        <i className="bi bi-trash-fill"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default BookListBlock;
