import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./LeftColProgressBar.scss";

type initialProps = {
  totalUnit?: any;
  unitCount?: any;
};
export class LeftColProgressBar extends Component<initialProps> {
  render() {
    let percent: any =
      (parseInt(this.props.unitCount) / parseInt(this.props.totalUnit)) * 100;
    return (
      <div className="Progress-div">
        <div className="UnitText">Units Earned</div>
        <div className="ProgressWrap">
          <div className="progress-inner-div">
            <ProgressBar now={percent} className="progress-bar-left" />
          </div>
          <span className="numbers">{`${this.props.unitCount}/${this.props.totalUnit}`}</span>
        </div>
      </div>
    );
  }
}

export default LeftColProgressBar;
