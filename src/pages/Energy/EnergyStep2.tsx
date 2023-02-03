// import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import "../Insurance/InsuranceStep2.scss";
// import Button from "../../components/atoms/Button";
// // import DoneIcon from "@material-ui/icons/Done";
// // import CreateIcon from "@material-ui/icons/Create";
// // import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
// import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
// import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
// import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import * as CommonAction from "../../store/common/actions";
// import * as MoversAction from "../../store/move/actions";
// import ChatIcon from "@material-ui/icons/Chat";
// // import { CircularProgress } from "@material-ui/core";
// import Modal from "../../components/atoms/Modal";

// type initialProps = {
//   history?: any;
//   commonState: any;
//   commonAction: any;
//   moversState: any;
//   moversAction: any;
// };

// type initialState = {
//   listContent: any;
//   closed: boolean;
//   address: any;
//   isDataArrived: boolean;
//   hintContent: string;
//   scriptContent: any;
//   objectionCompleted: boolean;
//   loader: boolean;
//   openModal: boolean;
//   moveId: any;
//   data: any;
//   solarData: any;
//   notInterested: boolean;
// };

// class EnergyStep2 extends React.Component<initialProps, initialState> {
//   state: initialState = {
//     isDataArrived: true,
//     scriptContent: [],
//     hintContent: "",
//     address: "",
//     listContent: ["Confirm your home address you would like to insure"],
//     closed: false,
//     objectionCompleted: true,
//     loader: false,
//     openModal: false,
//     moveId: null,
//     data: [],
//     solarData: [],
//     notInterested: false,
//   };

//   componentDidMount() {
//     window.scrollTo(0, 0);
//     if (
//       this.props &&
//       this.props.commonState &&
//       this.props.commonState.move &&
//       this.props.commonState.move[0]
//     ) {
//       this.setState({
//         address: this.props.commonState.move[0].destination_full_address
//           ? this.props.commonState.move[0].destination_full_address
//           : "",
//         moveId: this.props.commonState.move[0].id,
//       });

//       const payload = {
//         service: "",
//         moveId: this.props.commonState.move[0].id,
//       };
//       this.props.commonAction.orderGet(payload);
//     }
//     // else {
//     //   this.props.commonAction.moveGet();
//     // }

//     // const hash_code = localStorage.getItem("scriptHashCode");
//     // this.props.commonAction.scriptGet({
//     //   hash_code: hash_code,
//     //   service: "utilities",
//     // });
//     // console.log(this.props.history.location.state.scheduleCallBackData);
//     if (
//       this.props &&
//       this.props.commonState &&
//       this.props.commonState.getSkipService
//     ) {
//       this.props.commonState.getSkipService.map((item: any) => {
//         if (
//           item.service_name === "Energy" &&
//           item.reason_type === "Not Interested"
//         ) {
//           this.setState({ notInterested: true });
//         }
//       });
//     }
//   }
//   componentDidUpdate(prevProps: initialProps) {
//     const prev = prevProps && prevProps.commonState;
//     const cur = this.props && this.props.commonState;

//     // if (prev.order !== cur.order && cur.order && cur.order.length > 0) {
//     //   cur.order.map((el: any) => {
//     //     if (el && el.product_type === "Energy") {
//     //       this.setState({ data: el });
//     //     }
//     //   });
//     // }
//     if (prev.move !== cur.move && cur.move && cur.move[0]) {
//       this.setState({
//         address: this.props.commonState.move[0].destination_full_address
//           ? this.props.commonState.move[0].destination_full_address
//           : "",
//         moveId: this.props.commonState.move[0].id,
//       });

//       const payload = {
//         service: "",
//         moveId: this.props.commonState.move[0].id,
//       };
//       this.props.commonAction.orderGet(payload);
//     }
//     if (prev.getSkipService !== cur.getSkipService && cur.getSkipService) {
//       this.props.commonState.getSkipService.map((item: any) => {
//         if (
//           item.service_name === "Energy" &&
//           item.reason_type === "Not Interested"
//         ) {
//           this.setState({ notInterested: true });
//         }
//       });
//     }

