import React from "react";
import './objectionCard1.scss';





type initialProps = {

objection1 ? : string;

possibility ? : string;
selected ? : boolean;
onClick ? : any;

};

type initialState = {

};

class ObjectionCard1 extends React.Component<initialProps, initialState> {
    state: initialState = {

    };

    render() {
        return (
            <div className="objection-card-1"  style={{color:this.props.selected ? '#fff':'', background:this.props.selected ? '#465B74' : ''}} onClick={this.props.onClick}>

                <div className="objection-content-1">
                {this.props.objection1}
                </div>
                <div className="objection-content-2"   style={{color:this.props.selected ? '#fff':'', background:this.props.selected ? '#6EBBE2' : ''}}>
                    {
                        this.props.possibility
                    }
                    </div>
       

            </div>
        );
    }
}
export default ObjectionCard1;
