import React from "react";
import "./Electricity.scss";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "../atoms/Button";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

type initialProps = {
  logo?: any;
  title?: string;

  selected?: boolean;
  onSelectClick?: any;

  KwhValue?: number;
  contractTermValue?: number;
  cancelationFee?: number;
};

type initialState = {};

class ElectricityCard extends React.Component<initialProps, initialState> {
  state: initialState = {};

  render() {
    return (
      <div className={`electricity-card-main`}>
        <div className="main-body-div-electricity">
          <div className="tag-title-div-electricity">
            <div className="logo-div-electricity">
              <img src={this.props.logo} className="logo" />
            </div>

            <div className="title-div-electricity">{this.props.title}</div>
          </div>

          <div className="rating-reviews-div-electricity">
            <div className="perKwhValue">{this.props.KwhValue}</div>
            <div className="perKwh">
              per kWH <InfoOutlinedIcon />
            </div>
          </div>

          <div className="tag-div-elec">
            <div className="perKwhValue">
              {this.props.contractTermValue}
              <span className="contract margin-dollar-left">Month</span>
            </div>
            <div className="perKwh">
              Contract term
              <InfoOutlinedIcon />
            </div>
          </div>
          <div className="tag-div-elec">
            <div className="perKwhValue">
              <span className="contract margin-dollar">$</span>
              {this.props.cancelationFee}
            </div>
            <div className="perKwh">
              Cancellation Fee <InfoOutlinedIcon />
            </div>
          </div>

          <div className="button-div">
            <Button
              className="energy-card-button"
              backgroundColor={this.props.selected ? "#408867" : "#415B76"}
              color={this.props.selected ? "#FFFFFF" : "#fff"}
              startLogo={
                this.props.selected ? (
                  <CheckCircleOutlineRoundedIcon />
                ) : (
                  <ArrowForwardRoundedIcon />
                )
              }
              onClick={this.props.onSelectClick}
            >
              {this.props.selected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ElectricityCard;
