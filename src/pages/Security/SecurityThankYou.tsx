import React from "react";
import "../Movers/MoversStep1";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import * as Action from "../../store/common/actions";
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

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  objectionCompleted: boolean;
  closed: boolean;
  hintContent: string;
  data: any;
  isDataArrived: boolean;
};

class SecurityThankyou extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    objectionCompleted: true,
    closed: false,
    data: [],
    isDataArrived: true,
  };

  componentDidMount() {}
  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      nextProps.commonState.order.map((item: any) => {
        orderData.push({
          type: item.service,
          selectedProviders: item.plan_detail && item.plan_detail.name,
          contactDetails: "",
          emailStatus: "",
          orderNumber: item.account_no ? item.account_no : "",
          installationDate: item.install_date ? item.install_date : "",
        });
      });
      currentState.data = orderData;
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
      let moveId = nextProps.commonState.move[0].id;
      const payload = {
        service: "Security",
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
      field: "type",
      sorting: false,
    },
    {
      title: "Selected providers",
      field: "selectedProviders",
      sorting: false,
    },
    {
      title: "Contact details",
      field: "contactDetails",
      sorting: false,
    },
    {
      title: "Email status",
      field: "emailStatus",
      sorting: false,
    },
    {
      title: "Order number",
      field: "orderNumber",
      sorting: false,
    },
    {
      title: "Installation date",
      field: "installationDate",
      sorting: false,
    },
  ];

  render() {
    let data: any = [];

    data = this.state.data;
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Security"}
            tabId={4}
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
                <div className="mover5">Security </div>
                <div>
                  {/* <div className="titleNumberMover">
                    <div className="left-number">4</div>
                    <div className="right-number">4</div>
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
            </div>
          </div>
          <div className="OrderSummaryDiv">
            <div className="OrderSummary">Order Summary</div>
            <div className="SummaryTableDiv">
              <TableComponent
                data={data}
                columns={this.columns}
                className="SummaryTable"
                onRowClick={() => console.log("hii")}
                pageSize={data.length}
                // page={this.state.page}
                // handleBack={this.handleBackPagination}
                // handleNext={this.handleNextPagination}
                // totalPage={this.state.totalPage}
                // handlePagination={this.handlePagination}
                nopagination
              />
            </div>

            <div className="summaryButtonDiv">
              <div className="summaryEditButton">Edit Order</div>
              <div className="summaryCancleButton">Cancel Order</div>
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
                  pathname: "/dashboard/concierge/workflow/securitystep3",
                  state: {
                    listContent:
                      this.props &&
                      this.props.history &&
                      this.props.history.location &&
                      this.props.history.location.state &&
                      this.props.history.location.state.selectedContent,
                  },
                });
              }}
              ButtonOnClick2={() => {
                this.props.history.push(
                  "/dashboard/concierge/workflow/internetstep1"
                );
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
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityThankyou);
