import React from "react";
import "./summaryStep1.scss";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SummaryFirstCard from "../../components/summary/SummaryFirstCard";
import Modal from "../../components/atoms/Modal";
import Email from "../../Assets/images/Summary/Email.svg";
import Button from "../../components/atoms/Button";
import * as CommonAction from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MoversAction from "../../store/move/actions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CreateIcon from "@material-ui/icons/Create";

type initialProps = {
  history?: any;
  commonState?: any;
  commonAction?: any;
  moversState?: any;
  moversAction?: any;
};

type initialState = {
  listContent: any;
  showModal: boolean;
  name: string;
  email: string;
  isDataArrived: boolean;
  selectedMovers: any;
  selectedInsurance: any;
  selectedSecurity: any;
  selectedUtilities: any;
  selectedInternet: any;
  CancelMoversOrder: boolean;
  moveId: string;
  isWarmTransferReminder: boolean;
  warmTransferForButton: boolean;
  selectedEnergy: any;
  selectedSolar: any;
  selectedHomePros: any;
  cancelEntireOrderModal: boolean;
  CancelUtilitiesOrder: boolean;
  CancelInsuranceOrder: boolean;
  CancelSecurityOrder: boolean;
  CancelEnergyOrder: boolean;
  CancelSolarOrder: boolean;
  CancelHomeProsOrder: boolean;
  remarkMovers: string;
  remarkInternet: string;
  remarkInsurance: string;
  remarkSecurity: string;
  remarkEnergy: string;
  remarkSolar: string;
  remarkUtilities: string;
  remarkHomePros: string;
  securityWarmTransferClicked: boolean;
  insuranceWarmTransferClicked: boolean;
  energyWarmTransferClicked: boolean;
  solarWarmTransferClicked: boolean;
  homeSecurityNumber: string;
  insuranceNumber: string;
  energyNumber: string;
  solarNumber: string;
  orderId: any;
  is_home_pros: boolean;
};

