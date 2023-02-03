import React from "react";
import "./InternetStep1.scss";
import "./InternetStep6.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import OrderCompletionCard from "../../components/OrderCompletionCard/OrderCompletionCard";
import InsuranceCompanyCard from "../../components/Insurance/InsuranceCompanyCard";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CommonAction from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import Modal from "../../components/atoms/Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as MoversAction from "../../store/move/actions";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

let re = /^[a-zA-Z0-9]{2,40}$/;

type initialProps = {
  history?: any;
  commonAction?: any;
  commonState?: any;
  moversAction: any;
  moversState: any;
};

type initialState = {
  closed: boolean;
  isDataArrived2: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  buyNowData: any;
  isDataArrived: boolean;
  moveId: string;
  loader: boolean;
  installationDate: any;
  orderDetails: string;
  orderError: boolean;
  installationError: boolean;
  installationDate2: any;
  orderDetails2: string;
  orderError2: boolean;
  installationError2: boolean;
  installationDate3: any;
  orderDetails3: string;
  orderError3: boolean;
  installationError3: boolean;
  openModal: boolean;
  order_id1: any;
  order_id2: any;
  order_id3: any;
  order_db_id1: any;
  order_db_id2: any;
  order_db_id3: any;
  currentOrderDetails: any;
  currentInstalltionDate: any;
  save1: boolean;
  save2: boolean;
  save3: boolean;
  isHold: boolean;
  dob1: any;
  expectedInstallation1: any;
  dob2: any;
  expectedInstallation2: any;
  dob3: any;
  expectedInstallation3: any;
  holdSave1: boolean;
  holdSave2: boolean;
  holdSave3: boolean;
  dob1Error: boolean;
  dob2Error: boolean;
  dob3Error: boolean;
  expectedInstallation1Error: boolean;
  expectedInstallation2Error: boolean;
  expectedInstallation3Error: boolean;
  currentDateOfBirth: any;
  currentExpectedInstallationDate: any;
  image: any;
  image1: any;
  image2: any;
};

