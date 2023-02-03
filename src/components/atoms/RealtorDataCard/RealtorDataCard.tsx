import React, { Component } from "react";
import "./RealtorDataCard.scss";
import PersonIcon from "@material-ui/icons/Person";
import EmailImg from "../../../Assets/images/Leftcolumn/Email.svg";
import PhoneImg from "../../../Assets/images/Leftcolumn/Phone.svg";
import CopyImg from "../../../Assets/images/Leftcolumn/CopyImg.svg";

type initialProps = {
  Name: any;
  Email: any;
  Phone: any;
  image: any;
  RealtorCompanyName: any;
};

export class RealtorDataCard extends Component<initialProps> {
  copyfunc = () => {
    var copyText: any = document.getElementById("EmailTextRealtor")
      ? document.getElementById("EmailTextRealtor")
      : null;

    if (copyText !== null) {
      navigator.clipboard.writeText(copyText.textContent);
      navigator.clipboard.readText().then((result) => console.log(result));
      alert("Email is copied");
    }
  };

  render() {
    return (
      <div className="RealtorCardDiv">
        <div className="RealtorCard">
          <div className="RealtorData">
            <div>
              {this.props.image ? (
                <img src={this.props.image} className="RealtorImg" />
              ) : null}
            </div>
            <div className="RealtorInfoWrap">
              <span className="RealtorText">Realtor Data</span>
              <span className="RealtorCompanyName">
                {this.props.RealtorCompanyName}
              </span>
            </div>
          </div>

          <div className="AgentDetails">
            <div className="AgentText">Your Agent Details</div>
            <div className="AgentInfo">
              <div>
                <PersonIcon className="IconStyles" />
                <span className="NameStyle">{this.props.Name}</span>
              </div>
              <div>
                <img src={EmailImg} className="ImgStyles" />
                <span className="NameStyle" id="EmailTextRealtor">
                  {this.props.Email}
                </span>

                <button onClick={this.copyfunc} className="BtnStyle ">
                  Copy
                  <span>
                    <img src={CopyImg} className="copyImg" />
                  </span>
                </button>
              </div>
              {this.props.Phone ? (
                <div>
                  <img src={PhoneImg} className="ImgStyles" />
                  <span className="NameStyle">{this.props.Phone}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RealtorDataCard;
