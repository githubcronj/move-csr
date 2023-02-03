import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./header.scss";
import support from "../../Assets/images/Support.png";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as Action from "../../store/login/actions";
import Button from "../../components/atoms/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Modal from "../../components/atoms/Modal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { formatPhoneInput, validateEmail } from "../../utils/formValidation";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import AutoComplete from "../../components/atoms/PlacesAutoComplete";
import { geocodeByAddress } from "react-places-autocomplete";
import AddressIcon from "../../Assets/images/Movers/addressIcon.svg";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Countdown from "react-countdown";
import * as CommonAction from "../../store/common/actions";
import RefreshIcon from "@material-ui/icons/Refresh";

type initialProps = {
  history?: any;
  loginAction: any;
  loginState: any;
  timer?: any;
  noShowHandlerClose?: any;
  commonState?: any;
  commonAction?: any;
  noShowButtonHandler?: any;
  date?: any;
  redirectHandler?: any;
  noShowButton?: any;
  noAnswerHandlerClose?: any;
  backToDashboardHandler?: any;
};

type initialState = {
  firstModalOpen: boolean;
  brokerageValue: any;
  brokerageOptions: any;
  estateValue: any;
  estateOptions: any;
  secondModalOpen: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  streetError: any;
  street2: string;
  street2Error: any;
  date: any;
  dateError: string;
  anchorEl: any;
  thirdModalOpen: boolean;
  noShowModal: boolean;
  callAgain: boolean;
  nameUser: any;
  phoneUser: any;
  hashCode: any;
  isDataArrived: boolean;
  callAgainModal: boolean;
  confirmNoShowModal: boolean;
  timerInterval: any;
  emailError: string;
  phoneNumberError: string;
  moveAccount: any;
};

let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

class Header extends Component<initialProps, initialState> {
  state: initialState = {
    firstModalOpen: false,
    brokerageValue: "",
    brokerageOptions: [],
    estateValue: "",
    estateOptions: [],
    secondModalOpen: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    streetError: "",
    street2: "",
    street2Error: "",
    date: new Date(),
    dateError: "",
    anchorEl: null,
    thirdModalOpen: false,
    noShowModal: false,
    callAgain: false,
    nameUser: "",
    phoneUser: "",
    hashCode: "",
    isDataArrived: true,
    callAgainModal: false,
    confirmNoShowModal: false,
    // timerInterval: new Date(new Date().getTime() + 5 * 60000),
    timerInterval: "",
    emailError: "",
    phoneNumberError: "",
    moveAccount: "",
  };

  //     shouldComponentUpdate(nextProps:any){
  //     return nextProps!=this.props;
  //  }

