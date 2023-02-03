import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RealtorDataCard from "../atoms/RealtorDataCard/RealtorDataCard";
import MovingDate from "../atoms/MovingDate";
import RealtorImg from "../../Assets/images/Leftcolumn/Realtor.svg";
import MovingDetailsCard from "../atoms/MovingDetailsCard/MovingDetailsCard";
import "./LeftPanel.scss";
import CustomerNotes from "../atoms/CustomerNotes/CustomerNotes";
import LeftColProgressBar from "../atoms/LeftColProgressBar";
import CustomerDetails from "../atoms/CustomerDetails/CustomerDetails";
import { geocodeByAddress } from "react-places-autocomplete";
import * as CommonAction from "../../store/common/actions";
import CreateIcon from "@material-ui/icons/Create";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
// import Ellipse from "../../Assets/images/Leftcolumn/Ellipse 148.svg";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// import EditImg from "../../Assets/images/Leftcolumn/Edit-Tag.svg";

type initialProps = {
  move?: any;
  commonAction: any;
  commonState: any;
  onEditClick?: any;
};

type initialState = {
  moveId: string;
  movingDate: any;
  movingDays: any;
  fromAddress: string;
  toAddress: string;
  realtorName: string;
  realtorEmail: string;
  realtorPhone: string;
  realtorCompanyName: string;
  realtorImg: any;
  email: string;
  phone: string;
  name: string;
  checkInDate: string;
  customerDetails: any;
  sourceStreet: string;
  fromPin: string;
  clicked1: boolean;
  destinationStreet: string;
  toPin: string;
  clicked2: boolean;
  isGetMove: boolean;
  clickedMovingDate: boolean;
  // clickedName: boolean;
  fullName: string;
  distance: any;
  unitCount: any;
  totalUnit: string;
  anchorEl: any;
  secondaryName: string;
  secondaryPhone: string;
  secondaryEmail: string;
};

