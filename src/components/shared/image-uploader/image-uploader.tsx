import { ChangeEvent, useState } from 'react';

import { clsx } from 'clsx';

import { CoverIcon } from '@/assets/icons/cover-icon';
import { DeleteIcon } from '@/assets/icons/delete-icon';
import { ButtonPrimary } from '@/components/shared/primary-button';
import { compress } from '@/utils/compress-image';

import './style.scss';

export type ImageUploaderProps = {
  buttonText?: string;
  className?: string;
  clearInput?: () => void;
  onChange?: (value: string) => void;
  name?: string;
};

export const ImageUploader = (props: ImageUploaderProps) => {
  const { buttonText, className, clearInput, onChange, ...rest } = props;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageCompressQuality = 0.6;
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const compressedFile = await compress(file, imageCompressQuality);

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        onChange(imageUrl);
      };

      reader.readAsDataURL(compressedFile);
    }
  };

  const onDeleteIconClick = () => {
    setSelectedImage(null);
    clearInput?.();
    const fileInput = document.getElementById('task-image') as HTMLInputElement;
    fileInput.value = '';
  };

  const classNames = {
    container: clsx('file-input', className),
    preview: clsx('file-input__preview'),
    input: clsx('file-input__input'),
    label: clsx('file-input__label'),
    delete: clsx('file-input__delete-icon'),
  };

  return (
    <div className={classNames.container}>
      {selectedImage && (
        <img
          src={selectedImage}
          alt={'image preview'}
          className={classNames.preview}
        />
      )}
      <input
        className={classNames.input}
        hidden
        type={'file'}
        onChange={uploadImageHandler}
        id={'task-image'}
        accept="image/png, image/jpeg, image/webp"
        data-testid={'task-image'}
        {...rest}
      />
      <label
        className={classNames.label}
        htmlFor={'task-image'}
        id={'task-image-label'}
      >
        <ButtonPrimary
          fullWidth
          onClick={() => document.getElementById('task-image-label').click()}
          title={buttonText}
        >
          <CoverIcon />
        </ButtonPrimary>
      </label>
      {selectedImage && (
        <DeleteIcon className={classNames.delete} onClick={onDeleteIconClick} />
      )}
    </div>
  );
};
