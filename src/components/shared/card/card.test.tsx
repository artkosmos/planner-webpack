import { render, screen } from '@testing-library/react';

import { Card } from './card';

import '@testing-library/jest-dom';

describe('testing of card component', () => {
  const child = <h1>It's my card</h1>;

  test('card should render with children', () => {
    render(<Card>{child}</Card>);

    const cardElement = screen.getByTestId('card');

    expect(cardElement).toBeInTheDocument();
    expect(screen.getByText(/It's my card/)).toBeInTheDocument();
  });
});
