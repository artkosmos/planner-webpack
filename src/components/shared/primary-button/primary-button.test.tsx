import { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonPrimary } from './primary-button';

import '@testing-library/jest-dom';

describe('testing of primary button component', () => {
  test('should render with the passed title', () => {
    const title = 'Primary button';

    render(<ButtonPrimary title={title} />);

    const buttonElement = screen.getByTestId('primary-button');

    expect(buttonElement).toHaveTextContent(title);
  });

  test('should render with children', () => {
    const content = (<span>Children</span>) as ReactNode;

    render(<ButtonPrimary>{content}</ButtonPrimary>);

    const buttonElement = screen.getByTestId('primary-button');

    expect(buttonElement).toHaveTextContent('Children');
  });

  test('button should execute a function on click', () => {
    const onClick = jest.fn();
    render(<ButtonPrimary onClick={onClick} />);

    const buttonElement = screen.getByTestId('primary-button');

    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
