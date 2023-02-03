import React from "react";
import './securityMainCard.scss';
import StarIcon from '@material-ui/icons/Star';
import Button from '../atoms/Button';
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


type initialProps = {

    title? : string;
    rateGiven? : any;
    rateTotal ? : any;
    price ? : any;
    onKnowMoreClick ? : any;
    contactParam ? :any;
    monitoringPrice ? : any;
    equipmentPrice ? : any;



};

type initialState = {

};

class SecurityMainCard extends React.Component<initialProps, initialState> {
    state: initialState = {

    };

    render() {
        return (
            <div className={`security-card-main`} >
                <div className="security-card-upper-div">

                    <div className="security-card-title-div">{this.props.title}</div>
                 <div className="security-card-rate-outer">
                 <div className="security-card-rating-div">
                       
                       <div className="star">
                               <StarIcon  style={{
                                   color:"#F4AE33"
                               }}/>

                           </div>
                     
                       <div className="security-card-rate">
                       <span className="rate-given">{this.props.rateGiven}</span><span className="rate-total">/{this.props.rateTotal}</span>
                       </div>
                   </div>
                 </div>
                    <div className="security-card-price-div">
                        <div className="upper-price">
                            <div className="currency">$</div>
                           <div className="price"> {this.props.price}</div>
                            <div className="currency">99</div>
                        </div>
                        <div className="lower-plan">/mo. for 12 months</div>
                    </div>


                </div>

                <div className="security-card-line-div">

                </div>

                <div className="security-card-lower-div">
                    <div className="lower-div-small">
                        <div className="heading-info">
                            <div className="lower-heading">CONTRACT</div>
                            <div className="lower-info">
                                <InfoOutlinedIcon  style={{
                                    color:'#52BDE6',
                                    height:'15px',
                                    width:'15px'
                                    
                                }}/>
                            </div>

                        </div>
                        <div className="contract-param">{this.props.contactParam}</div>
                    </div>
                    <div className="lower-div-small">
                    <div className="heading-info">
                    <div className="lower-heading">MONITORING STARTS AT</div>
                            <div className="lower-info">
                                <InfoOutlinedIcon  style={{
                                    color:'#52BDE6',
                                    height:'15px',
                                    width:'15px'
                                }}/>
                            </div>
                    </div>
                        <div className="monitoring"><sup className="sup">$</sup>{this.props.monitoringPrice}<span className="month">/mo.</span><sup className="sup">99</sup></div>
                    </div>
                    <div className="lower-div-small">
                    <div className="heading-info">
                    <div className="lower-heading">EQUIPMENT STARTS AT</div>
                            <div className="lower-info">
                                <InfoOutlinedIcon  style={{
                                     color:'#52BDE6',
                                     height:'15px',
                                     width:'15px'
                                }}/>
                            </div>
                    </div>
                        <div className="equipment"><sup className="sup">$</sup>{this.props.equipmentPrice}<sup className="sup">99</sup></div>
                    </div>
                    <div className="lower-div-button-small">
                    <Button className="security-card-button"  
        
            startLogo={

                <ArrowForwardRoundedIcon />
             
            }
            onClick={this.props.onKnowMoreClick} >
                  Know More
              </Button>
                    </div>
                </div>




            </div>
        );
    }
}
export default SecurityMainCard;
