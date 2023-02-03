import React from "react";
import "./podCard.scss";
import Checkbox from "@material-ui/core/Checkbox";
import PenskeImage from "../../Assets/images/Movers/Penske.svg";
import Button from "../atoms/Button";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

type initialProps = {
  name?: string;
  image?: any;
  discountPercent?: string;
  isSelected?: boolean;
  handleCheck?: any;
  buttonText?: string;
  head?: boolean;
};

const PodCard = (props: initialProps) => {
  return (
    <div
      className={props.head ? "pod-card-main pod-card-head" : "pod-card-main"}
    >
      <div className="nameImageDiv">
        <div className="nameDiv">{props.name}</div>
      </div>

      {props.head ? (
        <div className="nameOffersDiv">Offers</div>
      ) : (
        <div className="discountDiv">{`Get ${props.discountPercent} Off`}</div>
      )}
      {props.head ? (
        <div className="checkboxDiv"></div>
      ) : (
        <div className="checkboxDiv">
          <Button
            className="pod-card-button"
            onClick={props.handleCheck}
            backgroundColor={props.isSelected ? "#75BA9F" : "#415b76"}
            color="#ffffff"
            startLogo={
              props.isSelected ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : (
                <ArrowForwardIcon />
              )
            }
          >
            {props.buttonText
              ? props.isSelected
                ? "Selected"
                : "Select"
              : null}
          </Button>
          {/* <Checkbox checked={props.isSelected} onChange={props.handleCheck} /> */}
        </div>
      )}
    </div>
  );
};
export default PodCard;
