import React from "react";
import "./energyStep1.scss";
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
import ObjectionCard1 from "../../components/Objection/ObjectionCard1";
import ObjectionCard2 from "../../components/Objection/ObjectionCard2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as Action from "../../store/common/actions";
import * as EnergyAction from "../../store/energy/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import { formatPhoneInput, validateEmail } from "../../utils/formValidation";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import InfoIcon from "@material-ui/icons/Info";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDateTimePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import CommonCard from "../../components/atoms/CommonCard";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
  energyAction: any;
  energyState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  listContentObjection: any;
  listContentObjection2: any;
  objectionClick: boolean;
  currentObjectionStep: number;
  objectionList1: any;
  selected: boolean;
  objectionCompleted: boolean;
  isDataArrived: boolean;
  hintContent: string;
  loader: boolean;
  accountNumber: string;
  moveId: string;
  isGetMove: boolean;
  submitClicked: boolean;
  checked: boolean;
  description: string;
  showMore: boolean;
  orderNumber: string;
  date: any;
  openModal: boolean;
};

class EnergyStep5 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    hintContent: "",
    listContent: [],
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
    // loader: true,
    loader: false,
    accountNumber: "",
    moveId: "",
    isGetMove: true,
    submitClicked: false,
    checked: false,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum",
    showMore: false,
    orderNumber: "",
    date: "",
    openModal: false,
  };

  // closeHandler = () => {
  //   this.setState({
  //     closed: true,
  //   });
  // };
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
      service: "energy",
      page: 5,
    });
    // this.props.energyAction.energyLaunch();
  }
  componentDidUpdate(prevProps: initialProps) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
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
      //   if (item.page_number === 1) {
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
      //   }
      // });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      currentState.hintContent = hintPara;
      currentState.listContent = points;
      currentState.loader = false;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move[0] &&
      (nextProps.commonState.isGetMove || currentState.isGetMove)
    ) {
      nextProps.commonState.isGetMove = false;
      currentState.isGetMove = false;
      currentState.moveId = nextProps.commonState.move[0].id;
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  handleChange = (e: any, name: string) => {
    let val: any;
    if (name == "phone") {
      val = formatPhoneInput(e.target.value);
    } else {
      val = e.target.value;
    }
    this.setState({ ...this.state, [name]: val });
  };

  nextHandler = () => {
    console.log("hii");
    this.setState({
      openModal: true,
      orderNumber: "123456789",
      date: "8th December 2021",
    });
  };
  confirmHandler = () => {
    console.log("hii");
    this.props.history.push("/dashboard/concierge/workflow/energythankyou");
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        <div>
          <ConciergeTabs
            tabName={"Energy"}
            tabId={7}
            history={this.props.history}
          />
        </div>

        {this.state.openModal ? (
          <Modal
            isShowModal={this.state.openModal}
            onCloseModal={() => this.setState({ openModal: false })}
            showClose={false}
            className="OpenModal"
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
              <div className="order-confirmation-number">
                Order Confirmation Number : #{this.state.orderNumber}
              </div>
              <div className="order-confirmation-number">
                Installation date : {this.state.date}
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

        <div className="component-div">
          <div className="componetContent">
            <div className="energy1-main">
              <div className="energy1-heading">
                <div className="energy1">Energy </div>
                <div>
                  <div className="titleNumberEnergy">
                    <div className="left-number">5</div>
                    <div className="right-number">6</div>
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
                  {this.state.listContent &&
                    this.state.listContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper-insurance1-script">
                          <div className="points-div-insurance1">
                            <div className="outer-point-insurance1">
                              <div className="inner-point-insurance1"></div>
                            </div>
                            <div className="vertical-line-insurance1"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-insurance1"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }
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
                            <div className="point-content-wrapper-energy1">
                              <div className="points-div-energy1">
                                <div className="outer-point-energy1">
                                  <div className="inner-point-energy1"></div>
                                </div>
                                <div className="vertical-line-energy1"></div>
                              </div>

                              <div className="point-content-energy1">
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
                                <div className="point-content-wrapper2-energy1">
                                  <div className="points-div-energy1">
                                    <div className="outer-point-energy1">
                                      <div className="inner-point-energy1"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-energy1">
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
              <div className="point-content-wrapper-insurance1">
                <div className="points-div-insurance1">
                  <div className="outer-point-insurance1">
                    <div className="inner-point-insurance1"></div>
                  </div>
                  <div className="vertical-line-insurance1"></div>
                </div>

                <div className="point-content-insurance1">
                  <div className="scheduleText">Account Information</div>
                  <div className="formDiv">
                    <div className="InputsDiv">
                      <div className="inputFlexDiv">
                        <div className="inputDivEnergy">
                          <CustomizedInput
                            onChange={(e: any) =>
                              this.handleChange(e, "accountNumber")
                            }
                            label="Enter Account Number"
                            value={this.state.accountNumber}
                            className="CustomInput"
                          />
                          <InfoIcon />
                        </div>
                      </div>
                    </div>

                    <div className="scheduleText">
                      Disclosures and Authorizations
                    </div>
                    {this.state.showMore ? (
                      <div className="description">
                        {this.state.description}
                      </div>
                    ) : (
                      <div className="descriptionDiv">
                        <span className="description">
                          {this.state.description.substring(0, 200)}
                        </span>
                        <span
                          className="showMore"
                          onClick={() => this.setState({ showMore: true })}
                        >
                          ...Show More
                        </span>
                      </div>
                    )}

                    <div className="InputsDiv">
                      <div className="inputCheckboxFlexDiv">
                        <Checkbox
                          // className={props.className ? `${props.className} ${classes.checkroot}` : classes.checkroot}
                          checked={this.state.checked}
                          onChange={(e: any) =>
                            this.setState({ checked: e.target.checked })
                          }
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          style={{ color: "#408867" }}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                        I have read and agreed to the above Disclosures and
                        Authorizations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Next"}
              buttonStartLogo1={<ArrowBackIcon />}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/energystep4"
                )
              }
              ButtonOnClick2={() => {
                this.nextHandler();
              }}
              // button2Disabled={this.state.isScheduleCall}
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
    energyAction: bindActionCreators(EnergyAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  energyState: state.energy,
});

export default connect(mapStateToProps, mapDispatchToProps)(EnergyStep5);
