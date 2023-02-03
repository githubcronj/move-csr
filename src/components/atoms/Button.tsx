import React from "react";
import { Button, makeStyles } from "@material-ui/core";

interface IButtonProps {
  endIcon?: any;
  startIcon?: any;
  iconMarginLeft?: string;
  active?: any;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: any;
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
  marginTop?: string;
  color?: string;
  padding?: string;
  borderLeft?: string;
  minWidth?: string;
  onClick?: any;
  className?: string;
  disabled?: any;
  children?: any;
  boxShadow?: any;
  border?: string;
  opacity?: string;
  startLogo?: any;
  endLogo?: any;
  iconMarginRight?: string;
}
const ButtonNew = (props: IButtonProps) => {
  const useStyles = makeStyles(() => ({
    root: {
      //     '&:hover': {
      //         backgroundColor: `${slug && slug.primary_color ? slug.primary_color : '#273e59'} !important`,
      //         color: '#fff !important',
      //         opacity: '0.9',
      //     },
    },
  }));
  const classes = useStyles();
  let icon = null;
  let startIcon = null;
  if (props.endIcon) {
    icon = (
      <img
        src={props.endIcon}
        style={{
          marginLeft: props.iconMarginLeft ? props.iconMarginLeft : "0px",
        }}
      />
    );
  } else if (props.endLogo) {
    icon = props.endLogo;
  }
  if (props.startLogo) {
    startIcon = props.startLogo;
  } else if (props.startIcon) {
    icon = (
      <img
        src={props.startIcon}
        style={{
          marginLeft: props.iconMarginRight ? props.iconMarginRight : "10px",
        }}
      />
    );
  }

  // console.log("props",props.disabled)
  return (
    <Button
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "#273E59",

        color: props.color ? props.color : "#fff",

        border: props.border ? props.border : "",
        margin: props.margin ? props.margin : "",
        opacity: props.disabled ? "0.5" : "1",
      }}
      onClick={props.onClick}
      className={props.className ? props.className : classes.root}
      disabled={props.disabled ? props.disabled : false}
      endIcon={icon}
      startIcon={startIcon}
    >
      {props.children}
    </Button>
  );
};

export default ButtonNew;
