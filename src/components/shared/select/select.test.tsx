import {
  act,
  fireEvent,
  render,
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
    const { getByTestId } = render(
      <Select value={options[1].value} items={options} />,
    );

    const select = getByTestId('select');

    expect(select).toHaveTextContent('Bye');
  });

  test('should render with label and with no controlled value', () => {
    const { getByTestId } = render(
      <Select value={''} items={options} label={label} />,
    );

    const selectLabel = document.querySelector('label');
    const select = getByTestId('select');

    expect(selectLabel).toHaveTextContent('Greetings');
    expect(select).toHaveTextContent('Greetings');
  });

  test('should handle change event', async () => {
    const onChange = jest.fn();

    const { getByTestId, getAllByRole } = render(
      <Select value={''} items={options} label={label} onChange={onChange} />,
    );

    const select = getByTestId('select');
    const selectButton = within(select).getByRole('combobox');

    expect(select).toHaveTextContent('Greetings');

    fireEvent.mouseDown(selectButton);
    const selectOptions = getAllByRole('option');

    expect(selectOptions.length).toBe(options.length);

    const firstOption = selectOptions[0];
    await act(() => fireEvent.click(firstOption));

    expect(onChange).toHaveBeenCalledTimes(1);
    waitFor(() => expect(select).toHaveTextContent('Hello'));
  });
});
