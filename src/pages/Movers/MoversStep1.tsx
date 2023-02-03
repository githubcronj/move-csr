import React from "react";
import "./MoversStep1.scss";
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
// import ObjectionCard1 from "../../components/Objection/ObjectionCard1";
// import ObjectionCard2 from "../../components/Objection/ObjectionCard2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";
import DIY from "../../Assets/images/Movers/DIY.svg";
import PODS from "../../Assets/images/Movers/PODS.svg";
import FullService from "../../Assets/images/Movers/FullService.svg";
import MoversCard from "../../components/Movers/MoversCard/MoversCard";

type initialProps = {
  moversStepActive: any;
  moversStepTotal: any;
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  // listContentObjection: any;
  // listContentObjection2: any;
  closed: boolean;
  // objectionClick: boolean;
  // currentObjectionStep: number;
  // objectionList1: any;
  selected: boolean;
  // objectionCompleted: boolean;
  isDataArrived: boolean;
  hintContent: string;
  loader: boolean;
  // selectedDiy: boolean;
  selectedPods: boolean;
  selectedFullService: boolean;
  moveId: string;
};

class MoversStep1 extends React.Component<initialProps, initialState> {
  state: initialState = {
    // objectionCompleted: false,
    listContent: [
      // "How many would you like/need?, or are you doing the move yourself?",
      // "First thing we start with is how we plan to get your items from point A to point B, we typically get clients 2-3 moving quotes for a professional mover.",
    ],
    closed: false,
    hintContent: "",
    // objectionClick: false,
    // currentObjectionStep: 1,
    isDataArrived: true,
    // objectionList1: [
    //   {
    //     objection1: "I’m setting up internet myself",
    //     possibility: "4 possible rebutals",
    //     selected: false,
    //   },
    //   {
    //     objection1: "That’s been taken care of",
    //     possibility: "4 possible rebutals",
    //     selected: false,
    //   },
    //   {
    //     objection1: "Don’t know when we will be moving in",
    //     possibility: "4 possible rebutals",
    //     selected: false,
    //   },
    //   {
    //     objection1: "Other (specify)",
    //     possibility: "4 possible rebutals",
    //     selected: false,
    //   },
    // ],
    // listContentObjection: [
    //   "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue",
    //   "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.",
    //   "Lorem ipsum dolor sit amet.",
    // ],
    // listContentObjection2: [
    //   {
    //     objection2: "I can facilitate when your date changes",
    //     selected: false,
    //   },
    //   {
    //     objection2: "I can help you with the perfect date to move",
    //     selected: false,
    //   },
    //   {
    //     objection2: "My team will help you with this, you don’t have to worry",
    //     selected: false,
    //   },
    // ],
    selected: false,
    loader: true,
    // selectedDiy: false,
    selectedPods: false,
    selectedFullService: false,
    moveId: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "moving",
      page: 1,
    });
    const leftpanel = localStorage.getItem("leftpanel");
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({ moveId: this.props.commonState.move[0].id });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({ moveId: this.props.commonState.move[0].id });
    }
  }
  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
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
      // if (item.page_number === 1) {
      // points.push(item.script_content)
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
      // }
      // });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });
      // console.log(hintContent, hintPara);

      currentState.hintContent = hintPara;
      currentState.listContent = points;
      currentState.loader = false;
    }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.isGetMove
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   currentState.moveId = nextProps.commonState.move[0].id;
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.postSkipService &&
      nextProps.commonState.isPostSkipService
    ) {
      nextProps.commonState.isPostSkipService = false;
      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/moversthankyou",
        state: {
          notInterested: true,
        },
      });
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  notInterested = () => {
    if (this.state.moveId !== "") {
      let payload: any = {
        move: this.state.moveId,
        service_name: "Professional Movers",
        reason: "",
        reason_type: "Not Interested",
      };
      this.props.commonAction.postSkipService(payload);
    }
  };

  // objectionCardHandler = (item: any) => {
  //   let objectionList = this.state.objectionList1;
  //   objectionList.map((item2: any) => {
  //     if (item2.objection1 == item.objection1) {
  //       item2.selected = true;
  //     } else {
  //       item2.selected = false;
  //     }
  //   });

  //   this.setState({
  //     objectionList1: objectionList,
  //   });
  // };

  selectHandler = (item: any) => {
    this.setState({
      selected: true,
    });
    // let objectionList2 = this.state.listContentObjection2;
    // objectionList2.map((item2: any) => {
    //   if (item2.objection2 == item.objection2) {
    //     item2.selected = true;
    //   } else {
    //     item2.selected = false;
    //   }
    // });

    // this.setState({
    //   listContentObjection2: objectionList2,
    // });
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
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
            <div className="mover1-main">
              <div className="mover1-heading">
                <div className="mover1">Movers </div>

                <div className="titleNumberMover">
                  <div className="left-number">1</div>
                  <div className="right-number">5</div>
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
                    onClick={() => {
                      this.setState({ objectionClick: true });
                    }}
                  >
                    Objection
                  </Button>
                </div> */}
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}

              {/* {
                this.state.objectionClick &&
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
                            <div className="point-content-wrapper-mover1">
                              <div className="points-div-mover1">
                                <div className="outer-point-mover1">
                                  <div className="inner-point-mover1"></div>
                                </div>
                                <div className="vertical-line-mover1"></div>
                              </div>

                              <div className="point-content-mover1">{item}</div>
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
                                <div className="point-content-wrapper2-mover1">
                                  <div className="points-div-mover1">
                                    <div className="outer-point-mover1">
                                      <div className="inner-point-mover1"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-mover1">
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
              } */}
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
              {this.state.listContent &&
                this.state.listContent.map((item: any) => {
                  return (
                    <div className="point-content-wrapper-mover1">
                      <div className="points-div-mover1">
                        <div className="outer-point-mover1">
                          <div className="inner-point-mover1"></div>
                        </div>
                        <div className="vertical-line-mover1"></div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                        className="point-content-mover1"
                      ></div>
                    </div>
                  );
                })}
              <div className="point-content-wrapper-mover1">
                <div className="points-div-mover1">
                  <div className="outer-point-mover1">
                    <div className="inner-point-mover1"></div>
                  </div>
                  <div className="vertical-line-mover1"></div>
                </div>

                <div className="point-content-mover1">
                  So we recommend this type of move for you based on the given
                  details
                </div>
              </div>
              <div className="MoversStep1Flex-div">
                {/* <div className="moversCardDiv">
                  <MoversCard
                    icon={<img src={DIY} />}
                    isRecommended={false}
                    title="DIY"
                    subTitle="Do it yourself moving"
                    featuers={[
                      "Best for tight budgets",
                      "Flexible",
                      "You control everything",
                    ]}
                    selected={this.state.selectedDiy}
                    onSelectCilck={() =>
                      this.setState({
                        selectedDiy: !this.state.selectedDiy,
                      })
                    }
                  />
                </div> */}
                <div className="moversCardDiv">
                  <MoversCard
                    icon={<img src={PODS} />}
                    isRecommended={true}
                    title="DIY/PODS"
                    subTitle="PORTABLE STORAGE CONTAINERS"
                    featuers={[
                      "Best national wide coverage",
                      "Unlimited loading/unloading time",
                      "Store on property or at a facility",
                    ]}
                    selected={this.state.selectedPods}
                    onSelectCilck={() =>
                      this.setState({
                        selectedPods: !this.state.selectedPods,
                      })
                    }
                  />
                </div>
                <div className="moversCardDiv">
                  <MoversCard
                    icon={<img src={FullService} />}
                    isRecommended={true}
                    title="Full Service Move"
                    subTitle="LET MOVERS HANDLE EVERYTHING"
                    featuers={[
                      "Best for intersate movers",
                      "Expert movers load your stuff",
                      "Convenient",
                    ]}
                    selected={this.state.selectedFullService}
                    onSelectCilck={() =>
                      this.setState({
                        selectedFullService: !this.state.selectedFullService,
                      })
                    }
                  />
                </div>
              </div>
              <div className="notInterestedButtonDiv">
                <Button
                  className="notInterestedButton"
                  onClick={() => {
                    this.notInterested();
                  }}
                >
                  Not Interested
                </Button>
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                // "No-show"
                "Back"
              }
              buttonText2={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                // "Start workflow"
                "Next"
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
                  "/dashboard/concierge/workflow/discovery"
                )
              }
              ButtonOnClick2={() => {
                this.state.selectedFullService
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep2",
                      state: this.state.selectedFullService,
                    })
                  : this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep4",
                      state: {
                        selectedPods: this.state.selectedPods,
                        // selectedDiy: this.state.selectedDiy,
                      },
                    });
              }}
              button2Disabled={
                this.state.selectedFullService || this.state.selectedPods
                  ? false
                  : true
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(MoversStep1);
