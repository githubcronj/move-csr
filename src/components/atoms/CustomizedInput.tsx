import React from "react";
import TextField from "@material-ui/core/TextField";
import "./CustomizedInput.scss";

interface IProps {
  label?: string;
  value?: any;
  type?: string;
  onChange?: any;
  InputProps?: any;
  className?: any;
  error?: boolean;
  InputLabelProps?: any;
  placeholder?: any;
  disabled?: boolean;
  hidden?: boolean;
  onPaste?: any;
  id?: any;
}

const CustomizedInput = (props: IProps) => {
  return (
    <TextField
      className={
        props.className ? `CustomInput ${props.className}` : props.className
      }
      id={props.id ? props.id : "filled-password-input"}
      label={props.label ? props.label : ""}
      type={props.type ? props.type : ""}
      value={props.value ? props.value : ""}
      variant="filled"
      onChange={props.onChange ? props.onChange : null}
      InputProps={props.InputProps ? props.InputProps : null}
      error={props.error ? true : false}
      InputLabelProps={props.InputLabelProps ? props.InputLabelProps : null}
      placeholder={props.placeholder}
      disabled={props.disabled ? props.disabled : false}
      hidden={props.hidden ? props.hidden : false}
      onPaste={props.onPaste}
      // id={props.id}
    />
  );
};

export default CustomizedInput;
