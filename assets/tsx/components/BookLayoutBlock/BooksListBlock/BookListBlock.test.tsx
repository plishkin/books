import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import BookListBlock from "./BooksListBlock";
import {IBooksListBlockProps} from "./IBooksListBlockProps";

const props = {
    books: {
        pageNo: 1,
        perPage: 18,
        totalCount: 1,
        itemsCount: 1,
        items: [{
            id: 0,
            title: '',
            publisher: '',
            author: '',
            genre: '',
            published_at: 0,
            words_amount: 0,
            price: 0.00
        }]
    },
    updateFromServer() {}
} as IBooksListBlockProps

test('renders books list block', () => {
    const {container} = render(<BookListBlock {...props} />);
    let nodes = container.getElementsByClassName('books-list-block');
    expect(nodes.length).toBe(1);
    nodes = nodes[0].getElementsByClassName('book-row');
    expect(nodes.length).toBe(1);
    nodes = nodes[0].getElementsByClassName('book-cell');
    expect(nodes.length).toBeGreaterThan(3);
});
