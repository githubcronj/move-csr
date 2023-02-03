import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.scss";
import Routes from "./routes/Routes";
import history from "./routes/History";
// import { BrowserRouter as Router } from "react-router-dom";
import SideNav from "./components/SideNav/SideNav";
import Header from "./pages/Header/Header";
import RightSideNav from "./pages/RightSideNav/RightSideNav";
import TabsMain from "./pages/ConciergeFlowPage/CMainTab";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import "./pages/ConciergeFlowPage/CMain.scss";
// import ConciergeFlow from "./pages/ConciergeFlowPage/ConciergeFlow/ConciergeFlow";
import CreateIcon from "@material-ui/icons/Create";
import * as CommonAction from "./store/common/actions";
import WorkflowButton from "./pages/ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Modal from "./components/atoms/Modal";
import CustomizedInput from "./components/atoms/CustomizedInput";
import { geocodeByAddress } from "react-places-autocomplete";
import AutoComplete from "./components/atoms/PlacesAutoComplete";
import CloseIcon from "@material-ui/icons/Close";
import Button from "./components/atoms/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { formatPhoneInput, validateEmail } from "./utils/formValidation";

interface initialProps extends RouteComponentProps {
  history: any;
  commonAction: any;
  commonState: any;
}

type initialState = {
  toggleNav: boolean;
  isLeftPanelOpen: boolean;
  moveData: any;
  noAnswer: boolean;
  noShowButton: boolean;
  destinationZip: string;
  destination_full_address: string;
  date: any;
  phone: any;
  moversData: any;
  moveId: string;
  editPrimaryDetailsModalOpen: boolean;
  name: string;
  email: string;
  moveFrom: string;
  moveTo: string;
  movingDate: any;
  secondary_name: string;
  secondary_phone: string;
  secondary_email: string;
  site_name: string;
  user_ref: any;
  hashCode: string;
};

class App extends React.Component<initialProps, initialState> {
  state: initialState = {
    toggleNav: true,
    isLeftPanelOpen: true,
    moveData: [],
    noAnswer: false,
    noShowButton: false,
    destinationZip: "",
    destination_full_address: "",
    date: null,
    phone: "",
    moversData: [],
    moveId: "",
    editPrimaryDetailsModalOpen: false,
    name: "",
    email: "",
    moveFrom: "",
    moveTo: "",
    movingDate: new Date().toISOString(),
    secondary_name: "",
    secondary_phone: "",
    secondary_email: "",
    site_name: "",
    user_ref: null,
    hashCode: "",
  };

