import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DoneIcon from "@material-ui/icons/Done";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import Button from "../atoms/Button";
import "./utilitiesFirstCard.scss";
import PhoneIcon from "@material-ui/icons/Phone";

interface IProps {
  icon?: any;
  title?: string;
  subTitle?: string;
  selectedToEmail?: boolean;
  selectedToComplete?: boolean;
  onSelectCilck?: any;
  completed?: boolean;
  onCompleteClick?: any;
  phone?: any;
}

const UtilitiesFirstCard = (props: IProps) => {
  return (
    <div
      className="MainCardDivUtilties"
      style={{
        border:
          props.selectedToEmail || props.selectedToComplete
            ? "2px solid #5CBD9D"
            : "2px solid #EFF2F7",
      }}
    >
      <div className="icon-div-utilities1">{props.icon}</div>

      <div className="title-div-utilities1">{props.title}</div>

      <div className="subtitle-div-utilities1">{props.subTitle}</div>

      {props.phone ? (
        <div className="phone-first">
          <div className="phone-icon-first">
            <PhoneIcon />
          </div>
          <div className="phone-number-first">{props.phone}</div>
        </div>
      ) : null}

      <div className="buttons-utilities1">
        {props.title === "GAS" || props.title === "ELECTRICITY" ? (
          <Button
            className="selectButton1"
            backgroundColor={props.selectedToComplete ? "#408867" : "#415B76"}
            color={"#fff"}
            startLogo={
              props.selectedToComplete ? (
                <CheckCircleOutlineRoundedIcon />
              ) : (
                <ArrowForwardRoundedIcon />
              )
            }
            onClick={props.onCompleteClick}
          >
            {props.selectedToComplete
              ? "Selected to Complete"
              : "Select to Complete"}
          </Button>
        ) : null}

        <Button
          className="selectButton2"
          backgroundColor={props.selectedToEmail ? "#408867" : "#fff"}
          color={props.selectedToEmail ? "#fff" : "#415B76"}
          border={
            props.selectedToEmail ? "1px solid #408867" : "1px solid #415B76"
          }
          startLogo={
            props.selectedToEmail ? (
              <CheckCircleOutlineRoundedIcon />
            ) : (
              <ArrowForwardRoundedIcon />
            )
          }
          onClick={props.onSelectCilck}
        >
          {props.selectedToEmail ? "Selected to email" : "Select to email"}
        </Button>
      </div>
    </div>
  );
};

export default UtilitiesFirstCard;