  componentDidMount() {
    // if (
    //   this.props &&
    //   this.props.history &&
    //   this.props.history.location &&
    //   this.props.history.location.pathname &&
    //   this.props.history.location.pathname.includes("/dashboard/concierge/")
    // ) {
    //   this.setState({ backNav: true });
    // }
    if (
      localStorage.getItem("callTimer") &&
      localStorage.getItem("callTimer") != null
    ) {
      this.setState({ timerInterval: localStorage.getItem("callTimer") });
    }

    if (
      localStorage.getItem("callTimerModal") &&
      localStorage.getItem("callTimerModal") === "true"
    ) {
      this.setState({ callAgain: true });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (nextProps && nextProps.loginState && nextProps.loginState.isLoggedOut) {
      nextProps.loginState.isLoggedOut = false;

      localStorage.removeItem("newToken");
      window.location.reload();
    }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.move[0].id &&
    //   currentState.isDataArrived
    // ) {
    //   currentState.isDataArrived = false;
    //   const data =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move.length > 0 &&
    //     nextProps.commonState.move[0];
    //   let first_name = data && data.user_ref && data.user_ref.first_name;
    //   let last_name = data && data.user_ref && data.user_ref.last_name;
    //   let phoneUser = data && data.user_ref && data.user_ref.phone;
    //   currentState.nameUser = first_name.concat(" " + last_name);
    //   currentState.phoneUser = phoneUser;
    // }

    if (nextProps && nextProps.timer && !localStorage.getItem("noShow")) {
      // nextProps.timer=false;
      currentState.noShowModal = true;
      currentState.callAgain = false;
    }
    if (nextProps && nextProps.noShowButton && localStorage.getItem("noShow")) {
      // nextProps.noShowButton = false;
      currentState.confirmNoShowModal = true;
    }

    if (nextProps && nextProps.date) {
      currentState.timerInterval = nextProps.date;
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.brokerage &&
      nextProps.commonState.brokerage.length &&
      nextProps.commonState.brokerageDataArrived
    ) {
      nextProps.commonState.brokerageDataArrived = false;
      let brokerageData: any = [];
      nextProps.commonState.brokerage.map((item: any) => {
        brokerageData.push({
          value: item.slug,
          label: item.name,
        });
      });
      currentState.brokerageOptions = brokerageData;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.realtor &&
      nextProps.commonState.realtor.length &&
      nextProps.commonState.realtorDataArrived
    ) {
      nextProps.commonState.realtorDataArrived = false;
      let realtorData: any = [];
      nextProps.commonState.realtor.map((item: any) => {
        realtorData.push({
          value: item.slug,
          label: item.contact_name,
        });
      });
      currentState.estateOptions = realtorData;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isAccountPost &&
      nextProps.commonState.accountPost
    ) {
      nextProps.commonState.isAccountPost = false;
      currentState.secondModalOpen = false;
      currentState.firstModalOpen = false;
      currentState.thirdModalOpen = true;
      currentState.firstName = "";
      currentState.lastName = "";
      currentState.phone = "";
      currentState.email = "";
      currentState.street = "";
      currentState.street2 = "";
      currentState.date = new Date();
      currentState.moveAccount = nextProps.commonState.accountPost;
    }
    if (localStorage.getItem("nameUser") && localStorage.getItem("phoneUser")) {
      currentState.nameUser = localStorage.getItem("nameUser");
      currentState.phoneUser = localStorage.getItem("phoneUser");
      currentState.hashCode = localStorage.getItem("hashCodeUser");
    }
    return currentState;
  }

  getAge = (a: any, b: any) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  dateHandler = (e: any) => {
    this.setState({
      date: e,
      anchorEl: null,
    });
  };

  handleBrokerageValue = async (e: any) => {
    if (e.target.value.length >= 1) {
      this.props.commonAction.brokerageGet({
        key: e.target.value,
      });
    }
  };

  onChangeBrokerageValue = (e: any, value: any) => {
    this.setState({
      brokerageValue: value,
    });
  };

  handleEstateValue = (e: any) => {
    if (e.target.value.length >= 1) {
      this.props.commonAction.realtorGet({
        key: e.target.value,
        brokerage_slug: this.state.brokerageValue.value,
      });
    }
  };

  onChangeEstateValue = (e: any, value: any) => {
    this.setState({
      estateValue: value,
    });
  };

  addNewAccountHandler = () => {
    this.setState({
      firstModalOpen: true,
    });
  };

  continueHandler = () => {
    this.setState({
      secondModalOpen: true,
      firstModalOpen: false,
    });
  };

  continueHandler2 = () => {
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.phone &&
      this.state.email &&
      this.state.street &&
      this.state.street2 &&
      this.state.date
    ) {
      if (!validateEmail(this.state.email)) {
        this.setState({
          emailError: "Please enter valid Email",
        });
      }

      if (!phoneRegex.test(this.state.phone))
        this.setState({
          phoneNumberError: "Please enter valid Phone Number",
        });
    }

    if (validateEmail(this.state.email) && phoneRegex.test(this.state.phone)) {
      this.setState({
        phoneNumberError: "",
        emailError: "",
      });

      const payload = {
        slug: this.state.estateValue.value,
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone: this.state.phone,
        pickup_date: this.state.date,
        new_street: this.state.street2,
        old_street: this.state.street,
        utm_source: "sidekick",
        utm_medium: "csr",
        utm_campaign: "add-account",
      };

      this.props.commonAction.accountPost(payload);
    }
  };

