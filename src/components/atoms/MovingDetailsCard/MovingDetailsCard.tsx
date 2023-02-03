import React, { Component } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MapImage from "../../../Assets/images/Leftcolumn/mapImg1.svg";
import "./MovingDetailsCard.scss";
// import AutoComplete from "../PlacesAutoComplete";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CreateIcon from "@material-ui/icons/Create";

type initialProps = {
  fromaddress: any;
  toaddress: any;
  handleSelectFromAddress?: any;
  handleSelectToAddress?: any;
  clickedFrom?: any;
  clickedTo?: any;
  handleClickTo?: any;
  handleClickFrom?: any;
  handleClickAway?: any;
  handleChange?: any;
  distance?: string;
  onEditClick?: any;
};

export class MovingDetailsCard extends Component<initialProps> {
  render() {
    return (
      // <ClickAwayListener onClickAway={this.props.handleClickAway}>
      <div className="movingDeatailsCard">
        <div className="FromAddressDiv ">
          <div className="fromText">
            moving from
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
          <div className="addressWrap">
            {/* {this.props.clickedFrom ? (
                <div className="fromaddress">
                  <div className="autoCompleteDiv">
                    <AutoComplete
                      className="input1-moveCard"
                      value={this.props.fromaddress}
                      onChange={(e: any) => {
                        this.props.handleChange(e, "fromaddress");
                      }}
                      onSelect={this.props.handleSelectFromAddress}
                      placeholder={this.props.fromaddress == "" ? "From" : ""}

                      // inputTitle="To"
                    />
                  </div>
                </div>
              ) : ( */}
            <div
              className="fromaddress"
              // onClick={this.props.handleClickFrom}
            >
              {this.props.fromaddress}
            </div>
            {/* )} */}
            <div className="ImageWrap">
              <img src={MapImage} />
              <div className="MapText">Maps</div>
            </div>
          </div>
          <div className="line"></div>
        </div>

        <div className="horizontalLine">
          <div className="centerButton">
            <ArrowForwardIcon className="ArrowIconStyle" />
            {`Distace ${this.props.distance} miles`}
          </div>
        </div>

        <div className="FromAddressDiv ">
          <div className="fromText">moving to</div>
          <div className="addressWrap">
            {/* {this.props.clickedTo ? (
                <div className="fromaddress">
                  <div className="autoCompleteDiv">
                    <AutoComplete
                      className="input1-moveCard"
                      value={this.props.toaddress}
                      onChange={(e: any) => {
                        this.props.handleChange(e, "toaddress");
                      }}
                      onSelect={this.props.handleSelectToAddress}
                      placeholder={this.props.toaddress == "" ? "To" : ""}

                      // inputTitle="To"
                    />
                  </div>
                </div>
              ) : ( */}
            <div
              className="fromaddress"
              // onClick={this.props.handleClickTo}
            >
              {this.props.toaddress}
            </div>
            {/* // )} */}

            <div className="ImageWrap">
              <img src={MapImage} />
              <div className="MapText">Maps</div>
            </div>
          </div>
          <div className="line2"></div>
        </div>
      </div>
      // </ClickAwayListener>
    );
  }
}

export default MovingDetailsCard;