class SummaryStep1 extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: ["To summarise, you have chosen:"],
    showModal: false,
    name: "",
    email: "",
    isDataArrived: true,
    selectedMovers: [],
    selectedInsurance: [],
    selectedSecurity: [],
    selectedUtilities: [],
    selectedInternet: [],
    selectedEnergy: [],
    selectedSolar: [],
    selectedHomePros: [],
    CancelMoversOrder: false,
    moveId: "",
    isWarmTransferReminder: false,
    warmTransferForButton: false,
    cancelEntireOrderModal: false,
    CancelUtilitiesOrder: false,
    CancelInsuranceOrder: false,
    CancelSecurityOrder: false,
    CancelEnergyOrder: false,
    CancelSolarOrder: false,
    CancelHomeProsOrder: false,
    remarkMovers: "",
    remarkInternet: "",
    remarkInsurance: "",
    remarkSecurity: "",
    remarkEnergy: "",
    remarkSolar: "",
    remarkUtilities: "",
    remarkHomePros: "",
    securityWarmTransferClicked: false,
    insuranceWarmTransferClicked: false,
    energyWarmTransferClicked: false,
    solarWarmTransferClicked: false,
    homeSecurityNumber: "9887765432",
    insuranceNumber: "9887765432",
    energyNumber: "9887765432",
    solarNumber: "9887765432",
    orderId: "",
    is_home_pros: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      let moveId = cur.move[0] && cur.move[0].id;
      let first_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.first_name;
      let last_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.last_name;
      let email =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.email;
      this.setState({
        name: first_name.concat(" " + last_name),
        email: email,
        moveId: moveId,
      });
    }

    if (
      prev.updateOrderRemark !== cur.updateOrderRemark &&
      cur.updateOrderRemark.message
    ) {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload = {
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload);
        this.setState({
          orderId: "",
          remarkMovers: "",
          remarkInsurance: "",
          remarkSecurity: "",
          remarkInternet: "",
          remarkUtilities: "",
          remarkEnergy: "",
          remarkSolar: "",
          remarkHomePros: "",
        });
      }
    }

    const prevMover = prevProps && prevProps.moversState;
    const curMover = this.props && this.props.moversState;
    if (
      prevMover.cancelEntireMoverOrder !== curMover.cancelEntireMoverOrder &&
      curMover.cancelEntireMoverOrder !== null
    ) {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload1 = {
          service: "",
          moveId: this.state.moveId,
        };
        this.props.commonAction.orderGet(payload1);
      }

      this.setState({
        CancelMoversOrder: false,
        CancelUtilitiesOrder: false,
        cancelEntireOrderModal: false,
        CancelInsuranceOrder: false,
        CancelSecurityOrder: false,
        CancelEnergyOrder: false,
        CancelSolarOrder: false,
        CancelHomeProsOrder: false,
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
      nextProps.commonState.move &&
      nextProps.commonState.move[0] &&
      nextProps.commonState.move[0].id &&
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;
      const data =
        nextProps.commonState &&
        nextProps.commonState.move &&
        nextProps.commonState.move.length > 0 &&
        nextProps.commonState.move[0];
      let first_name = data && data.user_ref && data.user_ref.first_name;
      let last_name = data && data.user_ref && data.user_ref.last_name;
      let email = data && data.user_ref && data.user_ref.email;
      currentState.name = first_name.concat(" " + last_name);
      currentState.email = email;
      let moveId = data && data.id;
      const payload = {
        service: "",
        moveId: moveId,
      };
      nextProps.commonAction.orderGet(payload);
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let moversData: any = [];
      let insuranceData: any = [];
      let securityData: any = [];
      let internetData: any = [];
      let utilitiesData: any = [];
      let solarData: any = [];
      let energyData: any = [];
      let homeProsData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (
          item.service == "Professional Movers" ||
          item.service == "DIY Move"
        ) {
          moversData.push(item);
        }
        if (item.service == "Insurance") {
          insuranceData.push(item);
        }
        if (item.service == "Home Security") {
          securityData.push(item);
        }
        if (item.service == "Internet/Cable" || item.service == "TV") {
          internetData.push(item);
        }
        if (item.service == "Energy" || item.product_type == "Energy") {
          energyData.push(item);
        }
        if (item.service == "Solar" || item.product_type == "Solar") {
          solarData.push(item);
        }
        if (
          item.service == "Utilities" &&
          (item.product_type !== "Energy" || item.product_type !== "Solar")
        ) {
          utilitiesData.push(item);
        }
        if (item.service == "Home Pros" || item.product_type == "Home Pros") {
          homeProsData.push(item);
        }
      });

      currentState.selectedMovers = moversData;
      currentState.selectedInsurance = insuranceData;
      currentState.selectedSecurity = securityData;
      currentState.selectedInternet = internetData;
      currentState.selectedUtilities = utilitiesData;
      currentState.selectedEnergy = energyData;
      currentState.selectedSolar = solarData;
      currentState.selectedHomePros = homeProsData;
    }
    return currentState;
  }

  confirmCancleEntireOrderHandler = () => {
    let orders: any = [];
    if (this.state.CancelMoversOrder) {
      this.state.selectedMovers &&
        this.state.selectedMovers.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelUtilitiesOrder) {
      this.state.selectedUtilities &&
        this.state.selectedUtilities.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelInsuranceOrder) {
      this.state.selectedInsurance &&
        this.state.selectedInsurance.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelSecurityOrder) {
      this.state.selectedSecurity &&
        this.state.selectedSecurity.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelEnergyOrder) {
      this.state.selectedEnergy &&
        this.state.selectedEnergy.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelSolarOrder) {
      this.state.selectedSolar &&
        this.state.selectedSolar.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelHomeProsOrder) {
      this.state.selectedHomePros &&
        this.state.selectedHomePros.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    }

    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  warmTransferHandler = () => {};
  confirmCancleEntireOrderHandlerInternet = () => {
    let orders: any = [];

    this.state.selectedInternet &&
      this.state.selectedInternet.map((item: any) => {
        orders.push(item.id);
        return orders;
      });

    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };
  confirmOrderClick = () => {
    this.setState({ showModal: true });
  };

  handleSaveRemark = (remark: string, orderId: any, is_home_pros: boolean) => {
    console.log(remark, orderId);
    let payload: any = [
      {
        order_db_id: orderId,
        remarks: remark,
        is_home_pros: is_home_pros,
      },
    ];
    this.props.commonAction.updateOrderRemark(payload);
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        {this.state.CancelMoversOrder ||
        this.state.CancelUtilitiesOrder ||
        this.state.CancelInsuranceOrder ||
        this.state.CancelSecurityOrder ||
        this.state.CancelSolarOrder ||
        this.state.CancelHomeProsOrder ||
        this.state.CancelEnergyOrder ? (
          <Modal
            isShowModal={
              this.state.CancelMoversOrder ||
              this.state.CancelUtilitiesOrder ||
              this.state.CancelInsuranceOrder ||
              this.state.CancelSecurityOrder ||
              this.state.CancelSolarOrder ||
              this.state.CancelEnergyOrder ||
              this.state.CancelHomeProsOrder
            }
            onCloseModal2={() =>
              this.setState({
                CancelMoversOrder: false,
                CancelUtilitiesOrder: false,
                CancelInsuranceOrder: false,
                CancelSecurityOrder: false,
                CancelEnergyOrder: false,
                CancelSolarOrder: false,
                CancelHomeProsOrder: false,
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
                <div className="OpenModal-job">
                  {this.state.CancelMoversOrder
                    ? `${this.state.selectedMovers.length} units will be deducted`
                    : this.state.CancelUtilitiesOrder
                    ? `${this.state.selectedUtilities.length} units will be deducted`
                    : this.state.selectedInsurance
                    ? `${this.state.selectedInsurance.length} units will be deducted`
                    : this.state.selectedSecurity
                    ? `${this.state.selectedSecurity.length} units will be deducted`
                    : this.state.selectedEnergy
                    ? `${this.state.selectedEnergy.length} units will be deducted`
                    : this.state.selectedSolar
                    ? `${this.state.selectedSolar.length} units will be deducted`
                    : this.state.selectedHomePros
                    ? `${this.state.selectedHomePros.length} units will be deducted`
                    : ""}
                </div>
              </div>
              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() =>
                    this.setState({
                      CancelMoversOrder: false,
                      CancelUtilitiesOrder: false,
                      CancelInsuranceOrder: false,
                      CancelSecurityOrder: false,
                      CancelEnergyOrder: false,
                      CancelSolarOrder: false,
                      CancelHomeProsOrder: false,
                    })
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
        {this.state.isWarmTransferReminder ? (
          <Modal
            isShowModal={this.state.isWarmTransferReminder}
            onCloseModal2={() =>
              this.setState({
                isWarmTransferReminder: false,
                warmTransferForButton: false,
              })
            }
            showClose={true}
            className="OpenModalSummaryWarmTransfer"
          >
            <div className="OpenModal-main">
              <div className="OpenModal-job">
                {this.state.warmTransferForButton
                  ? "Warm Transfer"
                  : "Warm Transfer Reminder"}
              </div>
              <div
                className="order-confirmation-number"
                style={{ textAlign: "center" }}
              >
                {this.state.warmTransferForButton ? (
                  <div>
                    {" "}
                    <div>Warm Transfer For</div>
                    {/* <Button
                      className="warmTransferButton"
                      onClick={() => {
                        this.setState({ securityWarmTransferClicked: true });
                      }}
                      backgroundColor={
                        this.state.securityWarmTransferClicked
                          ? "#5cbd9d "
                          : "#465b74"
                      }
                    >
                      Home Security
                    </Button>
                    <Button
                      className="warmTransferButton"
                      onClick={() => {
                        this.setState({ insuranceWarmTransferClicked: true });
                      }}
                      backgroundColor={
                        this.state.insuranceWarmTransferClicked
                          ? "#5cbd9d "
                          : "#465b74"
                      }
                    >
                      Insurance
                    </Button>
                    <Button
                      className="warmTransferButton"
                      onClick={() => {
                        this.setState({ energyWarmTransferClicked: true });
                      }}
                      backgroundColor={
                        this.state.energyWarmTransferClicked
                          ? "#5cbd9d "
                          : "#465b74"
                      }
                    >
                      Energy
                    </Button>
                    <Button
                      className="warmTransferButton"
                      onClick={() => {
                        this.setState({ solarWarmTransferClicked: true });
                      }}
                      backgroundColor={
                        this.state.solarWarmTransferClicked
                          ? "#5cbd9d "
                          : "#465b74"
                      }
                    >
                      Solar
                    </Button> */}
                    <div
                      className="warmTransferMainDiv"
                      style={{
                        background: this.state.securityWarmTransferClicked
                          ? "#465B74"
                          : "",
                        color: this.state.securityWarmTransferClicked
                          ? "#ffffff"
                          : "",
                      }}
                    >
                      <div className="nameNumber">
                        <div className="name">Home Security</div>
                        <div className="number">
                          {this.state.homeSecurityNumber}
                        </div>
                      </div>
                      <div className="arrowDiv">
                        <ArrowForwardIcon
                          onClick={() => {
                            this.setState({
                              securityWarmTransferClicked: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="warmTransferMainDiv"
                      style={{
                        background: this.state.insuranceWarmTransferClicked
                          ? "#465B74"
                          : "",
                        color: this.state.insuranceWarmTransferClicked
                          ? "#ffffff"
                          : "",
                      }}
                    >
                      <div className="nameNumber">
                        <div className="name">Insurance</div>
                        <div className="number">
                          {this.state.insuranceNumber}
                        </div>
                      </div>
                      <div className="arrowDiv">
                        <ArrowForwardIcon
                          onClick={() => {
                            this.setState({
                              insuranceWarmTransferClicked: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="warmTransferMainDiv"
                      style={{
                        background: this.state.energyWarmTransferClicked
                          ? "#465B74"
                          : "",
                        color: this.state.energyWarmTransferClicked
                          ? "#ffffff"
                          : "",
                      }}
                    >
                      <div className="nameNumber">
                        <div className="name">Energy</div>
                        <div className="number">{this.state.energyNumber}</div>
                      </div>
                      <div className="arrowDiv">
                        <ArrowForwardIcon
                          onClick={() => {
                            this.setState({
                              energyWarmTransferClicked: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="warmTransferMainDiv"
                      style={{
                        background: this.state.solarWarmTransferClicked
                          ? "#465B74"
                          : "",
                        color: this.state.solarWarmTransferClicked
                          ? "#ffffff"
                          : "",
                      }}
                    >
                      <div className="nameNumber">
                        <div className="name">Solar</div>
                        <div className="number">{this.state.solarNumber}</div>
                      </div>
                      <div className="arrowDiv">
                        <ArrowForwardIcon
                          onClick={() => {
                            this.setState({
                              solarWarmTransferClicked: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  "This customer has been setup for warm transfer for insurance & security, complete the transfer now to complete the order."
                )}
              </div>
              {this.state.warmTransferForButton ? (
                this.state.solarWarmTransferClicked ||
                this.state.securityWarmTransferClicked ||
                this.state.insuranceWarmTransferClicked ||
                this.state.energyWarmTransferClicked ? (
                  <div className="OrderSaveButton">
                    <Button
                      className="Button1"
                      onClick={() => {
                        this.setState({
                          // showModal: true,
                          isWarmTransferReminder: false,
                          warmTransferForButton: false,
                        });
                        this.props.history.push(
                          "/dashboard/concierge/workflow/summary"
                        );
                      }}
                      color="#fff"
                      // backgroundColor={"#465B74"}
                    >
                      Transfered
                    </Button>
                  </div>
                ) : null
              ) : (
                <div className="OrderSaveButton">
                  <Button
                    className="Button1"
                    onClick={() =>
                      this.setState({ warmTransferForButton: true })
                    }
                    color="#fff"
                    // backgroundColor={"#465B74"}
                  >
                    Transfer
                  </Button>
                </div>
              )}
            </div>
            {/* {this.state.warmTransferForButton ? (
              <div className="WorkflowButtons">
                <WorkflowButton
                  buttonText1={"Back"}
                  buttonText2={
                    // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                    "Transfered"
                    // : "Next"
                  }
                  buttonStartLogo1={
                    // this.state.tabName === "" ||
                    // this.state.tabName === "Discovery" ? (
                    ""
                    // ) : (
                    //   <ArrowBackIcon />
                    // )
                  }
                  buttonStartLogo2={<ArrowForwardIcon />}
                  ButtonOnClick1={() =>
                    this.setState({
                      isWarmTransferReminder: false,
                      warmTransferForButton: false,
                    })
                  }
                  ButtonOnClick2={() => {
                    this.setState({
                      // showModal: true,
                      isWarmTransferReminder: false,
                      warmTransferForButton: false,
                    });
                    this.props.history.push(
                      "/dashboard/concierge/workflow/summary"
                    );
                  }}
                  button2Disabled={
                    this.state.securityWarmTransferClicked &&
                    this.state.insuranceWarmTransferClicked &&
                    this.state.energyWarmTransferClicked &&
                    this.state.solarWarmTransferClicked
                      ? false
                      : true
                  }
                />
              </div>
            ) : null} */}
          </Modal>
        ) : null}
        {this.state.cancelEntireOrderModal ? (
          <Modal
            isShowModal={this.state.cancelEntireOrderModal}
            onCloseModal2={() =>
              this.setState({
                cancelEntireOrderModal: false,
              })
            }
            showClose={false}
            className="OpenModalMovers"
          >
            {/* {console.log(this.state.selectedInternet)} */}
            <div className="OpenModal-main">
              <div className="OpenModal-job">Cancellation confirmation</div>
              {/* {true ? (
                // this.state.cancelOrder && this.state.rowData
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
              ) : ( */}
              <div>
                <div className="order-confirmation-number">
                  Do you really want to cancel the order made for this customer?
                </div>
                <div className="OpenModal-job">{`${this.state.selectedInternet.length} units will be deducted`}</div>
              </div>
              {/* // )} */}

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
                  onClick={() => this.confirmCancleEntireOrderHandlerInternet()}
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
            tabName={"Summary"}
            tabId={8}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div>
            <div className="summary1-first-card">
              <SummaryFirstCard
                name={this.state.name}
                email={this.state.email}
                time="03:20 hrs"
                amount="$123.99"
              />
            </div>
          </div>
          <div className="componetContent">
            <div className="summary1-main">
              <div className="summary1-heading">
                <div className="summary1">Final Summary </div>
                <div></div>
              </div>

              {this.state.showModal ? (
                <Modal
                  isShowModal={this.state.showModal}
                  onCloseModal2={() => this.setState({ showModal: false })}
                  showClose={false}
                  className="EmailModal"
                >
                  <div className="email-modal-main-card">
                    <div className="email-modal-inside-card">
                      <div className="left-div-email">
                        <img src={Email} />
                      </div>
                      <div className="right-div-email">
                        <div className="sent-to">Email has been sent to</div>
                        <div className="sent-to-name">{this.state.name}</div>
                        <div className="sent-to-email">{this.state.email}</div>
                      </div>
                    </div>

                    <div className="finish-button">
                      <Button
                        className="finish"
                        startLogo={<ArrowForwardIcon />}
                        onClick={() => {
                          this.setState({
                            showModal: false,
                            isWarmTransferReminder: true,
                          });

                          // this.props.history.push(
                          //   "/dashboard/concierge/workflow/summary"
                          // );
                        }}
                      >
                        {/* Finish */}
                        Continue
                      </Button>
                    </div>
                  </div>
                </Modal>
              ) : null}

              {this.state.listContent.map((item: any) => {
                return (
                  <div className="point-content-wrapper-summary1">
                    <div className="points-div-summary1">
                      <div className="outer-point-summary1">
                        <div className="inner-point-summary1"></div>
                      </div>
                      <div className="vertical-line-summary1"></div>
                    </div>

                    <div className="point-content-summary1">{item}</div>
                  </div>
                );
              })}

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Movers</div>
                  <div className="point-content-summary1-para">
                    Selected Service Providers{" "}
                    {this.state.selectedMovers.map((item2: any) => {
                      return (
                        <div>
                          <div className="bold-highlight">
                            <span className="highlighted-text">
                              {item2.plan_detail && item2.plan_detail.name}
                            </span>
                            : {item2.plan_detail && item2.plan_detail.phone_no}
                            <span className="remarkDiv">
                              {item2.remarks}
                              <div
                                onClick={() =>
                                  this.setState({
                                    remarkMovers: item2.remarks
                                      ? item2.remarks
                                      : "",
                                    orderId: item2.id,
                                    is_home_pros: false,
                                  })
                                }
                                className="remarkText"
                              >
                                {item2.remarks ? "Edit Remark" : "Add Remark"}
                              </div>
                            </span>
                          </div>
                          <div className="bold-highlight">
                            Confirmation Number
                            <span className="highlighted-text">
                              {item2.order_id}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedMovers.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkMovers}
                            onChange={(e: any) =>
                              this.setState({ remarkMovers: e.target.value })
                            }
                          />
                          {this.state.remarkMovers && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkMovers,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        onClick={() => {
                          if (this.state.selectedMovers.length <= 2) {
                            this.props.history.push({
                              pathname:
                                "/dashboard/concierge/workflow/moversstep4",
                              state: {
                                selectedFullService: true,
                              },
                            });
                          }
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        onClick={() => {
                          if (this.state.selectedMovers.length > 0) {
                            this.setState({
                              CancelMoversOrder: true,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                        style={{
                          opacity:
                            this.state.selectedMovers.length < 1 ? "0.5" : "1",
                          cursor:
                            this.state.selectedMovers.length < 1
                              ? "default"
                              : "pointer",
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Insurance</div>
                  <div className="point-content-summary1-para">
                    Selected Provider{" "}
                    {this.state.selectedInsurance.map((item3: any) => {
                      return (
                        <div className="bold-highlight">
                          <span className="highlighted-text">
                            {item3.plan_detail && item3.plan_detail.carrier_name
                              ? item3.plan_detail.carrier_name
                              : item3.order_id}
                          </span>
                          :{" "}
                          {item3.plan_detail && item3.plan_detail.phone_number}
                          <span className="remarkDiv">
                            {item3.remarks}
                            <div
                              onClick={() =>
                                this.setState({
                                  remarkInsurance: item3.remarks
                                    ? item3.remarks
                                    : "",
                                  orderId: item3.id,
                                  is_home_pros: false,
                                })
                              }
                              className="remarkText"
                            >
                              {item3.remarks ? "Edit Remark" : "Add Remark"}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedInsurance.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkInsurance}
                            onChange={(e: any) =>
                              this.setState({ remarkInsurance: e.target.value })
                            }
                          />
                          {this.state.remarkInsurance && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkInsurance,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          opacity:
                            this.state.selectedInsurance.length > 0
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedInsurance.length > 0
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!this.state.selectedInsurance.length) {
                            this.props.history.push(
                              "/dashboard/concierge/workflow/insurancestep1"
                            );
                          }
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedInsurance.length < 1
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedInsurance.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (this.state.selectedInsurance.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: true,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Security</div>
                  <div className="point-content-summary1-para">
                    Selected Provider{" "}
                    {this.state.selectedSecurity.map((item3: any) => {
                      return (
                        <div className="bold-highlight">
                          <span className="highlighted-text">
                            {item3.plan_detail &&
                            (item3.plan_detail.name ||
                              item3.plan_detail.carrier_name)
                              ? item3.plan_detail.name ||
                                item3.plan_detail.carrier_name
                              : item3.order_id}
                          </span>
                          :{" "}
                          {item3.plan_detail && item3.plan_detail.phone_number}
                          <span className="remarkDiv">
                            {item3.remarks}
                            <div
                              onClick={() =>
                                this.setState({
                                  remarkSecurity: item3.remarks
                                    ? item3.remarks
                                    : "",
                                  orderId: item3.id,
                                  is_home_pros: false,
                                })
                              }
                              className="remarkText"
                            >
                              {item3.remarks ? "Edit Remark" : "Add Remark"}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                    {/* <div className="bold-highlight">
                       Consultant Assigned :
                   <span className="highlighted-text">
                     Josh
                    </span>
                   </div>
                   <div className="bold-highlight">
                       Appointment Details
                   <span className="highlighted-text">
                   August 8th at 10:00 am.
                    </span>
                   </div> */}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedSecurity.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkSecurity}
                            onChange={(e: any) =>
                              this.setState({ remarkSecurity: e.target.value })
                            }
                          />
                          {this.state.remarkSecurity && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkSecurity,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          opacity:
                            this.state.selectedSecurity.length > 0
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedSecurity.length > 0
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!this.state.selectedSecurity.length) {
                            this.props.history.push(
                              "/dashboard/concierge/workflow/securitystep1"
                            );
                          }
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedSecurity.length < 1
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedSecurity.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (this.state.selectedSecurity.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: true,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">
                    Internet / Cable
                  </div>
                  <div className="point-content-summary1-para">
                    {this.state.selectedInternet &&
                      this.state.selectedInternet.map((item: any) => {
                        return (
                          <div>
                            <div className="bold-highlight">
                              Selected Provider :
                              <span className="highlighted-text">
                                {item.plan_detail &&
                                  item.plan_detail.provider_name}
                              </span>
                              <span className="remarkDiv">
                                {item.remarks}
                                <div
                                  onClick={() =>
                                    this.setState({
                                      remarkInternet: item.remarks
                                        ? item.remarks
                                        : "",
                                      orderId: item.id,
                                      is_home_pros: false,
                                    })
                                  }
                                  className="remarkText"
                                >
                                  {item.remarks ? "Edit Remark" : "Add Remark"}
                                </div>
                              </span>
                            </div>
                            <div className="bold-highlight">
                              Confirmation Number
                              <span className="highlighted-text">
                                {item.order_id}
                              </span>
                            </div>
                            <div className="bold-highlight">
                              Installation Date
                              <span className="highlighted-text">
                                {item.install_date}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedInternet.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkInternet}
                            onChange={(e: any) =>
                              this.setState({ remarkInternet: e.target.value })
                            }
                          />
                          {this.state.remarkInternet && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkInternet,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        onClick={
                          this.state.selectedInternet.length < 3
                            ? () =>
                                this.props.history.push(
                                  "/dashboard/concierge/workflow/internetstep1"
                                )
                            : () => null
                        }
                        style={{
                          opacity:
                            this.state.selectedInternet.length < 3
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedInternet.length < 3
                              ? "default"
                              : "pointer",
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedInternet.length < 1
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedInternet.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={
                          this.state.selectedInternet.length < 1
                            ? () => null
                            : () =>
                                this.setState({ cancelEntireOrderModal: true })
                        }
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Utilities</div>
                  <div className="point-content-summary1-para">
                    {this.state.selectedUtilities.map((item: any) => {
                      return (
                        <div style={{ marginBottom: "20px" }}>
                          <div
                            style={{
                              textDecoration: "underline",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            {item.product_type}:
                          </div>
                          <div className="bold-highlight">
                            Selected Provider :
                            <span className="highlighted-text">
                              {item.plan_detail && item.plan_detail.name}
                            </span>
                            <span className="remarkDiv">
                              {item.remarks}
                              <div
                                onClick={() =>
                                  this.setState({
                                    remarkUtilities: item.remarks
                                      ? item.remarks
                                      : "",
                                    orderId: item.id,
                                    is_home_pros: false,
                                  })
                                }
                                className="remarkText"
                              >
                                {item.remarks ? "Edit Remark" : "Add Remark"}
                              </div>
                            </span>
                          </div>
                          <div className="bold-highlight">
                            Confirmation Number
                            <span className="highlighted-text">
                              {item.order_id}
                            </span>
                          </div>
                          <div className="bold-highlight">
                            Service Start Date
                            <span className="highlighted-text">
                              {item.install_date}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {/* <div style={{ marginBottom: "20px" }}>
                      <div
                        style={{ textDecoration: "underline", fontWeight: 600 }}
                      >
                        {" "}
                        Gas:
                      </div>
                      <div className="bold-highlight">
                        Selected Provider :
                        <span className="highlighted-text">AEP Ohio</span>
                      </div>
                      <div className="bold-highlight">
                        Confirmation Number
                        <span className="highlighted-text">#123456789</span>
                      </div>
                      <div className="bold-highlight">
                        Service Start Date
                        <span className="highlighted-text">
                          August 8th at 10:00 am.
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <div
                        style={{ textDecoration: "underline", fontWeight: 600 }}
                      >
                        {" "}
                        Water:
                      </div>
                      <div className="bold-highlight">
                        Selected Provider :
                        <span className="highlighted-text">AEP Ohio</span>
                      </div>
                      <div className="bold-highlight">
                        Confirmation Number
                        <span className="highlighted-text">#123456789</span>
                      </div>
                      <div className="bold-highlight">
                        Service Start Date
                        <span className="highlighted-text">
                          August 8th at 10:00 am.
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <div
                        style={{ textDecoration: "underline", fontWeight: 600 }}
                      >
                        {" "}
                        Trash:
                      </div>
                      <div className="bold-highlight">
                        Selected Provider :
                        <span className="highlighted-text">AEP Ohio</span>
                      </div>
                      <div className="bold-highlight">
                        Confirmation Number
                        <span className="highlighted-text">#123456789</span>
                      </div>
                      <div className="bold-highlight">
                        Service Start Date
                        <span className="highlighted-text">
                          August 8th at 10:00 am.
                        </span>
                      </div>
                    </div> */}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedUtilities.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkUtilities}
                            onChange={(e: any) =>
                              this.setState({ remarkUtilities: e.target.value })
                            }
                          />
                          {this.state.remarkUtilities && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkUtilities,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          cursor:
                            this.state.selectedUtilities.length < 1
                              ? "default"
                              : "pointer",
                          opacity:
                            this.state.selectedUtilities.length < 1
                              ? "0.5"
                              : "1",
                        }}
                        onClick={() => {
                          if (this.state.selectedUtilities.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: true,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>
                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Home Pros</div>
                  <div className="point-content-summary1-para">
                    Requested Services{" "}
                    <div className="bold-highlight">
                   <span className="highlighted-text">
                     Electrician
                    </span>
                   </div>
                   <div className="bold-highlight">
                   <span className="highlighted-text">
                   Plumbing
                    </span>
                   </div>
                   <div className="bold-highlight">     
                   <span className="highlighted-text">
                   Wallpaper Removal
                    </span>
                   </div>
                   <div className="bold-highlight">     
                   <span className="highlighted-text">
                   Interior Painting
                    </span>
                   </div>
                  
                   <div className="next-steps">for the next steps,</div>

                   You can expect a call from the within 24-48 hours. Incase you didn’t receive a call, please let us know, or you can call to their number directly
                   
                   <div className="remarks-div">
                       <div className="remark">Remarks:</div>
                       <div className="remark-content">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna.</div>
                   </div>
                   <div className="summaryButtonDiv">
              <div className="summaryEditButton">Edit Order</div>
              <div className="summaryCancleButton">Cancel Entire Order</div>
            </div>
                  </div>
                </div>
              </div> */}

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  We will now send you an email with all this information
                  summarised.
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Energy</div>
                  <div className="point-content-summary1-para">
                    Selected Provider{" "}
                    {this.state.selectedEnergy.map((item3: any) => {
                      return (
                        <div className="bold-highlight">
                          <span className="highlighted-text">
                            {item3.plan_detail &&
                            (item3.plan_detail.name ||
                              item3.plan_detail.carrier_name)
                              ? item3.plan_detail.name ||
                                item3.plan_detail.carrier_name
                              : item3.order_id}
                          </span>
                          :{" "}
                          {item3.plan_detail && item3.plan_detail.phone_number}
                          <span className="remarkDiv">
                            {item3.remarks}
                            <div
                              onClick={() =>
                                this.setState({
                                  remarkEnergy: item3.remarks
                                    ? item3.remarks
                                    : "",
                                  orderId: item3.id,
                                  is_home_pros: false,
                                })
                              }
                              className="remarkText"
                            >
                              {item3.remarks ? "Edit Remark" : "Add Remark"}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                    {/* <div className="bold-highlight">
                       Consultant Assigned :
                   <span className="highlighted-text">
                     Josh
                    </span>
                   </div>
                   <div className="bold-highlight">
                       Appointment Details
                   <span className="highlighted-text">
                   August 8th at 10:00 am.
                    </span>
                   </div> */}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedEnergy ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkEnergy}
                            onChange={(e: any) =>
                              this.setState({ remarkEnergy: e.target.value })
                            }
                          />
                          {this.state.remarkEnergy && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkEnergy,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          opacity:
                            this.state.selectedEnergy.length > 0 ? "0.5" : "1",
                          cursor:
                            this.state.selectedEnergy.length > 0
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!this.state.selectedEnergy.length) {
                            this.props.history.push(
                              "/dashboard/concierge/workflow/energystep1"
                            );
                          }
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedEnergy.length < 1 ? "0.5" : "1",
                          cursor:
                            this.state.selectedEnergy.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (this.state.selectedEnergy.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: true,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Solar</div>
                  <div className="point-content-summary1-para">
                    Selected Provider
                    {this.state.selectedSolar.map((item3: any) => {
                      return (
                        <div className="bold-highlight">
                          <span className="highlighted-text">
                            {item3.plan_detail &&
                            (item3.plan_detail.name ||
                              item3.plan_detail.carrier_name)
                              ? item3.plan_detail.name ||
                                item3.plan_detail.carrier_name
                              : item3.order_id}
                          </span>
                          :{" "}
                          {item3.plan_detail && item3.plan_detail.phone_number}
                          <span className="remarkDiv">
                            {item3.remarks}
                            <div
                              onClick={() =>
                                this.setState({
                                  remarkSolar: item3.remarks
                                    ? item3.remarks
                                    : "",
                                  orderId: item3.id,
                                  is_home_pros: false,
                                })
                              }
                              className="remarkText"
                            >
                              {item3.remarks ? "Edit Remark" : "Add Remark"}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                    {/* <div className="bold-highlight">
                       Consultant Assigned :
                   <span className="highlighted-text">
                     Josh
                    </span>
                   </div>
                   <div className="bold-highlight">
                       Appointment Details
                   <span className="highlighted-text">
                   August 8th at 10:00 am.
                    </span>
                   </div> */}
                    <div className="next-steps">for the next steps,</div>
                    You can expect a call from the within 24-48 hours. Incase
                    you didn’t receive a call, please let us know, or you can
                    call to their number directly
                    {this.state.selectedSolar.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkSolar}
                            onChange={(e: any) =>
                              this.setState({ remarkSolar: e.target.value })
                            }
                          />
                          {this.state.remarkSolar && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                this.handleSaveRemark(
                                  this.state.remarkSolar,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          opacity:
                            this.state.selectedSolar.length > 0 ? "0.5" : "1",
                          cursor:
                            this.state.selectedSolar.length > 0
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!this.state.selectedSolar.length) {
                            this.props.history.push(
                              "/dashboard/concierge/workflow/solarstep1"
                            );
                          }
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedSolar.length < 1 ? "0.5" : "1",
                          cursor:
                            this.state.selectedSolar.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (this.state.selectedSolar.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: true,
                              CancelHomeProsOrder: false,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="point-content-wrapper-summary1">
                <div className="points-div-summary1">
                  <div className="outer-point-summary1">
                    <div className="inner-point-summary1"></div>
                  </div>
                  <div className="vertical-line-summary1"></div>
                </div>

                <div className="point-content-summary1">
                  <div className="point-content-summary1-title">Home Pros</div>
                  <div className="point-content-summary1-para">
                    Requested Services
                    {this.state.selectedHomePros.map((item3: any) => {
                      return (
                        <div className="bold-highlight">
                          {item3.plan_detail &&
                            item3.plan_detail.home_pros &&
                            item3.plan_detail.home_pros.map((item4: any) => {
                              return (
                                <div
                                  className="highlighted-text"
                                  style={{
                                    width: "fit-content",
                                    marginBottom: "7px",
                                  }}
                                >
                                  {item4}
                                </div>
                              );
                            })}
                          <span className="remarkDiv">
                            {item3.remarks}
                            <div
                              onClick={() =>
                                this.setState({
                                  remarkHomePros: item3.remarks
                                    ? item3.remarks
                                    : "",
                                  orderId: item3.id,
                                  is_home_pros: true,
                                })
                              }
                              className="remarkText"
                            >
                              {item3.remarks ? "Edit Remark" : "Add Remark"}
                            </div>
                          </span>
                        </div>
                      );
                    })}
                    {this.state.selectedHomePros.length ? (
                      <div className="remarks-div">
                        <div className="remark">Remarks:</div>
                        <div className="remark-content">
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            // style={{ width: 200 }}
                            className="CustomTextArea"
                            value={this.state.remarkHomePros}
                            onChange={(e: any) =>
                              this.setState({ remarkHomePros: e.target.value })
                            }
                          />
                          {this.state.remarkHomePros && this.state.orderId ? (
                            <Button
                              className="saveButton"
                              onClick={() =>
                                // () => console.log()
                                this.handleSaveRemark(
                                  this.state.remarkHomePros,
                                  this.state.orderId,
                                  this.state.is_home_pros
                                )
                              }
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="summaryButtonDiv">
                      <div
                        className="summaryEditButton"
                        style={{
                          opacity:
                            this.state.selectedHomePros.length > 0
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedHomePros.length > 0
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!this.state.selectedHomePros.length) {
                            this.props.history.push(
                              "/dashboard/concierge/workflow/homeprosstep2"
                            );
                          }
                        }}
                      >
                        Edit Order
                      </div>
                      <div
                        className="summaryCancleButton"
                        style={{
                          opacity:
                            this.state.selectedHomePros.length < 1
                              ? "0.5"
                              : "1",
                          cursor:
                            this.state.selectedHomePros.length < 1
                              ? "default"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (this.state.selectedHomePros.length > 0) {
                            this.setState({
                              CancelMoversOrder: false,
                              CancelUtilitiesOrder: false,
                              CancelInsuranceOrder: false,
                              CancelSecurityOrder: false,
                              CancelEnergyOrder: false,
                              CancelSolarOrder: false,
                              CancelHomeProsOrder: true,
                            });
                          }
                        }}
                      >
                        Cancel Entire Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="confirmOrderButton">
                <Button
                  className="summaryEditButton"
                  onClick={() =>
                    // this.setState({ isWarmTransferReminder: true })
                    this.confirmOrderClick()
                  }
                >
                  Confirm Order
                </Button>
              </div>
            </div>
          </div>

          {/* <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Send Email"
                // : "Next"
              }
              buttonStartLogo1={
                // this.state.tabName === "" ||
                // this.state.tabName === "Discovery" ? (
                ""
                // ) : (
                //   <ArrowBackIcon />
                // )
              }
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/solarstep2"
                )
              }
              ButtonOnClick2={() => {
                this.setState({
                  showModal: true,
                });
              }}
            />
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryStep1);
