import FormControlMUI from '@mui/material/FormControl';
import InputLabelMUI from '@mui/material/InputLabel';
import MenuItemMUI from '@mui/material/MenuItem';
import SelectMUI, { type SelectProps } from '@mui/material/Select';

export type SelectItem = {
  value: string;
  label: string;
};

type Props = { items: SelectItem[]; darkTheme?: boolean } & SelectProps;

export const Select = ({
  className,
  label,
  items,
  darkTheme,
  ...rest
}: Props) => {
  const selectItems = items.map((item, index) => (
    <MenuItemMUI key={index} value={item.value}>
      {item.label}
    </MenuItemMUI>
  ));

  return (
    <FormControlMUI className={className} size={'small'}>
      <InputLabelMUI id="select-label" sx={{ color: darkTheme && '#F5F5F533' }}>
        {label}
      </InputLabelMUI>
      <SelectMUI
        sx={{
          color: darkTheme && '#F5F5F57F',
          '.MuiSelect-icon': {
            color: darkTheme && '#F5F5F533',
          },
        }}
        labelId="select-label"
        label={label}
        data-testid={'select'}
        {...rest}
      >
        {selectItems}
      </SelectMUI>
    </FormControlMUI>
  );
};
