import React, { Component } from "react";
import "./InsuranceCard.scss";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "../atoms/Button";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

type initialProps = {
  insuranceName?: any;
  monthlyCost?: any;
  yearlyCost?: any;
  PlanButtonClick?: any;
  CoverageHandler?: any;
  currency?: any;
  isSelected?: boolean;
  image?: any;
  isViewCoverage?: boolean;
  term?: any;
};
type initialState = {};

export class InsuranceCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="insuranceCardDiv">
        <div className="insuranceType">
          <div className="insuranceImage">
            <img src={this.props.image} />
          </div>
          <div className="insuranceText">{this.props.insuranceName}</div>
          {/* <div
            onClick={this.props.CoverageHandler}
            className="insuranceCoverageDetail"
          >
            View Coverage Details
          </div> */}
        </div>
        {this.props.monthlyCost ? (
          <div className="insuranceMonthlyCost">
            <span className="Dollar">{this.props.currency}</span>
            <span className="Price">{this.props.monthlyCost}</span>
            <div className="iconMonthWrapper">
              <div className="IconDiv">
                <span className="starStyle">
                  *
                  <ErrorOutlineIcon className="detailsIcon" />
                </span>
              </div>
              <div className="monthTextDiv">/month</div>
            </div>
          </div>
        ) : null}
        <div className="insuranceType">
          {this.props.yearlyCost && this.props.term ? (
            <div className="insuranceYearlyCost">{`${this.props.currency}${this.props.yearlyCost}* for ${this.props.term} months`}</div>
          ) : null}
          {this.props.isViewCoverage ? (
            <div
              onClick={this.props.CoverageHandler}
              className="insuranceCoverageDetail"
            >
              View Coverage Details
            </div>
          ) : null}
        </div>

        <Button
          className="selectPlanButton"
          backgroundColor={this.props.isSelected ? "#75BA9F" : "#415b76"}
          color="#ffffff"
          onClick={this.props.PlanButtonClick}
          startLogo={
            this.props.isSelected ? (
              <CheckCircleOutlineOutlinedIcon />
            ) : (
              <ArrowForwardIcon />
            )
          }
        >
          Select plan
        </Button>
      </div>
    );
  }
}

export default InsuranceCard;