//     const prevMover = prevProps && prevProps.moversState;
//     const curMover = this.props && this.props.moversState;
//     if (
//       prevMover.cancelEntireMoverOrder !== curMover.cancelEntireMoverOrder &&
//       curMover.cancelEntireMoverOrder !== null
//     ) {
//       const payload1 = {
//         service: "",
//         moveId: this.state.moveId,
//       };
//       this.props.commonAction.orderGet(payload1);

//       this.setState({ openModal: false });
//     }
//   }

//   public static getDerivedStateFromProps(
//     nextProps: initialProps,
//     currentState: initialState
//   ) {
//     // if (
//     //   nextProps &&
//     //   nextProps.commonState &&
//     //   nextProps.commonState.move[0] &&
//     //   nextProps.commonState.isGetMove
//     // ) {
//     //   nextProps.commonState.isGetMove = false;
//     //   currentState.address = nextProps.commonState.move[0]
//     //     .destination_full_address
//     //     ? nextProps.commonState.move[0].destination_full_address
//     //     : "";
//     //   currentState.moveId = nextProps.commonState.move[0].id;

//     //   const payload = {
//     //     service: "",
//     //     moveId: nextProps.commonState.move[0].id,
//     //   };
//     //   nextProps.commonAction.orderGet(payload);
//     // }

//     if (
//       nextProps &&
//       nextProps.commonState &&
//       nextProps.commonState.order &&
//       nextProps.commonState.order.length &&
//       nextProps.commonState.orderDataArrived
//     ) {
//       let orderData: any = [];
//       let solarData: any = [];
//       nextProps.commonState.order.map((item: any) => {
//         if (item.service === "Energy") orderData.push(item);
//         if (item.service === "Solar") solarData.push(item);
//       });
//       currentState.data = orderData;
//       currentState.solarData = solarData;

//       // if(!orderData.length){
//       //   if(!( nextProps && nextProps.history &&
//       //     nextProps.history.location &&
//       //     nextProps.history.location.state &&
//       //     nextProps.history.location.state.notInterested)){
//       //   nextProps.history.push('/dashboard/concierge/workflow/energystep1')

//       //     }
//       // }
//     }
//     // if (
//     //   nextProps &&
//     //   nextProps.commonState &&
//     //   nextProps.commonState.scriptDataArrived
//     // ) {
//     //   nextProps.commonState.scriptDataArrived = false;
//     //   let points: any = [];
//     //   let hintContent: any = [];
//     //   let hintPara: string = "";
//     //   nextProps.commonState.script.map((item: any) => {
//     //     if (item.page_number === 2) {
//     //       points = item.script_content.split("|");
//     //       hintContent.push(item.hint_content);
//     //     }
//     //   });

//     //   hintContent.map((hint: any) => {
//     //     hintPara = hintPara + " " + hint;
//     //   });

//     //   currentState.scriptContent = points;
//     //   currentState.hintContent = hintPara;
//     //   currentState.loader = false;
//     // }
//     return currentState;
//   }

//   closeHandler = () => {
//     this.setState({
//       closed: true,
//     });
//   };

//   formatAMPM = (date: any) => {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     var strTime = hours + ":" + minutes + " " + ampm;
//     return strTime;
//   };

//   cancelOrderHandler = () => {
//     let orders: any = [];
//     this.state.data.map((item: any) => {
//       orders.push(item.id);
//       return orders;
//     });

//     let payload = {
//       orders: orders,
//     };
//     this.props.moversAction.cancelEntireMoverOrder(payload);
//   };

//   render() {
//     const { data } = this.state;

//     return (
//       <div className="ConciergeFlowPage">
//         <div className="conciergeFlowHeading">Concierge workflow</div>

