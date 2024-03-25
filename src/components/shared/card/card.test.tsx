import { render, screen } from '@testing-library/react';

import { Card } from './card';

import '@testing-library/jest-dom';

describe('testing of card component', () => {
  const content = <h1>It's my card</h1>;

  test('card should render with content', () => {
    render(<Card>{content}</Card>);

    const cardElement = screen.getByTestId('card');
    const cardContent = screen.getByText(/it's my card/i);

    expect(cardElement).toContainElement(cardContent);
  });
});
