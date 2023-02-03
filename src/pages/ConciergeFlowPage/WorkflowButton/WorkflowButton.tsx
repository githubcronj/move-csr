import React from "react";
import Button from "../../../components/atoms/Button";
import "./workflowButton.scss";

type InitialProps = {
  buttonText1?: string;
  buttonText2?: string;
  buttonStartLogo1?: any;
  buttonStartLogo2?: any;
  ButtonOnClick1?: any;
  ButtonOnClick2?: any;
  button2Disabled?: boolean;
  button1BackGround?: any;
  button2BackGround?: any;
  button1Disabled?: any;
};

const WorkflowButtons = (props: InitialProps) => {
  return (
    <div
      className={`${
        localStorage.getItem("leftPanel") === "true"
          ? "workflowButtonFlexDiv position1"
          : "workflowButtonFlexDiv position2"
      }`}
    >
      {props.buttonText1 ? (
        <div className="workflowButtonDiv">
          <Button
            className="Button1"
            startLogo={props.buttonStartLogo1 ? props.buttonStartLogo1 : null}
            onClick={props.ButtonOnClick1}
            color="#465B74"
            backgroundColor={
              props.button1BackGround ? props.button1BackGround : "#fff"
            }
            disabled={props.button1Disabled}
          >
            {props.buttonText1}
          </Button>
        </div>
      ) : null}
      <div className="workflowButtonDiv">
        <Button
          className="Button2"
          startLogo={props.buttonStartLogo2 ? props.buttonStartLogo2 : null}
          onClick={props.ButtonOnClick2}
          disabled={props.button2Disabled}
          backgroundColor={
            props.button2BackGround ? props.button2BackGround : "#465B74"
          }
          color="#fff"
        >
          {props.buttonText2}
        </Button>
      </div>
    </div>
  );
};

export default WorkflowButtons;