class InternetStep6 extends React.Component<initialProps, initialState> {
  state: initialState = {
    closed: false,
    isDataArrived2: true,
    scriptContent: [],
    hintContent: "",
    objectionCompleted: true,
    buyNowData: "",
    moveId: "",
    isDataArrived: true,
    loader: true,
    installationDate: new Date().toISOString().split("T")[0],
    orderDetails: "",
    orderError: false,
    installationError: false,
    installationDate2: new Date().toISOString().split("T")[0],
    orderDetails2: "",
    orderError2: false,
    installationError2: false,
    installationDate3: new Date().toISOString().split("T")[0],
    orderDetails3: "",
    orderError3: false,
    installationError3: false,
    openModal: false,
    order_id1: "",
    order_id2: "",
    order_id3: "",
    order_db_id1: "",
    order_db_id2: "",
    order_db_id3: "",
    currentInstalltionDate: "",
    currentOrderDetails: "",
    save1: false,
    save2: false,
    save3: false,
    isHold: false,
    dob1: "",
    expectedInstallation1: "",
    dob2: "",
    expectedInstallation2: "",
    dob3: "",
    expectedInstallation3: "",
    holdSave1: false,
    holdSave2: false,
    holdSave3: false,
    dob1Error: false,
    dob2Error: false,
    dob3Error: false,
    expectedInstallation1Error: false,
    expectedInstallation2Error: false,
    expectedInstallation3Error: false,
    currentDateOfBirth: "",
    currentExpectedInstallationDate: "",
    image: "",
    image1: "",
    image2: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
      page: 6,
    });

    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.data
    ) {
      let buyNowData: any = [];
      this.props.history.location.state.data.map((item: any) => {
        buyNowData.push({ ...item, hold: false });
      });
      this.setState({
        buyNowData: buyNowData,
      });
    }

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
      });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // console.log("order", currentState.order_db_id1);
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let points: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 6) {
      points =
        nextProps.commonState.script &&
        nextProps.commonState.script.script_content &&
        nextProps.commonState.script.script_content.split("|");
      if (
        nextProps.commonState.script &&
        nextProps.commonState.script.hint_content
      ) {
        hintContent.push(nextProps.commonState.script.hint_content);
      }
      //   }
      // });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });
      currentState.scriptContent = points;
      currentState.hintContent = hintPara;
      currentState.loader = false;
    }
    // if (
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move.length > 0 &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.isGetMove
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   currentState.moveId =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move[0] &&
    //     nextProps.commonState.move[0].id;
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isAppointmentPost &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.appointmentPost.orders &&
      nextProps.commonState.appointmentPost.orders.length
    ) {
      nextProps.commonState.isAppointmentPost = false;
      // console.log("hloo",nextProps.commonState.appointmentPost.orders)
      nextProps.commonState.appointmentPost.orders.map(
        (item: any, index: number) => {
          if (index == 0 && item.product && item.product.order_id) {
            console.log(item);
            currentState.order_id1 = item.product.order_id;
          }
          if (index == 1 && item.product && item.product.order_id) {
            currentState.order_id2 = item.product.order_id;
          }
          if (index == 2 && item.product && item.product.order_id) {
            currentState.order_id3 = item.product.order_id;
          }
          if (index == 0 && item.product && item.product.order_db_id) {
            currentState.order_db_id1 = item.product.order_db_id;
          }
          if (index == 1 && item.product && item.product.order_db_id) {
            currentState.order_db_id2 = item.product.order_db_id;
          }
          if (index == 2 && item.product && item.product.order_db_id) {
            currentState.order_db_id3 = item.product.order_db_id;
          }
        }
      );

      // console.log("order", nextProps.commonState.appointmentPost.orders);
      currentState.openModal = true;
    } else if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.error !== null
    ) {
      window.alert(`${nextProps.commonState.error}`);
      nextProps.commonState.error = null;
    }

    return currentState;
  }

  confirmHandler = () => {
    if (
      this.state.order_db_id1 &&
      this.state.currentOrderDetails &&
      this.state.currentInstalltionDate
    ) {
      const payload = {
        order_db_id: this.state.order_db_id1,
        body: {
          account_no: this.state.currentOrderDetails,
          install_date: this.state.currentInstalltionDate,
          status: "Sold",
        },
      };
      this.props.moversAction.cancelMover(payload);
    }
    if (
      this.state.order_db_id2 &&
      this.state.currentOrderDetails &&
      this.state.currentInstalltionDate
    ) {
      const payload = {
        order_db_id: this.state.order_db_id2,
        body: {
          account_no: this.state.currentOrderDetails,
          install_date: this.state.currentInstalltionDate,
          status: "Sold",
        },
      };
      this.props.moversAction.cancelMover(payload);
    }
    if (
      this.state.order_db_id3 &&
      this.state.currentOrderDetails &&
      this.state.currentInstalltionDate
    ) {
      const payload = {
        order_db_id: this.state.order_db_id3,
        body: {
          account_no: this.state.currentOrderDetails,
          install_date: this.state.currentInstalltionDate,
          status: "Sold",
        },
      };
      this.props.moversAction.cancelMover(payload);
    }
    // this.props.history.push({
    //   pathname: "/dashboard/concierge/workflow/internetthankyou",
    // });

    this.setState({
      openModal: false,
    });
  };

  validateFields = () => {
    let validity: boolean = true;
    if (!re.test(this.state.orderDetails)) {
      this.setState({
        orderError: true,
      });
      validity = false;
    }

    if (!this.state.installationDate) {
      this.setState({
        installationError: true,
      });
      validity = false;
    }

    return validity;
  };

  validateFields2 = () => {
    let validity: boolean = true;
    if (!re.test(this.state.orderDetails2)) {
      this.setState({
        orderError2: true,
      });
      validity = false;
    }

    if (!this.state.installationDate2) {
      this.setState({
        installationError2: true,
      });
      validity = false;
    }

    return validity;
  };

  validateFields3 = () => {
    let validity: boolean = true;
    if (!re.test(this.state.orderDetails3)) {
      this.setState({
        orderError3: true,
      });
      validity = false;
    }

    if (!this.state.installationDate3) {
      this.setState({
        installationError3: true,
      });
      validity = false;
    }

    return validity;
  };

  validateHoldFields1 = () => {
    let validity: boolean = true;
    if (!this.state.dob1) {
      this.setState({
        dob1Error: true,
      });
      validity = false;
    }

    if (!this.state.expectedInstallation1) {
      this.setState({
        expectedInstallation1Error: true,
      });
      validity = false;
    }

    return validity;
  };

  validateHoldFields2 = () => {
    let validity: boolean = true;
    if (!this.state.dob2) {
      this.setState({
        dob2Error: true,
      });
      validity = false;
    }

    if (!this.state.expectedInstallation2) {
      this.setState({
        expectedInstallation2Error: true,
      });
      validity = false;
    }

    return validity;
  };

  validateHoldFields3 = () => {
    let validity: boolean = true;
    if (!this.state.dob3) {
      this.setState({
        dob3Error: true,
      });
      validity = false;
    }

    if (!this.state.expectedInstallation3) {
      this.setState({
        expectedInstallation3Error: true,
      });
      validity = false;
    }

    return validity;
  };

  orderSaveHandler = () => {
    if (this.validateFields()) {
      this.setState({
        installationError: false,
        orderError: false,
        currentOrderDetails: this.state.orderDetails,
        currentInstalltionDate: this.state.installationDate,
        save1: true,
      });
      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[0],
          install_date: this.state.installationDate,
          image_link: this.state.image,
          is_user_initiated: true,
        };
        this.props.commonAction.appointmentPost(payload);
        // this.setState({
        //   openModal:false
        // })
      }
    }
  };
  orderSaveHandler2 = () => {
    if (this.validateFields2()) {
      this.setState({
        installationError2: false,
        orderError2: false,

        currentOrderDetails: this.state.orderDetails2,
        currentInstalltionDate: this.state.installationDate2,
        save2: true,
      });
      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[1],
          is_user_initiated: true,
          install_date: this.state.installationDate2,
          image_link: this.state.image1,
        };
        this.props.commonAction.appointmentPost(payload);
      }
    }
  };
  orderSaveHandler3 = () => {
    if (this.validateFields3()) {
      this.setState({
        installationError3: false,
        orderError3: false,
        currentOrderDetails: this.state.orderDetails3,
        currentInstalltionDate: this.state.installationDate3,
        save3: true,
      });
      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[2],
          is_user_initiated: true,
          install_date: this.state.installationDate3,
          image_link: this.state.image2,
        };
        this.props.commonAction.appointmentPost(payload);
      }
    }
  };

  orderHoldHandler1 = () => {
    if (this.validateHoldFields1()) {
      this.setState({
        holdSave1: true,
        currentDateOfBirth: this.state.dob1,
        currentExpectedInstallationDate: this.state.expectedInstallation1,
      });
      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[0],
          status: "On Hold",
          birth_date: this.state.dob1,
          expected_install_date: this.state.expectedInstallation1,
          is_user_initiated: true,
        };
        this.props.commonAction.appointmentPost(payload);
      }
    }
  };
  orderHoldHandler2 = () => {
    if (this.validateHoldFields2()) {
      this.setState({
        holdSave2: true,
        currentDateOfBirth: this.state.dob2,
        currentExpectedInstallationDate: this.state.expectedInstallation2,
      });

      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[1],
          status: "On Hold",
          birth_date: this.state.dob2,
          expected_install_date: this.state.expectedInstallation1,
          is_user_initiated: true,
        };
        this.props.commonAction.appointmentPost(payload);
      }
    }
  };
  orderHoldHandler3 = () => {
    if (this.validateHoldFields3()) {
      this.setState({
        holdSave3: true,
        currentDateOfBirth: this.state.dob3,
        currentExpectedInstallationDate: this.state.expectedInstallation3,
      });

      if (this.state.moveId !== "") {
        let payload = {
          move_id: this.state.moveId,
          type: "Digital",
          plan: this.state.buyNowData[2],
          status: "On Hold",
          birth_date: this.state.dob3,
          expected_install_date: this.state.expectedInstallation1,
          is_user_initiated: true,
        };
        this.props.commonAction.appointmentPost(payload);
      }
    }
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  handleSelect = (e: any) => {
    this.setState({
      installationDate: new Date(e).toISOString().split("T")[0],
    });
  };
  handleSelect2 = (e: any) => {
    this.setState({
      installationDate2: new Date(e).toISOString().split("T")[0],
    });
  };
  handleSelect3 = (e: any) => {
    this.setState({
      installationDate3: new Date(e).toISOString().split("T")[0],
    });
  };
  onChangeOrderDetails = (e: any) => {
    this.setState({ orderDetails: e.target.value });
  };
  onChangeOrderDetails2 = (e: any) => {
    this.setState({ orderDetails2: e.target.value });
  };
  onChangeOrderDetails3 = (e: any) => {
    this.setState({ orderDetails3: e.target.value });
  };

  handleNext = () => {
    this.props.history.push("/dashboard/concierge/workflow/internetthankyou");
  };

  onSwitchChange = (e: any, item: any, index: number) => {
    console.log(item);
    let buyNowData: any = this.state.buyNowData;
    let tempObject: any = { ...buyNowData[index] };
    tempObject.hold = e.target.checked;
    buyNowData[index] = tempObject;
    this.setState({ buyNowData: buyNowData });
  };

  onPasteImage = (name: string, value: any) => {
    if (name === "image") {
      this.setState({ image: value });
    } else if (name === "image1") {
      this.setState({ image1: value });
    } else if (name === "image2") {
      this.setState({ image2: value });
    }
  };
  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        {this.state.openModal ? (
          <Modal
            isShowModal={this.state.openModal}
            //  onCloseModal={() => this.setState({ openModal:false})}
            showClose={false}
            className="OpenModal"
          >
            <div className="OpenModal-main">
              <CheckCircleOutlineIcon
                style={{
                  color: "#347A35",
                  height: "50px",
                  width: "50px",
                }}
              />
              <div className="OpenModal-job">Success!</div>
              {this.state.order_id1 ? (
                <div className="order-confirmation-number">
                  Order Confirmation Number : {this.state.order_id1}
                </div>
              ) : null}
              {this.state.order_id2 ? (
                <div className="order-confirmation-number">
                  Order Confirmation Number : {this.state.order_id2}
                </div>
              ) : null}
              {this.state.order_id3 ? (
                <div className="order-confirmation-number">
                  Order Confirmation Number : {this.state.order_id3}
                </div>
              ) : null}
              {/* <div className="order-confirmation-number">
                 Installation date : {this.state.installationDate}
                 </div> */}

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

        <div>
          <ConciergeTabs
            tabName={"Int/Cable"}
            tabId={5}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="internet1-main">
              <div className="internet1-heading">
                <div className="internet1">Internet / Cable </div>
                <div>
                  <div className="titleNumberInternet">
                    <div className="left-number">6</div>
                    <div className="right-number">7</div>
                  </div>
                </div>
                <div className="objection-div">
                  <Button
                    className="objection"
                    startLogo={<ChatIcon />}
                    disabled={this.state.objectionCompleted}
                    color={
                      this.state.objectionCompleted ? "#DADADA" : "#EC6133 "
                    }
                    border={
                      this.state.objectionCompleted
                        ? "1px solid #DADADA"
                        : "1px solid #EC6133"
                    }
                    backgroundColor="#fff"
                    //  onClick={() => { this.setState({ objectionClick: true }) }}
                  >
                    Objection
                  </Button>
                </div>
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-internet">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}

              {
                <div className="script-div">
                  {this.state.scriptContent &&
                    this.state.scriptContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper-internet1-script">
                          <div className="points-div-internet1">
                            <div className="outer-point-internet1">
                              <div className="inner-point-internet1"></div>
                            </div>
                            <div className="vertical-line-internet1"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-internet1"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }

              <div className="point-content-wrapper-internet1">
                <div className="points-div-internet1">
                  <div className="outer-point-internet1">
                    <div className="inner-point-internet1"></div>
                  </div>
                  <div className="vertical-line-internet1"></div>
                </div>

                <div className="point-content-internet1">
                  Selected Internet / Cable provider
                  <div className="step6InsuranceCardDiv">
                    {this.state.buyNowData &&
                      this.state.buyNowData.map((item: any, index: number) => {
                        return (
                          <InsuranceCompanyCard
                            switchButton={true}
                            isHold={item.hold}
                            onSwichChange={(e: any) =>
                              this.onSwitchChange(e, item, index)
                            }
                            plan={item}
                            EditHandler={() =>
                              this.props.history.push(
                                "/dashboard/concierge/workflow/internetstep5"
                              )
                            }
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
              {this.state.save1 == false && this.state.holdSave1 == false ? (
                <div className="point-content-wrapper-internet1">
                  <div className="points-div-internet1">
                    <div className="outer-point-internet1">
                      <div className="inner-point-internet1"></div>
                    </div>
                    <div className="vertical-line-internet1"></div>
                  </div>

                  <div className="point-content-internet1">
                    Order completion details for{" "}
                    {this.state.buyNowData &&
                      this.state.buyNowData[0].provider_name}
                    <div className="step6FormDiv">
                      {this.state.buyNowData &&
                      this.state.buyNowData[0].hold ? (
                        <div className="holdDataCard">
                          <div className="inputDiv">
                            <div className="title">Enter Birth Date</div>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  min: new Date(1950, 1, 1)
                                    .toISOString()
                                    .split("T")[0],
                                  max: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Enter birth date"
                              value={this.state.dob1}
                              onChange={(e: any) =>
                                this.setState({ dob1: e.target.value })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.dob1}
                            /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Enter birth date"
                                value={this.state.dob1}
                                onChange={(e: any) => {
                                  this.setState({
                                    dob1: e,
                                  });
                                }}
                                minDate={new Date(1950, 1, 1)}
                                maxDate={new Date()}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {this.state.dob1Error ? (
                              <div className="error">Select Date of birth</div>
                            ) : null}
                          </div>
                          <div className="inputDiv">
                            <div className="title">
                              Expected Installation Date
                            </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Expected installation date"
                                value={this.state.expectedInstallation1}
                                onChange={(e: any) => {
                                  this.setState({
                                    expectedInstallation1: e,
                                  });
                                }}
                                // hidden
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                maxDate={new Date(2040, 12, 30)}
                                minDate={new Date()}
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  max: new Date(2040, 12, 30)
                                    .toISOString()
                                    .split("T")[0],
                                  min: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Expected Installation Date"
                              value={this.state.expectedInstallation1}
                              onChange={(e: any) =>
                                this.setState({
                                  expectedInstallation1: e.target.value,
                                })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.expectedInstallation1}
                            /> */}
                            {this.state.expectedInstallation1Error ? (
                              <div className="error">
                                Select installation date
                              </div>
                            ) : null}
                          </div>
                          <Button
                            className="saveButton"
                            onClick={() => this.orderHoldHandler1()}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <OrderCompletionCard
                          OrderSaveHandler={() => this.orderSaveHandler()}
                          handleSelect={this.handleSelect}
                          installationDate={this.state.installationDate}
                          orderDetails={this.state.orderDetails}
                          onChangeOrderDetails={this.onChangeOrderDetails}
                          orderError={this.state.orderError}
                          installationError={this.state.installationError}
                          id="internet1"
                          onImagePaste={this.onPasteImage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
              {this.state.buyNowData.length >= 2 &&
              this.state.save2 == false &&
              this.state.holdSave2 == false ? (
                <div className="point-content-wrapper-internet1">
                  <div className="points-div-internet1">
                    <div className="outer-point-internet1">
                      <div className="inner-point-internet1"></div>
                    </div>
                    <div className="vertical-line-internet1"></div>
                  </div>

                  <div className="point-content-internet1">
                    Order completion details for{" "}
                    {this.state.buyNowData &&
                      this.state.buyNowData[1].provider_name}
                    <div className="step6FormDiv">
                      {this.state.buyNowData &&
                      this.state.buyNowData[1].hold ? (
                        <div className="holdDataCard">
                          <div className="inputDiv">
                            <div className="title">Enter Birth Date</div>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  min: new Date(1950, 1, 1)
                                    .toISOString()
                                    .split("T")[0],
                                  max: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Enter birth date"
                              value={this.state.dob2}
                              onChange={(e: any) =>
                                this.setState({ dob2: e.target.value })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.dob2}
                            /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Enter birth date"
                                value={this.state.dob2}
                                onChange={(e: any) => {
                                  this.setState({
                                    dob2: e,
                                  });
                                }}
                                // hidden
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                minDate={new Date(1950, 1, 1)}
                                maxDate={new Date()}
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {this.state.dob2Error ? (
                              <div className="error">Enter date of birth</div>
                            ) : null}
                          </div>
                          <div className="inputDiv">
                            <div className="title">
                              Expected Installation Date
                            </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Expected installation date"
                                value={this.state.expectedInstallation2}
                                onChange={(e: any) => {
                                  this.setState({
                                    expectedInstallation2: e,
                                  });
                                }}
                                // hidden
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                maxDate={new Date(2040, 12, 30)}
                                minDate={new Date()}
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  max: new Date(2040, 12, 30)
                                    .toISOString()
                                    .split("T")[0],
                                  min: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Expected Installation Date"
                              value={this.state.expectedInstallation2}
                              onChange={(e: any) =>
                                this.setState({
                                  expectedInstallation2: e.target.value,
                                })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.expectedInstallation2}
                            /> */}
                            {this.state.expectedInstallation2Error ? (
                              <div className="error">
                                Enter installation date
                              </div>
                            ) : null}
                          </div>
                          <Button
                            className="saveButton"
                            onClick={() => this.orderHoldHandler2()}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <OrderCompletionCard
                          id="internet2"
                          OrderSaveHandler={() => this.orderSaveHandler2()}
                          handleSelect={this.handleSelect2}
                          installationDate={this.state.installationDate2}
                          orderDetails={this.state.orderDetails2}
                          onChangeOrderDetails={this.onChangeOrderDetails2}
                          orderError={this.state.orderError2}
                          installationError={this.state.installationError2}
                          onImagePaste={this.onPasteImage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
              {this.state.buyNowData.length == 3 &&
              this.state.save3 == false &&
              this.state.holdSave3 == false ? (
                <div className="point-content-wrapper-internet1">
                  <div className="points-div-internet1">
                    <div className="outer-point-internet1">
                      <div className="inner-point-internet1"></div>
                    </div>
                    <div className="vertical-line-internet1"></div>
                  </div>

                  <div className="point-content-internet1">
                    Order completion details for{" "}
                    {this.state.buyNowData &&
                      this.state.buyNowData[2].provider_name}
                    <div className="step6FormDiv">
                      {this.state.buyNowData &&
                      this.state.buyNowData[2].hold ? (
                        <div className="holdDataCard">
                          <div className="inputDiv">
                            <div className="title">Enter Birth Date</div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Enter birth date"
                                value={this.state.dob3}
                                onChange={(e: any) => {
                                  this.setState({
                                    dob3: e,
                                  });
                                }}
                                // hidden
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                minDate={new Date(1950, 1, 1)}
                                maxDate={new Date()}
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  min: new Date(1950, 1, 1)
                                    .toISOString()
                                    .split("T")[0],
                                  max: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Enter birth date"
                              value={this.state.dob3}
                              onChange={(e: any) =>
                                this.setState({ dob3: e.target.value })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.dob3}
                            /> */}
                            {this.state.dob3Error ? (
                              <div className="error">Enter date of birth</div>
                            ) : null}
                          </div>
                          <div className="inputDiv">
                            <div className="title">
                              Expected Installation Date
                            </div>
                            {/* <CustomizedInput
                              type="date"
                              InputProps={{
                                inputProps: {
                                  max: new Date(2040, 12, 30)
                                    .toISOString()
                                    .split("T")[0],
                                  min: new Date().toISOString().split("T")[0],
                                },
                              }}
                              className="CustomInput"
                              label="Expected Installation Date"
                              value={this.state.expectedInstallation3}
                              onChange={(e: any) =>
                                this.setState({
                                  expectedInstallation3: e.target.value,
                                })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={!this.state.expectedInstallation3}
                            /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                // variant="inline"
                                // ampm={true}
                                label="Expected installation date"
                                value={this.state.expectedInstallation3}
                                onChange={(e: any) => {
                                  this.setState({ expectedInstallation3: e });
                                }}
                                // hidden
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="CustomDate"
                                // disablePast
                                maxDate={new Date(2040, 12, 30)}
                                minDate={new Date()}
                                format="MM/dd/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                            {this.state.expectedInstallation3Error ? (
                              <div className="error">
                                Enter installation date
                              </div>
                            ) : null}
                          </div>
                          <Button
                            className="saveButton"
                            onClick={() => this.orderHoldHandler3()}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <OrderCompletionCard
                          id="internet3"
                          OrderSaveHandler={() => this.orderSaveHandler3()}
                          // handleSelect={this.handleSelect3}
                          installationDate={this.state.installationDate3}
                          orderDetails={this.state.orderDetails3}
                          onChangeOrderDetails={this.onChangeOrderDetails3}
                          orderError={this.state.orderError3}
                          installationError={this.state.installationError3}
                          onImagePaste={this.onPasteImage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Continue"}
              buttonStartLogo1={<ArrowBackIcon />}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/internetstep5"
                )
              }
              ButtonOnClick2={() => {
                this.handleNext();
              }}
              // button2Disabled={!(this.state.order_id1 || this.state.order_id2 || this.state.order_db_id3)}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(CommonAction, dispatch),
    moversAction: bindActionCreators(MoversAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetStep6);