  confirmHandler = () => {
    this.setState({
      thirdModalOpen: false,
    });

    let token =
      this.state.moveAccount &&
      this.state.moveAccount.user_ref &&
      this.state.moveAccount.user_ref.token;
    localStorage.setItem("moveeasytoken", token);
    localStorage.setItem("scriptHashCode", this.state.moveAccount.hash_code);
    this.props.commonAction.moveGet();
    localStorage.removeItem("noShow");
    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/discovery",
      state: this.state.moveAccount,
    });
  };

  handleChange = (e: any, name: string) => {
    let val: any;
    if (name == "phone") {
      val = formatPhoneInput(e.target.value);
    } else {
      val = e.target.value;
    }
    this.setState({ ...this.state, [name]: val });
    this.setState({
      phoneNumberError: "",
      emailError: "",
    });
  };

  handleSelect = (address: any) => {
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
            street: `${streetNumber} ${route}, ${country}, ${city}, ${state} ${zip}`,

            //  ${streetNumber} ${route}, ${city}, ${state} ${zip}
          });
        }
      })
      .catch((error) => console.error("error", error));
  };
  handleSelect2 = (address: any) => {
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
            street2: `${streetNumber} ${route}, ${country}, ${city}, ${state} ${zip}`,
          });
        }
      })
      .catch((error) => console.error("error", error));
  };

  handleClick = (event: any) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  callAgainHandler = () => {
    this.setState({
      noShowModal: false,
      callAgain: true,
    });
    let hash_code: any = "";
    if (
      localStorage.getItem("scriptHashCode") &&
      localStorage.getItem("scriptHashCode") != null
    ) {
      hash_code = localStorage.getItem("scriptHashCode");
    }
    this.props.commonAction.noAnswer({ hash: hash_code });
    this.props.noAnswerHandlerClose();
  };

  onStopHandler = () => {
    this.setState({
      callAgain: false,
      callAgainModal: true,
    });
    localStorage.removeItem("callTimer");
    localStorage.removeItem("callTimerModal");
  };

  callBackHandler = () => {
    let phone: any = this.state.phoneUser;
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
    this.setState({
      callAgainModal: false,
    });
    // this.props.noShowHandlerClose();

    this.props.noShowButtonHandler();
    this.props.redirectHandler();
  };

  noShowConfirmHandler = () => {
    this.setState({ confirmNoShowModal: false });
    this.props.noShowHandlerClose();
  };

  redirectToDiscovery = async () => {
    let hashcode: any = "";
    if (
      localStorage.getItem("hashCodeUser") &&
      localStorage.getItem("hashCodeUser") != null
    ) {
      hashcode = localStorage.getItem("hashCodeUser");
    }
    let tokenNoAnswerUser: any = "";
    if (
      localStorage.getItem("tokenNoAnswerUser") &&
      localStorage.getItem("tokenNoAnswerUser") != null
    ) {
      tokenNoAnswerUser = localStorage.getItem("tokenNoAnswerUser");
    }

    // console.log(this.props.commonState);
    await localStorage.setItem("scriptHashCode", hashcode);
    await localStorage.setItem("moveeasytoken", tokenNoAnswerUser);
    let payload = { hash_code: hashcode };
    await this.props.commonAction.moveWithHashCode(payload);
    this.props.history.push("/dashboard/concierge/workflow/discovery");
  };

  render() {
    return (
      <div className="Header-main">
        <div className="dollar-heading-wrapper">
          {window.location.pathname.includes("/dashboard/concierge") ? (
            <div className="BackNavigation">
              <ArrowBackIcon
                className="backIcon"
                onClick={() => {
                  this.props.backToDashboardHandler();
                }}
              />
              <div className="wrapDiv">
                <div className="goBackText">Go back to</div>
                <div className="goBackSubText">Customer list</div>
              </div>
            </div>
          ) : null}
          <div className="dollar-div-outer">
            <div className="dollar-div">
              <MonetizationOnIcon />
            </div>
          </div>
          <div className="commission-wrapper">
            <div className="commission">CURRENT COMMISSION</div>
            <div className="commission-figure">$1,032.43</div>
          </div>
        </div>

        {this.state.callAgain &&
        !this.props.noShowButton &&
        localStorage.getItem("noAnswer") ? (
          <div className="timer-div">
            <div className="first-div">
              <div className="left-text">CALL AGAIN</div>
              <div
                className="name-left-text"
                onClick={this.redirectToDiscovery}
              >
                {this.state.nameUser}
              </div>
              <div className="left-text">{this.state.phoneUser}</div>
            </div>
            <div className="second-div">
              <Countdown
                date={this.state.timerInterval}
                className="timer"
                onComplete={() => {
                  this.onStopHandler();
                }}
                renderer={(props) => (
                  <div className="timer">{`${
                    props.minutes > 9 ? props.minutes : `0${props.minutes}`
                  }:${
                    props.seconds > 9 ? props.seconds : `0${props.seconds}`
                  }`}</div>
                )}
              />
            </div>
          </div>
        ) : null}

        <div className="notification-text-wrapper">
          {window.location.pathname == "/dashboard" ||
          window.location.pathname == "/" ? (
            <div className="new-account-button">
              <Button
                className="new-account"
                startLogo={<PersonAddIcon />}
                onClick={this.addNewAccountHandler}
              >
                ADD NEW ACCOUNT
              </Button>
            </div>
          ) : null}
          <div className="message-text">
            <div className="message-icon">
              <img src={support} />
            </div>
            <div className="commission">RAISE A SUPPORT TICKET</div>
          </div>
          <div className="refresh-div-outer">
            <div className="refresh-div">
              <RefreshIcon
                className="refreshIcon"
                onClick={() => window.location.reload()}
              />
            </div>
          </div>
          <div className="dollar-div-outer">
            <div className="dollar-div">
              <NotificationsActiveIcon />
            </div>
          </div>
          <div className="notification-number-div">21</div>
          <div className="logout-div">
            <div
              className="logout-button"
              onClick={() => {
                this.props.loginAction.logout();
              }}
            >
              Log Out
            </div>
          </div>
        </div>

        {this.state.firstModalOpen ? (
          <Modal
            isShowModal={this.state.firstModalOpen}
            onCloseModal2={() => this.setState({ firstModalOpen: false })}
            showClose={true}
            className="FirstModal"
          >
            <div className="FirstModal-main">
              <div className="progressStep">Step 1/2</div>
              <div className="add-new-account">Add New Account</div>
              <div className="select-brokerage">
                <div className="select-heading-div">Select Brokerage</div>
                <div className="dropdown-div">
                  <Autocomplete
                    id="free-solo-demo"
                    onChange={(e, value) =>
                      this.onChangeBrokerageValue(e, value)
                    }
                    options={this.state.brokerageOptions}
                    getOptionLabel={(option: any) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="searchDropdown"
                        //  label="Search..."
                        id="outlined-start-adornment"
                        onChange={(e) => this.handleBrokerageValue(e)}
                        variant="outlined"
                        value={this.state.brokerageValue}
                        placeholder="Search..."
                      />
                    )}
                  />
                </div>
              </div>

              <div className="select-brokerage">
                <div className="select-heading-div">
                  Select real estate agent
                </div>

                <div className="dropdown-div">
                  <Autocomplete
                    id="free-solo-demo"
                    onChange={(e, value) => this.onChangeEstateValue(e, value)}
                    options={this.state.estateOptions}
                    getOptionLabel={(option: any) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...params}
                        className="searchDropdown"
                        placeholder="Search..."
                        id="outlined-start-adornment"
                        onChange={(e) => this.handleEstateValue(e)}
                        variant="outlined"
                        value={this.state.estateValue}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="continue-button">
                <Button
                  className="Button1"
                  onClick={() => this.continueHandler()}
                  color="#fff"
                  startLogo={<ArrowForwardIcon />}
                  backgroundColor={"#465B74"}
                  disabled={
                    !(this.state.brokerageValue && this.state.estateValue)
                  }
                >
                  Continue
                </Button>
              </div>
            </div>
          </Modal>
        ) : this.state.secondModalOpen ? (
          <Modal
            isShowModal={this.state.secondModalOpen}
            onCloseModal2={() => this.setState({ secondModalOpen: false })}
            showClose={true}
            className="SecondModal"
          >
            <div className="secondModal-main">
              <div className="progressStep">Step 2/2</div>
              <div className="personal-details">
                <div className="personal-details-heading">
                  Enter your personal details
                </div>

                <div className="label-name">Name</div>
                <div className="firstname-lastname">
                  <div className="input-div">
                    <CustomizedInput
                      onChange={(e: any) => this.handleChange(e, "firstName")}
                      label="First Name"
                      value={this.state.firstName}
                      className="modal-input"
                    />
                  </div>
                  <div className="input-div">
                    <CustomizedInput
                      onChange={(e: any) => this.handleChange(e, "lastName")}
                      label="Last Name"
                      value={this.state.lastName}
                      className="modal-input"
                    />
                  </div>
                </div>

                <div className="firstname-lastname">
                  <div className="input-div">
                    <div className="label-name">Phone</div>
                    <CustomizedInput
                      onChange={(e: any) => this.handleChange(e, "phone")}
                      label="Phone"
                      value={this.state.phone}
                      className="modal-input"
                    />
                    <div className="error">
                      {this.state.phoneNumberError
                        ? this.state.phoneNumberError
                        : ""}
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label-name">Email</div>
                    <CustomizedInput
                      onChange={(e: any) => this.handleChange(e, "email")}
                      label="Email"
                      value={this.state.email}
                      className="modal-input"
                    />
                    <div className="error">
                      {this.state.emailError ? this.state.emailError : ""}
                    </div>
                  </div>
                </div>

                <div className="moving-details">
                  <div className="personal-details-heading">
                    Enter your Moving Details
                  </div>
                  <div className="moveFrom">Moving From</div>
                  <div className="autocomplete-icon-wrapper">
                    {/* <div className="address-icon">
                      <img src={AddressIcon} />
                    </div> */}
                    <div className="autocomplete">
                      <AutoComplete
                        className="input1-signUp2"
                        error={Boolean(this.state.streetError)}
                        value={this.state.street}
                        onChange={(e) => {
                          this.setState({ street: e });
                        }}
                        onSelect={this.handleSelect}
                        placeholder="Street Name & Number"

                        // inputTitle="To"
                      />
                      <div className="errorSignup">
                        {""}
                        {this.state.street == "" ? (
                          <small>{this.state.streetError}</small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="moveFrom">Moving To</div>
                  <div className="autocomplete-icon-wrapper">
                    {/* <div className="address-icon">
                      <img src={AddressIcon} />
                    </div> */}
                    <div className="autocomplete">
                      <AutoComplete
                        className="input1-signUp2"
                        error={Boolean(this.state.street2Error)}
                        value={this.state.street2}
                        onChange={(e) => {
                          this.setState({ street2: e });
                        }}
                        onSelect={this.handleSelect2}
                        placeholder="Street Name & Number"

                        // inputTitle="To"
                      />
                      <div className="errorSignup">
                        {""}
                        {this.state.street2 == "" ? (
                          <small>{this.state.street2Error}</small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="moveFrom">Moving Date</div>
                  <div className="autocomplete-icon-wrapper">
                    {/* <div className="address-icon">
                      <img src={AddressIcon} />
                    </div> */}
                    <div style={{ width: "90%" }}>
                      <div className="date-picker-div">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disablePast={true}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            // label="Date picker inline"
                            className="modal-input"
                            value={this.state.date}
                            onChange={(e: any) => {
                              this.dateHandler(e);
                            }}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                              onFocus: (e) => {
                                this.handleClick(e);
                              },
                            }}
                            autoOk={true}
                            PopoverProps={{
                              disableRestoreFocus: true,
                              onClose: () => {
                                this.setState({ anchorEl: null });
                              },
                              anchorEl: this.state.anchorEl,
                            }}
                            InputProps={
                              {
                                //   onFocus: (e) => {
                                //       this.handleClick(e)
                                //   },
                              }
                            }
                            open={Boolean(this.state.anchorEl)}
                            error={Boolean(this.state.dateError)}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <div className="difference-div">
                        {this.getAge(new Date(), new Date(this.state.date)) == 0
                          ? "Today"
                          : this.getAge(
                              new Date(),
                              new Date(this.state.date)
                            ) == 1
                          ? "Tomorrow"
                          : `${this.getAge(
                              new Date(),
                              new Date(this.state.date)
                            )} days to go`}
                      </div>
                    </div>
                    {this.state.date == "" ? (
                      <div className="errorSignup">
                        {""}
                        <small>{this.state.dateError}</small>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="continue-button">
                  <Button
                    className="Button2"
                    onClick={() => this.continueHandler2()}
                    color="#fff"
                    startLogo={<ArrowForwardIcon />}
                    backgroundColor={"#465B74"}
                    disabled={
                      !(
                        this.state.firstName &&
                        this.state.lastName &&
                        this.state.phone &&
                        this.state.email &&
                        this.state.street &&
                        this.state.street2 &&
                        this.state.date
                      )
                    }
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        ) : this.state.thirdModalOpen ? (
          <Modal
            isShowModal={this.state.thirdModalOpen}
            onCloseModal2={() => this.setState({ thirdModalOpen: false })}
            showClose={true}
            className="FirstModal"
          >
            <div className="FirstModal-main">
              <div className="circle-icon">
                <CheckCircleOutlineIcon
                  style={{
                    color: "#347A35",
                    height: "50px",
                    width: "50px",
                  }}
                />
              </div>
              <div className="OpenModal-job">Success!</div>
              <div className="order-confirmation-number">
                Account Has Been Created
              </div>

              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() => this.confirmHandler()}
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        {this.state.noShowModal && !localStorage.getItem("noShow") ? (
          <Modal
            isShowModal={this.state.noShowModal}
            onCloseModal2={() => {
              this.setState({ noShowModal: false });
              this.props.noAnswerHandlerClose();
            }}
            showClose={true}
            className="noShowModal"
          >
            <div className="noShowModal-main">
              <div className="noShow-heading">No-show marking</div>

              <div className="noShow-content">
                No-show cadence has started for this particular client, and a
                text reminder has been sent to the customer to pick the call
                again.
              </div>

              <div className="noShow-button">
                <Button
                  className="Button1"
                  onClick={() => this.callAgainHandler()}
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Call again in 5 minutes
                </Button>
              </div>
            </div>
          </Modal>
        ) : this.state.confirmNoShowModal && localStorage.getItem("noShow") ? (
          <Modal
            isShowModal={this.state.confirmNoShowModal}
            onCloseModal2={() => {
              this.setState({ confirmNoShowModal: false });
              this.props.noShowHandlerClose();
            }}
            showClose={true}
            className="noShowModal"
          >
            <div className="noShowModal-main">
              <div className="noShowModal-main">
                <div className="noShow-heading">No-show marking</div>

                <div className="noShow-content">
                  Customer has been moved to no-show cadence.
                </div>

                <div className="noShow-button">
                  <Button
                    className="Button1"
                    onClick={() => this.noShowConfirmHandler()}
                    color="#fff"
                    backgroundColor={"#465B74"}
                  >
                    Confirm no-show
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
        {this.state.callAgainModal ? (
          <Modal
            isShowModal={this.state.callAgainModal}
            onCloseModal2={() => {
              this.setState({ callAgainModal: false });
              // this.props.noShowHandlerClose();
            }}
            showClose={true}
            className="noShowModal"
          >
            <div className="noShowModal-main">
              <div className="noShow-heading">Call the customer</div>

              <div className="timer-div-2">
                <div className="first-div">
                  <div className="left-text">CALL AGAIN</div>
                  <div
                    className="name-left-text"
                    onClick={this.redirectToDiscovery}
                  >
                    {this.state.nameUser}
                  </div>
                  <div className="left-text">{this.state.phoneUser}</div>
                </div>
                <div className="second-div">
                  <div className="timer">00:00</div>
                </div>
              </div>

              <div className="noShow-button">
                <Button
                  className="Button1"
                  onClick={() => this.callBackHandler()}
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Call back
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    loginAction: bindActionCreators(Action, dispatch),
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  loginState: state.login,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
