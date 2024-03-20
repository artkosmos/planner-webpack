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

  test('should render with passed options and chosen value', async () => {
    render(<Select value={options[1].value} items={options} />);

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent(options[1].label);
  });

  test('should render with label and without chosen value', async () => {
    render(<Select value={''} items={options} label={label} />);

    const select = screen.getByTestId('select');
    const selectLabel = screen.getByLabelText(label);

    expect(select).toBeInTheDocument();
    expect(selectLabel).toBeInTheDocument();
    expect(select).toHaveTextContent(label);
    expect(select).not.toHaveTextContent(options[0].label);
  });

  test('should open and handle on change', async () => {
    const onChange = jest.fn();

    render(
      <Select value={''} items={options} label={label} onChange={onChange} />,
    );

    const select = screen.getByTestId('select');
    const selectButton = within(select).getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent(label);
    fireEvent.mouseDown(selectButton);
    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions.length).toBe(options.length);
    const firstOption = selectOptions[0];
    fireEvent.click(firstOption);
    expect(onChange).toHaveBeenCalledTimes(1);
    waitFor(() => expect(select).toHaveTextContent(options[0].label));
  });
});
