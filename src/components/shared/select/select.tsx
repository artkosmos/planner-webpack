import { useId } from 'react';
import FormControlMUI from '@mui/material/FormControl';
import InputLabelMUI from '@mui/material/InputLabel';
import MenuItemMUI from '@mui/material/MenuItem';
import SelectMUI, { type SelectProps } from '@mui/material/Select';

export type SelectItem = {
  value: string;
  label: string;
};

type Props = { items: SelectItem[] } & SelectProps;

export const Select = ({ className, label, items, ...rest }: Props) => {
  const id = useId();

  const selectItems = items.map((item, index) => (
    <MenuItemMUI key={index} value={item.value}>
      {item.label}
    </MenuItemMUI>
  ));

  return (
    <FormControlMUI className={className} size={'small'}>
      <InputLabelMUI id={`select-label-${id}`}>{label}</InputLabelMUI>
      <SelectMUI
        labelId={`select-label-${id}`}
        label={label}
        data-testid={'select'}
        {...rest}
      >
        {selectItems}
      </SelectMUI>
    </FormControlMUI>
  );
};
