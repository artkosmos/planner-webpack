import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as compressImageModule from '@/utils/compress-image';

import { ImageUploader } from './image-uploader';

import '@testing-library/jest-dom';

describe('testing of image uploader component', () => {
  const compressMock = jest.spyOn(compressImageModule, 'compress');
  const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
  compressMock.mockResolvedValue(file);

  test('should render a button with the given buttonText prop', () => {
    const text = 'Upload Image';

    const { getByText } = render(<ImageUploader buttonText={text} />);

    const uploadButton = getByText('Upload Image');

    expect(uploadButton).toBeInTheDocument();
  });

  test('should trigger onChange when a file is selected', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(<ImageUploader onChange={onChange} />);

    const uploadInput = getByTestId('task-image') as HTMLInputElement;
    await userEvent.upload(uploadInput, file);

    expect(onChange).toHaveBeenCalled();
  });

  test('should not show preview if no image has been selected', () => {
    const { queryByRole } = render(<ImageUploader />);

    const preview = queryByRole('img');

    expect(preview).not.toBeInTheDocument();
  });

  test('should trigger clearInput when delete icon is clicked', async () => {
    const clearInput = jest.fn();

    const { findByTestId, getByTestId } = render(
      <ImageUploader clearImage={clearInput} />,
    );

    const uploadInput = getByTestId('task-image') as HTMLInputElement;
    await userEvent.upload(uploadInput, file);
    const deleteIcon = await findByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    expect(clearInput).toHaveBeenCalled();
  });

  test('should display image preview when image is uploaded', async () => {
    const { findByRole, getByTestId } = render(<ImageUploader />);

    const uploadInput = getByTestId('task-image') as HTMLInputElement;
    await userEvent.upload(uploadInput, file);
    const imagePreview = (await findByRole('img')) as HTMLImageElement;

    expect(imagePreview).toBeInTheDocument();
    expect(imagePreview.alt).toBe('image preview');
  });
});
