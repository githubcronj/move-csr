import React from "react";
import "../Movers/moversThankyou.scss";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import checked from "../../Assets/images/checked.png";
import Button from "../../components/atoms/Button";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import AddIcon from "@material-ui/icons/Add";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ChatIcon from "@material-ui/icons/Chat";
// import { CircularProgress } from "@material-ui/core";
import TableComponent from "../../components/atoms/Table/Table";
import Modal from "../../components/atoms/Modal";
import * as MoversAction from "../../store/move/actions";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
  moversAction: any;
  moversState: any;
};

type initialState = {
  objectionCompleted: boolean;
  closed: boolean;
  hintContent: string;
  isDataArrived: boolean;
  cancelEntireOrderModal: boolean;
  data: any;
  rowData: any;
  cancelOrder: boolean;
  moveId: string;
  utilitiesData: any;
  loader: boolean;
};

class InternetThankyou extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    objectionCompleted: true,
    closed: false,
    isDataArrived: true,
    data: [],
    cancelEntireOrderModal: false,
    rowData: null,
    cancelOrder: false,
    moveId: "",
    utilitiesData: [],
    loader: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
      this.setState({
        moveId: data.id,
      });
      const payload = {
        // service: "Movers",
        service: "",
        moveId: data.id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }

    setTimeout(() => {
      this.setState({ loader: false });
    }, 5000);
  }
  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      let utilitiesData: any = [];
      // let loader: boolean = true;

      nextProps.commonState.orderDataArrived = false;
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Internet/Cable" || item.service === "TV") {
          // loader = false;
          orderData.push({
            type: item.product_type,
            selectedProviders:
              item.plan_detail && item.plan_detail.provider_name,
            contactDetails: item.order_id ? item.order_id : null,
            orderNumber: item.account_no ? item.account_no : "",
            installationDate: item.install_date ? item.install_date : "",
            order_db_id: item.id ? item.id : null,
          });
        }
        if (item.service === "Utilities") {
          utilitiesData.push(item);
        }
      });

      currentState.data = orderData;
      currentState.utilitiesData = utilitiesData;
      setTimeout(() => {
        currentState.loader = false;
      }, 3000);
      // setTimeout(()=>{

      //   if(!orderData.length){
      //     if(!( nextProps && nextProps.history &&
      //       nextProps.history.location &&
      //       nextProps.history.location.state &&
      //       nextProps.history.location.state.notInterested)){
      //     nextProps.history.push('/dashboard/concierge/workflow/internetstep2')
      //       }
      //   }
      // },5000)
    }
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.move[0].id &&
    //   // currentState.isDataArrived
    //   nextProps.commonState.isGetMove
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   let moveId = nextProps.commonState.move[0].id;
    //   currentState.moveId = nextProps.commonState.move[0].id;
    //   const payload = {
    //     // service: "Digital",
    //     service: "",
    //     moveId: nextProps.commonState.move[0].id,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    // }
    return currentState;
  }
  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.moversState;
    const cur = this.props && this.props.moversState;

    if (prev.cancelMover !== cur.cancelMover && cur.cancelMover !== null) {
      this.setState({
        cancelEntireOrderModal: false,
        rowData: null,
        cancelOrder: false,
      });
      if (this.state.moveId && this.state.moveId !== "") {
        const payload1 = {
          // service: "Digital",
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload1);
      }
    }

    if (
      prev.cancelEntireMoverOrder !== cur.cancelEntireMoverOrder &&
      cur.cancelEntireMoverOrder !== null
    ) {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload1 = {
          // service: "Digital",
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload1);
      }

      this.setState({
        cancelEntireOrderModal: false,
        rowData: null,
        cancelOrder: false,
      });
    }
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({ moveId: this.props.commonState.move[0].id });
      const payload = {
        // service: "Movers",
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
  }
  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  columns = [
    {
      title: "Type",
      field: "type",
      sorting: false,
    },
    {
      title: "Selected providers",
      field: "selectedProviders",
      sorting: false,
    },
    {
      title: "Order No",
      field: "contactDetails",
      sorting: false,
    },
    {
      title: "Installation Date",
      field: "installationDate",
      sorting: false,
    },
    {
      title: "MoveEasy Number",
      field: "orderNumber",
      sorting: false,
    },
    {
      title: "",
      sorting: false,
      render: (row: any) => {
        return (
          <Button
            className="cancleOrderButton"
            onClick={() => this.cancleOrder(row)}
          >
            Cancel
          </Button>
        );
      },
    },
  ];

  cancleOrder = (data: any) => {
    this.setState({
      cancelEntireOrderModal: true,
      rowData: data,
      cancelOrder: true,
    });
  };
  confirmCancleEntireOrderHandler = () => {
    if (this.state.cancelOrder && this.state.rowData) {
      let payload = {
        order_db_id: this.state.rowData && this.state.rowData.order_db_id,
        body: {
          status: "Cancelled",
        },
      };
      this.props.moversAction.cancelMover(payload);
    } else {
      let orders: any = [];
      this.state.data &&
        this.state.data.map((item: any) => {
          orders.push(item.order_db_id);
          return orders;
        });
      let payload = {
        orders: orders,
      };
      this.props.moversAction.cancelEntireMoverOrder(payload);
    }
  };

  render() {
    let data: any = [];

    data = this.state.data;
    return (
      <div className="ConciergeFlowPage">
        {this.state.cancelEntireOrderModal ? (
          <Modal
            isShowModal={this.state.cancelEntireOrderModal}
            onCloseModal={() =>
              this.setState({
                cancelEntireOrderModal: false,
                rowData: null,
                cancelOrder: false,
              })
            }
            showClose={false}
            className="OpenModalMovers"
          >
            <div className="OpenModal-main">
              <div className="OpenModal-job">Cancellation confirmation</div>
              {this.state.cancelOrder && this.state.rowData ? (
                <div>
                  <div className="order-confirmation-number">
                    Do you really want to cancel this order?
                  </div>
                  <div className="order-confirmation-number">
                    Selected provider:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {this.state.rowData.selectedProviders}
                    </span>
                  </div>
                  <div className="order-confirmation-number">
                    Service type :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {this.state.rowData.type}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="order-confirmation-number">
                    Do you really want to cancel the order made for this
                    customer?
                  </div>
                  <div className="OpenModal-job">{`${this.state.data.length} units will be deducted`}</div>
                </div>
              )}

              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() =>
                    this.setState({ cancelEntireOrderModal: false })
                  }
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Go Back
                </Button>
                <Button
                  className="confirmButton"
                  onClick={() => this.confirmCancleEntireOrderHandler()}
                  color="#fff"
                  // backgroundColor={"#465B74"}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Int/Cable"}
            tabId={5}
            history={this.props.history}
          />
        </div>

        {/* <div className="main-body-thankyou">
    <div className="image-div-thankyou">
        <img src={checked}  />
    </div>
    <div className="thankyou-text">
        Thank you
    </div>
    <div className="successfully-placed">
        Your Order has been successfully Placed!
    </div>

    <div className="cancel-button">
    <Button
          className="button-thankyou"
        //   onClick={props.ButtonOnClick1}
          color="#fff"
          backgroundColor={'#D10000'}
        >
          Cancel Order
        </Button>
    </div>
</div> */}
        <div className="component-div">
          <div className="componetContent">
            <div className="mover5-main">
              <div className="mover5-heading">
                <div className="mover5">Internet / Cable </div>
                <div>
                  <div className="titleNumberMover">
                    <div className="left-number">7</div>
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
            </div>
          </div>
          <div className="OrderSummaryDiv">
            <div className="OrderSummary">Order Summary</div>
            {this.state.loader ? (
              <CircularProgress />
            ) : (
              <div className="SummaryTableDiv">
                <TableComponent
                  data={this.state.data}
                  columns={this.columns}
                  className="SummaryTable"
                  pageSize={this.state.data.length}
                  // page={this.state.page}
                  // handleBack={this.handleBackPagination}
                  // handleNext={this.handleNextPagination}
                  // totalPage={this.state.totalPage}
                  // handlePagination={this.handlePagination}
                  nopagination
                />
              </div>
            )}

            <div className="summaryButtonDiv">
              <div
                className="summaryEditButton"
                onClick={() => {
                  if (!this.state.data.length) {
                    this.props.history.push(
                      "/dashboard/concierge/workflow/internetstep2"
                    );
                  }
                }}
                style={{
                  opacity: this.state.data.length ? "0.5" : "1",
                  cursor: this.state.data.length ? "default" : "pointer",
                }}
              >
                Edit Order
              </div>
              <div
                className="summaryCancleButton"
                style={{
                  opacity: this.state.data.length ? "1" : "0.5",
                  cursor: this.state.data.length ? "pointer" : "default",
                }}
                onClick={() => {
                  if (this.state.data.length) {
                    this.setState({ cancelEntireOrderModal: true });
                  }
                }}
              >
                Cancel Entire Order
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Continue"}
              buttonStartLogo1={
                // this.state.tabName === "" ||
                // this.state.tabName === "Discovery" ? (
                ""
                // ) : (
                //   <ArrowBackIcon />
                // )
              }
              buttonStartLogo2={<ArrowForwardIcon />}
              // ButtonOnClick1={() => {
              //   this.props.history.push({
              //     pathname: "/dashboard/concierge/workflow/internetstep6",
              //     state: {
              //       listContent:
              //         this.props &&
              //         this.props.history &&
              //         this.props.history.location &&
              //         this.props.history.location.state &&
              //         this.props.history.location.state.selectedContent,
              //     },
              //   });
              // }}
              ButtonOnClick1={() =>
                this.props.history.push({
                  pathname:
                    // this.state.data
                    // ? "/dashboard/concierge/workflow/securitystep2"
                    // :
                    "/dashboard/concierge/workflow/internetstep6",
                })
              }
              ButtonOnClick2={() => {
                if (this.state.utilitiesData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/utilitiesthankyou"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/utilitiesstep2"
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
    commonAction: bindActionCreators(Action, dispatch),
    moversAction: bindActionCreators(MoversAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetThankyou);
