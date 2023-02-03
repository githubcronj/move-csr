import React from "react";
import "./moversRatingCard.scss";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "../atoms/Button";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";

type initialProps = {
  logo?: any;
  title?: string;
  rate?: number;
  reviews?: number;
  phone?: any;
  address?: any;
  recommended?: boolean;
  tagText?: string;
  tagBackground?: any;
  selected?: boolean;
  onSelectClick?: any;
  grade?: string;
  content?: boolean;
  vanline?: string;
  distance?: number;
  buttonText?: string;
};

type initialState = {};

class MoversRatingCard extends React.Component<initialProps, initialState> {
  state: initialState = {};

  render() {
    return (
      <div
        className={
          this.props.content
            ? "movers-card-main"
            : "movers-card-main headChange"
        }
      >
        <div className="main-body-div">
          {this.props.content ? (
            <div className="tag-title-div">
              <div className="title-div">{this.props.title}</div>
            </div>
          ) : (
            <div className="headHeading  tag-title-div ">Name</div>
          )}
          {this.props.content ? (
            <div className="valineStyle valine">{this.props.vanline}</div>
          ) : (
            <div className="headHeading valine">VanLine</div>
          )}

          {this.props.content ? (
            <div className="rate">{this.props.rate}</div>
          ) : (
            <div className="headHeading ratewidth"> Google Rating</div>
          )}

          {this.props.content ? (
            <div className="distance valineStyle">{this.props.distance}</div>
          ) : (
            <div className="headHeading distance">Distance</div>
          )}
          {this.props.content ? (
            <div className="rate ">{this.props.grade}</div>
          ) : (
            <div className="headHeading ratewidth">Rating</div>
          )}

          {this.props.content ? (
            <div className="button-div">
              <Button
                className="mover-card-button"
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
                {this.props.buttonText
                  ? this.props.buttonText
                  : this.props.selected
                  ? "Selected"
                  : "Select"}
              </Button>
            </div>
          ) : (
            <div className="emptyClass"></div>
          )}
        </div>
      </div>
    );
  }
}
export default MoversRatingCard;
