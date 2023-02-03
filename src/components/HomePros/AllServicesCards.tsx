import React, { Component } from "react";
import "./AllServicesCards.scss";

import Checkicon from "../../Assets/images/HomePros/Checkicon.svg";
import UnCheckicon from "../../Assets/images/HomePros/uncheckicon.svg";

type initialProps = {
  iconCheck?: boolean;
  onClick?: any;
  servicestypes: string;
};

type initialState = {};

export class AllServicesCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="AllServicesDiv">
        <div
          className={
            this.props.iconCheck
              ? "AllServiceCardDiv Selected  "
              : "AllServiceCardDiv"
          }
          // className="AllServiceCardDiv"
          onClick={this.props.onClick}
          // style={{
          //   border: this.props.onClick ? "1px solid #408867" : "1px solid #fff",
          // }}
        >
          <div className="AllServiceContentMain">
            <div className="checkBox">
              {this.props.iconCheck ? (
                <img src={Checkicon} />
              ) : (
                <img src={UnCheckicon} />
              )}
            </div>

            <div className="AllServiceContent">{this.props.servicestypes}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllServicesCard;