//         {this.state.openModal ? (
//           <Modal
//             isShowModal={this.state.openModal}
//             onCloseModal={() => this.setState({ openModal: false })}
//             showClose={false}
//             className="OpenModal"
//           >
//             <div className="OpenModal-main">
//               <div className="OpenModal-job">Cancellation confirmation!</div>
//               <div className="order-confirmation-number">
//                 Do you really want to cancel the order made for this customer?
//               </div>

//               <div className="OrderSaveButton">
//                 <Button
//                   className="Button1"
//                   onClick={() => this.setState({ openModal: false })}
//                   color="#fff"
//                   backgroundColor={"#465B74"}
//                 >
//                   Go Back
//                 </Button>
//                 <Button
//                   className="Button1"
//                   // backgroundColor="#EC6133"
//                   onClick={() => this.cancelOrderHandler()}
//                   color="#fff"
//                   backgroundColor={"#EC6133"}
//                   margin="0 0 0 30px"
//                 >
//                   Confirm
//                 </Button>
//               </div>
//             </div>
//           </Modal>
//         ) : null}

//         <div>
//           <ConciergeTabs
//             tabName={"Energy"}
//             tabId={7}
//             history={this.props.history}
//           />
//         </div>
//         <div className="component-div">
//           <div className="componetContent">
//             <div className="insurance2-main">
//               <div className="insurance2-heading">
//                 <div className="insurance2">Energy </div>
//                 <div>
//                   <div className="titleNumberInsurance">
//                     <div className="left-number">2</div>
//                     <div className="right-number">2</div>
//                   </div>
//                 </div>
//                 <div className="objection-div">
//                   <Button
//                     className="objection"
//                     startLogo={<ChatIcon />}
//                     disabled={this.state.objectionCompleted}
//                     color={
//                       this.state.objectionCompleted ? "#DADADA" : "#EC6133 "
//                     }
//                     border={
//                       this.state.objectionCompleted
//                         ? "1px solid #DADADA"
//                         : "1px solid #EC6133"
//                     }
//                     backgroundColor="#fff"
//                     //  onClick={() => { this.setState({ objectionClick: true }) }}
//                   >
//                     Objection
//                   </Button>
//                 </div>
//               </div>
//               {/* {this.state.closed == false && this.state.hintContent ? (
//                 <div className="helpful-div-insurance">
//                   <HelpfulText
//                     heading="HELPFUL HINT"
//                     para={this.state.hintContent}
//                     handleHelpClose={this.closeHandler}
//                   />
//                 </div>
//               ) : null} */}
//               {/* {this.state.loader === true ? <CircularProgress /> : null} */}

