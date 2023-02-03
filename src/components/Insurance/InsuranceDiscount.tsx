import React, { Component } from "react";
import "./InsuranceDiscount.scss";
import Button from "../atoms/Button";

type initialProps = {
  dcheading: any;
  dcsubheading: any;
  insurancebutton: any;
  insuranceDcHandle: any;
  imgdiscount: any;
};

type initialState = {};

export class InsuranceDiscount extends React.Component<
  initialProps,
  initialState
> {
  render() {
    return (
      <div className="InsuranceDiscount">
        <div className="InsuranceDiscountContent">
          <div className="InsuranceDCHeading">{this.props.dcheading}</div>
          <div className="InsuranceDCSubHeading">{this.props.dcsubheading}</div>
          <div className="InsuranceDCButton">
            <Button onClick={this.props.insuranceDcHandle}>
              {this.props.insurancebutton}
            </Button>
          </div>
        </div>
        <div>
          <img src={this.props.imgdiscount}></img>
        </div>
      </div>
    );
  }
}

export default InsuranceDiscount;
