import { render, screen } from '@testing-library/react';

import { InfoTitle } from './info-title';

import '@testing-library/jest-dom';

describe('testing of info title component', () => {
  test('element should render with specified title', () => {
    const title = 'Hello world';

    render(<InfoTitle title={title} />);

    const element = screen.getByTestId('info-title');

    expect(element).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
