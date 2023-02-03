import React, { Component } from "react";
import "./CustomerDetails.scss";
import EditImg from "../../../Assets/images/Leftcolumn/CopyImg.svg";
import CallImg from "../../../Assets/images/Leftcolumn/CallImg.svg";
import SMSImg from "../../../Assets/images/Leftcolumn/SMSImg.svg";
import CalendarImg from "../../../Assets/images/Leftcolumn/CalendarImg.svg";
import FollowImg from "../../../Assets/images/Leftcolumn/FollowImg.svg";
// import TagImg from "../../../Assets/images/Leftcolumn/TagImg.svg";
import WarmTransferImg from "../../../Assets/images/Leftcolumn/warmTransfer.svg";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import CustomizedInput from "../CustomizedInput";
import EmailImg from "../../../Assets/images/Leftcolumn/Email.svg";
import PhoneImg from "../../../Assets/images/Leftcolumn/Phone.svg";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreateIcon from "@material-ui/icons/Create";

type initialProps = {
  CustomerCheckInDate: any;
  CustomerEmail: any;
  CustomerPhone: any;
  CustomerName: any;
  fullName: string;
  // clickedName: boolean;
  // handleClickName: any;
  // handleClickAwayName: any;
  handleChange: any;
  onClickPhone?: any;
  onClickSms?: any;
  onEditClick?: any;
};

export class Customerdetails extends Component<initialProps> {
  copyfunc = () => {
    var copyText: any = document.getElementById("EmailText")
      ? document.getElementById("EmailText")
      : null;

    if (copyText !== null) {
      console.log(navigator.clipboard);
      navigator &&
        navigator.clipboard &&
        navigator.clipboard
          .writeText(copyText.textContent)
          .then(() => alert("Email is copied "));

      navigator &&
        navigator.clipboard &&
        navigator.clipboard.readText().then((result) => console.log(result));
    }
  };
  render() {
    return (
      <div className="CustomerDetails">
        {/* <ClickAwayListener onClickAway={this.props.handleClickAwayName}> */}
        {/* {this.props.clickedName ? (
            <div className="CustomerOverview">
              <div className="inputDiv">
                <CustomizedInput
                  label="Customer Name"
                  value={this.props.fullName}
                  onChange={(e: any) => this.props.handleChange(e, "fullName")}
                  className="CustomInput"
                />
              </div>
            </div>
          ) : ( */}
        <div className="CustomerOverview">
          {`${this.props.CustomerName}’s Overview`}
          <span>
            <div
              onClick={(e: any) => this.props.onEditClick()}
              className="EditBtnStyle "
            >
              edit
              <span>
                {/* <img src={EditImg} className="EditImg" /> */}
                <CreateIcon className="EditImg" />
              </span>
            </div>
          </span>
        </div>
        {/* )} */}
        {/* </ClickAwayListener> */}

        <div className="Icons">
          <div
            className="iconTextDiv"
            id="phone"
            onClick={() => {
              if (this.props.CustomerPhone && this.props.CustomerPhone !== "") {
                this.props.onClickPhone();
              }
            }}
            style={{
              cursor:
                this.props.CustomerPhone && this.props.CustomerPhone !== ""
                  ? "pointer"
                  : "default",
              opacity:
                this.props.CustomerPhone && this.props.CustomerPhone !== ""
                  ? "1"
                  : "0.5",
            }}
          >
            <img src={CallImg} className="IconImg" />
            <div className="IconText">Call</div>
          </div>
          <div
            className="iconTextDiv"
            id="sms"
            onClick={() => {
              if (this.props.CustomerPhone && this.props.CustomerPhone !== "") {
                this.props.onClickSms();
              }
            }}
            style={{
              cursor:
                this.props.CustomerPhone && this.props.CustomerPhone !== ""
                  ? "pointer"
                  : "default",
              opacity:
                this.props.CustomerPhone && this.props.CustomerPhone !== ""
                  ? "1"
                  : "0.5",
            }}
          >
            <img src={SMSImg} className="IconImg" />
            <div className="IconText">SMS</div>
          </div>
          <div className="iconTextDiv">
            <img src={CalendarImg} className="IconImg" />
            <div className="IconText">Calendar</div>
          </div>
          <div className="iconTextDiv">
            <img src={FollowImg} className="IconImg" />
            <div className="IconText">Follow-Up</div>
          </div>
          {/* <div>
            <img src={TagImg} className="IconImg" />
            <div className="IconText">tag</div>
          </div> */}
          <div className="iconTextDiv">
            <img src={WarmTransferImg} className="IconImg" />
            <div className="IconText">Warm Transfer</div>
          </div>
        </div>
        <div className="hLine"></div>
        <div className="AgentInfo">
          <div>
            <AccessTimeIcon className="IconStyles" />
            <span className="NameStyle">{this.props.CustomerCheckInDate}</span>
          </div>
          <div>
            <img src={EmailImg} className="ImgStyles" />
            <span className="NameStyle" id="EmailText">
              {this.props.CustomerEmail}
            </span>

            <button onClick={this.copyfunc} className="BtnStyle ">
              Copy
              <span>
                <img src={EditImg} className="copyImg" />
              </span>
            </button>
          </div>
          <div
            onClick={() => {
              if (this.props.CustomerPhone && this.props.CustomerPhone !== "") {
                this.props.onClickPhone();
              }
            }}
            style={{
              cursor:
                this.props.CustomerPhone && this.props.CustomerPhone !== ""
                  ? "pointer"
                  : "default",
            }}
          >
            <img src={PhoneImg} className="ImgStyles" />
            <span className="NameStyle">{this.props.CustomerPhone}</span>
          </div>
        </div>
        <div className="hLine"></div>
      </div>
    );
  }
}

export default Customerdetails;
