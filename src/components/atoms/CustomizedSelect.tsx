import React from "react";
import TextField from '@material-ui/core/TextField';
import './CustomizedSelect.scss';

interface IProps {
  label?: string;
  value?: any;
  type?: string;
  onChange?: any;
  InputProps?: any;
  className?: any;
  options?: any;
  error?: boolean;
  placeholder ? : any
};


const CustomizedSelect = (props:IProps) => {
  return (
    <TextField
      className={props.className ? props.className : "CustomSelect"}
      id="filled-select-currency-native"
      select
      label={props.label ? props.label : ''}
      value={props.value ? props.value : ""}
      onChange={props.onChange}
      placeholder={props.placeholder}
      SelectProps={{
        native: true,
      }}
      variant="filled"
      error={props.error ? true : false}
      defaultValue={props.value ? props.value : ""}
    >
      {props.options.length && props.options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
}

export default CustomizedSelect;