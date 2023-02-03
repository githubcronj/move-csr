import React from "react";
import "./summaryFirstCard.scss";
import CreateIcon from "@material-ui/icons/Create";
import CustomizedInput from "../atoms/CustomizedInput";

type initialProps = {
  name?: string;
  email?: string;
  amount?: any;
  time?: any;
  timeAmountDisabled?: any;
};

type initialState = {
  clicked1: boolean;
  clicked2: boolean;
};

class SummaryFirstCard extends React.Component<initialProps, initialState> {
  state: initialState = {
    clicked1: false,
    clicked2: false,
  };

  render() {
    return (
      <div className={`main-summary-card`}>
        <div
          className="summary-name"
          style={{ width: this.props.timeAmountDisabled ? "50%" : "25%" }}
        >
          <div className="name-heading">CUSTOMERS'S NAME</div>
          {this.state.clicked1 == false ? (
            <div className="name-value">{this.props.name}</div>
          ) : (
            <CustomizedInput value={this.props.name} className="custom" />
          )}
          <div className="edit-button">
            <div
              className="edit-text"
              onClick={() => {
                this.setState({ clicked1: !this.state.clicked1 });
              }}
            >
              Edit
            </div>
            <div className="create-icon">
              <CreateIcon
                style={{ color: "#fff", height: "15px", width: "15px" }}
              />
            </div>
          </div>
        </div>
        <div
          className="summary-email"
          style={{ width: this.props.timeAmountDisabled ? "55%" : "35%" }}
        >
          <div className="email-heading">EMAIL ADDRESS</div>
          {this.state.clicked2 == false ? (
            <div className="email-value">{this.props.email}</div>
          ) : (
            <CustomizedInput value={this.props.email} className="custom" />
          )}
          <div className="edit-button">
            <div
              className="edit-text"
              onClick={() => {
                this.setState({ clicked2: !this.state.clicked2 });
              }}
            >
              Edit
            </div>
            <div className="create-icon">
              <CreateIcon
                style={{ color: "#fff", height: "15px", width: "15px" }}
              />
            </div>
          </div>
        </div>
        {this.props.timeAmountDisabled ? null : (
          <div className="summary-time-saved">
            <div className="time-saved-heading">TIME SAVED</div>
            <div className="time-saved-value">{this.props.time}</div>
          </div>
        )}
        {this.props.timeAmountDisabled ? null : (
          <div className="summary-amount-saved">
            <div className="amount-saved-heading">AMOUNT SAVED</div>
            <div className="amount-saved-value">{this.props.amount}</div>
          </div>
        )}
      </div>
    );
  }
}
export default SummaryFirstCard;
