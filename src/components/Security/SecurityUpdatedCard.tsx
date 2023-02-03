import React from "react";
import './securityUpdatedCard.scss';
import Button from '../atoms/Button';
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";




type initialProps = {
    Price ? : any;
    logo ? : any;
    title ? : any;
    planType ? : any;
    onSelectClick ? : any;
    selected ? : any


};

type initialState = {

};

class SecurityUpdatedCard extends React.Component<initialProps, initialState> {
    state: initialState = {

    };

    render() {
        return (

            <div className="updated-card-main">

                <div className="updated-logo-heading">
                    <div className="updated-logo">
                       <div className="logo-div">
                       <img src={this.props.logo} width="100%" height="100%"  />
                       </div>
                    </div>
                    <div className="updated-heading">{this.props.title}</div>
                </div>
                <div className="updated-plan-type">
                    <div className="updated-plan-name">{this.props.planType}</div>
                    <div className="updated-plan">Plan</div>
                </div>
                <div className="updated-rate">
                <div className="monitoring"><sup className="sup">$</sup>{this.props.Price}<sup className="sup">99</sup></div>
                <div className="month">/mo. for 12 months</div>
                </div>
                <div className="updated-button">
                <Button className="security-card-button"  
         backgroundColor={this.props.selected ? "#408867" : "#415B76"}
        startLogo={
            this.props.selected ? (
              <CheckCircleOutlineRoundedIcon />
            ) : (
              <ArrowForwardRoundedIcon />
            )
          }
        onClick={this.props.onSelectClick} >
             {this.props.selected ? "Selected" : "Select"}
          </Button>
                </div>
            </div>
        


        );
    }
}
export default SecurityUpdatedCard;
