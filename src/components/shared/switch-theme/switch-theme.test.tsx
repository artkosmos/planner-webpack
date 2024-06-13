import { fireEvent, render } from '@testing-library/react';

import { SwitchTheme } from './switch-theme';

import '@testing-library/jest-dom';

describe('testing of switch theme component', () => {
  test('should render checked switch component', async () => {
    const { getByRole } = render(<SwitchTheme checked={true} />);

    const switchElement = getByRole('checkbox');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();

    fireEvent.change(switchElement, { target: { checked: '' } });

    expect(switchElement).not.toBeChecked();
  });

  test('should change checked value', async () => {
    const { getByRole } = render(<SwitchTheme />);

    const switchElement = getByRole('checkbox');

    expect(switchElement).not.toBeChecked();

    fireEvent.change(switchElement, { target: { checked: true } });

    expect(switchElement).toBeChecked();
  });
});
