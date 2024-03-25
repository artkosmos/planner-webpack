import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import { Select, type SelectItem } from './select';

import '@testing-library/jest-dom';

describe('testing of select component', () => {
  const label = 'Greetings';
  const options: SelectItem[] = [
    { value: '1', label: 'Hello' },
    { value: '2', label: 'Bye' },
  ];

  test('should render with passed options and controlled value', async () => {
    render(<Select value={options[1].value} items={options} />);

    const select = screen.getByTestId('select');

    expect(select).toHaveTextContent('Bye');
  });

  test('should render with label and with no controlled value', async () => {
    render(<Select value={''} items={options} label={label} />);

    const select = screen.getByTestId('select');
    const selectLabel = screen.getByLabelText(/greetings/i);

    expect(selectLabel).toBeInTheDocument();
    expect(select).toHaveTextContent('Greetings');
  });

  test('should handle change event', async () => {
    const onChange = jest.fn();

    render(
      <Select value={''} items={options} label={label} onChange={onChange} />,
    );

    const select = screen.getByTestId('select');
    const selectButton = within(select).getByRole('combobox');

    expect(select).toHaveTextContent('Greetings');

    fireEvent.mouseDown(selectButton);
    const selectOptions = screen.getAllByRole('option');

    expect(selectOptions.length).toBe(options.length);

    const firstOption = selectOptions[0];
    fireEvent.click(firstOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(select).toHaveTextContent('Hello'));
  });
});
