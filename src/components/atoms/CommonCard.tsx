import React, { Component } from "react";
import "./CommonCard.scss";
import Button from "../atoms/Button";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
// import CheckboxLabels from "./checkbox";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

type initialProps = {
  SelectHandler: any;
  commonCardText?: any;
  commonImg: any;
  isSelected: boolean;
  sideTitle?: any;
  otherServiceName?: any;
  otherServiceHandler?: any;
  disabled?: any;
  buttonText?: string;
  className?: string;
  buttonbox?: boolean;
};

type initialState = {};

export class CommonCards extends Component<initialProps, initialState> {
  render() {
    return (
      <div
        onClick={this.props.buttonbox ? null : this.props.SelectHandler}
        className={
          this.props.className
            ? this.props.className
            : this.props.isSelected
            ? "Selected CommonCardDiv"
            : "CommonCardDiv notSelected"
        }
      >
        {this.props.buttonbox ? null : (
          <div className="checkBox">
            {this.props.isSelected ? (
              <div className="colorchange">
                {" "}
                <CheckCircleRoundedIcon />
              </div>
            ) : (
              <div className="colorchangegrey">
                <RadioButtonUncheckedOutlinedIcon />
              </div>
            )}

            {/* <CheckboxLabels
              checked={this.props.isSelected}
              // onChange={this.props.SelectHandler}
            /> */}
          </div>
        )}
        <div className="CommonCardImgDiv">
          <img src={this.props.commonImg} alt="" />
          <div className="sideTitle">
            {this.props.sideTitle ? this.props.commonCardText : null}
          </div>
        </div>
        {this.props.commonCardText ? (
          <div className="CommonCardText">
            {this.props.sideTitle ? (
              <CustomizedInput
                onChange={(e: any) => this.props.otherServiceHandler(e)}
                placeholder="ENTER SERVICE "
                value={this.props.otherServiceName}
              />
            ) : this.props.commonCardText ? (
              this.props.commonCardText
            ) : null}
          </div>
        ) : null}
        {/* {this.props.commonCardText ? (
          <div className="CommonCardText">{this.props.commonCardText}</div>
        ) : null} */}
        {this.props.buttonbox ? (
          <div className="CommonButtonDiv">
            <Button
              onClick={this.props.SelectHandler}
              backgroundColor={this.props.isSelected ? "#75BA9F" : "#415b76"}
              color="#ffffff"
              startLogo={
                this.props.isSelected ? (
                  <CheckCircleOutlineOutlinedIcon />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              disabled={this.props.disabled}
            >
              {this.props.buttonText
                ? this.props.isSelected
                  ? "Launched"
                  : "Launch"
                : this.props.isSelected
                ? "Selected"
                : "Select"}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CommonCards;
