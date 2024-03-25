import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonOutlined } from './outlined-button';

import '@testing-library/jest-dom';

describe('testing of outlined button component', () => {
  test('should render with passed title', () => {
    const title = 'Outlined button';

    render(<ButtonOutlined title={title} />);

    const buttonElement = screen.getByTestId('outlined-button');

    expect(buttonElement).toHaveTextContent(title);
  });

  test('should call a function on click', () => {
    const onClick = jest.fn();

    render(<ButtonOutlined onClick={onClick} />);

    const buttonElement = screen.getByTestId('outlined-button');

    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
