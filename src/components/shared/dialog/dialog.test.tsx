import { fireEvent, render, screen } from '@testing-library/react';

import { Dialog } from './dialog';

import '@testing-library/jest-dom';

describe('testing of dialog component', () => {
  const children = <h1>Test content</h1>;

  test('should render with title and content if isOpen is true', () => {
    render(
      <Dialog title={'Test tile'} isOpen={true}>
        {children}
      </Dialog>,
    );

    const dialog = screen.getByTestId('dialog');
    const title = screen.getByText(/test tile/i);
    const content = screen.getByText(/test content/i);

    expect(dialog).toContainElement(content);
    expect(dialog).toContainElement(title);
  });

  test('should render nothing if isOpen is false', () => {
    render(<Dialog isOpen={false}>{children}</Dialog>);

    const dialog = screen.queryByTestId('dialog');
    const content = screen.queryByText(/test content/i);

    expect(dialog).not.toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });

  test('should call close callback if Esc is pressed', () => {
    const onClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={onClose}>
        {children}
      </Dialog>,
    );

    const dialog = screen.queryByTestId('dialog');

    expect(dialog).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
