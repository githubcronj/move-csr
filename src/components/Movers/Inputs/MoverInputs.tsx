import React from "react";
import "./MoverInput.scss"

interface IProps {
  title?: string;
  icon?: any;
  inputComponent?: any;
}

const MoverInputComponent = (props:IProps) => {
  return(
    <div className="InputsMainDiv">
      <div className="titleDiv">{props.title}</div>
      <div className="InputIconFlex-div">
      {props.icon ? (
      <div className="iconDiv">
          {props.icon}
          </div>
          ) : null}
        <div className="inputDiv">
          {props.inputComponent}
        </div>
      </div>
    </div>
  );
}

export default MoverInputComponent;