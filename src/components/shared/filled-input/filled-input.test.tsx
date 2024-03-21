import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilledInput } from './filled-input';

import '@testing-library/jest-dom';

describe('testing of filled input', () => {
  test('input should render with passed label', () => {
    const label = 'Name';
    render(<FilledInput label={label} />);

    const inputElement = screen.getByTestId('filled-input');
    const inputLabel = screen.getByText(label);

    expect(inputElement).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
  });

  test('should render input without label', () => {
    const label = 'Surname';

    render(<FilledInput />);

    const inputElement = screen.getByTestId('filled-input');
    const inputLabel = screen.queryByText(label);

    expect(inputElement).toBeInTheDocument();
    expect(inputLabel).not.toBeInTheDocument();
  });

  test('input should render with passed value', () => {
    const value = 'search something';

    render(<FilledInput value={value} />);

    const inputElement = screen
      .getByTestId('filled-input')
      .querySelector('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);
  });

  test('enter text in input and trigger onChange', async () => {
    const typedText = 'Entered text';
    const handleChange = jest.fn();

    render(<FilledInput onChange={handleChange} />);

    const inputElement = screen
      .getByTestId('filled-input')
      .querySelector('input');

    expect(inputElement).toBeInTheDocument();
    await userEvent.type(inputElement, typedText);
    expect(inputElement).toHaveValue(typedText);
    expect(handleChange).toHaveBeenCalledTimes(typedText.length);
  });
});
