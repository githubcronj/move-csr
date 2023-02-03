import React from "react";
import './smallMoverCard.scss';
import PhoneIcon from '@material-ui/icons/Phone';




type initialProps = {
logo ? : any
title ? : string
phone ? : any
emailStatus ? : any


};

type initialState = {

};

class SmallMoverCard extends React.Component<initialProps, initialState> {
    state: initialState = {

    };

    render() {
        return (
            <div className={`small-card-main`} >
                <div className="main-body-small" >
                    <div className="tag-title-small">

                        {/* <div className="logo-div-small">

                            <img src={this.props.logo} alt="logo" className="logo-small" />

                        </div> */}

                        <div className="title-small">

                            {this.props.title}

                        </div>

                    </div>


        

                        <div className="phone-small">
                            <div className="phone-icon-small"><PhoneIcon /></div>
                            <div className="phone-number-small">{this.props.phone}</div>
                        </div>

                     {
                         this.props.emailStatus ?    <div className="email-small">
                         <div className="email-status-heading">Email Status :</div>
                         <div className="email-status">{this.props.emailStatus}</div>
                     </div> : null
                     }
                   


                </div>




            </div>
        );
    }
}
export default SmallMoverCard;
