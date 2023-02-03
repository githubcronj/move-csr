import React from "react";
import "./solarStep1.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "../../components/atoms/Button";
import ChatIcon from "@material-ui/icons/Chat";
import Modal from "../../components/atoms/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import ObjectionCard1 from "../../components/Objection/ObjectionCard1";
import ObjectionCard2 from "../../components/Objection/ObjectionCard2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import { formatPhoneInput, validateEmail } from "../../utils/formValidation";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  listContentObjection: any;
  listContentObjection2: any;
  objectionClick: boolean;
  currentObjectionStep: number;
  objectionList1: any;
  selected: boolean;
  objectionCompleted: boolean;
  isDataArrived: boolean;
  hintContent: string;
  loader: boolean;
  date: any;
  time: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  moveId: string;
  isGetMove: boolean;
  isScheduleCall: boolean;
  submitClicked: boolean;
  openModal: boolean;
  orderNumber: any;
};

class SolarStep1 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    hintContent: "",
    listContent: [
      //  <div>The last step in our process will be getting your electricity and natural gas solar set up.</div>,
      //  <div>For this step, we partner with <span className="highlighted">NRG Solar</span></div>,
      //  <div>As our solar partner, they have exclusive prices and special programs for your new home for both electricity and natural gas.</div>
    ],
    closed: false,
    objectionCompleted: false,
    objectionClick: false,
    currentObjectionStep: 1,
    objectionList1: [
      {
        objection1: "I’m setting up internet myself",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "That’s been taken care of",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "Don’t know when we will be moving in",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "Other (specify)",
        possibility: "4 possible rebutals",
        selected: false,
      },
    ],
    listContentObjection: [
      "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue",
      "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.",
      "Lorem ipsum dolor sit amet.",
    ],
    listContentObjection2: [
      {
        objection2: "I can facilitate when your date changes",
        selected: false,
      },
      {
        objection2: "I can help you with the perfect date to move",
        selected: false,
      },
      {
        objection2: "My team will help you with this, you don’t have to worry",
        selected: false,
      },
    ],
    selected: false,
    loader: true,
    date: new Date().toISOString(),
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    moveId: "",
    isGetMove: true,
    isScheduleCall: true,
    submitClicked: false,
    openModal: false,
    orderNumber: null,
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };
  objectionCardHandler = (item: any) => {
    let objectionList = this.state.objectionList1;
    objectionList.map((item2: any) => {
      if (item2.objection1 == item.objection1) {
        item2.selected = true;
      } else {
        item2.selected = false;
      }
    });

    this.setState({
      objectionList1: objectionList,
    });
  };

  selectHandler = (item: any) => {
    this.setState({
      selected: true,
    });
    let objectionList2 = this.state.listContentObjection2;
    objectionList2.map((item2: any) => {
      if (item2.objection2 == item.objection2) {
        item2.selected = true;
      } else {
        item2.selected = false;
      }
    });

    this.setState({
      listContentObjection2: objectionList2,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let date = new Date(new Date().setDate(new Date().getDate() + 45));
    // console.log(date);
    this.setState({ date: date.toISOString() });
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "solar",
      page: 1,
    });
  }
  componentDidUpdate(prevProps: initialProps) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    console.log(cur);
    if (
      prev.appointmentPost !== cur.appointmentPost &&
      cur.appointmentPost &&
      cur.appointmentPost.orders &&
      cur.appointmentPost.orders.length > 0 &&
      cur.isAppointmentPost
    ) {
      cur.isAppointmentPost = false;
      this.setState({
        submitClicked: false,
        openModal: true,
        orderNumber:
          cur.appointmentPost.orders[0] &&
          cur.appointmentPost.orders[0].product &&
          cur.appointmentPost.orders[0].product.order_id,
      });
      // this.props.history.push("/dashboard/concierge/workflow/solarstep2");
    }
    if (prev.error !== cur.error && cur.error !== null) {
      this.setState({ submitClicked: false });
      window.alert(`${cur.error}`);
      cur.error = null;
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;
      let points: any = [];
      let hintContent: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 1) {
      // points.push(item.script_content)
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

      currentState.hintContent = hintPara;
      currentState.listContent = points;
      currentState.loader = false;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move[0] &&
      (nextProps.commonState.isGetMove || currentState.isGetMove)
    ) {
      nextProps.commonState.isGetMove = false;
      currentState.isGetMove = false;
      currentState.moveId = nextProps.commonState.move[0].id;
      currentState.firstName =
        nextProps.commonState.move[0].user_ref.first_name;
      currentState.lastName = nextProps.commonState.move[0].user_ref.last_name;
      currentState.email = nextProps.commonState.move[0].user_ref.email;
      currentState.phone = nextProps.commonState.move[0].user_ref.phone;
      currentState.zipCode = nextProps.commonState.move[0].destination.zip_code;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.postSkipService &&
      nextProps.commonState.isPostSkipService
    ) {
      nextProps.commonState.isPostSkipService = false;
      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/solarstep2",
        state: {
          notInterested: true,
        },
      });
    }

    return currentState;
  }

  handleChange = (e: any, name: string) => {
    let val: any;
    if (name == "phone") {
      val = formatPhoneInput(e.target.value);
    } else {
      val = e.target.value;
    }
    this.setState({ ...this.state, [name]: val });
  };

  orderSaveHandler = () => {
    this.setState({ submitClicked: true });
    const { date, moveId } = this.state;
    if (date) {
      let payload = {
        move_id: moveId,
        type: "Solar",
        is_appointment: true,
        appointment_date: date,
        data: {},
      };
      this.props.commonAction.appointmentPost(payload);
    }
    // this.props.history.push({
    //   pathname: "/dashboard/concierge/workflow/solarstep2",
    //   state: {
    //     scheduleCallBackData: {
    //       installationDate: this.state.date,
    //       time: this.state.time,
    //       firstName: this.state.firstName,
    //       lastName: this.state.lastName,
    //       phone: this.state.phone,
    //       email: this.state.email,
    //       zipCode: this.state.zipCode,
    //       moveId: this.state.moveId,
    //     },
    //   },
    // });
  };
  confirmHandler = () => {
    this.setState({
      openModal: false,
    });

    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/solarstep2",
      state: {
        scheduleCallBackData: {
          orderNumber: this.state.orderNumber,
          installationDate: this.state.date,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
          email: this.state.email,
          zipCode: this.state.zipCode,
          // time: this.state.date.split("T")[1],
        },
      },
    });
  };

  notInterested = () => {
    if (this.state.moveId !== "") {
      let payload: any = {
        move: this.state.moveId,
        service_name: "Solar",
        reason: "",
        reason_type: "Not Interested",
      };
      this.props.commonAction.postSkipService(payload);
    }
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
              <div className="order-confirmation-number">
                Order Confirmation Number : #{this.state.orderNumber}
              </div>
              {/* <div className="order-confirmation-number">
                Installation date : {this.state.date}
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
            tabName={"Solar"}
            tabId={8}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="solar1-main">
              <div className="solar1-heading">
                <div className="solar1">Solar </div>
                <div>
                  <div className="titleNumberSolar">
                    <div className="left-number">1</div>
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
                    onClick={() => {
                      this.setState({ objectionClick: true });
                    }}
                  >
                    Objection
                  </Button>
                </div>
              </div>
              {this.state.objectionClick &&
              this.state.currentObjectionStep < 4 ? (
                <Modal
                  isShowModal={this.state.objectionClick}
                  onCloseModal={() => this.setState({ objectionClick: false })}
                  showClose={false}
                  className="ObjectionModal"
                >
                  <div className="objection-modal-main">
                    <div className="module-objection-heading">
                      <div className="module-div">Movers</div>
                      <div className="objection-list">
                        {this.state.currentObjectionStep == 3
                          ? "Final Objection"
                          : "  Objection List"}
                      </div>

                      <div
                        className="cross-objection"
                        onClick={() => {
                          this.setState({ objectionClick: false });
                        }}
                      >
                        <ClearIcon
                          style={{
                            color: "#EC6133",
                            height: "15px",
                            width: "15px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                    {this.state.currentObjectionStep < 3 ? (
                      <div className="objection-step-1">
                        <div className="one-top-wrapper">
                          <div className="one">1</div>
                          <div className="one-heading">
                            Please select the category of clients objection
                          </div>
                        </div>

                        <div className="objection-1-cards">
                          {this.state.objectionList1.map((item: any) => {
                            return (
                              <div className="objection-1-card">
                                <ObjectionCard1
                                  objection1={item.objection1}
                                  possibility={item.possibility}
                                  selected={item.selected}
                                  onClick={() => {
                                    this.objectionCardHandler(item);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {this.state.currentObjectionStep == 2 ? (
                      <div className="objection-step-2">
                        <div className="one-top-wrapper">
                          <div className="one">2</div>
                          <div className="one-heading">Customer mindset</div>
                        </div>

                        {this.state.listContentObjection.map((item: any) => {
                          return (
                            <div className="point-content-wrapper-solar1">
                              <div className="points-div-solar1">
                                <div className="outer-point-solar1">
                                  <div className="inner-point-solar1"></div>
                                </div>
                                <div className="vertical-line-solar1"></div>
                              </div>

                              <div className="point-content-solar1">{item}</div>
                            </div>
                          );
                        })}

                        <div className="one-top-wrapper">
                          <div className="one">3</div>
                          <div className="one-heading">Suggested Rebuttals</div>
                        </div>

                        <div className="rebuttals">
                          {this.state.listContentObjection2.map(
                            (item3: any) => {
                              return (
                                <div className="rebuttal-card">
                                  <ObjectionCard2
                                    objection2={item3.objection2}
                                    selected={item3.selected}
                                    onSelectClick={() => {
                                      this.selectHandler(item3);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : null}

                    {this.state.currentObjectionStep == 3 ? (
                      <div className="final-objection">
                        <div className="one-top-wrapper">
                          <div className="one">1</div>
                          <div className="one-heading">Customer mindset</div>
                        </div>
                        <div className="mindset-div-bottom">
                          {this.state.objectionList1.map((item: any) => {
                            if (item.selected == true) {
                              return (
                                <div className="point-content-wrapper2-solar1">
                                  <div className="points-div-solar1">
                                    <div className="outer-point-solar1">
                                      <div className="inner-point-solar1"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-solar1">
                                    {item.objection1}
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>

                        <div className="one-top-wrapper">
                          <div className="one">2</div>
                          <div className="one-heading">Suggested Rebuttals</div>
                        </div>

                        <div className="rebuttals">
                          {this.state.listContentObjection2.map(
                            (item3: any) => {
                              return (
                                <div className="rebuttal-card">
                                  <ObjectionCard2
                                    objection2={item3.objection2}
                                    selected={item3.selected}
                                    onSelectClick={() => {
                                      this.selectHandler(item3);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : null}

                    <div className="WorkflowButtons">
                      <WorkflowButton
                        buttonText1={
                          this.state.currentObjectionStep == 2 &&
                          this.state.selected
                            ? "Final Objection"
                            : this.state.currentObjectionStep == 3
                            ? "Not Interested"
                            : " Go Back"
                        }
                        buttonText2={"Success"}
                        buttonStartLogo1={
                          this.state.selected ? <ArrowBackIcon /> : null
                        }
                        buttonStartLogo2={<ArrowForwardIcon />}
                        ButtonOnClick1={() =>
                          this.state.currentObjectionStep == 1 ||
                          this.state.currentObjectionStep == 3
                            ? this.setState({
                                objectionClick: false,
                              })
                            : this.state.currentObjectionStep == 2 &&
                              this.state.selected
                            ? this.setState({
                                currentObjectionStep: 3,
                              })
                            : this.setState({
                                currentObjectionStep:
                                  this.state.currentObjectionStep - 1,
                              })
                        }
                        ButtonOnClick2={() =>
                          this.state.currentObjectionStep == 2
                            ? this.setState({
                                currentObjectionStep: 4,
                              })
                            : this.setState({
                                currentObjectionStep:
                                  this.state.currentObjectionStep + 1,
                              })
                        }
                      />
                    </div>
                  </div>
                </Modal>
              ) : null}

              {
                <Modal
                  isShowModal={this.state.currentObjectionStep == 4}
                  onCloseModal={() =>
                    this.setState({
                      objectionClick: false,
                      objectionCompleted: true,
                      currentObjectionStep: 1,
                    })
                  }
                  showClose={false}
                  className="ObjectionCongratsModal"
                >
                  <div className="congrats-main">
                    <CheckCircleOutlineIcon
                      style={{
                        color: "#347A35",
                        height: "50px",
                        width: "50px",
                      }}
                    />
                    <div className="great-job">Great Job,Congrats!</div>
                  </div>
                </Modal>
              }
              {this.state.loader === true ? <CircularProgress /> : null}

              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-solar">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {this.state.listContent &&
                this.state.listContent.map((item: any) => {
                  return (
                    <div className="point-content-wrapper-solar1">
                      <div className="points-div-solar1">
                        <div className="outer-point-solar1">
                          <div className="inner-point-solar1"></div>
                        </div>
                        <div className="vertical-line-solar1"></div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                        className="point-content-solar1"
                      ></div>
                    </div>
                  );
                })}

              {this.state.isScheduleCall ? (
                <div className="point-content-wrapper-insurance1">
                  <div className="points-div-insurance1">
                    <div className="outer-point-insurance1">
                      <div className="inner-point-insurance1"></div>
                    </div>
                    <div className="vertical-line-insurance1"></div>
                  </div>

                  <div className="point-content-insurance1">
                    <div className="scheduleText">Schedule Call Back</div>
                    <div className="formDiv">
                      <div className="InputsDiv">
                        {/* <div className="inputFlexDiv"> */}
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Call schedule detail
                          </div>
                          {/* <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "date")
                              }
                              label="Select Date"
                              value={this.state.date}
                              type="datetime-local"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className="CustomInput"
                            /> */}
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              // variant="inline"
                              // disabled
                              ampm={true}
                              label="Select Date"
                              value={this.state.date}
                              onChange={(e: any) =>
                                this.setState({
                                  date: new Date(e).toISOString(),
                                })
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className="CustomDate"
                              // onError={console.log}
                              disablePast
                              format="MM/dd/yy HH:mm"
                            />
                          </MuiPickersUtilsProvider>
                          <div className="error">
                            {this.state.submitClicked && !this.state.date
                              ? "Please Select Date"
                              : ""}
                          </div>
                        </div>
                        {/* <div className="inputDiv">
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "time")
                              }
                              className="CustomInput"
                              // onChange={(e:any)=> console.log(e.target.value)}
                              label="Select Time"
                              value={this.state.time}
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div> */}
                        {/* </div> */}
                      </div>

                      <div className="InputsDiv">
                        <div className="inputFlexDiv">
                          <div className="inputDiv">
                            <div className="title" style={{ color: "#333333" }}>
                              Personal Details
                            </div>
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "firstName")
                              }
                              label="Enter First Name"
                              value={this.state.firstName}
                              className="CustomInput"
                            />
                          </div>
                          <div className="inputDiv">
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "lastName")
                              }
                              label="Enter Last Name"
                              value={this.state.lastName}
                              className="CustomInput"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="InputsDiv">
                        <div className="inputFlexDiv">
                          <div className="inputDiv">
                            <div className="title" style={{ color: "#333333" }}>
                              Phone Number
                            </div>
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "phone")
                              }
                              label="Enter Phone Number"
                              value={this.state.phone}
                              className="CustomInput"
                            />
                          </div>
                          <div className="inputDiv">
                            <div className="title" style={{ color: "#333333" }}>
                              Email
                            </div>
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "email")
                              }
                              label="Enter Email"
                              value={this.state.email}
                              className="CustomInput"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="InputsDiv">
                        <div className="inputFlexDiv">
                          <div className="inputDiv">
                            <div className="title" style={{ color: "#333333" }}>
                              Zip Code
                            </div>
                            <CustomizedInput
                              onChange={(e: any) =>
                                this.handleChange(e, "zipCode")
                              }
                              label="Enter Zip Code"
                              value={this.state.zipCode}
                              className="CustomInput"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="submitButtonDiv">
                        <Button
                          className="submitButton"
                          // startLogo={<CreateIcon />}
                          backgroundColor="#465B74"
                          color="#ffffff"
                          onClick={this.orderSaveHandler}
                          disabled={
                            this.state.firstName &&
                            this.state.lastName &&
                            this.state.phone.length >= 12 &&
                            this.state.email &&
                            this.state.zipCode
                              ? false
                              : true
                          }
                        >
                          Save
                        </Button>
                        <Button
                          startLogo={<ArrowForwardIcon />}
                          className="scheduleCallButton"
                          color="#465b74"
                          backgroundColor="#ffffff"
                          border="1px solid #465b74"
                          onClick={() => {
                            this.notInterested();
                          }}
                        >
                          Not Interested
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* <div className="notInterestedEnergyButtonDiv">
                <Button
                  className="notInterestedButton"
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/solarstep2",
                      state: {
                        notInterested: true,
                      },
                    });
                  }}
                >
                  Not Interested
                </Button>
              </div> */}
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Next"}
              buttonStartLogo1={<ArrowBackIcon />}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/energystep2"
                )
              }
              ButtonOnClick2={() => {
                this.setState({ isScheduleCall: true });
              }}
              button2Disabled={this.state.isScheduleCall}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(Action, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(SolarStep1);
