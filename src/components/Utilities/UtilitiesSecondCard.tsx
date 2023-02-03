import React from "react";
import "./utilitiesSecondCard.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "../../components/atoms/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

type initialProps = {
  logo?: any;
  title?: string;
  phone?: any;
  subTitle?: any;
  isLaunch?: boolean;
  onLaunch?: any;
};

type initialState = {};

class UtilitiesSecondCard extends React.Component<initialProps, initialState> {
  state: initialState = {};

  render() {
    return (
      <div className={`second-card-main`}>
        <div className="main-body-second">
          <div className="tag-title-second">
            <div className="logo-div-second">
              <img src={this.props.logo} alt="logo" className="logo-second" />
            </div>

            <div className="title-second">{this.props.title}</div>

            <div className="sub-title-second">{this.props.subTitle}</div>
          </div>

          <div className="phone-second">
            <div className="phone-icon-second">
              <PhoneIcon />
            </div>
            <div className="phone-number-second">{this.props.phone}</div>
          </div>
        </div>

        {this.props.isLaunch ? (
          <Button
            onClick={this.props.onLaunch}
            className="LanchButton"
            startLogo={<ArrowForwardIcon />}
          >
            Launch
          </Button>
        ) : null}
      </div>
    );
  }
}
export default UtilitiesSecondCard;