export class LeftPanel extends Component<initialProps, initialState> {
  state: initialState = {
    moveId: "",
    movingDate: null,
    movingDays: "0",
    fromAddress: "",
    toAddress: "",
    realtorName: "",
    realtorEmail: "",
    realtorPhone: "",
    realtorCompanyName: "",
    realtorImg: "",
    email: "",
    phone: "",
    name: "",
    checkInDate: "",
    customerDetails: {
      day: "",
      date: "",
      notes: "",
    },
    sourceStreet: "",
    fromPin: "",
    clicked1: false,
    destinationStreet: "",
    toPin: "",
    clicked2: false,
    isGetMove: true,
    clickedMovingDate: false,
    // clickedName: false,
    fullName: "",
    distance: "",
    unitCount: "0",
    totalUnit: "12",
    anchorEl: null,
    secondaryName: "",
    secondaryPhone: "",
    secondaryEmail: "",
  };
  componentDidMount() {
    if (this.props && this.props.move && this.props.move[0]) {
      let move = this.props.move[0];
      this.setState({
        movingDate: new Date(move.moving_date).toISOString(),
        movingDays: (
          (new Date(move.moving_date).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
        ).toFixed(),
        moveId: move.id,
        fromAddress: move.source_full_address,
        toAddress: move.destination_full_address,
        realtorName: move.realtor.contact_name,
        realtorEmail: move.realtor.email,
        realtorPhone: move.realtor.phone,
        realtorCompanyName: move.realtor.moveeasy_brokerage_name,
        realtorImg: move.realtor.logo,
        email: move.user_ref.email,
        phone: move.user_ref.phone,
        name: move.user_ref.first_name,
        fullName: `${move.user_ref.first_name} ${move.user_ref.last_name}`,
        checkInDate: "",
        distance: parseInt(move.source_destination_distance),
        customerDetails: {
          day: "",
          date: "",
          notes: "",
        },
        secondaryName: move.secondary_name ? move.secondary_name : "",
        secondaryPhone: move.secondary_phone ? move.secondary_phone : "",
        secondaryEmail: move.secondary_email ? move.secondary_email : "",
      });
      const payload = {
        service: "",
        moveId: move.id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    if (prev.order !== cur.order && cur.order) {
      this.setState({
        unitCount: cur.order.length ? cur.order.length.toString() : "0",
      });
    }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      let move = this.props.commonState.move[0];
      this.setState({
        movingDate: new Date(move.moving_date).toISOString(),
        movingDays: (
          (new Date(move.moving_date).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
        ).toFixed(),
        moveId: move.id,
        fromAddress: move.source_full_address,
        toAddress: move.destination_full_address,
        realtorName: move.realtor.contact_name,
        realtorEmail: move.realtor.email,
        realtorPhone: move.realtor.phone,
        realtorCompanyName: move.realtor.moveeasy_brokerage_name,
        realtorImg: move.realtor.logo,
        email: move.user_ref.email,
        phone: move.user_ref.phone,
        name: move.user_ref.first_name,
        // nextProps.commonState.isGetMove: false,
        fullName: `${move.user_ref.first_name} ${move.user_ref.last_name}`,
        distance: parseInt(move.source_destination_distance),
        isGetMove: false,
        secondaryName: move.secondary_name ? move.secondary_name : "",
        secondaryPhone: move.secondary_phone ? move.secondary_phone : "",
        secondaryEmail: move.secondary_email ? move.secondary_email : "",
      });
      const payload = {
        service: "",
        moveId: move.id,
      };
      this.props.commonAction.orderGet(payload);
    }
  }

  public static getDerivedStateFromProps(nextProps: any, currentState: any) {
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   currentState.isGetMove
    // ) {
    //   let move = nextProps.commonState.move[0];
    //   currentState.movingDate = new Date(move.moving_date).toISOString();
    //   currentState.movingDays = (
    //     (new Date(move.moving_date).getTime() - new Date().getTime()) /
    //     (1000 * 3600 * 24)
    //   ).toFixed();
    //   currentState.moveId = move.id;
    //   currentState.fromAddress = move.source_full_address;
    //   currentState.toAddress = move.destination_full_address;
    //   currentState.realtorName = move.realtor.contact_name;
    //   currentState.realtorEmail = move.realtor.email;
    //   currentState.realtorPhone = move.realtor.phone;
    //   currentState.realtorCompanyName = move.realtor.moveeasy_brokerage_name;
    //   currentState.realtorImg = move.realtor.logo;
    //   currentState.email = move.user_ref.email;
    //   currentState.phone = move.user_ref.phone;
    //   currentState.name = move.user_ref.first_name;
    //   // nextProps.commonState.isGetMove = false;
    //   currentState.fullName = `${move.user_ref.first_name} ${move.user_ref.last_name}`;
    //   currentState.distance = parseInt(move.source_destination_distance);
    //   currentState.isGetMove = false;
    //   const payload = {
    //     service: "",
    //     moveId: move.id,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isMoveAddressUpdate &&
      nextProps.commonState.moveAddressUpdate
    ) {
      nextProps.commonState.isMoveAddressUpdate = false;
      nextProps.commonAction.moveGet();
      currentState.clickedMovingDate = false;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      currentState.unitCount = nextProps.commonState.order.length
        ? nextProps.commonState.order.length.toString()
        : "0";
    }

    return currentState;
  }

  handleSelectFromAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results) => {
        // this.setState({ address: results[0].formatted_address });
        let city: any = "",
          state: any = "",
          zip: any = "",
          country: any = "",
          route: any = "",
          streetNumber: any = "";

        results &&
          results[0] &&
          results[0].address_components &&
          results[0].address_components.map((el) => {
            state = el.types.includes("administrative_area_level_1")
              ? el.short_name
              : state;
            zip = el.types.includes("postal_code") ? el.short_name : zip;
            city = el.types.includes("locality")
              ? el.long_name
              : el.types.includes("sublocality")
              ? el.long_name
              : city;
            streetNumber = el.types.includes("street_number")
              ? el.short_name
              : streetNumber;
            route = el.types.includes("route") ? el.short_name : route;
            country = el.types.includes("country") ? el.short_name : country;
          });
        if (country === "USA" || country === "US") {
          this.setState({
            sourceStreet: `${streetNumber} ${route}, ${city}, ${state}, ${zip} `,
            fromAddress: `${streetNumber} ${route} ${city} ${state} `,
            fromPin: zip,
            clicked1: false,
          });
        }
        if (
          (country === "USA" || country === "US") &&
          // state &&
          // city &&
          // zip &&
          // streetNumber &&
          // route &&
          this.state.moveId
        ) {
          this.props.commonAction.moveAddressUpdate({
            source_detail: `${streetNumber} ${route}, ${city}, ${state}, ${zip}`,
            move_id: this.state.moveId,
          });
        }
      })
      .catch((error) => console.error("error", error));
  };

  handleSelectToAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results) => {
        // this.setState({ address: results[0].formatted_address });
        let city: any = "",
          state: any = "",
          zip: any = "",
          country: any = "",
          route: any = "",
          streetNumber: any = "";

        results &&
          results[0] &&
          results[0].address_components &&
          results[0].address_components.map((el) => {
            state = el.types.includes("administrative_area_level_1")
              ? el.short_name
              : state;
            zip = el.types.includes("postal_code") ? el.short_name : zip;
            city = el.types.includes("locality")
              ? el.long_name
              : el.types.includes("sublocality")
              ? el.long_name
              : city;
            streetNumber = el.types.includes("street_number")
              ? el.short_name
              : streetNumber;
            route = el.types.includes("route") ? el.short_name : route;
            country = el.types.includes("country") ? el.short_name : country;
          });
        if (country === "USA" || country === "US") {
          this.setState({
            destinationStreet: `${streetNumber} ${route}, ${city}, ${state}, ${zip} `,
            toAddress: `${streetNumber} ${route} ${city} ${state} `,
            toPin: zip,
            clicked2: false,
          });
        }
        if (
          (country === "USA" || country === "US") &&
          // state &&
          // city &&
          // zip &&
          // streetNumber &&
          // route &&
          this.state.moveId
        ) {
          this.props.commonAction.moveAddressUpdate({
            destination_detail: `${streetNumber} ${route}, ${city}, ${state}, ${zip}`,
            move_id: this.state.moveId,
          });
        }
      })
      .catch((error) => console.error("error", error));
  };

  handleClickTo = () => {
    this.setState({ clicked2: true, clicked1: false });
  };
  handleClickFrom = () => {
    this.setState({ clicked1: true, clicked2: false });
  };

  handleClickMovingDate = (e: any) => {
    this.setState({ clickedMovingDate: true, anchorEl: e.currentTarget });
  };

  handleClickAwayMovingDate = () => {
    this.setState({
      clickedMovingDate: false,
    });
  };
  // handleClickName = () => {
  //   this.setState({ clickedName: true });
  // };

  // handleClickAwayName = () => {
  //   this.setState({
  //     clickedName: false,
  //   });
  // };

  handleClickAway = () => {
    this.setState({
      clicked1: false,
      clicked2: false,
    });
  };

  handleChange = (e: any, name: string) => {
    if (name === "toaddress") {
      this.setState({ toAddress: e });
    } else if (name === "fromaddress") {
      this.setState({ fromAddress: e });
    } else if (name === "movingDate") {
      this.setState({
        movingDate: new Date(e).toISOString(),
        clickedMovingDate: false,
      });
      if (this.state.moveId) {
        this.props.commonAction.moveAddressUpdate({
          moving_date: new Date(e).toISOString().split("T")[0],
          move_id: this.state.moveId,
        });
      }
    } else {
      this.setState({ fullName: e.target.value });
      // if (this.state.moveId) {
      //   this.props.commonAction.moveAddressUpdate({
      //     first_name: e.target.value.split(" ")[0]
      //       ? e.target.value.split(" ")[0]
      //       : "",
      //     last_name: e.target.value.split(" ")[1]
      //       ? e.target.value.split(" ")[1]
      //       : "",
      //     move_id: this.state.moveId,
      //   });
      // }
    }
  };

  callHandler = () => {
    let phone: any = this.state.phone;
    phone = phone.split("-").join("");
    phone = phone.split("(").join("");
    phone = phone.split(")").join("");
    if (phone.startsWith("1")) {
      phone = "+".concat(phone);
    } else {
      phone = "+1".concat(phone);
    }
    // console.log("################ dial.phone", phone);
    if (window && window.parent) {
      window.parent.postMessage(
        JSON.stringify({
          flexfig: {
            type: "flexfig.dial.phone",
            data: {
              phone: phone,
            },
          },
        }),
        "*"
      );
    }
  };
  smsHandler = () => {
    // var phone = document.getElementById("sms").innerHTML;
    let phone: any = this.state.phone;
    phone = phone.split("-").join("");
    phone = phone.split("(").join("");
    phone = phone.split(")").join("");
    if (phone.startsWith("1")) {
      phone = "+".concat(phone);
    } else {
      phone = "+1".concat(phone);
    }
    // console.log("################ send.sms", phone);

    if (window.parent) {
      window.parent.postMessage(
        JSON.stringify({
          flexfig: {
            type: "flexfig.send.sms",
            data: {
              phone: phone,
            },
          },
        }),
        "*"
      );
    }
  };

  render() {
    // const Date = ["24 Sep 2011"];
    // const Days = ["35"];

    // const fromaddress = ["3673 Kite Street,San Diego,CA 92103"];
    // const toaddress = ["3673 Kite Street,San Diego,CA 92103"];

    // const Name = ["Kounain Shariff "];
    // const Email = ["example@testmail.com"];
    // const Phone = ["+1 911929394"];
    // const RealtorCompanyName = ["Berkshire Hathaway Concierge "];

    const day = ["Monday"];
    const date = ["23 June 2021"];
    const notes = [
      "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.",
    ];
    const CustomerCheckInDate = ["27 July 2021, 05:23 pm EST"];
    // const CustomerEmail = ["mariano.rosgago@gmail.com "];
    // const CustomerPhone = ["+1 777-464-5748"];

    return (
      <div className="LeftPanel">
        <div className="LeftPanelCompos">
          <div className="LeftPanelCommonMargin ">
            <LeftColProgressBar
              unitCount={this.state.unitCount}
              totalUnit={this.state.totalUnit}
            />
          </div>
          <div>
            <div className="LeftPanelYourCustomer">
              YOUR CUSTOMERS MAIN DETAILS
            </div>
            <CustomerDetails
              CustomerCheckInDate={CustomerCheckInDate}
              CustomerEmail={this.state.email}
              CustomerPhone={this.state.phone}
              CustomerName={this.state.name}
              fullName={this.state.fullName}
              // clickedName={this.state.clickedName}
              // handleClickName={this.handleClickName}
              // handleClickAwayName={this.handleClickAwayName}
              handleChange={this.handleChange}
              onClickPhone={this.callHandler}
              onClickSms={this.smsHandler}
              onEditClick={this.props.onEditClick}
            />
          </div>
          {this.state.secondaryName ||
          this.state.secondaryEmail ||
          this.state.secondaryPhone ? (
            <div className="seconadaryContactDetails">
              <div className="LeftPanelYourCustomer">
                Secondary contact details
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
              {this.state.secondaryName ? (
                <div className="secondarycontactdetailsFlexDiv">
                  <div className="icon">
                    <PersonOutlineOutlinedIcon />
                  </div>
                  <div className="details">{this.state.secondaryName}</div>
                </div>
              ) : null}
              {this.state.secondaryEmail ? (
                <div className="secondarycontactdetailsFlexDiv">
                  <div className="icon">
                    <AlternateEmailIcon />
                  </div>
                  <div className="details">{this.state.secondaryEmail}</div>
                </div>
              ) : null}
              {this.state.secondaryPhone ? (
                <div className="secondarycontactdetailsFlexDiv">
                  <div className="icon">
                    <LocalPhoneIcon />
                  </div>
                  <div className="details">{this.state.secondaryPhone}</div>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="LeftPanelYourCustomer">
            YOUR CUSTOMERS MOVING DETAILS
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
          <div className="LeftPanelCommonMargin">
            <MovingDate
              Days={this.state.movingDays}
              Date={this.state.movingDate}
              clickedMovingDate={this.state.clickedMovingDate}
              handleClickMovingDate={this.handleClickMovingDate}
              handleClickAwayMovingDate={this.handleClickAwayMovingDate}
              handleChange={this.handleChange}
              anchorEl={this.state.anchorEl}
            />
          </div>
          <div className="LeftPanelCommonMargin">
            <MovingDetailsCard
              onEditClick={this.props.onEditClick}
              fromaddress={this.state.fromAddress}
              toaddress={this.state.toAddress}
              handleSelectFromAddress={this.handleSelectFromAddress}
              handleSelectToAddress={this.handleSelectToAddress}
              clickedFrom={this.state.clicked1}
              clickedTo={this.state.clicked2}
              handleClickTo={this.handleClickTo}
              handleClickFrom={this.handleClickFrom}
              handleClickAway={this.handleClickAway}
              handleChange={this.handleChange}
              distance={this.state.distance}
            />
          </div>
          <div className="LeftPanelCommonMargin">
            <RealtorDataCard
              image={this.state.realtorImg}
              Name={this.state.realtorName}
              Email={this.state.realtorEmail}
              Phone={this.state.realtorPhone}
              RealtorCompanyName={this.state.realtorCompanyName}
            />
          </div>
          {/* <div className="LeftPanelCustomerNotes">
            Customer notes
            <button className="BtnStyle ">
              Add +
              <span>
                <img src={EditImg} className="EditImg" />
              </span>
            </button>
          </div>
          <div className="LeftPanelYourCustomer">
            Any important notes about this customer
          </div>
          <div className="LeftPanelCommonMargin">
            <CustomerNotes day={day} date={date} notes={notes} />
          </div> */}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
