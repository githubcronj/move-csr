import React, { Component } from "react";
import MovingDateimg from "../../Assets/images/Leftcolumn/Date-Countdown.svg";
import MovingPathimg from "../../Assets/images/Leftcolumn/CalenderEvent.svg";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import CustomizedInput from "./CustomizedInput";
import "./MovingDate.scss";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

type initialProps = {
  Date: any;
  Days: any;
  clickedMovingDate: boolean;
  handleClickMovingDate: any;
  handleClickAwayMovingDate: any;
  handleChange: any;
  anchorEl: any;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export class MovingDate extends Component<initialProps> {
  render() {
    return (
      <div className="MovingComponent ">
        <div className="MovingDateComponent">
          <div className=" MovingIconHead">
            <div className="MovingIcon">
              <img src={MovingDateimg} />
            </div>
            <div className="SubHeading">Days To Move</div>
          </div>

          <div className="Heading">{this.props.Days}</div>
        </div>

        <div className="MovingDateComponent Moves">
          <div className=" MovingIconHead">
            <div className="MovingIcon">
              <img src={MovingPathimg} />{" "}
            </div>
            <div className="SubHeading">Moving Date</div>
          </div>

          <ClickAwayListener onClickAway={this.props.handleClickAwayMovingDate}>
            {this.props.clickedMovingDate ? (
              <div className="Heading">
                <div className="inputDiv">
                  {/* <CustomizedInput
                    label="Moving Date"
                    value={this.props.Date}
                    onChange={(e: any) =>
                      this.props.handleChange(e, "movingDate")
                    }
                    type="date"
                    className="CustomInput"
                  /> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      // variant="inline"
                      // ampm={true}
                      label="Select Date"
                      value={this.props.Date}
                      onChange={(e: any) =>
                        this.props.handleChange(e, "movingDate")
                      }
                      // hidden
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className="CustomDate"
                      disablePast
                      format="MM/dd/yyyy"
                      PopoverProps={{
                        disableRestoreFocus: true,
                        anchorEl: this.props.anchorEl,
                      }}
                      open={Boolean(this.props.anchorEl)}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            ) : (
              <div
                className="Heading"
                onClick={(e: any) => this.props.handleClickMovingDate(e)}
              >
                {this.props.Date
                  ? `${new Date(this.props.Date).getDate()} ${
                      monthNames[new Date(this.props.Date).getMonth()]
                    } ${new Date(this.props.Date).getFullYear()}`
                  : ""}
              </div>
            )}
          </ClickAwayListener>
        </div>
      </div>
    );
  }
}

export default MovingDate;
