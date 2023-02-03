import React from "react";
import "./HomeProsStep3.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "../../components/atoms/Button";
import Modal from "../../components/atoms/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import ObjectionCard1 from "../../components/Objection/ObjectionCard1";
import ObjectionCard2 from "../../components/Objection/ObjectionCard2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as Action from "../../store/common/actions";
import * as HomeProsAction from "../../store/homePros/actions";
import * as MoversAction from "../../store/move/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChatIcon from "@material-ui/icons/Chat";
import { isTemplateExpression } from "typescript";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  HomeProsStepActive: any;
  HomeProsStepTotal: any;
  history?: any;
  commonAction: any;
  commonState: any;
  moversAction: any;
  moversState: any;
  homeProsAction: any;
  homeProsState: any;
};

type initialState = {
  closed: boolean;
  listContentObjection: any;
  listContentObjection2: any;
  objectionClick: boolean;
  currentObjectionStep: number;
  objectionList1: any;
  selected: boolean;
  objectionCompleted: boolean;
  isDataArrived: boolean;
  //   hintContent: string;
  requestedlist: any;
  data: any;
  moveId: string;
  openModal: boolean;
  loader: boolean;
  notInterested: boolean;
};

class HomeProsStep3 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    // hintContent: "",
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
    requestedlist: [
      "Electrician",
      "Plumbing",
      "Wallpaper removal",
      "Interior painting",
    ],
    data: [],
    moveId: "",
    openModal: false,
    loader: true,
    notInterested: false,
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
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "home-pros",
      page: 2,
    });

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({ moveId: this.props.commonState.move[0].id });
      const payload = {
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.getSkipService
    ) {
      this.props.commonState.getSkipService.map((item: any) => {
        if (
          item.service_name === "Home Pros" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }
  }

  //   public static getDerivedStateFromProps(
  //     nextProps: initialProps,
  //     currentState: initialState
  //   ) {
  //     if (
  //       nextProps &&
  //       nextProps.commonState &&
  //       nextProps.commonState.scriptDataArrived
  //     ) {
  //       nextProps.commonState.scriptDataArrived = false;
  //       let points: any = [];
  //       let hintContent: any = [];
  //       let hintPara: string = "";
  //       nextProps.commonState.script.map((item: any) => {
  //         if (item.page_number === 1) {
  //           // points.push(item.script_content)
  //           points = item.script_content.split("|");
  //           hintContent.push(item.hint_content);
  //         }
  //       });

  //       hintContent.map((hint: any) => {
  //         hintPara = hintPara + " " + hint;
  //       });

  //       currentState.hintContent = hintPara;
  //       // currentState.listContent = points;
  //     }

  //     return currentState;
  //   }

  componentDidUpdate(prevProps: any) {
    const prevM = prevProps && prevProps.commonState;
    const curM = this.props && this.props.commonState;

    if (prevM.move !== curM.move && curM.move && curM.move[0]) {
      this.setState({ moveId: this.props.commonState.move[0].id });
      const payload = {
        service: "",
        moveId: this.props.commonState.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }

    if (prevM.getSkipService !== curM.getSkipService && curM.getSkipService) {
      curM.getSkipService.map((item: any) => {
        if (
          item.service_name === "Home Pros" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }

    // const prev = prevProps && prevProps.homeProsState;
    // const cur = this.props && this.props.homeProsState;

    // if (
    //   prev.cancelOrderHomePros !== cur.cancelOrderHomePros &&
    //   cur.cancelOrderHomePros
    // ) {
    //   this.setState({ openModal: false });
    //   if (this.state.moveId && this.state.moveId !== "") {
    //     const payload = {
    //       service: "",
    //       moveId: this.state.moveId,
    //     };
    //     this.props.commonAction.orderGet(payload);
    //   }
    // }
    const prev = prevProps && prevProps.moversState;
    const cur = this.props && this.props.moversState;
    console.log(this.state.moveId);
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
        this.setState({
          openModal: false,
          loader: true,
        });
      }
    }
  }

  static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move &&
      nextProps.commonState.move[0] &&
      nextProps.commonState.move[0].id &&
      // currentState.isDataArrived
      nextProps.commonState.isGetMove
    ) {
      nextProps.commonState.isGetMove = false;
      // let moveId = nextProps.commonState.move[0].id;
      currentState.moveId = nextProps.commonState.move[0].id;
      const payload = {
        // service: "Digital",
        service: "",
        moveId: nextProps.commonState.move[0].id,
      };
      nextProps.commonAction.orderGet(payload);
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      // let securityData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Home Pros") orderData.push(item);
        // if (item.service === "Home Pros") {
        //   securityData.push(item);
        // }
      });
      currentState.data = orderData;
      currentState.loader = false;

      // if(!orderData.length){
      //   if(!( nextProps && nextProps.history &&
      //     nextProps.history.location &&
      //     nextProps.history.location.state &&
      //     nextProps.history.location.state.notInterested)){
      //   nextProps.history.push('/dashboard/concierge/workflow/homeprosstep1')
      //     }
      // }
    }

    return currentState;
  }
  cancelOrderHandler = () => {
    let orderIds: any = [];
    this.state.data.map((item: any) => {
      orderIds.push(item.id);
    });
    // let payload: any = {
    //   home_pros_id: orderIds,
    // };
    // console.log(payload);
    // this.props.homeProsAction.cancelOrderHomePros(payload);
    let payload = {
      orders: orderIds,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  render() {
    // console.log(this.state.data);
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
            tabName={"Home Pros"}
            tabId={9}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="homePros2-main">
              <div className="homePros2-heading">
                <div className="homePros2">Home Pros </div>
                <div>
                  <div className="titleNumberHomePros">
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
                            <div className="point-content-wrapper-homePros2">
                              <div className="points-div-homePros2">
                                <div className="outer-point-homePros2">
                                  <div className="inner-point-homePros2"></div>
                                </div>
                                <div className="vertical-line-homePros2"></div>
                              </div>

                              <div className="point-content-homePros2">
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
                                <div className="point-content-wrapper2-homePros2">
                                  <div className="points-div-homePros2">
                                    <div className="outer-point-homePros2">
                                      <div className="inner-point-homePros2"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-homePros2">
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
              {/* {this.state.closed == false && this.state.hintContent ? (
                <div className="helpful-div-homePros">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null} */}
            </div>
          </div>
          <div className="point-content-wrapper-internet1">
            <div className="points-div-internet1">
              <div className="outer-point-internet1">
                <div className="inner-point-internet1"></div>
              </div>
              <div className="vertical-line-internet1"></div>
            </div>

            <div className="point-content-internet1">
              You’ve requested:
              {this.props &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.notInterested ? (
                <div>Not Interested</div>
              ) : (
                <div>
                  {this.state.loader ? (
                    <CircularProgress />
                  ) : (
                    <div className="step6FormDiv">
                      {
                        this.state.data &&
                          this.state.data[0] &&
                          // this.state.data.map((item: any) => {
                          this.state.data[0] &&
                          this.state.data[0].plan_detail &&
                          this.state.data[0].plan_detail.home_pros &&
                          this.state.data[0].plan_detail.home_pros.map(
                            (item2: any) => {
                              console.log(item2);
                              return (
                                <div className="requested-div">{item2}</div>
                              );
                            }
                          )
                        // })
                      }
                    </div>
                  )}
                </div>
              )}
              <div className="buttonDivPros">
                <Button
                  className="editOrderButtonPros"
                  disabled={this.state.data.length ? true : false}
                  onClick={() => {
                    if (!this.state.data.length) {
                      this.props.history.push(
                        "/dashboard/concierge/workflow/homeprosstep2"
                      );
                    }
                  }}
                >
                  Edit Order
                </Button>
                <Button
                  className="cancleOrderButtonPros"
                  disabled={this.state.data.length ? false : true}
                  onClick={() => this.setState({ openModal: true })}
                >
                  Cancel Entire Order
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="point-content-wrapper-internet1">
            <div className="points-div-internet1">
              <div className="outer-point-internet1">
                <div className="inner-point-internet1"></div>
              </div>
              <div className="vertical-line-internet1"></div>
            </div>

            <div className="point-content-internet1">
              Vestibulum id ligula porta felis euismod semper. Nulla vitae elit
              libero, a pharetra augue.
            </div>
          </div> */}

          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Next"}
              buttonStartLogo1={""}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push({
                  pathname:
                    // this.state.data
                    // ? "/dashboard/concierge/workflow/solarstep2"
                    // :
                    "/dashboard/concierge/workflow/homeprosstep2",
                })
              }
              ButtonOnClick2={() => {
                this.props.history.push(
                  "/dashboard/concierge/workflow/summarystep1"
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
    moversAction: bindActionCreators(MoversAction, dispatch),
    homeProsAction: bindActionCreators(HomeProsAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
  homeProsState: state.homePros,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeProsStep3);
