import React from "react";
import "./MoversStep5.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import SmallMoverCard from "../../components/Movers/SmallMoverCard";
import AddIcon from "@material-ui/icons/Add";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as Action from "../../store/common/actions";
import * as MoversAction from "../../store/move/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../../components/atoms/Button";
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";
import OrderCompletionCard from "../../components/OrderCompletionCard/OrderCompletionCard";
import Modal from "../../components/atoms/Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

let re = /^[a-zA-Z0-9]{2,40}$/;

type initialProps = {
  moversStepActive?: any;
  moversStepTotal?: any;
  history?: any;
  commonAction?: any;
  commonState?: any;
  moversAction?: any;
  moversState?: any;
};

type initialState = {
  closed: boolean;
  listContent: any;
  isDataArrived: boolean;
  hintContent: string;
  isDataArrived2: boolean;
  scriptContent: any;
  // objectionCompleted: boolean;
  moveId: string;
  isDataArrivedMove: boolean;
  loader: boolean;
  userType: string;
  isUserDataArrived: boolean;
  installationDate: any;
  orderDetails: string;
  orderError: boolean;
  installationError: boolean;
  openModal: boolean;
  // orderData: any;
  moversOrder: any;
};

class MoversStep5 extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    scriptContent: [],
    isDataArrived2: true,
    closed: false,
    moveId: "",
    isDataArrivedMove: true,
    listContent: [],
    isDataArrived: true,
    // objectionCompleted: true,
    loader: true,
    userType: "",
    isUserDataArrived: true,
    installationDate: "",
    orderDetails: "",
    orderError: false,
    installationError: false,
    openModal: false,
    // orderData: [],
    moversOrder: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedText === "Movers"
    ) {
      console.log("hii");
      this.props.commonAction.scriptGet({
        hash_code: hash_code,
        service: "moving",
        page: 4,
        subCategory: "professional-mover",
      });
    } else if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedText === "Pods/DIY Mover"
    ) {
      this.props.commonAction.scriptGet({
        hash_code: hash_code,
        service: "moving",
        page: 4,
        subCategory: "diy-mover",
      });
    } else {
      this.props.commonAction.scriptGet({
        hash_code: hash_code,
        service: "moving",
        page: 4,
      });
    }

    if (
      this.props &&
      this.props.commonState &&
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
      nextProps.history &&
      nextProps.history.location &&
      nextProps.history.location.state &&
      nextProps.history.location.state.selectedContent &&
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;
      let selectedArray: any = [];
      nextProps.history.location.state.selectedContent.map((item: any) => {
        if (item.selected == true || item.isSelectToEmail == true) {
          selectedArray.push({
            id: item.id,
            title: item.title ? item.title : item.name ? item.name : null,
            phone: item.phone,
            selected: item.selected,
            isSelectToEmail: item.isSelectToEmail,
            emailStatus: item.email_status ? "Confirmed" : "Not Confirmed",
          });
        }
      });

      currentState.listContent = selectedArray;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let hintPara: string = "";
      let points: any = [];
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 5) {
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

    // if (
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move.length > 0 &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.isGetMove
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   currentState.moveId =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move[0] &&
    //     nextProps.commonState.move[0].id;

    //   let moveId = nextProps.commonState.move[0].id;
    //   const payload = {
    //     // service: "Movers",
    //     moveId: moveId,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    // }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.isAppointmentPost
    // ) {
    //   nextProps.commonState.isAppointmentPost = false;
    //   nextProps.history.push("/dashboard/concierge/workflow/moversthankyou");
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.user &&
      nextProps.commonState.user.user_type &&
      currentState.isUserDataArrived
    ) {
      currentState.isUserDataArrived = false;
      currentState.userType = nextProps.commonState.user.user_type;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.appointmentPost.orders &&
      nextProps.commonState.isAppointmentPost
    ) {
      nextProps.commonState.isAppointmentPost = false;
      const payload = {
        service: "",
        moveId: currentState.moveId,
      };
      nextProps.commonAction.orderGet(payload);
      // currentState.openModal = true;
      // nextProps.history.push("/dashboard/concierge/workflow/moversthankyou");
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
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      // let orderData: any = [];
      let moversData: any = [];
      nextProps.commonState.order.map((item: any) => {
        // orderData.push(item);
        if (
          item.service === "Professional Movers" ||
          item.service === "DIY Move"
        ) {
          moversData.push(item);
        }
      });
      // currentState.orderData = orderData;
      currentState.moversOrder = moversData;
      nextProps.commonState.orderDataArrived = false;
    }

    return currentState;
  }

  componentDidUpdate(prevProps: any) {
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

  confirmHandler = () => {
    // let selectedMovers: any = [];
    // this.state.listContent.map((item: any) => {
    //   selectedMovers.push(item.id);
    // });
    // let payload = {
    //   selected_movers: selectedMovers,
    //   type: "Professional Movers",
    //   move_id: this.state.moveId,
    //   account_no: this.state.orderDetails,
    //   install_date: this.state.installationDate,
    // };
    // this.props.commonAction.appointmentPost(payload);
    this.setState({
      openModal: false,
    });
    this.props.history.push("/dashboard/concierge/workflow/moversthankyou");
  };

  validateFields = () => {
    let validity: boolean = true;
    if (!re.test(this.state.orderDetails)) {
      this.setState({
        orderError: true,
      });
      validity = false;
    }

    if (!this.state.installationDate) {
      this.setState({
        installationError: true,
      });
      validity = false;
    }
    return validity;
  };

  // orderSaveHandler = () => {
  //   if (this.validateFields()) {
  //     this.setState({
  //       installationError: false,
  //       orderError: false,
  //       openModal: true,
  //     });

  //   }
  // };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  handleSelect = (e: any) => {
    this.setState({
      installationDate: e.target.value,
      installationError: false,
    });
  };

  onChangeOrderDetails = (e: any) => {
    this.setState({ orderDetails: e.target.value, orderError: false });
  };

  handleNext = async () => {
    let planData: any = [];
    this.state.moversOrder.map((item: any) => {
      if (item && item.plan_detail) {
        planData.push(item.plan_detail.id);
      }
      return planData;
    });
    let payload = {};
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedText === "Movers"
    ) {
      let selectedMovers: any = [];
      let selectedMoversToEmail: any = [];
      this.state.listContent.map((item: any) => {
        if (!planData.includes(item.id)) {
          if (item.selected == true && item.isSelectToEmail == false) {
            selectedMovers.push(item.id);
          }
          if (item.selected == false && item.isSelectToEmail == true) {
            selectedMoversToEmail.push(item.id);
          }
        }

        return selectedMovers;
      });

      if (selectedMovers && selectedMovers.length && this.state.moveId !== "") {
        payload = {
          move_id: this.state.moveId,
          type: "Professional Movers",
          selected_movers: selectedMovers,
        };
        await this.props.commonAction.appointmentPost(payload);
      }

      if (
        selectedMoversToEmail &&
        selectedMoversToEmail.length &&
        this.state.moveId !== ""
      ) {
        let payload1 = {
          move_id: this.state.moveId,
          type: "Professional Movers",
          is_in_mail: true,
          selected_movers: selectedMoversToEmail,
        };
        await this.props.commonAction.appointmentPost(payload1);
      }

      this.setState({ openModal: true });
    }

    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedText === "Pods/DIY Mover" &&
      this.state.moveId !== ""
    ) {
      this.state.listContent.map((item: any) => {
        payload = {
          move_id: this.state.moveId,
          type: "DIY",
          diy_provider_id: item.id,
        };
        this.props.commonAction.appointmentPost(payload);
      });
      this.setState({ openModal: true });
    }
    // this.props.history.push("/dashboard/concierge/workflow/moversthankyou");
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        {this.state.openModal ? (
          <Modal
            isShowModal={this.state.openModal}
            onCloseModal={() => this.setState({ openModal: false })}
            showClose={false}
            className="OpenModalMovers"
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
              <div className="scrollDiv">
                {this.state.moversOrder &&
                  this.state.moversOrder.map((item: any) => {
                    return (
                      <div>
                        <div className="OpenModal-job">
                          {item.plan_detail && item.plan_detail.name}
                        </div>
                        <div className="order-confirmation-number">
                          Order Confirmation Number : #{item.order_id}
                        </div>
                        {/* <div className="order-confirmation-number">
                        Installation date : {item.install_date}
                      </div> */}
                      </div>
                    );
                  })}
              </div>
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
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Movers"}
            tabId={2}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="mover5-main">
              <div className="mover5-heading">
                <div className="mover5">Movers </div>
                <div>
                  <div className="titleNumberMover">
                    <div className="left-number">5</div>
                    <div className="right-number">5</div>
                  </div>
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

              <div className="script-div">
                {this.state.scriptContent &&
                  this.state.scriptContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-mover5-script">
                        <div className="points-div-mover5">
                          <div className="outer-point-mover5">
                            <div className="inner-point-mover5"></div>
                          </div>
                          <div className="vertical-line-mover5"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-mover5"
                        ></div>
                      </div>
                    );
                  })}
              </div>

              <div className="main-bottom-mover5">
                <div className="point-content-wrapper-mover5">
                  <div className="points-div-mover5">
                    <div className="outer-point-mover5">
                      <div className="inner-point-mover5"></div>
                    </div>
                    <div className="vertical-line-mover5"></div>
                  </div>

                  <div className="point-content-mover5">
                    <div className="top-3-heading">
                      Here are {this.state.listContent.length} movers you have
                      selected
                    </div>

                    <div className="movers-others-cards-div">
                      {this.state.listContent &&
                        this.state.listContent.map((item: any) => {
                          return (
                            <div className="movers-small-card">
                              <SmallMoverCard
                                title={item.title}
                                phone={item.phone}
                                emailStatus={item.emailStatus}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* <div className="point-content-wrapper-mover5">
                  <div className="points-div-mover5">
                    <div className="outer-point-mover5">
                      <div className="inner-point-mover5"></div>
                    </div>
                    <div className="vertical-line-mover5"></div>
                  </div>

                  <div className="point-content-mover5">
                    Order completion details
                    <div className="step6FormDiv">
                      <OrderCompletionCard
                        OrderSaveHandler={() => this.orderSaveHandler()}
                        handleSelect={this.handleSelect}
                        installationDate={this.state.installationDate}
                        orderDetails={this.state.orderDetails}
                        onChangeOrderDetails={this.onChangeOrderDetails}
                        orderError={this.state.orderError}
                        installationError={this.state.installationError}
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="point-content-wrapper-mover5">
                  <div className="points-div-mover5">
                    <div className="outer-point-mover5">
                      <div className="inner-point-mover5"></div>
                    </div>
                    <div className="vertical-line-mover5"></div>
                  </div>

                  <div className="point-content-mover5">
                    <div className="top-3-heading">
                      Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                      dolor auctor. Donec ullamcorper nulla non metus auctor
                      fringilla.
                    </div>
                  </div>
                </div>

                <div className="point-content-wrapper-mover5">
                  <div className="points-div-mover5">
                    <div className="outer-point-mover5">
                      <div className="inner-point-mover5"></div>
                    </div>
                    <div className="vertical-line-mover5"></div>
                  </div>

                  <div className="point-content-mover5">
                    <div className="top-3-heading">
                      If any other additional orders have to be added, select
                      here
                    </div>

                    <div className="movers-others-cards-div">
                      <div className="additional-orders-div">
                        <div className="additional-order-button-div">
                          <div className="plusIcon">
                            <AddIcon
                              style={{
                                color: "#fff",
                              }}
                            />
                          </div>

                          <div className="plus-text">Cardboard Boxes</div>
                        </div>

                        <div className="additional-order-button-div">
                          <div className="plusIcon">
                            <AddIcon
                              style={{
                                color: "#fff",
                              }}
                            />
                          </div>

                          <div className="plus-text">PODS</div>
                        </div>

                        <div className="additional-order-button-div">
                          <div className="plusIcon">
                            <AddIcon
                              style={{
                                color: "#fff",
                              }}
                            />
                          </div>

                          <div className="plus-text">Rental truck</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="point-content-wrapper-mover5">
                  <div className="points-div-mover5">
                    <div className="outer-point-mover5">
                      <div className="inner-point-mover5"></div>
                    </div>
                    <div className="vertical-line-mover5"></div>
                  </div>

                  <div className="point-content-mover5">
                    <div className="top-3-heading">
                      Keep User engaged during external ordering
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Next"}
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
                this.props.history &&
                this.props.history.location &&
                this.props.history.location.state &&
                this.props.history.location.state.selectedText === "Movers"
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep4",
                      state: {
                        listContent:
                          this.props &&
                          this.props.history &&
                          this.props.history.location &&
                          this.props.history.location.state &&
                          this.props.history.location.state.selectedContent,
                        selectedFullService: true,
                      },
                    })
                  : this.props.history &&
                    this.props.history.location &&
                    this.props.history.location.state &&
                    this.props.history.location.state.selectedText ===
                      "Pods/DIY Mover"
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep4",
                      state: {
                        podCardsData:
                          this.props &&
                          this.props.history &&
                          this.props.history.location &&
                          this.props.history.location.state &&
                          this.props.history.location.state.selectedContent,
                        selectedPods: true,
                      },
                    })
                  : this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep4",
                      state: {
                        listContent:
                          this.props &&
                          this.props.history &&
                          this.props.history.location &&
                          this.props.history.location.state &&
                          this.props.history.location.state.selectedContent,
                        selectedFullService: true,
                      },
                    });
              }}
              ButtonOnClick2={() => {
                this.handleNext();
                // this.props.history.push(
                //   "/dashboard/concierge/workflow/insurancestep1"
                // );
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

export default connect(mapStateToProps, mapDispatchToProps)(MoversStep5);
