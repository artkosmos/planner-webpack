import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DateInput } from './date-input';

import '@testing-library/jest-dom';

describe('testing of date input component', () => {
  test('should render with label', () => {
    const label = 'Date input';

    render(<DateInput label={label} />);

    const input = screen.getByTestId('date');
    const inputLabel = screen.getByTestId('date-label');

    expect(input).toBeInTheDocument();
    expect(inputLabel).toHaveTextContent('Date input');
  });

  test('should render and allow to choose date', async () => {
    const dateValue = '2022-01-01T00:00';
    const onChange = jest.fn();

    render(<DateInput onChange={onChange} />);

    const input = screen.getByTestId('date');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: dateValue } });

    expect(onChange).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(input).toHaveValue(dateValue));
  });

  test('should show error', () => {
    const error = 'Invalid';

    render(<DateInput error={error} />);

    const input = screen.getByTestId('date');
    const inputErrorLabel = screen.getByTestId('date-label');

    expect(input).toBeInTheDocument();
    expect(inputErrorLabel).toHaveTextContent('Invalid');
  });
});
