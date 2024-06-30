import { act, fireEvent, within } from '@testing-library/react';

import { preloadedState } from '@/__mocks__/preloaded-state';
import { renderWithReduxAndRouter } from '@/__mocks__/redux-router-jest';
import { Header } from '@/components/business/header/header';
import { tasksActions } from '@/store';

import '@testing-library/jest-dom';
import '@/__mocks__/match-media-jest';

describe('testing of header component', () => {
  test('should render with app name and select with default language', () => {
    const { getByText, getByTestId, getByLabelText } = renderWithReduxAndRouter(
      <Header />,
    );

    const header = getByTestId('header');
    const appName = getByText(/Crazy Planner/);
    const filterSelect = getByLabelText('Filter by');
    const sortSelect = getByLabelText('Sort by');
    const langSelect = getByLabelText('Language');

    expect(header).toContainElement(appName);
    expect(header).toContainElement(langSelect);
    expect(langSelect).toHaveTextContent('English');
    expect(header).toContainElement(filterSelect);
    expect(header).toContainElement(sortSelect);
  });

  test('select should contain only supported languages', () => {
    const numberOfAppLanguages = 2;

    const { getAllByRole, getByLabelText } = renderWithReduxAndRouter(
      <Header />,
    );

    const langSelect = getByLabelText('Language');
    fireEvent.mouseDown(langSelect);
    const selectOptions = getAllByRole('option');

    expect(selectOptions).toHaveLength(numberOfAppLanguages);
    expect(selectOptions[0]).toHaveTextContent('English');
    expect(selectOptions[1]).toHaveTextContent('Russian');
  });

  test('should change app theme', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<Header />);

    const header = getByTestId('header');
    const switchTheme = within(header).getByRole('checkbox');

    expect(document.body).not.toHaveClass('dark');

    await act(() => fireEvent.click(switchTheme));
    await act(() =>
      fireEvent.change(switchTheme, { target: { checked: true } }),
    );

    expect(document.body).toHaveClass('dark');
  });

  test('should apply sorting to table', async () => {
    const mockedSortThunk = jest.spyOn(tasksActions, 'setSort');

    const { getByLabelText, getByRole, store } = renderWithReduxAndRouter(
      <Header />,
      { preloadedState },
    );

    const sortSelect = getByLabelText('Sort by');
    fireEvent.mouseDown(sortSelect);

    const sortOption = getByRole('option', { name: 'Date ↑' });
    await act(() => fireEvent.click(sortOption));

    expect(mockedSortThunk).toHaveBeenCalledWith('date_first');
    expect(store.getState().tasks.listSort.sortBy).toBe('date_first');
  });

  test('should apply filter to table', async () => {
    const mockedFilterThunk = jest.spyOn(tasksActions, 'setFilter');

    const { getByLabelText, getByRole, store } = renderWithReduxAndRouter(
      <Header />,
      { preloadedState },
    );

    const filterSelect = getByLabelText('Filter by');
    fireEvent.mouseDown(filterSelect);

    const filterOption = getByRole('option', { name: 'Important' });
    await act(() => fireEvent.click(filterOption));

    expect(mockedFilterThunk).toHaveBeenCalledWith('important');
    expect(store.getState().tasks.listSort.filterBy).toBe('important');
  });

  test('click on burger menu should assign appropriate classes', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<Header />);

    const header = getByTestId('header');
    const burger = header.querySelector('.header__burger') as HTMLElement;
    await act(() => fireEvent.click(burger));
    const burgerList = header.querySelector('.header__burger-list');

    expect(header).toContainElement(burger);
    expect(burger).toHaveClass('header__burger_active');
    expect(burgerList).toHaveClass('header__burger-list_active');
  });

  test('should render without filter and sorting due to location', async () => {
    await act(async () => {
      const { queryByLabelText } = renderWithReduxAndRouter(<Header />, {
        initialRouterPath: ['/tasks/some_task_id'],
      });

      const filterSelect = queryByLabelText('Filter by');
      const sortSelect = queryByLabelText('Sort by');

      expect(filterSelect).not.toBeInTheDocument();
      expect(sortSelect).not.toBeInTheDocument();
    });
  });

  test('should change app language', async () => {
    const { getByRole, getByLabelText } = renderWithReduxAndRouter(<Header />);

    const langSelect = getByLabelText('Language');
    fireEvent.mouseDown(langSelect);

    const lngOption = getByRole('option', { name: 'Russian' });
    await act(() => fireEvent.click(lngOption));
    const filterSelect = getByLabelText('Фильтровать по');
    const sortSelect = getByLabelText('Сортировать по');

    expect(filterSelect).toBeInTheDocument();
    expect(sortSelect).toBeInTheDocument();
    expect(langSelect).toHaveTextContent('Русский');
  });
});
