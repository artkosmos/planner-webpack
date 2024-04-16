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

import './style.scss';

type Props<T extends FieldValues> = {
  buttonText?: string;
  className?: string;
  clearInput?: () => void;
} & UseControllerProps<T>;

export const ControlledFileInput = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, buttonText, className, clearInput, ...rest } = props;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setSelectedImage(imageUrl);

      onChange(file);
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
    delete: clsx('file-input__delete'),
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
        onChange={uploadHandler}
        name={name}
        id={'task-image'}
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
