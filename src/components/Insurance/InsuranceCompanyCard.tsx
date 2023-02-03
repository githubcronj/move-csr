import React, { Component } from "react";
import "./InsuranceCompanyCard.scss";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";

type initialProps = {
  image?: any;
  EditHandler: any;
  insuranceCompanyName?: any;
  buyNowData?: any;
  plan?: any;
  switchButton?: boolean;
  isHold?: boolean;
  onSwichChange?: any;
};

type initialState = {};

export class InsuranceCompanyCard extends Component<
  initialProps,
  initialState
> {
  render() {
    return (
      <div className="InsuranceCompanyDiv">
        {this.props.switchButton ? (
          <div className="wrapper">
            <div className="CompanyName"></div>
            <div className="CompanyName">
              <span>Sale</span>
              <Switch
                checked={this.props.isHold}
                onChange={this.props.onSwichChange}
                // color="primary"
              />
              <span>Hold</span>
            </div>
          </div>
        ) : null}
        <div className="wrapper">
          <div className="CompanyName">{this.props.plan.provider_name}</div>
          <div className="CompanyName">
            {this.props.plan.is_internet ? "Internet" : null}{" "}
            {this.props.plan.is_tv ? "TV" : null}{" "}
            {this.props.plan.is_phone ? "Phone" : null}
          </div>
        </div>

        <button onClick={this.props.EditHandler} className="EditBtnStyle">
          <span>
            <EditIcon className="EditImg" />
          </span>
          Edit Selection
        </button>
      </div>
    );
  }
}

export default InsuranceCompanyCard;
