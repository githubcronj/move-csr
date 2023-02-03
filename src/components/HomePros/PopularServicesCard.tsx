import React, { Component } from "react";
import "./PopularServicesCard.scss";
import vector from "../../Assets/images/HomePros/Vector.svg";

type initialProps = {
  serviceimg?: any;
  selected?: boolean;
  onSelectValue?: any;
  name?: string;
};

type initialState = {};

export class PopularServicesCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="PopularServicesDiv">
        <div
          className={
            this.props.selected
              ? "PopularServicesCard Selected  "
              : "PopularServicesCard"
          }
          onClick={this.props.onSelectValue}
        >
          {this.props.selected ? (
            <img className="checkBox" src={vector}></img>
          ) : null}
          <img className="imagevalue" src={this.props.serviceimg}></img>
          <div>{this.props.name}</div>
        </div>
      </div>
    );
  }
}

export default PopularServicesCard;
