import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../Insurance/InsuranceStep2.scss";
import Button from "../../components/atoms/Button";
// import DoneIcon from "@material-ui/icons/Done";
// import CreateIcon from "@material-ui/icons/Create";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as CommonAction from "../../store/common/actions";
import * as MoversAction from "../../store/move/actions";
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";
import Modal from "../../components/atoms/Modal";

type initialProps = {
  history?: any;
  commonState: any;
  commonAction: any;
  moversState: any;
  moversAction: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  address: any;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  openModal: boolean;
  moveId: any;
  data: any;
  homeProsData: any;
  notInterested: boolean;
};

class SolarStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    scriptContent: [],
    hintContent: "",
    address: "",
    listContent: ["Confirm your home address you would like to insure"],
    closed: false,
    objectionCompleted: true,
    loader: true,
    openModal: false,
    moveId: null,
    data: [],
    homeProsData: [],
    notInterested: false,
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
        address: this.props.commonState.move[0].destination_full_address
          ? this.props.commonState.move[0].destination_full_address
          : "",
        moveId: this.props.commonState.move[0].id,
      });
      const payload = {
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "solar",
      page: 2,
    });
    // console.log(this.props.history.location.state.scheduleCallBackData);

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.getSkipService
    ) {
      this.props.commonState.getSkipService.map((item: any) => {
        if (
          item.service_name === "Solar" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }
  }
  componentDidUpdate(prevProps: initialProps) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // // console.log(cur);
    // if (prev.order !== cur.order && cur.order && cur.order.length > 0) {
    //   cur.order.map((el: any) => {
    //     if (el && el.product_type === "Solar") {
    //       this.setState({ data: el });
    //     }
    //   });
    // }
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({
        address: this.props.commonState.move[0].destination_full_address
          ? this.props.commonState.move[0].destination_full_address
          : "",
        moveId: this.props.commonState.move[0].id,
      });
      const payload = {
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
    if (prev.getSkipService !== cur.getSkipService && cur.getSkipService) {
      cur.getSkipService.map((item: any) => {
        if (
          item.service_name === "Solar" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }

    const prevMover = prevProps && prevProps.moversState;
    const curMover = this.props && this.props.moversState;
    if (
      prevMover.cancelEntireMoverOrder !== curMover.cancelEntireMoverOrder &&
      curMover.cancelEntireMoverOrder !== null
    ) {
      const payload1 = {
        service: "",
        moveId: this.state.moveId,
      };
      this.props.commonAction.orderGet(payload1);

      this.setState({ openModal: false });
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
    //   currentState.address = nextProps.commonState.move[0]
    //     .destination_full_address
    //     ? nextProps.commonState.move[0].destination_full_address
    //     : "";
    //   currentState.moveId = nextProps.commonState.move[0].id;
    //   const payload = {
    //     service: "",
    //     moveId: nextProps.commonState.move[0].id,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    // }
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
      //   if (item.page_number === 2) {
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

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      let homeProsData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Solar") orderData.push(item);
        if (item.service === "Home Pros") homeProsData.push(item);
      });
      currentState.data = orderData;
      currentState.homeProsData = homeProsData;

      // if(!orderData.length){
      //   if(!( nextProps && nextProps.history &&
      //     nextProps.history.location &&
      //     nextProps.history.location.state &&
      //     nextProps.history.location.state.notInterested)){
      //   nextProps.history.push('/dashboard/concierge/workflow/solarstep1')
      //     }
      // }
    }
    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  formatAMPM = (date: any) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  cancelOrderHandler = () => {
    let orders: any = [];
    this.state.data.map((item: any) => {
      orders.push(item.id);
      return orders;
    });
    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  render() {
    const { data } = this.state;
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
              <div className="OpenModal-job">Cancellation confirmation!</div>
              <div className="order-confirmation-number">
                Do you really want to cancel the order made for this customer?
              </div>

              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() => this.setState({ openModal: false })}
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Go Back
                </Button>
                <Button
                  className="Button1"
                  // backgroundColor="#EC6133"
                  onClick={() => this.cancelOrderHandler()}
                  color="#fff"
                  backgroundColor={"#EC6133"}
                  margin="0 0 0 30px"
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
            <div className="insurance2-main">
              <div className="insurance2-heading">
                <div className="insurance2">Solar </div>
                <div>
                  <div className="titleNumberInsurance">
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
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-insurance">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {this.state.loader === true ? <CircularProgress /> : null}

              {data.length &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.scheduleCallBackData ? (
                <div className="callBackSchedule">
                  <div className="scheduleText">Call Back Schedule</div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Name:</div>
                    <div className="flexDetailDiv">
                      {`${
                        this.props.history &&
                        this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state
                          .scheduleCallBackData &&
                        this.props.history.location.state.scheduleCallBackData
                          .firstName
                      } 
                      ${
                        this.props.history &&
                        this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state
                          .scheduleCallBackData &&
                        this.props.history.location.state.scheduleCallBackData
                          .lastName
                      }
                      `}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Phone number:</div>
                    <div className="flexDetailDiv">
                      {this.props.history &&
                        this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state
                          .scheduleCallBackData &&
                        this.props.history.location.state.scheduleCallBackData
                          .phone}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Email:</div>
                    <div className="flexDetailDiv">
                      {this.props.history &&
                        this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state
                          .scheduleCallBackData &&
                        this.props.history.location.state.scheduleCallBackData
                          .email}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Zipcode:</div>
                    <div className="flexDetailDiv">
                      {this.props.history &&
                        this.props.history.location &&
                        this.props.history.location.state &&
                        this.props.history.location.state
                          .scheduleCallBackData &&
                        this.props.history.location.state.scheduleCallBackData
                          .zipCode}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Date:</div>
                    <div className="flexDetailDiv">
                      {" "}
                      {this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.scheduleCallBackData &&
                      this.props.history.location.state.scheduleCallBackData
                        .installationDate
                        ? new Date(
                            this.props.history.location.state.scheduleCallBackData.installationDate
                          ).toDateString()
                        : ""}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Time:</div>
                    <div className="flexDetailDiv">
                      {this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.scheduleCallBackData &&
                      this.props.history.location.state.scheduleCallBackData
                        .installationDate
                        ? this.formatAMPM(
                            new Date(
                              this.props.history.location.state.scheduleCallBackData.installationDate
                            )
                          )
                        : ""}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Order number:</div>
                    <div className="flexDetailDiv">
                      {this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.scheduleCallBackData &&
                      this.props.history.location.state.scheduleCallBackData
                        .orderNumber
                        ? this.props.history.location.state.scheduleCallBackData
                            .orderNumber
                        : ""}
                    </div>
                  </div>
                </div>
              ) : this.state.data ? (
                <div className="callBackSchedule">
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Order number:</div>
                    {(this.props &&
                      this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.notInterested) ||
                    this.state.notInterested ? (
                      <div>Not Interested</div>
                    ) : (
                      <div className="flexDetailDiv">
                        {this.state.data.map((item: any) => {
                          return item.order_id;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <div className="buttonDiv">
                <Button
                  className="editOrderButton"
                  disabled={this.state.data.length ? true : false}
                  onClick={() => {
                    if (!this.state.data.length) {
                      this.props.history.push(
                        "/dashboard/concierge/workflow/solarstep1"
                      );
                    }
                  }}
                >
                  Edit Order
                </Button>
                <Button
                  className="cancleOrderButton"
                  disabled={this.state.data.length ? false : true}
                  onClick={() => this.setState({ openModal: true })}
                >
                  Cancel Entire Order
                </Button>
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
                this.props.history.push({
                  pathname:
                    // this.state.data
                    // ? "/dashboard/concierge/workflow/energystep2"
                    //   :
                    "/dashboard/concierge/workflow/solarstep1",
                })
              }
              ButtonOnClick2={() => {
                if (this.state.homeProsData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/homeprosthankyou"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/homeprosstep2"
                  );
                }
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
    commonAction: bindActionCreators(CommonAction, dispatch),
    moversAction: bindActionCreators(MoversAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(SolarStep2);
