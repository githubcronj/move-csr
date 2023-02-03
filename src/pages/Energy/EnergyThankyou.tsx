import React from "react";
import "../Movers/moversThankyou.scss";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import * as Action from "../../store/common/actions";
import * as MoversAction from "../../store/move/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import checked from "../../Assets/images/checked.png";
import Button from "../../components/atoms/Button";
// import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import AddIcon from "@material-ui/icons/Add";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ChatIcon from "@material-ui/icons/Chat";
// import { CircularProgress } from "@material-ui/core";
import TableComponent from "../../components/atoms/Table/Table";
import Modal from "../../components/atoms/Modal";
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
  // loader: boolean;
  data: any;
  isDataArrived: boolean;
  cancelOrder: boolean;
  rowData: any;
  moveId: string;
  orderDataArrived: boolean;
  solarData: any;
  loader: boolean;
  notInterested: boolean;
};

class EnergyThankyou extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    objectionCompleted: true,
    closed: false,
    // loader: true,
    data: [],
    isDataArrived: true,
    cancelOrder: false,
    rowData: null,
    moveId: "",
    orderDataArrived: true,
    solarData: [],
    loader: true,
    notInterested: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.getSkipService
    ) {
      this.props.commonState.getSkipService.map((item: any) => {
        if (
          item.service_name === "Professional movers" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
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
      let solarData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Energy") {
          orderData.push(item);
        }
        if (item.service === "Solar") {
          solarData.push(item);
        }
      });
      currentState.data = orderData;
      currentState.solarData = solarData;
      currentState.loader = false;
    }
    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.moversState;
    const cur = this.props && this.props.moversState;

    if (prev.cancelMover !== cur.cancelMover && cur.cancelMover !== null) {
      this.setState({
        rowData: null,
        cancelOrder: false,
        loader: false,
      });
      const payload1 = {
        service: "Movers",
        moveId: this.state.moveId,
      };
      this.props.commonAction.orderGet(payload1);
    }

    if (
      prev.cancelEntireMoverOrder !== cur.cancelEntireMoverOrder &&
      cur.cancelEntireMoverOrder !== null
    ) {
      const payload1 = {
        service: "Energy",
        moveId: this.state.moveId,
      };
      this.props.commonAction.orderGet(payload1);

      this.setState({
        rowData: null,
        cancelOrder: false,
        loader: false,
      });
    }

    let prevC = prevProps && prevProps.commonState;
    let curC = this.props && this.props.commonState;

    if (prevC.getSkipService !== curC.getSkipService && curC.getSkipService) {
      curC.getSkipService.map((item: any) => {
        if (
          item.service_name === "Energy" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }

    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
      });
      const payload = {
        // service: "Movers",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
  }

  columns = [
    {
      title: "Service Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      field: "selectedProviders",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.name}</div>;
      },
    },
    {
      title: "Order number",
      field: "order_id",
      sorting: false,
    },
    {
      title: "Installation date",
      field: "appointment_date",
      sorting: false,
    },
    {
      title: "Installation time",
      field: "appointment_time",
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
      rowData: data,
      cancelOrder: true,
      loader: true,
    });
  };

  confirmCancleEntireOrderHandler = () => {
    if (this.state.cancelOrder && this.state.rowData) {
      let payload = {
        order_db_id: this.state.rowData && this.state.rowData.id,
        body: {
          status: "Cancelled",
        },
      };
      this.props.moversAction.cancelMover(payload);
    } else {
      let orders: any = [];
      this.state.data &&
        this.state.data.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
      let payload = {
        orders: orders,
      };
      this.props.moversAction.cancelEntireMoverOrder(payload);
    }
    // this.setState({
    //   cancelEntireOrderModal: false,
    //   rowData: null,
    //   cancelOrder: false,
    // });
    // const payload1 = {
    //   service: "Movers",
    //   moveId: this.state.moveId,
    // };
    // this.props.commonAction.orderGet(payload1);
  };

  editOrder = () => {
    let listContent: any = [];
    this.state.data.map((item: any) => {
      listContent.push(item.plan_detail);
      return listContent;
    });
    if (this.state.data.length == 0)
      this.props.history.push({
        pathname: "/dashboard/concierge/workflow/moversstep1",
        state: {
          // orderData: listContent,
          selectedFullService: true,
        },
      });
  };

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
    } else {
      data = this.state.data;
      noDataMessage = "No records to display";
    }

    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        {this.state.cancelOrder ? (
          <Modal
            isShowModal={this.state.cancelOrder}
            onCloseModal={() =>
              this.setState({
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
                      {this.state.rowData.plan_detail &&
                        this.state.rowData.plan_detail.name}
                    </span>
                  </div>
                  <div className="order-confirmation-number">
                    Mover type :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {this.state.rowData.product_type}
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
                  onClick={() => this.setState({ cancelOrder: false })}
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

        <div>
          <ConciergeTabs
            tabName={"Movers"}
            tabId={2}
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
                <div className="mover5">Movers </div>
                <div>
                  {/* <div className="titleNumberMover">
                    <div className="left-number">4</div>
                    <div className="right-number">4</div>
                  </div> */}
                </div>
                {/* <div className="objection-div">
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
                </div> */}
              </div>
            </div>
          </div>
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

            <div className="summaryButtonDiv">
              <div
                className="summaryCancleButton"
                onClick={() =>
                  // this.setState({
                  //   cancelEntireOrderModal: data.length > 0 ? true : false,
                  // })
                  this.props.history.push(
                    "/dashboard/concierge/workflow/energystep1"
                  )
                }
                // style={{ opacity: data.length < 1 ? "0.5" : "1" }}
              >
                Add Gas
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
              ButtonOnClick1={() => {
                this.props.history.push({
                  pathname:
                    this.state.data.length <= 3
                      ? "/dashboard/concierge/workflow/moversstep5"
                      : "/dashboard/concierge/workflow/discovery",
                });
                // this.props.history.push({
                //   pathname: "/dashboard/concierge/workflow/moversstep5",
                //   state: {
                //     listContent:
                //       this.props &&
                //       this.props.history &&
                //       this.props.history.location &&
                //       this.props.history.location.state &&
                //       this.props.history.location.state.selectedContent,
                //   },
                // });
              }}
              ButtonOnClick2={() => {
                if (this.state.solarData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/solarstep2"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/solarstep1"
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

export default connect(mapStateToProps, mapDispatchToProps)(EnergyThankyou);
