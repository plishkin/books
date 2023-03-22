import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import BookLayoutBlock from "./BookLayoutBlock";

test('renders book layout', () => {
    const {container} = render(<BookLayoutBlock />);
    expect(container.getElementsByClassName('books-layout-block-loader').length).toBe(1);
    expect(container.getElementsByClassName('books-layout-block').length).toBe(1);
});
