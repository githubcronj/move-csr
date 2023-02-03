import React, { Component } from "react";
import "./InsuranceSchedule.scss";
import CustomizedInput from "../atoms/CustomizedInput";
import Button from "../atoms/Button";

export class InsuranceSchedule extends Component {
  render() {
    return (
      <div className="InsuranceScheduleMain">
        <div className="label">PersonalDetails</div>
        <div className="InsuranceSchContent">
          <CustomizedInput
            onChange={() => console.log("change")}
            value={"100"}
          />

          <CustomizedInput
            onChange={() => console.log("change")}
            value={"100"}
          />
        </div>
        <div className="InsuranceSchContent">
          <CustomizedInput
            onChange={() => console.log("change")}
            value={"100"}
          />

          <CustomizedInput
            onChange={() => console.log("change")}
            value={"100"}
          />
        </div>
        <div className="InsuranceSchContent">
          <CustomizedInput
            onChange={() => console.log("change")}
            value={"100"}
          />
        </div>
        <div className="InsuranceSchContent">
          <Button>Save</Button>
        </div>
      </div>
    );
  }
}

export default InsuranceSchedule;
