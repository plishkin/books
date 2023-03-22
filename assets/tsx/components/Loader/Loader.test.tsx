import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Loader from "./Loader";

test('renders loader', () => {
    const { container } = render(<Loader />);
    expect(container.getElementsByClassName('loader-cont').length).toBe(1);
    expect(container.getElementsByClassName('loader').length).toBe(1);
});
