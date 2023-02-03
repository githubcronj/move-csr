import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DoneIcon from "@material-ui/icons/Done";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import Button from "../../atoms/Button";
import "./MoversCard.scss";

interface IProps {
  icon?: any;
  isRecommended?: boolean;
  title?: string;
  subTitle?: string;
  featuers?: any;
  selected?: boolean;
  onSelectCilck?: any;
}

const MoversCard = (props: IProps) => {
  return (
    <div
      className="CardMainDiv"
      style={{
        border: props.selected ? "1px solid #5CBD9D" : "1px solid #EFF2F7",
      }}
    >
      <div
        className="TopIconFlexDiv"
        style={{ background: props.isRecommended ? "#F9FBFF" : "#FFFFFF" }}
      >
        <div className="iconDiv">{props.icon}</div>
        {props.isRecommended ? (
          <div className="recommended">Recommended</div>
        ) : null}
      </div>
      <div className="contentDiv">
        <div className="title">{props.title}</div>
        <div className="subTitle">
          {props.subTitle}
          <InfoOutlinedIcon className="infoIcon" />
        </div>
        {props.featuers &&
          props.featuers.map((item: any) => {
            return (
              <div className="featuresDiv">
                <DoneIcon className="doneIcon" />
                {item}
              </div>
            );
          })}
        <div className="buttonDiv">
          <Button
            className="selectButton"
            backgroundColor={props.selected ? "#408867" : "#ECF7FB"}
            color={props.selected ? "#FFFFFF" : "#3C7084"}
            startLogo={
              props.selected ? (
                <CheckCircleOutlineRoundedIcon />
              ) : (
                <ArrowForwardRoundedIcon />
              )
            }
            onClick={props.onSelectCilck}
          >
            {props.selected ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoversCard;
