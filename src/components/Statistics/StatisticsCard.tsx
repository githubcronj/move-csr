import React, { Component } from "react";
import "./StatisticsCard.scss";

type initialProps = {
  statsNo?: string;
  statsHeading?: string;
};

type initialState = {};

export class StatisticsCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="AllStatisticsDiv">
        <div className="statsNo">{this.props.statsNo}</div>
        <div className="statsHeading">{this.props.statsHeading}</div>
      </div>
    );
  }
}

export default StatisticsCard;
