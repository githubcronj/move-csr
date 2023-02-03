import React from "react";
import './objectionCard2.scss';
import Button from '../atoms/Button';
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";





type initialProps = {

objection2 ? : string;
selected ? : boolean;
onSelectClick ? : any;

};

type initialState = {

};

class ObjectionCard2 extends React.Component<initialProps, initialState> {
    state: initialState = {

    };

    render() {
        return (
            <div className="objection-card-2"  style={{color:this.props.selected ? '#fff':'', background:this.props.selected ? '#465B74' : ''}} >

                <div className="objection-content-1">
                {this.props.objection2}
                </div>
                <div className="objection-content-2"  >
                <Button className="objection-card-button"   backgroundColor={this.props.selected ?  "#6EBBE2" : "#ECF7FB" }
            color={this.props.selected ?  "#fff" : "#3C7084" }
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
export default ObjectionCard2;
