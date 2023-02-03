import React, { Component } from "react";
import "./SecurityPersonalised.scss";
import Button from "../atoms/Button";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

type initialProps = {
  companyLogo: any;
  companyTitle?: string;
  trophyLogo?: any;
  trophyText?: any;
  monitoring: any;
  internetSpeed: number;
  internetSpeedUnit: any;
  tvChannels: any;
  tvChannelsNumber: any;
  contract: any;
  contractMonth: any;
  perMonth: any;
  perMonthPower: any;
  BuyNowHandler: any;
  ViewDetailsHandler: any;
  Communications: any;
  selected?: boolean;
};
type initialState = {};

export class SecurityPersonalised extends Component<
  initialProps,
  initialState
> {
  render() {
    return (
      <div className="SecurityPersonalisedMain">
        {/* <div className="SecurityBorderLine"></div> */}

        <div className="PersonalisedMonitor">
          <div className="MonitorStyling">
            <div className="PersonalisedLogoButton">
              <div className="title-logo-wrapper">
                <div className="Personalisedlogos">
                  <img src={this.props.companyLogo} />
                </div>
                <div className="main-title">{this.props.companyTitle}</div>
              </div>
              {this.props.trophyText && this.props.trophyLogo ? (
                <div className="PersonalisedlogosText">
                  <img src={this.props.trophyLogo}></img>
                  <span>{this.props.trophyText}</span>
                </div>
              ) : null}
              <div className="PersonalisedCommunication">
                {this.props.Communications.map((item: any) => {
                  return <div className="top-labels">{item.icon}</div>;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="PersonalisedContent">
          <div className="PersonalisedMonitor">
            <div className="MonitorStyling">
              {this.props.monitoring}
              <span>
                <ErrorOutlineIcon className="detailsIcon" />
              </span>
            </div>
            <div className="MonthlyCost">
              {this.props.internetSpeed > 0 ? this.props.internetSpeed : "NA"}
              {this.props.internetSpeed > 0 ? (
                <span className="UnitOf">{this.props.internetSpeedUnit}</span>
              ) : null}
            </div>
          </div>
          <div className="PersonalisedMonitor">
            <div className="MonitorStyling">
              {this.props.tvChannels}
              <span>
                <ErrorOutlineIcon className="detailsIcon" />
              </span>
            </div>
            <div className="MonthlyCost">
              {this.props.tvChannelsNumber > 0
                ? this.props.tvChannelsNumber
                : "NA"}
            </div>
          </div>

          {/* <div className="PersonalisedMonitor">
            <div className="MonitorStyling">
              {this.props.contract}
              <span>
                <ErrorOutlineIcon className="detailsIcon" />
              </span>
            </div>
            <div className="MonthlyCost">{this.props.contractMonth}</div>
          </div> */}
          <div className="PersonalisedMonitor">
            <div className="MonthlyCostLast">
              <span className="Dollar">$</span>
              <span className="PriceMoney">{this.props.perMonth}</span>
              <div className="MonthWrapper">
                <div className="Value">{this.props.perMonthPower}</div>
                <div></div>
              </div>
            </div>
            <div className="MonitorUnits">/mo. for 12 months</div>
          </div>
          <div className="PersonalisedMonitor">
            <div className="MonitorStyling">
              <div className="PlanButton">
                <Button
                  onClick={this.props.BuyNowHandler}
                  startLogo={
                    this.props.selected ? (
                      <CheckCircleOutlineRoundedIcon />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  backgroundColor={this.props.selected ? "#5CBD9D" : "#273E59"}
                >
                  {this.props.selected ? "Selected" : "Select"}
                </Button>
                <div className="PersonalisedCommunicationLinks">
                  {/* <div
                    className="PersonalisedLink"
                    onClick={this.props.ViewDetailsHandler}
                  >
                    View Details
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="BorderLine"></div>
      </div>
    );
  }
}

export default SecurityPersonalised;
