import { fireEvent, render, screen } from '@testing-library/react';

import { BackButton } from './back-button';

import '@testing-library/jest-dom';

describe('testing of back button component', () => {
  test('should render with title and an icon', () => {
    const title = 'Go Back';

    render(<BackButton title={title} />);

    const buttonElement = screen.getByTestId('back-button');
    const nestedIconElement = buttonElement.querySelector('svg');

    expect(buttonElement).toHaveTextContent(title);
    expect(nestedIconElement).toBeInTheDocument();
  });

  test('should execute a function on click', () => {
    const onClick = jest.fn();

    render(<BackButton onClick={onClick} />);

    const buttonElement = screen.getByTestId('back-button');

    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