//               {this.state.data.length &&
//               this.props.history &&
//               this.props.history.location &&
//               this.props.history.location.state &&
//               this.props.history.location.state.scheduleCallBackData ? (
//                 <div className="callBackSchedule">
//                   <div className="scheduleText">Call Back Schedule</div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Name:</div>
//                     <div className="flexDetailDiv">
//                       {`${
//                         this.props.history &&
//                         this.props.history.location &&
//                         this.props.history.location.state &&
//                         this.props.history.location.state
//                           .scheduleCallBackData &&
//                         this.props.history.location.state.scheduleCallBackData
//                           .firstName
//                       }
//                       ${
//                         this.props.history &&
//                         this.props.history.location &&
//                         this.props.history.location.state &&
//                         this.props.history.location.state
//                           .scheduleCallBackData &&
//                         this.props.history.location.state.scheduleCallBackData
//                           .lastName
//                       }
//                       `}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Phone number:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                         this.props.history.location &&
//                         this.props.history.location.state &&
//                         this.props.history.location.state
//                           .scheduleCallBackData &&
//                         this.props.history.location.state.scheduleCallBackData
//                           .phone}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Email:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                         this.props.history.location &&
//                         this.props.history.location.state &&
//                         this.props.history.location.state
//                           .scheduleCallBackData &&
//                         this.props.history.location.state.scheduleCallBackData
//                           .email}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Zipcode:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                         this.props.history.location &&
//                         this.props.history.location.state &&
//                         this.props.history.location.state
//                           .scheduleCallBackData &&
//                         this.props.history.location.state.scheduleCallBackData
//                           .zipCode}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Date:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                       this.props.history.location &&
//                       this.props.history.location.state &&
//                       this.props.history.location.state.scheduleCallBackData &&
//                       this.props.history.location.state.scheduleCallBackData
//                         .installationDate
//                         ? new Date(
//                             this.props.history.location.state.scheduleCallBackData.installationDate
//                           ).toDateString()
//                         : ""}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Time:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                       this.props.history.location &&
//                       this.props.history.location.state &&
//                       this.props.history.location.state.scheduleCallBackData &&
//                       this.props.history.location.state.scheduleCallBackData
//                         .installationDate
//                         ? this.formatAMPM(
//                             new Date(
//                               this.props.history.location.state.scheduleCallBackData.installationDate
//                             )
//                           )
//                         : ""}
//                     </div>
//                   </div>
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Order number:</div>
//                     <div className="flexDetailDiv">
//                       {this.props.history &&
//                       this.props.history.location &&
//                       this.props.history.location.state &&
//                       this.props.history.location.state.scheduleCallBackData &&
//                       this.props.history.location.state.scheduleCallBackData
//                         .orderNumber
//                         ? this.props.history.location.state.scheduleCallBackData
//                             .orderNumber
//                         : ""}
//                     </div>
//                   </div>
//                 </div>
//               ) : this.state.data ? (
//                 <div className="callBackSchedule">
//                   <div className="flexDiv">
//                     <div className="flexTitleDiv">Order number:</div>
//                     {(this.props &&
//                       this.props.history &&
//                       this.props.history.location &&
//                       this.props.history.location.state &&
//                       this.props.history.location.state.notInterested) ||
//                     this.state.notInterested ? (
//                       <div>Not Interested</div>
//                     ) : (
//                       <div className="flexDetailDiv">
//                         {this.state.data.map((item: any) => {
//                           return item.order_id;
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}

