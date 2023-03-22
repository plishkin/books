import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import {IBookEditBlockProps} from "./IBookEditBlockProps";
import BookEditBlock from "./BookEditBlock";

const props = {
    book: {
        id: 0,
        title: '',
        publisher: '',
        author: '',
        genre: '',
        published_at: 0,
        words_amount: 0,
        price: 0.00
    }
} as IBookEditBlockProps

test('renders book edit block', () => {
    const {container} = render(<BookEditBlock {...props} />);
    expect(container.querySelector('#bookEditModal')).toHaveClass('modal');
});
