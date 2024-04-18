import { ChangeEvent, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { clsx } from 'clsx';

import { CoverIcon } from '@/assets/icons/cover-icon';
import { DeleteIcon } from '@/assets/icons/delete-icon';
import { ButtonPrimary } from '@/components/shared/primary-button';
import { compress } from '@/utils/compressImage';

import './style.scss';

type Props<T extends FieldValues> = {
  buttonText?: string;
  className?: string;
  clearInput?: () => void;
} & UseControllerProps<T>;

export const ImageUploader = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, buttonText, className, clearInput, ...rest } = props;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageCompressQuality = 0.5;
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

  const onButtonClick = () => {
    document.getElementById('task-image-label').click();
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
        name={name}
        id={'task-image'}
        accept="image/png, image/jpeg, image/webp"
        {...rest}
      />
      <label
        className={classNames.label}
        htmlFor={'task-image'}
        id={'task-image-label'}
      >
        <ButtonPrimary fullWidth onClick={onButtonClick} title={buttonText}>
          <CoverIcon />
        </ButtonPrimary>
      </label>
      {selectedImage && (
        <DeleteIcon className={classNames.delete} onClick={onDeleteIconClick} />
      )}
    </div>
  );
};
