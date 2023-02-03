import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./InsuranceStep2.scss";
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
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";
import Modal from "../../components/atoms/Modal";
import * as MoversAction from "../../store/move/actions";
import TableComponent from "../../components/atoms/Table/Table";

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
  data: any;
  moveId: string;
  securityData: any;
  notInterested: boolean;
};

class InsuranceStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    scriptContent: [],
    hintContent: "",
    address: "",
    listContent: [],
    closed: false,
    objectionCompleted: true,
    loader: true,
    openModal: false,
    data: [],
    moveId: "",
    securityData: [],
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
        // service: "Insurance",
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
    const hash_code = localStorage.getItem("scriptHashCode");
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.isBrokerage
    ) {
      this.props.commonAction.scriptGet({
        hash_code: hash_code,
        service: "insurance",
        page: 2,
        subCategory: "brokerage-insurance",
      });
    } else {
      this.props.commonAction.scriptGet({
        hash_code: hash_code,
        service: "insurance",
        page: 2,
        subCategory: "moveeasy-insurance",
      });
    }

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.getSkipService
    ) {
      this.props.commonState.getSkipService.map((item: any) => {
        if (
          item.service_name === "Insurance" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({
        address: cur.move[0].destination_full_address
          ? cur.move[0].destination_full_address
          : "",
        moveId: cur.move[0].id,
      });
      const payload = {
        // service: "Insurance",
        service: "",
        moveId: cur.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }

    if (prev.getSkipService !== cur.getSkipService && cur.getSkipService) {
      cur.getSkipService.map((item: any) => {
        if (
          item.service_name === "Insurance" &&
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
    //   nextProps.commonState.isGetMove = false;
    //   currentState.address = nextProps.commonState.move[0]
    //     .destination_full_address
    //     ? nextProps.commonState.move[0].destination_full_address
    //     : "";
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
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      let securityData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Insurance") orderData.push(item);
        if (item.service === "Home Security") {
          securityData.push(item);
        }
      });
      currentState.data = orderData;
      currentState.securityData = securityData;
      currentState.loader = false;

      // if(!orderData.length){
      //   if(!( nextProps && nextProps.history &&
      //     nextProps.history.location &&
      //     nextProps.history.location.state &&
      //     nextProps.history.location.state.notInterested)){
      //   nextProps.history.push('/dashboard/concierge/workflow/insurancestep1')
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

  columns = [
    // {
    //   title: "Action",
    //   // field: "product_type",
    //   sorting: false,
    // },
    {
      title: "Scheduled date",
      field: "appointment_date",
      sorting: false,
      // render: (row: any) => {
      //   console.log(row);
      //   return <div>{row.plan_detail && row.plan_detail.name}</div>;
      // },
    },
    {
      title: "Scheduled time",
      field: "appointment_time",
      sorting: false,
      // render: (row: any) => {
      //   return <div>{row.plan_detail && row.plan_detail.phone_no}</div>;
      // },
    },
    {
      title: "Order no.",
      field: "order_id",
      sorting: false,
    },
  ];

  render() {
    let data: any = [];
    let noDataMessage: string = "";
    if (
      (this.props &&
        this.props.history &&
        this.props.history.location &&
        this.props.history.location.state &&
        this.props.history.location.state.notInterested) ||
      (this.state.notInterested && this.state.data.length === 0)
    ) {
      data = [];
      noDataMessage = "Not Interested";
    } else if (this.state.data.length != 0) {
      data = this.state.data;
      noDataMessage = "No records to display";
    } else {
      data = [];
      noDataMessage = "No records to display";
    }
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
            tabName={"Insurance"}
            tabId={3}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="insurance2-main">
              <div className="insurance2-heading">
                <div className="insurance2">Insurance </div>
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

              {
                <div className="script-div">
                  {this.state.scriptContent &&
                    this.state.scriptContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper-insurance2-script">
                          <div className="points-div-insurance2">
                            <div className="outer-point-insurance2">
                              <div className="inner-point-insurance2"></div>
                            </div>
                            <div className="vertical-line-insurance2"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-insurance2"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }
              {this.state.listContent &&
                this.state.listContent.map((item: any) => {
                  return (
                    <div className="point-content-wrapper-insurance2">
                      <div className="points-div-insurance2">
                        <div className="outer-point-insurance2">
                          <div className="inner-point-insurance2"></div>
                        </div>
                        <div className="vertical-line-insurance2"></div>
                      </div>

                      <div className="point-content-insurance2">{item}</div>
                    </div>
                  );
                })}
              {/* <div className="point-content-wrapper-insurance2">
                <div className="points-div-insurance2">
                  <div className="outer-point-insurance2">
                    <div className="inner-point-insurance2"></div>
                  </div>
                  <div className="vertical-line-insurance2"></div>
                </div>

                <div className="point-content-insurance2">
                  <div className="insuranceMovingToFlexDiv">
                    <div className="movingTo">Moving to</div>
                    <div>
                      <div className="movingTo">
                        {this.state.address !== "" &&
                        this.state.address.split(",")[0]
                          ? `${this.state.address.split(",")[0]},`
                          : ""}
                      </div>
                      <div className="movingAddress">
                        {this.state.address !== "" &&
                        this.state.address.split(",")[1]
                          ? this.state.address.split(",")[1]
                          : ""}
                      </div>
                      <div className="movingAddress">
                        {this.state.address !== "" &&
                        this.state.address.split(",")[2]
                          ? this.state.address.split(",")[2]
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* {this.state.data.length &&
              this.props &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.scheduleCallBackData ? (
                <div className="callBackSchedule">
                  <div className="scheduleText">Call Back Schedule</div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Name:</div>
                    <div className="flexDetailDiv">
                      {`${this.props.history.location.state.scheduleCallBackData.firstName} 
                      ${this.props.history.location.state.scheduleCallBackData.lastName}
                      `}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Phone number:</div>
                    <div className="flexDetailDiv">
                      {
                        this.props.history.location.state.scheduleCallBackData
                          .phone
                      }
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Email:</div>
                    <div className="flexDetailDiv">
                      {
                        this.props.history.location.state.scheduleCallBackData
                          .email
                      }
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Zipcode:</div>
                    <div className="flexDetailDiv">
                      {
                        this.props.history.location.state.scheduleCallBackData
                          .zipCode
                      }
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Date:</div>
                    <div className="flexDetailDiv">
                      {new Date(
                        this.props.history.location.state.scheduleCallBackData.installationDate
                      ).toDateString()}
                    </div>
                  </div>
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Time:</div>
                    <div className="flexDetailDiv">
                      {this.formatAMPM(
                        new Date(
                          this.props.history.location.state.scheduleCallBackData.installationDate
                        )
                      )}
                    </div>
                  </div>

                  <div className="flexDiv">
                    <div className="flexTitleDiv">Order number:</div>
                    <div className="flexDetailDiv">
                      {
                        this.props.history.location.state.scheduleCallBackData
                          .orderNumber
                      }
                    </div>
                  </div>
                </div>
              ) : this.state.data.length &&
                this.props &&
                this.props.history &&
                this.props.history.location &&
                this.props.history.location.state &&
                this.props.history.location.state.warmTransferData ? (
                <div className="callBackSchedule">
                  <div className="flexDiv">
                    <div className="flexTitleDiv">Order number:</div>
                    <div className="flexDetailDiv">
                      {
                        this.props.history.location.state.warmTransferData
                          .orderNumber
                      }
                    </div>
                  </div>

                  <div className="scheduleDetails">
                    The customer have been setup for warm transfer
                  </div>
                </div>
              ) : this.state.data ? (
                this.state.data.map((item: any) => {
                  return (
                    <div className="callBackSchedule">
                      {this.props &&
                      this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.notInterested ? null : (
                        <div className="flexDiv">
                          <div className="flexTitleDiv">Order number:</div>
                          <div className="flexDetailDiv">{item.order_id}</div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : null} */}
              <div className="OrderSummaryDiv">
                <div className="OrderSummary">Order Summary</div>
                {this.state.loader ? (
                  <CircularProgress />
                ) : (
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={data}
                      columns={this.columns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={data.length}
                      nopagination
                      noDataMessage={noDataMessage}
                    />
                  </div>
                )}

                <div className="buttonDiv">
                  <Button
                    className="editOrderButton"
                    disabled={this.state.data.length ? true : false}
                    onClick={() => {
                      if (!this.state.data.length) {
                        this.props.history.push(
                          "/dashboard/concierge/workflow/insurancestep1"
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
              {/* {this.props &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.notInterested ? (
                <div>Not Interested</div>
              ) : (
                <div className="buttonDiv">
                  <Button
                    className="editOrderButton"
                    disabled={this.state.data.length ? true : false}
                    onClick={() => {
                      if (!this.state.data.length) {
                        this.props.history.push(
                          "/dashboard/concierge/workflow/insurancestep1"
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
              )} */}

              {/* <div className="insurance2ButtonDiv">
                <Button className="confirmButton" startLogo={<DoneIcon />}>
                  Confirm Home Address
                </Button>
                <Button className="editButton" startLogo={<CreateIcon />}>
                  Edit Home Address
                </Button>
              </div> */}
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
                  // pathname: this.state.data
                  //   ? "/dashboard/concierge/workflow/moversthankyou"
                  pathname: "/dashboard/concierge/workflow/insurancestep1",
                })
              }
              ButtonOnClick2={() => {
                if (this.state.securityData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/securitystep2"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/securitystep1"
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

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceStep2);
