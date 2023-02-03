import React, { Component } from "react";
import "./BrokerInsuranceCard.scss";
import Button from "../atoms/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MailIcon from "@material-ui/icons/Mail";

type initialProps = {
  name?: string;
  image?: string;
  selected?: boolean;
  phone?: string;
  email?: string;
  onClickSelect?: any;
};
type initialState = {};

export class BrokerInsuranceCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="BrokerInsuranceCardDiv">
        <div className="nameImageDiv">
          <img src={this.props.image} className="image" />
          <div className="name">{this.props.name}</div>
        </div>
        <div className="phoneIconDiv">
          {this.props.phone ? (
            <PhoneIcon className="phoneIcon" />
          ) : (
            <MailIcon className="phoneIcon" />
          )}
          <div className="phone">
            {this.props.phone ? this.props.phone : this.props.email}
          </div>
        </div>
        <div className="buttonDiv">
          <Button
            startLogo={<ArrowForwardIcon />}
            onClick={this.props.onClickSelect}
            backgroundColor={this.props.selected ? "#75BA9F" : "#465B74"}
          >
            {this.props.selected ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    );
  }
}

export default BrokerInsuranceCard;
