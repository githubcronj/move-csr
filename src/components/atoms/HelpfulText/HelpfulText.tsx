import React from "react";
import "./helpfulText.scss";
import bulb from "../../../Assets/images/Bulb.svg";
import ClearIcon from "@material-ui/icons/Clear";

type initialProps = {
  className?: any;
  heading?: any;
  para?: any;
  handleHelpClose?: any;
};

type initialState = {};

class HelpfulText extends React.Component<initialProps, initialState> {
  state: initialState = {};

  render() {
    return (
      <div className={`helpful-main`}>
        <div className="bulb-div">
          <img src={bulb} />
        </div>
        <div className="content-div">
          <div className="heading-cross-div">
            <div className="heading-help">{this.props.heading}</div>
            <div className="cross-help" onClick={this.props.handleHelpClose}>
              <ClearIcon
                style={{
                  color: "red",
                  height: "15px",
                  width: "15px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          <div
            className="para-help"
            dangerouslySetInnerHTML={{
              __html: this.props.para,
            }}
          >
            {/* {this.props.para} */}
          </div>
        </div>
      </div>
    );
  }
}
export default HelpfulText;
