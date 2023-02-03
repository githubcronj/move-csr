import React from "react";
import Button from './Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


type initialProps = {
heading ? : any,
content ? : any,
className ? : any
};

type initialState = {

};

class HelpDeskCard extends React.Component<initialProps, initialState> {
  state: initialState = {

  };

  render() {
    return (
      <div className={this.props.className}>
          <div className="heading-card">{this.props.heading}</div>
          <div className="content-card">{this.props.content}</div>
          <div className="button-div-card">
              <Button className="help-card-button" startLogo={<ArrowRightAltIcon />} >
                  See More
              </Button>


          </div>

      </div>
    );
  }
}
export default HelpDeskCard;
