import './BookEditBlock.scss';
import React, {useEffect} from 'react';
import {IBook} from "../../../Models/IBook";
import {Modal} from 'bootstrap'
import {api} from "../../../api/Api";
import {IBookResponse} from "../../../Models/IBookResponse";
import {IBookEditBlockProps} from "./IBookEditBlockProps";

let modal: Modal = null;
let saveCallBack = (resp: IBookResponse) => {};

const saveBook = () => {
    const form = document.getElementById('bookEditForm') as HTMLFormElement;
    const formData = new FormData(form);
    const book: IBook = {};
    formData.forEach((v, k) => {
        if (k === 'published_at') book.published_at = Date.parse(v as string) / 1000;
        else book[k] = v as string;
    })
    const method = book.id > 0 ? 'update' : 'create';
    api[method]('Book', book).then(resp => {
        saveCallBack(resp);
        modal.hide();
    });

}

export const editBook = (book: IBook, callBack: (resp: IBookResponse) => void, viewOnly: boolean = false) => {
    const label = document.getElementById('bookEditModalLabel');
    label.innerText = book.id > 0 ? "Edit book #" + book.id : "Create a book";
    const form = document.getElementById('bookEditForm') as HTMLFormElement;
    Object.entries(book).map(([k, v]) => {
        form[k].value = v;
        form[k].readOnly = true;
    });
    const ts = book.published_at > 0 ? book.published_at * 1000 : Date.now();
    form['published_at'].value = (new Date(ts)).toISOString().substring(0,10);
    modal.show();
    saveCallBack = callBack;
}

const BookEditBlock: React.FunctionComponent<IBookEditBlockProps> = (props: IBookEditBlockProps) => {

    useEffect(() => {
        if (!modal) {
            modal = new Modal(document.getElementById('bookEditModal'));
        }
    }, []);

    return (
        <div className="modal fade" id="bookEditModal" tabIndex={-1} aria-labelledby="bookEditModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="bookEditModalLabel"></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="assets/tsx/components/BookLayoutBlock/BookEditBlock#" id="bookEditForm">
                            <input type="hidden" name="id"/>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="title" className="form-label">Title</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="title"
                                           placeholder="Enter title"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="publisher" className="form-label">Publisher</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="publisher"
                                           placeholder="Enter publisher"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="author" className="form-label">Author</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="author"
                                           placeholder="Enter author"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="genre" className="form-label">Genre</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="genre"
                                           placeholder="Enter genre"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="published_at" className="form-label">Published date</label>
                                </div>
                                <div className="col-8">
                                    <input type="date" className="form-control" name="published_at"
                                           placeholder="Enter published date"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="words_amount" className="form-label">Words amount</label>
                                </div>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="words_amount"
                                           placeholder="Enter words amount"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label htmlFor="price" className="form-label">Price</label>
                                </div>
                                <div className="col-8">
                                    <input type="number" min="1" step="0.01" className="form-control" name="price"
                                           placeholder="Enter price"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => saveBook()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BookEditBlock;
