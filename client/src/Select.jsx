import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';

const Select = ({ name, label, control, defaultValue, children, ...props }) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <MuiSelect labelId={labelId} label={label}>
            {children}
          </MuiSelect>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default Select;
