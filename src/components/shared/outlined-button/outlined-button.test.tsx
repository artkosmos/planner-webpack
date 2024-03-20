import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonOutlined } from './outlined-button';

import '@testing-library/jest-dom';

describe('testing of outlined button component', () => {
  test('should render a button with the given title', () => {
    const title = 'Outlined button';

    render(<ButtonOutlined title={title} />);

    const buttonElement = screen.getByTestId('outlined-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(title);
  });

  test('button should execute a function on click', () => {
    const onClick = jest.fn();

    render(<ButtonOutlined onClick={onClick} />);

    const buttonElement = screen.getByTestId('outlined-button');

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
