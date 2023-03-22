import './BookLayoutBlock.scss';
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";
import {IBookCollection} from "../../Models/IBookCollection";
import BooksListBlock from "./BooksListBlock/BooksListBlock";
import BookEditBlock, {editBook} from "./BookEditBlock/BookEditBlock";
import {IBook} from "../../Models/IBook";
import {ICollection} from "../../Models/ICollection";
import {api} from "../../api/Api";
import {ICollectionParams} from "../../Models/ICollectionParams";
import Pagination from "../Pagination/Pagination";
import {IBooksLayoutBlockProps} from "./IBooksLayoutBlockProps";

const defaultBook: IBook = {
    id: 0,
    title: '',
    publisher: '',
    author: '',
    genre: '',
    published_at: 0,
    words_amount: 0,
    price: 0.00
}

const defaultCollection = {items: [], itemsCount: 0, pageNo: 0, perPage: 3, totalCount: 0} as ICollection

const BookLayoutBlock: React.FunctionComponent<IBooksLayoutBlockProps> = (props: IBooksLayoutBlockProps) => {

    const [booksCollection, setBooksCollection] = useState<IBookCollection>(defaultCollection);

    const updateFromServer = (collectionParams?: ICollectionParams) => {
        setBooksCollection(defaultCollection);
        api.getCollection('Book', collectionParams ? collectionParams : defaultCollection)
            .then(resp => setBooksCollection(resp));
    }

    useEffect(() => {
        if (!booksCollection.pageNo) {
            updateFromServer();
        }
    }, []);

    const pageChange = (page: number) => {
        if (booksCollection.pageNo !== page) {
            updateFromServer({perPage: booksCollection.perPage, pageNo: page});
        }
    }

    return (
        <div>
            <h2>Books</h2>
            {!booksCollection.pageNo &&
                <div className="books-layout-block-loader">
                    <Loader height='100%'/>
                </div>
            }
            <div className="books-layout-block">
                {booksCollection.pageNo > 0 &&
                    <div className="books-layout-block-inner">
                        <div className="row">
                            <div className="col-3">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        {booksCollection.perPage} items per page
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {[3, 6, 12, 24].map((i, idx) =>
                                            <li key={idx}><a className="dropdown-item" href="#"
                                                   onClick={() => {
                                                       if (i !== booksCollection.perPage) {
                                                           updateFromServer({perPage: i, pageNo: 1})
                                                       }
                                                   }}
                                            >{i}</a></li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="text-end">
                                    <Pagination {...booksCollection} pageChange={pageChange} paginationCount={3}/>
                                </div>
                            </div>
                        </div>
                        <BooksListBlock books={booksCollection} updateFromServer={updateFromServer}/>
                        <p>
                            <button className="btn btn-success"
                                    onClick={() => editBook(defaultBook, (resp) => {
                                        if (resp.success) {
                                            if (confirm(`${resp.message}\nUpdate books from server?`)) {
                                                updateFromServer();
                                            }
                                        } else alert(resp.message);
                                    })}
                            ><i className="bi bi-cloud-plus-fill"></i> Add book
                            </button>
                        </p>
                    </div>
                }
            </div>
            <BookEditBlock/>
        </div>
    );

}

export default BookLayoutBlock;
