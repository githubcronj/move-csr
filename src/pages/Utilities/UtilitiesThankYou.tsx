import React from "react";
import "../Movers/MoversStep1";
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
import { CircularProgress } from "@material-ui/core";
import TableComponent from "../../components/atoms/Table/Table";
import * as MoversAction from "../../store/move/actions";
import Modal from "../../components/atoms/Modal";

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
  data: any;
  isDataArrived: boolean;
  cancelEntireOrderModal: boolean;
  moveId: string;
  energyData: any;
  loader: boolean;
};

class UtilitiesThankyou extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    objectionCompleted: true,
    closed: false,
    data: [],
    isDataArrived: true,
    cancelEntireOrderModal: false,
    moveId: "",
    energyData: [],
    loader: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 5000);
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.moversState;
    const cur = this.props && this.props.moversState;

    if (
      prev.cancelEntireMoverOrder !== cur.cancelEntireMoverOrder &&
      cur.cancelEntireMoverOrder !== null
    ) {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload1 = {
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload1);
      }

      this.setState({
        cancelEntireOrderModal: false,
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
      nextProps.commonState.order &&
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      nextProps.commonState.orderDataArrived = false;
      let orderData: any = [];
      let energyData: any = [];
      // let loader: boolean = true;
      nextProps.commonState.order.map((item: any) => {
        // orderData.push({
        //   type: item.service,
        //   selectedProviders: item.plan_detail && item.plan_detail.name,
        //   contactDetails: "",
        //   emailStatus: "",
        //   orderNumber: item.account_no ? item.account_no : "",
        //   installationDate: item.install_date ? item.install_date : "",
        // });
        if (item.service === "Utilities") {
          orderData.push(item);
          // loader = false;
        }
        if (item.service === "Energy") {
          energyData.push(item);
        }
      });
      currentState.data = orderData;
      currentState.energyData = energyData;
      setTimeout(() => {
        currentState.loader = false;
      }, 3000);

      // if (!orderData.length) {
      //   if (
      //     !(
      //       nextProps &&
      //       nextProps.history &&
      //       nextProps.history.location &&
      //       nextProps.history.location.state &&
      //       nextProps.history.location.state.notInterested
      //     )
      //   ) {
      //     nextProps.history.push(
      //       "/dashboard/concierge/workflow/utilitiesstep1"
      //     );
      //   }
      // }
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move &&
      nextProps.commonState.move[0] &&
      nextProps.commonState.move[0].id &&
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;
      currentState.moveId = nextProps.commonState.move[0].id;
      let moveId = nextProps.commonState.move[0].id;
      const payload = {
        service: "",
        moveId: moveId,
      };
      nextProps.commonAction.orderGet(payload);
    }
    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  columns = [
    {
      title: "Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      // field: "selectedProviders",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.name}</div>;
      },
    },
    {
      title: "Contact details",
      // field: "created_by",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.phone}</div>;
      },
    },
    {
      title: "Email status",
      field: "emailStatus",
      sorting: false,
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
  ];

  columns1 = [
    {
      title: "Selected utilities",
      field: "provider_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      field: "title",
      sorting: false,
    },
    {
      title: "Contact details",
      field: "phone",
      sorting: false,
    },
  ];

  confirmCancleEntireOrderHandler = () => {
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
  };

  render() {
    let data: any = [];
    data = this.state.data;

    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        {this.state.cancelEntireOrderModal ? (
          <Modal
            isShowModal={this.state.cancelEntireOrderModal}
            onCloseModal={() =>
              this.setState({
                cancelEntireOrderModal: false,
              })
            }
            showClose={false}
            className="OpenModalMovers"
          >
            <div className="OpenModal-main">
              <div className="OpenModal-job">Cancellation confirmation</div>
              <div>
                <div className="order-confirmation-number">
                  Do you really want to cancel the order made for this customer?
                </div>
                <div className="OpenModal-job">{`${this.state.data.length} units will be deducted`}</div>
              </div>

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
        <div>
          <ConciergeTabs
            tabName={"Utilities"}
            tabId={6}
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
                <div className="mover5">Utilities </div>
                <div>
                  {/* <div className="titleNumberMover">
                    <div className="left-number">3</div>
                    <div className="right-number">3</div>
                  </div> */}
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

              {/* {this.state.closed == false && this.state.hintContent ? (
                <div className="helpful-div-mover">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null} */}
            </div>
          </div>
          <div className="OrderSummaryDiv">
            <div className="OrderSummary">Order Summary</div>
            <div className="SummaryTableDiv">
              {this.props &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.selectedUtilities ? (
                <TableComponent
                  data={this.props.history.location.state.selectedUtilities}
                  columns={this.columns1}
                  className="SummaryTable"
                  pageSize={
                    this.props.history.location.state.selectedUtilities.length
                  }
                  // page={this.state.page}
                  // handleBack={this.handleBackPagination}
                  // handleNext={this.handleNextPagination}
                  // totalPage={this.state.totalPage}
                  // handlePagination={this.handlePagination}
                  nopagination
                />
              ) : this.state.loader ? (
                <CircularProgress />
              ) : (
                <TableComponent
                  data={data}
                  columns={this.columns}
                  className="SummaryTable"
                  pageSize={data.length}
                  // page={this.state.page}
                  // handleBack={this.handleBackPagination}
                  // handleNext={this.handleNextPagination}
                  // totalPage={this.state.totalPage}
                  // handlePagination={this.handlePagination}
                  nopagination
                />
              )}
            </div>

            <div className="summaryButtonDiv">
              <div
                className="summaryEditButton"
                onClick={() => {
                  if (!this.state.data.length) {
                    this.props.history.push(
                      "/dashboard/concierge/workflow/utilitiesstep2"
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
                onClick={() =>
                  this.setState({
                    cancelEntireOrderModal: true,
                  })
                }
                style={{
                  opacity: this.state.data.length < 1 ? "0.5" : "1",
                  cursor: this.state.data.length < 1 ? "default" : "pointer",
                }}
              >
                Cancel Order
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
              //     pathname: "/dashboard/concierge/workflow/utilitiesstep3",
              //     state: {
              //       listContent:
              //         this.props &&
              //         this.props.history &&
              //         this.props.history.location &&
              //         this.props.history.location.state &&
              //         this.props.history.location.state.selectedContent
              //           ? this.props.history.location.state.selectedContent
              //           : this.props &&
              //             this.props.history &&
              //             this.props.history.location &&
              //             this.props.history.location.state &&
              //             this.props.history.location.state.selectedUtilities,
              //     },
              //   });
              // }}
              ButtonOnClick1={() =>
                this.props.history.push({
                  pathname:
                    // this.state.data
                    // ? "/dashboard/concierge/workflow/internetthankyou"
                    // :
                    "/dashboard/concierge/workflow/utilitiesstep3",
                })
              }
              ButtonOnClick2={() => {
                if (this.state.energyData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/energystep2"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/energystep1"
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

export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesThankyou);
