import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DateInput } from './date-input';

import '@testing-library/jest-dom';

describe('testing of date input component', () => {
  test('should render, allow to choose value and trigger onChange', async () => {
    const dateValue = '2022-01-01T00:00';
    const onChange = jest.fn();

    render(<DateInput onChange={onChange} />);

    const input = screen.getByTestId('date');

    expect(input).toBeInTheDocument();
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: dateValue } });
    expect(onChange).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(input).toHaveValue(dateValue));
  });

  test('should render with label', () => {
    const label = 'Date input';

    render(<DateInput label={label} />);

    const input = screen.getByTestId('date');
    const inputLabel = screen.getByTestId('date-label');

    expect(input).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel).toHaveTextContent(label);
  });
});

// обработка ошибок
