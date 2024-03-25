import { render, screen } from '@testing-library/react';

import { InfoTitle } from './info-title';

import '@testing-library/jest-dom';

describe('testing of info title component', () => {
  test('element should render with passed title', () => {
    render(<InfoTitle title={'Hello world'} />);

    const element = screen.getByTestId('info-title');

    expect(element).toHaveTextContent('Hello world');
  });
});
