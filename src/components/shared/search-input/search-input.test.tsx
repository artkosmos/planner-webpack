import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from './search-input';

import '@testing-library/jest-dom';

describe('testing of search component', () => {
  test('should render search input', () => {
    const { getByTestId } = render(<SearchInput />);

    const searchInput = getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  test('should render search input with label', () => {
    const label = 'Search';
    const { getByLabelText } = render(<SearchInput label={label} />);

    const searchInput = getByLabelText('Search');

    expect(searchInput).toBeInTheDocument();
  });

  test('should trigger onChange and display right value', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<SearchInput onChange={onChange} />);

    const searchInput = getByTestId('search-input').querySelector('input');
    const value = 'meeting';
    await userEvent.type(searchInput, value);

    expect(onChange).toHaveBeenCalledTimes(value.length);
    expect(searchInput).toHaveValue('meeting');
  });
});
