import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';

import { renderWithRedux } from '@/__mocks__/redux-jest';
import { HomeLazy } from '@/components/page/home';
import { TaskDescriptionLazy } from '@/components/page/task-description';
import { NotFound } from '@/components/shared/not-found';

import { routerConfig } from './routes';

import '@/__mocks__/match-media-jest';
import '@testing-library/jest-dom';

jest.mock('@/components/page/home', () => ({
  HomeLazy: jest.fn(),
}));

jest.mock('@/components/page/task-description', () => ({
  TaskDescriptionLazy: jest.fn(),
}));

jest.mock('@/components/shared/not-found', () => ({
  NotFound: jest.fn(),
}));

describe('testing of router', () => {
  test('should render home page and layout', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    const { getByTestId } = renderWithRedux(<RouterProvider router={router} />);

    const header = getByTestId('header');

    expect(header).toBeInTheDocument();
    expect(HomeLazy).toHaveBeenCalled();
  });

  test('should render task page and layout', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: [`/task/id`],
    });

    const { getByTestId } = renderWithRedux(<RouterProvider router={router} />);

    const header = getByTestId('header');

    expect(header).toBeInTheDocument();
    expect(TaskDescriptionLazy).toHaveBeenCalled();
  });

  test("should render 404 page if path don't exist", () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: [`/wrong`],
    });

    render(<RouterProvider router={router} />);

    expect(NotFound).toHaveBeenCalled();
  });
});
