import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonPrimary } from './primary-button';

import '@testing-library/jest-dom';

describe('testing of primary button component', () => {
  test('should render a button with the given title', () => {
    const title = 'Primary button';

    render(<ButtonPrimary title={title} />);

    const buttonElement = screen.getByTestId('primary-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(title);
  });

  test('button should execute a function on click', () => {
    const onClick = jest.fn();

    render(<ButtonPrimary onClick={onClick} />);

    const buttonElement = screen.getByTestId('primary-button');

    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
