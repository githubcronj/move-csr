import React from "react";
import "./utilitiesStep3.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Gas from "../../Assets/images/Utilities/Utilites-Gas.svg";
import Electricity from "../../Assets/images/Utilities/Utilites-Electricity.svg";
import UtilitiesSecondCard from "../../components/Utilities/UtilitiesSecondCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action2 from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import OrderCompletionCard from "../../components/OrderCompletionCard/OrderCompletionCard";
import Modal from "../../components/atoms/Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

let re = /^[a-zA-Z0-9]{2,40}$/;

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  isDataArrived2: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  moveId: string;
  loader: boolean;
  electricityInstallationDate: string;
  electricityOrderDetails: string;
  electricityImage: any;
  gasInstallationDate: string;
  gasOrderDetails: string;
  gasImage: any;
  // orderError: boolean;
  // installationError: boolean;
  openModal: boolean;
  electricityAccountNumber: any;
  electricityStartDate: any;
  electricityEndDate: any;
  electricityAccountType: any;
  gasAccountNumber: any;
  gasStartDate: any;
  gasEndDate: any;
  gasAccountType: any;
  accountTypeOptions: any;
  orderData: any;
  saveElectricity: boolean;
  saveGas: boolean;
};

class UtilitiesStep3 extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [
      // {
      //   logo: Gas,
      //   title: "GAS",
      //   subTitle: "AEP Ohio",
      //   phone: "+1 777-464-5748",
      // },
      // {
      //   logo: Electricity,
      //   title: "ELECTRICITY",
      //   subTitle: "Columbia Gas of Ohio",
      //   phone: "+1 777-464-5748",
      // },
    ],
    closed: false,
    isDataArrived2: true,
    scriptContent: [],
    hintContent: "",
    objectionCompleted: true,
    moveId: "",
    loader: true,
    electricityInstallationDate: "",
    electricityOrderDetails: "",
    electricityImage: null,
    gasInstallationDate: "",
    gasOrderDetails: "",
    gasImage: null,
    // orderError: false,
    // installationError: false,
    openModal: false,
    electricityAccountNumber: "",
    electricityStartDate: new Date().toISOString().split("T")[0],
    electricityEndDate: new Date().toISOString().split("T")[0],
    electricityAccountType: "",
    gasAccountNumber: "",
    gasStartDate: new Date().toISOString().split("T")[0],
    gasEndDate: new Date().toISOString().split("T")[0],
    gasAccountType: "",
    accountTypeOptions: [
      { value: "", label: "" },
      { value: "Transfer", label: "Transfer" },
      { value: "New", label: "New" },
    ],
    orderData: [],
    saveElectricity: false,
    saveGas: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "utilities",
      page: 2,
    });

    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedUtility
    ) {
      // console.log(this.props.history.location.state.selectedUtility);
      this.setState({
        listContent: this.props.history.location.state.selectedUtility,
        // moveId: this.props.history.location.state.moveId,
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
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
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let points: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 3) {
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
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.isAppointmentPost
    // ) {
    //   nextProps.commonState.isAppointmentPost = false;
    //   nextProps.history.push("/dashboard/concierge/workflow/utilitiesthankyou");
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.appointmentPost.orders &&
      nextProps.commonState.isAppointmentPost
    ) {
      nextProps.commonState.isAppointmentPost = false;
      // const payload = {
      //   service: "Utilities",
      //   moveId: currentState.moveId,
      // };
      // nextProps.commonAction.orderGet(payload);
      let orderData: any = [];
      nextProps.commonState.appointmentPost.orders.map((item: any) => {
        orderData.push(item);
      });
      currentState.orderData = orderData;
      currentState.openModal = true;
      // nextProps.history.push("/dashboard/concierge/workflow/moversthankyou");
    } else if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.error !== null
    ) {
      window.alert(`${nextProps.commonState.error}`);
      nextProps.commonState.error = null;
    }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.order &&
    //   nextProps.commonState.order.length &&
    //   nextProps.commonState.orderDataArrived
    // ) {
    //   let orderData: any = [];
    //   nextProps.commonState.order.map((item: any) => {
    //     orderData.push(item);
    //   });
    //   currentState.orderData = orderData;
    //   nextProps.commonState.orderDataArrived = false;
    // }

    return currentState;
  }

  confirmHandler = () => {
    // let payload = {
    //   move_id: this.state.moveId,
    //   type: "Utilities",
    //   data: {
    //     utility_id: this.state.listContent[0].utility_id,
    //     provider_type: this.state.listContent[0].provider_type,
    //     // account_no: this.state.orderDetails,
    //     // install_date: this.state.installationDate,
    //   },
    // };
    // // console.log(payload);
    // this.props.commonAction.appointmentPost(payload);
    this.setState({
      openModal: false,
    });
  };

  // validateFields = () => {
  //   let validity: boolean = true;
  //   if (!re.test(this.state.orderDetails)) {
  //     this.setState({
  //       orderError: true,
  //     });
  //     validity = false;
  //   }

  //   if (!this.state.installationDate) {
  //     this.setState({
  //       installationError: true,
  //     });
  //     validity = false;
  //   }
  //   return validity;
  // };

  orderSaveHandler = () => {
    // if (this.validateFields()) {
    this.setState({
      // installationError: false,
      // orderError: false,
      openModal: true,
    });
    // }
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  // handleSelect = (e: any) => {
  //   this.setState({ installationDate: e.target.value });
  // };

  // onChangeOrderDetails = (e: any) => {
  //   this.setState({ orderDetails: e.target.value });
  // };

  handleNext = () => {
    let data = this.state.listContent;
    let providerType: any = [];
    let zipcode: any = "";
    data.map((item: any) => {
      if (
        (item.provider_type === "Electricity" ||
          item.provider_type === "Gas" ||
          item.provider_type === "Water" ||
          item.provider_type === "Trash") &&
        item.selected
      ) {
        providerType.push(item.provider_type);
        zipcode = item.zipcode;
        // this.props.history.push({
        //   pathname: "/dashboard/concierge/workflow/utilitiesthankyou",
        //   state: {
        //     selectedUtilities: this.state.listContent,
        //   },
        // });
      }
      // else {
      // this.props.history.push(
      //   "/dashboard/concierge/workflow/utilitiesthankyou"
      // );
      // }
    });
    if (this.state.moveId !== "") {
      let payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        is_in_mail: true,
        data: {
          zipcode: zipcode,
          provider_types: providerType,
        },
      };
      this.props.commonAction.appointmentPost(payload);
      this.props.history.push(
        "/dashboard/concierge/workflow/utilitiesthankyou"
      );
    }
  };

  electricityMovePost = (item: any) => {
    let payload: any = {};
    if (this.state.electricityAccountType === "New") {
      payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        account_no: this.state.electricityAccountNumber,
        start_date: this.state.electricityStartDate,
        account_type: this.state.electricityAccountType,
        image_link: this.state.electricityImage,
        data: {
          zipcode: item.zipcode,
          provider_type: "Electricity",
        },
      };
    } else {
      payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        account_no: this.state.electricityAccountNumber,
        start_date: this.state.electricityStartDate,
        stop_date: this.state.electricityEndDate,
        account_type: this.state.electricityAccountType,
        image_link: this.state.electricityImage,
        data: {
          zipcode: item.zipcode,
          provider_type: "Electricity",
        },
      };
    }
    this.props.commonAction.appointmentPost(payload);
    this.setState({
      saveElectricity: true,
      electricityAccountNumber: "",
      electricityStartDate: "",
      electricityEndDate: "",
      electricityAccountType: "",
      electricityImage: "",
    });
  };

  gasMovePost = (item: any) => {
    let payload: any = {};
    if (this.state.gasAccountType === "New") {
      payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        account_no: this.state.gasAccountNumber,
        start_date: this.state.gasStartDate,
        account_type: this.state.gasAccountType,
        image_link: this.state.gasImage,
        data: {
          zipcode: item.zipcode,
          provider_type: "Gas",
        },
      };
    } else {
      payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        account_no: this.state.gasAccountNumber,
        start_date: this.state.gasStartDate,
        stop_date: this.state.gasEndDate,
        account_type: this.state.gasAccountType,
        image_link: this.state.gasImage,
        data: {
          zipcode: item.zipcode,
          provider_type: "Gas",
        },
      };
    }
    this.props.commonAction.appointmentPost(payload);
    this.setState({
      saveGas: true,
      gasAccountNumber: "",
      gasStartDate: "",
      gasEndDate: "",
      gasAccountType: "",
      gasImage: "",
    });
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        {this.state.openModal ? (
          <Modal
            isShowModal={this.state.openModal}
            onCloseModal={() => this.setState({ openModal: false })}
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
              {this.state.orderData &&
                this.state.orderData.map((item: any) => {
                  // console.log(item);
                  return (
                    <div>
                      <div className="OpenModal-job">
                        {item.product && item.product.provider_type}
                      </div>
                      <div className="order-confirmation-number">
                        Order Confirmation Number :{" "}
                        {item.product && item.product.order_id}
                      </div>
                      {/* <div className="order-confirmation-number">
                        Installation date :{" "}
                        {item.product && item.product.appointment_date}
                      </div> */}
                    </div>
                  );
                })}

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
            tabName={"Utilities"}
            tabId={6}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="utilities-3-main">
              <div className="utilities-3-heading">
                <div className="utilities-3">Utilities </div>
                <div>
                  <div className="titleNumberUtilities">
                    <div className="left-number">2</div>
                    <div className="right-number">2</div>
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
                <div className="helpful-div-utilities">
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
                        <div className="point-content-wrapper-utilities3-script">
                          <div className="points-div-utilities3">
                            <div className="outer-point-utilities3">
                              <div className="inner-point-utilities3"></div>
                            </div>
                            <div className="vertical-line-utilities3"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-utilities3"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }

              <div className="point-content-wrapper-utilities3">
                <div className="points-div-utilities3">
                  <div className="outer-point-utilities3">
                    <div className="inner-point-utilities3"></div>
                  </div>
                  <div className="vertical-line-utilities3"></div>
                </div>

                <div className="point-content-utilities3">
                  As our energy partner, they have exclusive prices and special
                  programs for your new home for both electricity and natural
                  gas.
                  <div className="utilitiesStep3FlexDiv">
                    {this.state.listContent.map((item: any) => {
                      return (
                        // item.selected ?
                        <div className="secondCard">
                          <UtilitiesSecondCard
                            logo={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                            phone={item.phone}
                            isLaunch={
                              (item.provider_type === "Electricity" ||
                                item.provider_type === "Gas") &&
                              item.completed
                                ? true
                                : false
                            }
                            onLaunch={() =>
                              item && item.url && item.url !== "Not Found"
                                ? window.open(item.url, "_blank")
                                : null
                            }
                          />
                        </div>
                      );
                      //  : null;
                    })}

                    <div>
                      Curabitur blandit tempus porttitor. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Aenean lacinia bibendum
                      nulla sed consectetur. Fusce dapibus, tellus ac cursus
                      commodo, tortor mauris condimentum nibh, ut fermentum
                      massa justo sit amet risus.
                    </div>
                  </div>
                </div>
              </div>

              {this.state.listContent &&
                this.state.listContent.map((item: any) => {
                  if (
                    item.completed &&
                    ((item.provider_type === "Electricity" &&
                      !this.state.saveElectricity) ||
                      (item.provider_type === "Gas" && !this.state.saveGas))
                  ) {
                    return (
                      <div className="point-content-wrapper-utilities3">
                        <div className="points-div-utilities3">
                          <div className="outer-point-utilities3">
                            <div className="inner-point-utilities3"></div>
                          </div>
                          <div className="vertical-line-utilities3"></div>
                        </div>

                        <div className="point-content-utilities3">
                          {`Order completion details(${item.provider_type})`}
                          <div className="utilitiesFormDiv">
                            <div className="inputDiv">
                              <div className="label">Account Type</div>
                              <CustomizedSelect
                                label="Select Account Type"
                                value={
                                  item.provider_type === "Electricity"
                                    ? this.state.electricityAccountType
                                    : this.state.gasAccountType
                                }
                                onChange={(e: any) =>
                                  item.provider_type === "Electricity"
                                    ? this.setState({
                                        electricityAccountType: e.target.value,
                                      })
                                    : this.setState({
                                        gasAccountType: e.target.value,
                                      })
                                }
                                options={this.state.accountTypeOptions}
                                // className="customInput"
                              />
                            </div>
                            <div className="inputFlexDivUtilities">
                              <div className="inputDivUtilities">
                                <div className="inputDiv">
                                  <div className="label">Start Date</div>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      // variant="inline"
                                      // ampm={true}
                                      label="Enter Start Date"
                                      value={
                                        item.provider_type === "Electricity"
                                          ? this.state.electricityStartDate
                                          : this.state.gasStartDate
                                      }
                                      onChange={(e: any) =>
                                        item.provider_type === "Electricity"
                                          ? this.setState({
                                              electricityStartDate: new Date(e)
                                                .toISOString()
                                                .split("T")[0],
                                            })
                                          : this.setState({
                                              gasStartDate: new Date(e)
                                                .toISOString()
                                                .split("T")[0],
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
                                  {/* <CustomizedInput
                                    label="Enter Start Date"
                                    value={
                                      item.provider_type === "Electricity"
                                        ? this.state.electricityStartDate
                                        : this.state.gasStartDate
                                    }
                                    onChange={(e: any) =>
                                      item.provider_type === "Electricity"
                                        ? this.setState({
                                            electricityStartDate:
                                              e.target.value,
                                          })
                                        : this.setState({
                                            gasStartDate: e.target.value,
                                          })
                                    }
                                    InputProps={{
                                      inputProps: {
                                        min: new Date()
                                          .toISOString()
                                          .split("T")[0],
                                      },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    className="customInput"
                                  /> */}
                                </div>
                              </div>
                              {item.provider_type === "Electricity" &&
                              this.state.electricityAccountType !== "New" ? (
                                <div className="inputDivUtilities">
                                  <div className="inputDiv">
                                    <div className="label">Stop Date</div>
                                    <MuiPickersUtilsProvider
                                      utils={DateFnsUtils}
                                    >
                                      <KeyboardDatePicker
                                        // variant="inline"
                                        // ampm={true}
                                        label="Enter Stop Date"
                                        value={
                                          item.provider_type === "Electricity"
                                            ? this.state.electricityEndDate
                                            : this.state.gasEndDate
                                        }
                                        onChange={(e: any) =>
                                          item.provider_type === "Electricity"
                                            ? this.setState({
                                                electricityEndDate: new Date(e)
                                                  .toISOString()
                                                  .split("T")[0],
                                              })
                                            : this.setState({
                                                gasEndDate: new Date(e)
                                                  .toISOString()
                                                  .split("T")[0],
                                              })
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        minDate={
                                          this.state.electricityStartDate
                                        }
                                        minDateMessage={
                                          this.state.electricityStartDate !== ""
                                            ? "Please enter a valid end date"
                                            : ""
                                        }
                                        className="CustomDate"
                                        // onError={console.log}
                                        disablePast
                                        format="MM/dd/yyyy"
                                      />
                                    </MuiPickersUtilsProvider>
                                    {/* <CustomizedInput
                                      label="Enter Stop Date"
                                      value={
                                        item.provider_type === "Electricity"
                                          ? this.state.electricityEndDate
                                          : this.state.gasEndDate
                                      }
                                      onChange={(e: any) =>
                                        item.provider_type === "Electricity"
                                          ? this.setState({
                                              electricityEndDate:
                                                e.target.value,
                                            })
                                          : this.setState({
                                              gasEndDate: e.target.value,
                                            })
                                      }
                                      InputProps={{
                                        inputProps: {
                                          min: this.state.electricityStartDate,
                                        },
                                      }}
                                      disabled={
                                        this.state.electricityStartDate === ""
                                          ? true
                                          : false
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      type="date"
                                      className="customInput"
                                    /> */}
                                  </div>
                                </div>
                              ) : item.provider_type === "Gas" &&
                                this.state.gasAccountType !== "New" ? (
                                <div className="inputDivUtilities">
                                  <div className="inputDiv">
                                    <div className="label">Stop Date</div>
                                    <MuiPickersUtilsProvider
                                      utils={DateFnsUtils}
                                    >
                                      <KeyboardDatePicker
                                        // variant="inline"
                                        // ampm={true}
                                        label="Enter Stop Date"
                                        value={
                                          item.provider_type === "Electricity"
                                            ? this.state.electricityEndDate
                                            : this.state.gasEndDate
                                        }
                                        onChange={(e: any) =>
                                          item.provider_type === "Electricity"
                                            ? this.setState({
                                                electricityEndDate: new Date(e)
                                                  .toISOString()
                                                  .split("T")[0],
                                              })
                                            : this.setState({
                                                gasEndDate: new Date(e)
                                                  .toISOString()
                                                  .split("T")[0],
                                              })
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        minDate={this.state.gasStartDate}
                                        minDateMessage={
                                          this.state.gasStartDate !== ""
                                            ? "Please enter a valid end date"
                                            : ""
                                        }
                                        className="CustomDate"
                                        // onError={console.log}
                                        disablePast
                                        format="MM/dd/yyyy"
                                      />
                                    </MuiPickersUtilsProvider>
                                    {/* <CustomizedInput
                                      label="Enter Stop Date"
                                      value={
                                        item.provider_type === "Electricity"
                                          ? this.state.electricityEndDate
                                          : this.state.gasEndDate
                                      }
                                      onChange={(e: any) =>
                                        item.provider_type === "Electricity"
                                          ? this.setState({
                                              electricityEndDate:
                                                e.target.value,
                                            })
                                          : this.setState({
                                              gasEndDate: e.target.value,
                                            })
                                      }
                                      InputProps={{
                                        inputProps: {
                                          min: this.state.gasStartDate,
                                        },
                                      }}
                                      disabled={
                                        this.state.gasStartDate === ""
                                          ? true
                                          : false
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      type="date"
                                      className="customInput"
                                    /> */}
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            <div className="inputDiv">
                              <div className="label">Account Number</div>
                              <CustomizedInput
                                label="Enter Account Number"
                                value={
                                  item.provider_type === "Electricity"
                                    ? this.state.electricityAccountNumber
                                    : this.state.gasAccountNumber
                                }
                                onChange={(e: any) =>
                                  item.provider_type === "Electricity"
                                    ? this.setState({
                                        electricityAccountNumber:
                                          e.target.value,
                                      })
                                    : this.setState({
                                        gasAccountNumber: e.target.value,
                                      })
                                }
                                className="customInput"
                              />
                            </div>

                            <div className="inputDiv">
                              <div className="label">
                                Paste Confirmation Image Here
                              </div>
                              {/* <CustomizedInput
                                // label="Paste COnfirmation Image Here"
                                value={
                                  item.provider_type === "Electricity"
                                    ? this.state.electricityImage
                                    : this.state.gasImage
                                }
                                onChange={(e: any) => {
                                  // console.log(
                                  //   e.target.files[0],
                                  //   this.state.electricityImage,
                                  //   this.state.gasImage
                                  // );
                                  item.provider_type === "Electricity"
                                    ? this.setState({
                                        electricityImage: e.target.value,
                                      })
                                    : this.setState({
                                        gasImage: e.target.value,
                                      });
                                }}
                                type="file"
                                id={
                                  item.provider_type === "Electricity"
                                    ? "electricity"
                                    : "gas"
                                }
                                className="fileInput"
                              /> */}
                              <div
                                className="inputFileDiv"
                                id={
                                  item.provider_type === "Electricity"
                                    ? "electricity"
                                    : "gas"
                                }
                                contentEditable="true"
                                onPaste={(e: any) => {
                                  let currentTarget =
                                    item.provider_type === "Electricity"
                                      ? document.querySelector("#electricity")
                                      : document.querySelector("#gas");

                                  if (item.provider_type === "Electricity") {
                                    if (e.clipboardData.files.length > 0) {
                                      // if (
                                      //   e.clipboardData.files[0].type.startWith(
                                      //     "image/"
                                      //   )
                                      // ) {
                                      const fileReader = new FileReader();
                                      fileReader.readAsDataURL(
                                        e.clipboardData.files[0]
                                      );
                                      fileReader.onload = () => {
                                        if (
                                          currentTarget &&
                                          currentTarget !== null
                                        ) {
                                          currentTarget.innerHTML = `<img src="${fileReader.result}" />`;
                                        }

                                        this.setState({
                                          electricityImage: fileReader.result,
                                        });
                                      };
                                      // }
                                    }
                                  } else {
                                    if (e.clipboardData.files.length > 0) {
                                      // if (
                                      //   e.clipboardData.files[0].type.startWith(
                                      //     "image/"
                                      //   )
                                      // ) {
                                      const fileReader = new FileReader();
                                      fileReader.readAsDataURL(
                                        e.clipboardData.files[0]
                                      );
                                      fileReader.onload = () => {
                                        if (
                                          currentTarget &&
                                          currentTarget !== null
                                        ) {
                                          currentTarget.innerHTML = `<img src="${fileReader.result}" />`;
                                        }
                                        this.setState({
                                          gasImage: fileReader.result,
                                        });
                                      };
                                      // }
                                    }
                                  }
                                  console.log(e.clipboardData.files);
                                }}
                              >
                                {/* {item.provider_type === "Electricity" ? (
                                  this.state.electricityImage ? (
                                    <img src={this.state.electricityImage} />
                                  ) : null
                                ) : this.state.gasImage ? (
                                  <img src={this.state.gasImage} />
                                ) : null} */}
                              </div>
                            </div>
                            <Button
                              className="saveButton"
                              onClick={() =>
                                item.provider_type === "Electricity"
                                  ? this.electricityMovePost(item)
                                  : this.gasMovePost(item)
                              }
                            >
                              Save
                            </Button>
                            {/* <OrderCompletionCard
                         OrderSaveHandler={() => this.orderSaveHandler()}
                         handleSelect={this.handleSelect}
                         installationDate={this.state.installationDate}
                         orderDetails={this.state.orderDetails}
                         onChangeOrderDetails={this.onChangeOrderDetails}
                         orderError={this.state.orderError}
                         installationError={this.state.installationError}
                    /> */}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              <div className="point-content-wrapper-utilities3">
                <div className="points-div-utilities3">
                  <div className="outer-point-utilities3">
                    <div className="inner-point-utilities3"></div>
                  </div>
                  <div className="vertical-line-utilities3"></div>
                </div>

                <div className="point-content-utilities3">
                  Keep user engaged during external ordering
                </div>
              </div>
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
                  "/dashboard/concierge/workflow/utilitiesstep2"
                )
              }
              ButtonOnClick2={() => {
                // this.props.history.push(
                //   "/dashboard/concierge/workflow/homeprosstep1"
                // );
                this.handleNext();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(Action2, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesStep3);