//               <div className="buttonDiv">
//                 <Button
//                   className="editOrderButton"
//                   disabled={this.state.data.length ? true : false}
//                   onClick={() => {
//                     if (!this.state.data.length) {
//                       this.props.history.push(
//                         "/dashboard/concierge/workflow/energystep1"
//                       );
//                     }
//                   }}
//                 >
//                   Edit Order
//                 </Button>
//                 <Button
//                   className="cancleOrderButton"
//                   disabled={this.state.data.length ? false : true}
//                   onClick={() => this.setState({ openModal: true })}
//                 >
//                   Cancel Entire Order
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="WorkflowButtons">
//             <WorkflowButton
//               buttonText1={"Back"}
//               buttonText2={"Continue"}
//               buttonStartLogo1={<ArrowBackIcon />}
//               buttonStartLogo2={<ArrowForwardIcon />}
//               ButtonOnClick1={() =>
//                 this.props.history.push({
//                   pathname:
//                     // this.state.data
//                     // ? "/dashboard/concierge/workflow/utilitiesthankyou"
//                     // :
//                     "/dashboard/concierge/workflow/energystep1",
//                 })
//               }
//               ButtonOnClick2={() => {
//                 if (this.state.solarData.length) {
//                   this.props.history.push(
//                     "/dashboard/concierge/workflow/solarstep2"
//                   );
//                 } else {
//                   this.props.history.push(
//                     "/dashboard/concierge/workflow/solarstep1"
//                   );
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapDispatchToProps(dispatch: any) {
//   return {
//     commonAction: bindActionCreators(CommonAction, dispatch),
//     moversAction: bindActionCreators(MoversAction, dispatch),
//   };
// }

// const mapStateToProps = (state: any) => ({
//   commonState: state.common,
//   moversState: state.move,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EnergyStep2);
import React from "react";
import "./EnergyStep.scss";
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
// import * as Action from "../../store/common/actions";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import ElectricityComponent from "../../components/Energy/Electricity";
import logoIcon from "../../Assets/images/logotest.svg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EditIcon from "@material-ui/icons/Edit";

type initialProps = {
  history?: any;
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
  filter: boolean;
};

class EnergyStep extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    hintContent: "",
    listContent: [
      // "Lorem ipsum dolor sit amet.",
      // "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue.",
      // "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.",
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
    filter: false,
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
  }

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Energy"}
            tabId={9}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="energyStep2-main">
              <div className="energyStep2-heading">
                <div className="energyStep2">Energy </div>
                <div>
                  <div className="titleNumberHomePros">
                    <div className="left-number">2</div>
                    <div className="right-number">6</div>
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
                            <div className="point-content-wrapper-energyStep2">
                              <div className="points-div-energyStep2">
                                <div className="outer-point-energyStep2">
                                  <div className="inner-point-energyStep2"></div>
                                </div>
                                <div className="vertical-line-energyStep2"></div>
                              </div>

                              <div className="point-content-energyStep2">
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
                                <div className="point-content-wrapper2-energyStep2">
                                  <div className="points-div-energyStep2">
                                    <div className="outer-point-energyStep2">
                                      <div className="inner-point-energyStep2"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-energyStep2">
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
              {this.state.closed == false && this.state.hintContent ? (
                <div className="helpful-div-homePros">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {this.state.listContent.map((item: any) => {
                return (
                  <div className="point-content-wrapper-energyStep2">
                    <div className="points-div-energyStep2">
                      <div className="outer-point-energyStep2">
                        <div className="inner-point-energyStep2"></div>
                      </div>
                      <div className="vertical-line-energyStep2"></div>
                    </div>

                    <div className="point-content-energyStep2">{item}</div>
                  </div>
                );
              })}
              <div className="point-content-wrapper-energyStep2">
                <div className="points-div-energyStep2">
                  <div className="outer-point-energyStep2">
                    <div className="inner-point-energyStep2"></div>
                  </div>
                  <div className="vertical-line-energyStep2"></div>
                </div>

                <div className="point-content-energyStep2">
                  Select Plan for Electricity
                  <div className="property-detail">
                    Property Details
                    <div className="down-arrow-energy">
                      <KeyboardArrowDownIcon
                        className="icon"
                        onClick={() => {
                          this.setState({
                            filter: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {this.state.filter ? (
                    <div className="filteringEnergy">
                      <div className="filterBorder">
                        <span className="filterMonth">Monthly Avg Usage</span>
                        <span className="filterKWH">1,129 kWh</span>
                        <span>
                          <EditIcon />
                        </span>
                      </div>
                      <div className="filterBorder">
                        <span className="filterMonth">Square Footage</span>
                        <span className="filterMonth">1,800 kWh</span>
                        <span>
                          <EditIcon />
                        </span>
                      </div>
                      <div className="filterBorder">
                        <span className="filterMonth">Cost of 1 kWh</span>
                        <span className="filterMonth">23.2¢/kWh</span>
                      </div>
                    </div>
                  ) : null}
                  <div className="electricityComponent">
                    <ElectricityComponent
                      logo={logoIcon}
                      title="Constellation"
                      selected={true}
                      onSelectClick={() => console.log()}
                      KwhValue={8.49}
                      contractTermValue={24}
                      cancelationFee={0}
                    />
                    <ElectricityComponent
                      logo={logoIcon}
                      title="Constellation"
                      selected={false}
                      onSelectClick={() => console.log()}
                      KwhValue={8.49}
                      contractTermValue={24}
                      cancelationFee={0}
                    />
                    <ElectricityComponent
                      logo={logoIcon}
                      title="Constellation"
                      selected={false}
                      onSelectClick={() => console.log()}
                      KwhValue={8.49}
                      contractTermValue={24}
                      cancelationFee={0}
                    />
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
                      "/dashboard/concierge/workflow/energystep1"
                    )
                  }
                  ButtonOnClick2={() => {
                    this.props.history.push(
                      "/dashboard/concierge/workflow/energystep3"
                    );
                  }}
                  // button2Disabled={this.state.isScheduleCall}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnergyStep;
