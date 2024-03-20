import { render, screen } from '@testing-library/react';

import { Dialog } from './dialog';

import '@testing-library/jest-dom';

describe('testing of dialog component', () => {
  const title = 'Test tile';
  const children = <h1>Test content</h1>;

  test('should render dialog with title and content when isOpen is true', () => {
    const isOpen = true;

    render(
      <Dialog title={title} isOpen={isOpen}>
        {children}
      </Dialog>,
    );

    const dialogElement = screen.getByTestId('dialog');
    const dialogContent = dialogElement.querySelector(children.type);

    expect(dialogElement).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children.props.children)).toBeInTheDocument();
  });

  test('should render nothing when isOpen is false', () => {
    const isOpen = false;

    render(
      <Dialog title={title} isOpen={isOpen}>
        {children}
      </Dialog>,
    );

    const dialogElement = screen.queryByTestId('dialog');

    expect(dialogElement).not.toBeInTheDocument();
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(children.props.children)).not.toBeInTheDocument();
  });
});
