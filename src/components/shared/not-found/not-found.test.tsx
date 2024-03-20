import { render, screen } from '@testing-library/react';

import { NotFound } from './not-found';

import '@testing-library/jest-dom';

describe('testing of not found component', () => {
  test('should render img and description', () => {
    render(<NotFound />);

    const image = screen.getByRole('img');
    const description = screen.getByText(/Page not found/);

    expect(image).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
