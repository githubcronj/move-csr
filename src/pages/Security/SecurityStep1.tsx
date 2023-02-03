import React from "react";
import "./securityStep1.scss";
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
import { formatPhoneInput, validateEmail } from "../../utils/formValidation";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CheckIcon from "@material-ui/icons/Check";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
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
  isWarmTransferClicked: boolean;
  isScheduleCallClicked: boolean;
  date: any;
  time: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  openModal: boolean;
  orderNumber: string;
  orderError: boolean;
  installationError: boolean;
  moveId: string;
  isGetMove: boolean;
  appointmentDetails: any;
  isNotInterestedSelected: boolean;
  notInterested: boolean;
};

class SecurityStep1 extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [],
    isDataArrived: true,
    hintContent: "",
    closed: false,
    objectionCompleted: false,
    objectionClick: false,
    currentObjectionStep: 1,
    appointmentDetails: [],
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
    isWarmTransferClicked: false,
    isScheduleCallClicked: false,
    isNotInterestedSelected: false,
    date: new Date().toISOString(),
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    openModal: false,
    orderNumber: "",
    orderError: false,
    installationError: false,
    moveId: "",
    isGetMove: true,
    notInterested: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "home-security",
      page: 1,
    });

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        firstName: this.props.commonState.move[0].user_ref.first_name,
        lastName: this.props.commonState.move[0].user_ref.last_name,
        email: this.props.commonState.move[0].user_ref.email,
        phone: this.props.commonState.move[0].user_ref.phone,
        zipCode: this.props.commonState.move[0].destination.zip_code,
      });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        firstName: this.props.commonState.move[0].user_ref.first_name,
        lastName: this.props.commonState.move[0].user_ref.last_name,
        email: this.props.commonState.move[0].user_ref.email,
        phone: this.props.commonState.move[0].user_ref.phone,
        zipCode: this.props.commonState.move[0].destination.zip_code,
      });
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

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move[0] &&
    //   (nextProps.commonState.isGetMove || currentState.isGetMove)
    // ) {
    //   console.log("inside", nextProps.commonState.move[0].id);
    //   nextProps.commonState.isGetMove = false;
    //   currentState.isGetMove = false;
    //   currentState.moveId = nextProps.commonState.move[0].id;
    //   currentState.firstName =
    //     nextProps.commonState.move[0].user_ref.first_name;
    //   currentState.lastName = nextProps.commonState.move[0].user_ref.last_name;
    //   currentState.email = nextProps.commonState.move[0].user_ref.email;
    //   currentState.phone = nextProps.commonState.move[0].user_ref.phone;
    //   currentState.zipCode = nextProps.commonState.move[0].destination.zip_code;
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
      currentState.appointmentDetails =
        nextProps.commonState.appointmentPost.orders[0];
      currentState.orderNumber =
        nextProps.commonState.appointmentPost.orders[0].product &&
        nextProps.commonState.appointmentPost.orders[0].product.order_id;
      const payload = {
        service: "",
        moveId: currentState.moveId,
      };
      nextProps.commonAction.orderGet(payload);
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

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.postSkipService &&
      nextProps.commonState.isPostSkipService
    ) {
      nextProps.commonState.isPostSkipService = false;
      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/securitystep2",
        state: {
          notInterested: currentState.notInterested,
        },
      });
    }

    return currentState;
  }

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

  handleChange = (e: any, name: string) => {
    let val: any;
    if (name == "phone") {
      val = formatPhoneInput(e.target.value);
    } else {
      val = e.target.value;
    }
    this.setState({ ...this.state, [name]: val });
  };

  validateFields = () => {
    let validity: boolean = true;
    // if (!re.test(this.state.orderNumber)) {
    //   this.setState({
    //     orderError: true,
    //   });
    //   validity = false;
    // }

    if (!this.state.date) {
      this.setState({
        installationError: true,
      });
      validity = false;
    }
    return validity;
  };

  confirmHandler = () => {
    // let payload = {
    //   move_id: this.state.moveId,
    //   type: "Insurance",
    //   // carrier_data: this.state.selectedCompany && this.state.selectedCompany[0],
    //   account_no: this.state.orderNumber,
    //   install_date: this.state.date,
    // };
    // // console.log(payload);
    // this.props.commonAction.appointmentPost(payload);
    this.setState({
      openModal: false,
    });
    if (this.state.isScheduleCallClicked) {
      this.props.history.push({
        pathname: "/dashboard/concierge/workflow/securitystep2",
        state: {
          scheduleCallBackData: {
            orderNumber: this.state.orderNumber,
            installationDate: this.state.date,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            zipCode: this.state.zipCode,
            time: this.state.time,
          },
        },
      });
    } else if (this.state.isWarmTransferClicked) {
      this.props.history.push({
        pathname: "/dashboard/concierge/workflow/securitystep2",
        state: {
          warmTransferData: {
            orderNumber: this.state.orderNumber,
            installationDate: this.state.date,
            time: this.state.time,
          },
        },
      });
    }
  };

  orderSaveHandler = () => {
    if (
      this.validateFields() &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.phone &&
      this.state.email &&
      this.state.zipCode
    ) {
      // this.setState({
      //   openModal: true,
      // });

      const payload = {
        move_id: this.state.moveId,
        type: "Home Security",
        is_warm_transfer: false,
        is_appointment: true,
        appointment_date: this.state.date,
        security_plan: {},
      };
      this.props.commonAction.appointmentPost(payload);
    }
  };

  warmTransferHandler = () => {
    const payload = {
      move_id: this.state.moveId,
      type: "Home Security",
      is_warm_transfer: true,
      is_appointment: false,
      // appointment_date: "",
      security_plan: {},
    };
    this.props.commonAction.appointmentPost(payload);
  };
  notInterestedHandler = () => {
    if (this.state.moveId !== "") {
      let payload: any = {
        move: this.state.moveId,
        service_name: "Home Security",
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
            // tabHandler={this.tabHandler}
            tabName={"Security"}
            tabId={4}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="security-main">
              <div className="security-heading">
                <div className="security">Security </div>
                <div>
                  <div className="titleNumberSecurity">
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
                            <div className="point-content-wrapper-security">
                              <div className="points-div-security">
                                <div className="outer-point-security">
                                  <div className="inner-point-security"></div>
                                </div>
                                <div className="vertical-line-security"></div>
                              </div>

                              <div className="point-content-security">
                                {item}
                              </div>
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
                                <div className="point-content-wrapper2-security">
                                  <div className="points-div-security">
                                    <div className="outer-point-security">
                                      <div className="inner-point-security"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-security">
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
                <div className="helpful-div-mover">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}

              <div className="main-bottom-security">
                {/* <div className="point-content-wrapper-security">
             <div className="points-div-security">
                   <div className="outer-point-security">
                       <div className="inner-point-security">
     
                       </div>
                   </div>
                   <div className="vertical-line-security">

                   </div>
               </div>
     
               <div className="point-content-security">
               <div className="top-3-heading">Why are you considering home security?</div>
               </div>
             </div> */}
                {/* <div className="point-content-wrapper-security">
             <div className="points-div-security">
                   <div className="outer-point-security">
                       <div className="inner-point-security">
     
                       </div>
                   </div>
                   <div className="vertical-line-security">

                   </div>
               </div>
     
               <div className="point-content-security">
             
             <div className="security-others-cards-div">
             {
                  this.state.listContent.map((item:any)=>{
                    return <div className="security-first-card"> 
                     
                    </div>
                  })
                     
             }

             </div>
               </div>
             </div>
       */}

                {this.state.listContent &&
                  this.state.listContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-security">
                        <div className="points-div-security">
                          <div className="outer-point-security">
                            <div className="inner-point-security"></div>
                          </div>
                          <div className="vertical-line-security"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-security"
                        ></div>
                      </div>
                    );
                  })}

                <div className="point-content-wrapper-insurance1">
                  <div className="points-div-insurance1">
                    <div className="outer-point-insurance1">
                      <div className="inner-point-insurance1"></div>
                    </div>
                    <div className="vertical-line-insurance1"></div>
                  </div>

                  <div className="point-content-insurance1">
                    <div>
                      Do a warm transfer now or schedule a call back for later.
                    </div>
                    <div className="buttonDiv">
                      <Button
                        startLogo={
                          this.state.isWarmTransferClicked ? (
                            <CheckIcon />
                          ) : (
                            <ArrowForwardIcon />
                          )
                        }
                        className="warmTransferButton"
                        // backgroundColor={
                        //   this.state.isWarmTransferClicked
                        //     ? "#75BA9F"
                        //     : "#465b74"
                        // }
                        color={
                          this.state.isWarmTransferClicked
                            ? "#ffffff"
                            : "#ffffff"
                        }
                        backgroundColor={
                          this.state.isWarmTransferClicked
                            ? "#75BA9F"
                            : " #465B74"
                        }
                        border={
                          this.state.isWarmTransferClicked
                            ? "1px solid #75BA9F"
                            : "1px solid #465b74"
                        }
                        onClick={() => {
                          this.setState({
                            isWarmTransferClicked: true,
                            isScheduleCallClicked: false,
                          });
                        }}
                      >
                        Select Warm Transfer
                      </Button>
                      <Button
                        startLogo={
                          this.state.isScheduleCallClicked ? (
                            <CheckIcon />
                          ) : (
                            <EventNoteIcon />
                          )
                        }
                        className="scheduleCallButton"
                        color={
                          this.state.isScheduleCallClicked
                            ? "#75BA9F"
                            : "#465b74"
                        }
                        backgroundColor={
                          this.state.isScheduleCallClicked
                            ? "#ffffff"
                            : "#ffffff"
                        }
                        border={
                          this.state.isScheduleCallClicked
                            ? "1px solid #75BA9F"
                            : "1px solid #465b74"
                        }
                        onClick={() =>
                          this.setState({
                            isScheduleCallClicked: true,
                            isWarmTransferClicked: false,
                          })
                        }
                      >
                        Schedule Call Back
                      </Button>
                      <Button
                        startLogo={<ArrowForwardIcon />}
                        className="scheduleCallButton"
                        color={
                          this.state.isNotInterestedSelected
                            ? "#ffffff"
                            : "#465b74"
                        }
                        backgroundColor={
                          this.state.isNotInterestedSelected
                            ? "#75BA9F"
                            : "#ffffff"
                        }
                        border={
                          this.state.isNotInterestedSelected
                            ? "1px solid #75BA9F"
                            : "1px solid #465b74"
                        }
                        onClick={this.notInterestedHandler}
                      >
                        Not Interested
                      </Button>
                    </div>
                  </div>
                </div>
                {this.state.isScheduleCallClicked ? (
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
                              {this.state.installationError && !this.state.date
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
                              <div className="error"></div>
                            </div> */}
                          {/* </div> */}
                        </div>

                        <div className="InputsDiv">
                          <div className="inputFlexDiv">
                            <div className="inputDiv">
                              <div
                                className="title"
                                style={{ color: "#333333" }}
                              >
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
                              <div
                                className="title"
                                style={{ color: "#333333" }}
                              >
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
                              <div
                                className="title"
                                style={{ color: "#333333" }}
                              >
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
                              <div
                                className="title"
                                style={{ color: "#333333" }}
                              >
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
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
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
                  "/dashboard/concierge/workflow/insurancestep2"
                )
              }
              ButtonOnClick2={() => {
                // this.props.history.push(
                //   "/dashboard/concierge/workflow/securitystep2"
                // );
                if (this.state.isWarmTransferClicked) {
                  this.warmTransferHandler();
                }
              }}
              // button1Disabled={this.state.isWarmTransferClicked ? false : true}
              button2Disabled={this.state.isWarmTransferClicked ? false : true}
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

export default connect(mapStateToProps, mapDispatchToProps)(SecurityStep1);