  componentDidMount() {
    // console.log("inside");
    if (localStorage.getItem("moveeasytoken")) {
      this.props.commonAction.moveGet();
    }

    if (localStorage.getItem("leftPanel")) {
      this.setState({
        isLeftPanelOpen:
          localStorage.getItem("leftPanel") &&
          localStorage.getItem("leftPanel") === "true"
            ? true
            : false,
      });
    }

    if (
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move.length > 0 &&
      this.props.commonState.move[0]
    ) {
      const data =
        this.props.commonState &&
        this.props.commonState.move &&
        this.props.commonState.move.length > 0 &&
        this.props.commonState.move[0];
      const dest: any = data && data.destination;
      this.setState({
        destinationZip: dest && dest.zip_code,
        destination_full_address: data && data.destination_full_address,
        phone: data && data.user_ref.phone,
        moveId: data.id,
        name: `${data && data.user_ref.first_name} ${
          data && data.user_ref.last_name
        }`,
        email: data && data.user_ref.email,
        moveFrom: data && data.source_full_address,
        moveTo: data && data.destination_full_address,
        movingDate: data && data.moving_date,
        site_name:
          data && data.site_name
            ? data.site_name
            : data.user_ref && data.user_ref.site_name,
        user_ref: data && data.user_ref,
        secondary_name: data && data.secondary_name ? data.secondary_name : "",
        secondary_phone: data && data.secondary_phone,
        secondary_email: data && data.secondary_email,
        hashCode: data && data.hash_code,
      });
    }

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.order &&
      this.props.commonState.order.length
    ) {
      let moversData: any = [];
      this.props.commonState.order.map((item: any) => {
        if (
          item.service === "Professional Movers" ||
          item.service === "DIY Move"
        ) {
          moversData.push(item);
        }
      });
      this.setState({ moversData: moversData });
    } else {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload = {
          // service: "Movers",
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload);
      }
    }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (
      cur.updatePrimaryContact !== prev.updatePrimaryContact &&
      cur.isUpdatePrimaryContact
    ) {
      cur.isUpdatePrimaryContact = false;
      this.props.commonAction.moveGet();
      this.setState({ editPrimaryDetailsModalOpen: false });
    }

    if (
      prev.moveWithHashCode !== cur.moveWithHashCode &&
      cur.moveWithHashCode &&
      cur.moveWithHashCode[0]
    ) {
      this.props.commonAction.moveGet();
    }
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({
        destinationZip:
          cur.move[0].destination && cur.move[0].destination.zip_code,
        destination_full_address: cur.move[0].destination_full_address,
        phone: cur.move[0].user_ref.phone,
        name: `${cur.move[0] && cur.move[0].user_ref.first_name} ${
          cur.move[0] && cur.move[0].user_ref.last_name
        }`,
        email: cur.move[0] && cur.move[0].user_ref.email,
        moveFrom: cur.move[0] && cur.move[0].source_full_address,
        moveTo: cur.move[0] && cur.move[0].destination_full_address,
        movingDate: cur.move[0] && cur.move[0].moving_date,
        site_name:
          cur.move[0] && cur.move[0].site_name
            ? cur.move[0].site_name
            : cur.move[0].user_ref && cur.move[0].user_ref.site_name,
        user_ref: cur.move[0] && cur.move[0].user_ref,
        moveId: cur.move[0].id,
        secondary_name:
          cur.move[0] && cur.move[0].secondary_name
            ? cur.move[0].secondary_name
            : "",
        secondary_phone: cur.move[0] && cur.move[0].secondary_phone,
        secondary_email: cur.move[0] && cur.move[0].secondary_email,
        hashCode: cur.move[0] && cur.move[0].hash_code,
      });
    }

    if (prev.order !== cur.order && cur.order) {
      // this.setState({
      //   unitCount: cur.order.length ? cur.order.length.toString() : "0",
      // });
      let moversData: any = [];
      cur.order.map((item: any) => {
        if (
          item.service === "Professional Movers" ||
          item.service === "DIY Move"
        ) {
          moversData.push(item);
        }
      });

      this.setState({
        moversData: moversData,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.isGetMove
    // ) {
    //   // console.log("nextProps", nextProps.commonState.move[0])
    //   nextProps.commonState.isGetMove = false;
    //   currentState.moveData = nextProps.commonState.move;
    //   const data =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move.length > 0 &&
    //     nextProps.commonState.move[0];
    //   const dest: any = data && data.destination;
    //   currentState.destinationZip = dest && dest.zip_code;
    //   currentState.destination_full_address =
    //     data && data.destination_full_address;
    //   currentState.phone = data && data.user_ref.phone;
    //   currentState.moveId = data.id;
    //   currentState.name = `${data && data.user_ref.first_name} ${
    //     data && data.user_ref.last_name
    //   }`;
    //   currentState.email = data && data.user_ref.email;
    //   currentState.moveFrom = data && data.source_full_address;
    //   currentState.moveTo = data && data.destination_full_address;
    //   currentState.movingDate = data && data.moving_date;
    //   currentState.site_name =
    //     data && data.site_name
    //       ? data.site_name
    //       : data.user_ref && data.user_ref.site_name;
    //   currentState.user_ref = data && data.user_ref;
    //   currentState.secondary_name =
    //     data && data.secondary_name ? data.secondary_name : "";
    //   currentState.secondary_phone = data && data.secondary_phone;
    //   currentState.secondary_email = data && data.secondary_email;
    // }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.startWorkflow &&
      nextProps.commonState.isStartWorkflow
    ) {
      // console.log("nextProps", nextProps.commonState.move[0])
      nextProps.commonState.isStartWorkflow = false;
      // currentState.moveData = nextProps.commonState.move;
      if (currentState.moversData.length) {
        nextProps.history.push("/dashboard/concierge/workflow/moversthankyou");
      } else {
        nextProps.history.push("/dashboard/concierge/workflow/moversstep1");
      }
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let moversData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (
          item.service === "Professional Movers" ||
          item.service === "DIY Move"
        ) {
          moversData.push(item);
        }
      });
      currentState.moversData = moversData;
    }

    return currentState;
  }

  toggleSideNav = () => {
    this.setState({ toggleNav: !this.state.toggleNav });
  };
  noAnswerHandler = () => {
    this.setState({
      noAnswer: true,
      date: new Date(new Date().getTime() + 5 * 60000),
      noShowButton: false,
    });
    let name: string = `${
      this.state.user_ref && this.state.user_ref.first_name
    } ${this.state.user_ref && this.state.user_ref.last_name}`;
    let phone: string =
      this.state.user_ref && this.state.user_ref.phone
        ? this.state.user_ref.phone
        : "";
    localStorage.setItem(
      "callTimer",
      new Date(new Date().getTime() + 5 * 60000).toString()
    );
    localStorage.setItem("callTimerModal", "true");
    localStorage.setItem("noAnswer", "noAnswer");
    localStorage.setItem("nameUser", name);
    localStorage.setItem("hashCodeUser", this.state.hashCode);
    localStorage.setItem(
      "tokenNoAnswerUser",
      this.state.user_ref && this.state.user_ref.token
    );
    if (phone !== "") localStorage.setItem("phoneUser", phone);
  };
  noShowHandler = () => {
    this.setState({
      noAnswer: false,
      // date: new Date(new Date().getTime() + 5 * 60000),
      noShowButton: true,
    });
    // console.log("hhh");
  };
  noAnswerHandlerClose = () => {
    this.setState({
      noAnswer: false,
      noShowButton: false,
    });
  };
  noShowHandlerClose = () => {
    this.setState({
      noAnswer: false,
      noShowButton: false,
    });
    let payload = {
      hash: localStorage.getItem("scriptHashCode")
        ? localStorage.getItem("scriptHashCode")
        : "",
    };
    this.props.commonAction.noShow(payload);
  };

  noShowButtonHandler = () => {
    this.setState({
      noShowButton: false,
      noAnswer: false,
    });
    localStorage.setItem("noShow", "noShow");
  };

  redirectHandler = () => {
    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/discovery",
    });

    if (window && window.parent) {
      // console.log("window");
      window.parent.postMessage(
        JSON.stringify({
          flexfig: {
            type: "flexfig.dial.phone",
            data: {
              phone: this.state.phone,
            },
          },
        }),
        "*"
      );
    }

    localStorage.removeItem("nameUser");
    localStorage.removeItem("phoneUser");
    localStorage.removeItem("noAnswer");
    localStorage.removeItem("tokenNoAnswerUser");
    localStorage.removeItem("hashCodeUser");
  };

  startWorkFlowHandler = () => {
    if (
      this.state.phone == localStorage.getItem("phoneUser") ||
      this.state.name === localStorage.getItem("nameUser")
    ) {
      localStorage.setItem("noShow", "noShow");
      localStorage.removeItem("nameUser");
      localStorage.removeItem("phoneUser");
      localStorage.removeItem("noAnswer");
      this.setState({
        noAnswer: false,
        noShowButton: false,
      });
    }
    localStorage.setItem("leftPanel", "false");
    this.setState({
      isLeftPanelOpen: false,
    });
    let payload = {
      hash: localStorage.getItem("scriptHashCode")
        ? localStorage.getItem("scriptHashCode")
        : "",
    };
    this.props.commonAction.startWorkflow(payload);
    // console.log(this.state.phone, localStorage.getItem("phoneUser"));
    // this.props.history.push("/dashboard/concierge/workflow/moversstep1");
  };

  handleSelectFromAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
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
          results[0].address_components.map((el: any) => {
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
            moveFrom: `${streetNumber} ${route}, ${city}, ${state}, ${zip} `,
          });
        }
      })
      .catch((error: any) => console.error("error", error));
  };

  handleSelectToAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results: any) => {
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
          results[0].address_components.map((el: any) => {
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
            moveTo: `${streetNumber} ${route}, ${city}, ${state}, ${zip} `,
          });
        }
      })
      .catch((error: any) => console.error("error", error));
  };

  updateDetailsHandler = () => {
    if (this.state.moveId !== "") {
      console.log("insideif");
      let payload = {
        id: this.state.moveId,
        body: {
          // ...this.state.data,
          // destination_full_address: this.state.moveTo,
          source_full_addres: this.state.moveFrom,
          destination_detail: this.state.moveTo,
          // source_street: this.state.moveFrom,
          // destination_street: this.state.moveTo,
          destination_home: "1",
          moving_date: new Date(this.state.movingDate)
            .toISOString()
            .split("T")[0],
          moving_in_date: null,
          moving_items_list: ["2"],
          moving_option_value: ["2"],
          selected_service_list: ["11"],
          source_detail: this.state.moveFrom,
          source_home: "1",
          secondary_email: this.state.secondary_email,
          secondary_phone: this.state.secondary_phone,
          user_ref: {
            id: this.state.user_ref.id,
            email: this.state.email,
            first_name:
              this.state.name && this.state.name.split(" ")[0]
                ? this.state.name.split(" ")[0]
                : "",
            last_name:
              this.state.name && this.state.name.split(" ")[1]
                ? this.state.name.split(" ")[1]
                : "",
            // password: "ritu@123",
            phone: this.state.phone,
            site_name: this.state.site_name,
          },
          // site_name: this.state.site_name,
        },
      };
      this.props.commonAction.updatePrimaryContact(payload);
    }
  };

  backToDashboardHandler = () => {
    this.props.history.push("/dashboard");
    localStorage.setItem("leftPanel", "true");
    this.setState({ isLeftPanelOpen: true });
  };

  editClicked = () => {
    window.scrollTo(0, 0);
    this.setState({
      editPrimaryDetailsModalOpen: true,
    });
  };

  render() {
    let userType: string = "";
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.user &&
      this.props.commonState.user.user_type
    ) {
      userType = this.props.commonState.user.user_type;
    }
    if (!localStorage.getItem("newToken")) {
      history.push("/login");
    }
    let showNav: boolean = true;
    if (window.location.pathname === "/login") {
      showNav = false;
    } else {
      showNav = true;
    }
    // console.log(window.location.pathname)
    let showConciergeflow: boolean = false;

    if (window.location.pathname.includes("/dashboard/concierge/")) {
      showConciergeflow = true;
    }
    return (
      <div className="App">
        {/* <Router> */}
        <div className="appFlexDiv">
          {showNav === true ? (
            <SideNav
              toggleNav={this.state.toggleNav}
              toggleSideNav={this.toggleSideNav}
            />
          ) : null}
          <div
            className={
              !this.state.toggleNav ? "appMainPageDiv" : "appFlexDiv-toggle"
            }
          >
            {showNav === true ? (
              <Header
                backToDashboardHandler={this.backToDashboardHandler}
                noAnswerHandlerClose={this.noAnswerHandlerClose}
                history={this.props.history}
                timer={this.state.noAnswer}
                noShowHandlerClose={this.noShowHandlerClose}
                noShowButtonHandler={this.noShowButtonHandler}
                redirectHandler={this.redirectHandler}
                date={this.state.date}
                noShowButton={this.state.noShowButton}
              />
            ) : null}
            <div className="right-nav">
              {showNav === true ? <RightSideNav /> : null}
            </div>
            {showConciergeflow ? (
              <div className="conciergeFlowMainPage">
                <div className="conciergeFlexDiv">
                  <div className="conciergeLeftDiv">
                    <div className="Candidate">
                      <div className="ShortForm">
                        {this.state.user_ref
                          ? this.state.user_ref.first_name.charAt(0) +
                            this.state.user_ref.last_name.charAt(0)
                          : ""}
                      </div>
                      <div className="CandidateName">
                        <div className="CustomerOverview">
                          {this.state.user_ref
                            ? `${this.state.user_ref.first_name} ${this.state.user_ref.last_name}`
                            : ""}
                        </div>
                        <div className="CustomerContact">
                          Primary Contact
                          <div
                            className="BtnStyle"
                            onClick={() => this.editClicked()}
                          >
                            Edit
                            <span>
                              {/* <img src={EditImg} className="EditImg" /> */}
                              <CreateIcon className="EditImg" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ellipse ellipsecolor">4</div>
                      <div className="ellipse icon-div">
                        {this.state.isLeftPanelOpen ? (
                          <ChevronLeftIcon
                            onClick={() => {
                              this.setState({ isLeftPanelOpen: false });
                              localStorage.setItem("leftPanel", "false");
                            }}
                          />
                        ) : (
                          <ChevronRightIcon
                            onClick={() => {
                              this.setState({ isLeftPanelOpen: true });
                              localStorage.setItem("leftPanel", "true");
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="conciergeMainTabDiv">
                    <TabsMain />
                  </div>
                </div>
                <div className="conciergeFlexDiv">
                  {this.state.isLeftPanelOpen ? (
                    <div className="leftPanelDiv">
                      <LeftPanel
                        move={this.state.moveData}
                        onEditClick={this.editClicked}
                      />
                    </div>
                  ) : null}
                  <div
                    className={
                      this.state.isLeftPanelOpen
                        ? "conciergeRightContentDiv"
                        : "conciergeRightContentDiv-fullWidth"
                    }
                  >
                    {/* <ConciergeFlow history={history} /> */}
                    <Routes />
                  </div>
                </div>
              </div>
            ) : (
              <Routes />
            )}
            {/*  <Routes /> */}
          </div>
          {window.location.pathname ==
          "/dashboard/concierge/workflow/discovery" ? (
            <div className="WorkflowButtons">
              <WorkflowButton
                buttonText1={
                  // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                  // "No-show"
                  localStorage.getItem("noShow") ? "No-show" : "No-Answer"
                }
                buttonText2={
                  // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                  "Start Workflow"
                }
                buttonStartLogo1={null}
                buttonStartLogo2={<ArrowForwardIcon />}
                ButtonOnClick1={() =>
                  localStorage.getItem("noShow")
                    ? this.noShowHandler()
                    : this.noAnswerHandler()
                }
                ButtonOnClick2={() => {
                  this.startWorkFlowHandler();
                }}
                button2Disabled={
                  !(
                    this.state.destinationZip &&
                    this.state.destination_full_address
                  )
                    ? true
                    : userType == "Home Security Expert"
                    ? true
                    : false
                }
              />
            </div>
          ) : null}
        </div>
        {/* </Router> */}

        {this.state.editPrimaryDetailsModalOpen ? (
          <Modal
            isShowModal={this.state.editPrimaryDetailsModalOpen}
            onCloseModal={() =>
              this.setState({ editPrimaryDetailsModalOpen: false })
            }
            showClose={true}
            className="AppMainModal"
          >
            <div className="modalMainDiv">
              <div className="modalFlexDiv">
                <div className="modalTitle">Edit Details</div>
                <CloseIcon
                  onClick={() =>
                    this.setState({ editPrimaryDetailsModalOpen: false })
                  }
                />
              </div>

              <div className="modalFlexDiv">
                <div className="ContanctdetailsDiv">
                  <div className="contactDetailsTitle">
                    Primary contact details
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.name}
                      label="Name"
                      onChange={(e: any) =>
                        this.setState({ name: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.phone}
                      label="Phone Number"
                      onChange={(e: any) =>
                        this.setState({
                          phone: formatPhoneInput(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.email}
                      label="Email Address"
                      onChange={(e: any) =>
                        this.setState({ email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="ContanctdetailsDiv">
                  <div className="contactDetailsTitle">
                    Secondary contact details
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.secondary_name}
                      label="Name"
                      onChange={(e: any) =>
                        this.setState({ secondary_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.secondary_phone}
                      label="Phone Number"
                      onChange={(e: any) =>
                        this.setState({
                          secondary_phone: formatPhoneInput(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="inputDiv">
                    <CustomizedInput
                      className="CustomInput"
                      value={this.state.secondary_email}
                      label="Email Address"
                      onChange={(e: any) =>
                        this.setState({ secondary_email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modalFlexDiv">
                <div className="ContanctdetailsDiv">
                  <div className="contactDetailsTitle">Moving details</div>
                  <div className="inputDiv">
                    <AutoComplete
                      className="CustomInput"
                      value={this.state.moveFrom}
                      onChange={(e: any) => {
                        this.setState({ moveFrom: e });
                      }}
                      onSelect={this.handleSelectFromAddress}
                      placeholder={this.state.moveFrom == "" ? "From" : ""}

                      // inputTitle="To"
                    />
                  </div>
                  <div className="inputDiv">
                    <AutoComplete
                      className="CustomInput"
                      value={this.state.moveTo}
                      onChange={(e: any) => {
                        this.setState({ moveTo: e });
                      }}
                      onSelect={this.handleSelectToAddress}
                      placeholder={this.state.moveTo == "" ? "To" : ""}

                      // inputTitle="To"
                    />
                  </div>
                </div>
                <div className="ContanctdetailsDiv">
                  <div className="contactDetailsTitle">
                    {/* Secondary contact details */}
                    {""}
                  </div>
                  <div className="inputDiv">
                    {/* <CustomizedInput
                      className="CustomInput"
                      value={this.state.movingDate}
                      label="Moving Date"
                      type="date"
                      onChange={(e: any) =>
                        this.setState({ movingDate: e.target.value })
                      }
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        // variant="inline"
                        // ampm={true}
                        label="Select Date"
                        value={this.state.movingDate}
                        onChange={(e: any) =>
                          this.setState({
                            movingDate: new Date(e).toISOString(),
                          })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="CustomDate"
                        // onError={console.log}
                        disablePast
                        format="MM/dd/yyyy"
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
              <div className="modalButtonDiv">
                <Button
                  className="ModalButton"
                  onClick={() => this.updateDetailsHandler()}
                >
                  Update details
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
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
