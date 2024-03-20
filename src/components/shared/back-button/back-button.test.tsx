import { fireEvent, render, screen } from '@testing-library/react';

import { BackButton } from './back-button';

import '@testing-library/jest-dom';

describe('testing of back button component', () => {
  test('should render a button with the given title and an arrow back icon', () => {
    const title = 'Go Back';

    render(<BackButton title={title} />);

    const buttonElement = screen.getByTestId('back-button');
    const nestedIconElement = buttonElement.querySelector('svg');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(title);
    expect(nestedIconElement).toBeInTheDocument();
  });

  test('button should execute a function on click', () => {
    const onClick = jest.fn();

    render(<BackButton onClick={onClick} />);

    const buttonElement = screen.getByTestId('back-button');

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
