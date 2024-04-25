import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import {
  ImageUploader,
  ImageUploaderProps,
} from '@/components/shared/image-uploader';

type Props<T extends FieldValues> = Omit<ImageUploaderProps, 'onChange'> &
  UseControllerProps<T>;

export const ControlledImageUploader = <T extends FieldValues>(
  props: Props<T>,
) => {
  const { control, name, ...rest } = props;

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  return <ImageUploader onChange={onChange} name={name} {...rest} />;
};
