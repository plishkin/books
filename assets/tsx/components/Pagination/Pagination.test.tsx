import React from 'react';
import {render} from '@testing-library/react';
import Pagination from './Pagination';
import {IPaginationProps} from "./IPaginationProps";

const props = {
    items: [],
    itemsCount: 6,
    pageNo: 1,
    perPage: 12,
    totalCount: 24,
    pageChange(page: number) {},
    paginationCount: 3
} as IPaginationProps

test('renders pagination', () => {
    const {container} = render(<Pagination {...props} />);
    expect(container.getElementsByClassName('page-navigation').length).toBe(1);
    expect(container.getElementsByClassName('pagination').length).toBe(1);
    expect(container.getElementsByClassName('page-item').length).toBeGreaterThanOrEqual(3);
    expect(container.getElementsByClassName('page-link').length).toBeGreaterThanOrEqual(3);
});
