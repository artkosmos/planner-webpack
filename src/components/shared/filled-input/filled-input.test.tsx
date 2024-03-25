import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilledInput } from './filled-input';

import '@testing-library/jest-dom';

describe('testing of filled input', () => {
  test('should render with label', () => {
    render(<FilledInput label={'Name'} />);

    const inputElement = screen.getByTestId('filled-input');
    const inputLabel = screen.getByText(/name/i);

    expect(inputElement).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
  });

  test('should render with controlled value', () => {
    const value = 'search something';

    render(<FilledInput value={value} />);

    const inputElement = screen
      .getByTestId('filled-input')
      .querySelector('input');

    expect(inputElement).toHaveValue(value);
  });

  test('should handle typing', async () => {
    const typedText = 'Entered text';
    const handleChange = jest.fn();

    render(<FilledInput onChange={handleChange} />);

    const inputElement = screen
      .getByTestId('filled-input')
      .querySelector('input');

    await userEvent.type(inputElement, typedText);

    expect(inputElement).toHaveValue(typedText);
    expect(handleChange).toHaveBeenCalledTimes(typedText.length);
  });
});
