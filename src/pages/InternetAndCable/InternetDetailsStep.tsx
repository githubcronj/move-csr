import React from "react";
import "./InternetStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import CommonCard from "../../components/atoms/CommonCard";
import Person1 from "../../Assets/images/Internet/movieShow.svg";
import Person2 from "../../Assets/images/Internet/onlineGame.svg";
import Person3 from "../../Assets/images/Internet/desk.svg";
import Person4 from "../../Assets/images/Internet/workFromHome.svg";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { NamedTupleMember } from "typescript";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as InternetAction from "../../store/internet/actions";
import * as Action from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";

type initialProps = {
  history?: any;
  internetAction?: any;
  internetState?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  closed: boolean;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  isDataArrived: boolean;
  activeStep: number;
  isDataArrived2: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  numberOfDevices: string;
  numberOfDevicesOptions: any;
  numberOfPeople: string;
  numberOfPeopleOptions: any;
  isGetMove: boolean;
  moveId: string;
  sourceInternetDetails: any;
};

class InternetDetailsStep extends React.Component<initialProps, initialState> {
  state: initialState = {
    closed: false,
    step1: {
      internet: false,
      TV: false,
      Phone: false,
    },
    step2: {
      one: false,
      two: false,
      three: false,
      four: false,
    },
    step3: {
      movies: false,
      videoGames: false,
      wfh: false,
      webEmail: false,
      // downloading: false,
      // noneOfThese: false,
    },
    step4: {
      entertaiment: false,
      sports: false,
      kids: false,
      films: false,
    },
    step5: {
      localAndLongDistanceCall: false,
      internationalCall: false,
    },
    isDataArrived: true,
    activeStep: 0,
    isDataArrived2: true,
    scriptContent: [],
    hintContent: "",
    objectionCompleted: true,
    loader: true,
    numberOfDevices: "",
    numberOfDevicesOptions: [
      { value: "", label: "" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
    numberOfPeople: "",
    numberOfPeopleOptions: [
      { value: "", label: "" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "4+", label: "4+" },
    ],
    isGetMove: true,
    moveId: "",
    sourceInternetDetails: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
      page: 2,
    });

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move[0] &&
      this.props.commonState.move[0].source_internet_details
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        sourceInternetDetails:
          this.props.commonState.move[0].source_internet_details,
        numberOfDevices:
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .internet_connected_devices,
        numberOfPeople:
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .people_using_internet,
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        sourceInternetDetails:
          this.props.commonState.move[0].source_internet_details,
        numberOfDevices:
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .internet_connected_devices,
        numberOfPeople:
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .people_using_internet,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.internetState &&
      nextProps.internetState.isStepsSuccess
    ) {
      nextProps.internetState.isStepsSuccess = false;
      nextProps.internetAction.getSteps();
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let points: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 3) {
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
      nextProps.internetState &&
      nextProps.internetState.steps &&
      nextProps.internetState.steps &&
      nextProps.internetState.steps[0] &&
      nextProps.internetState.steps[0].filter_values &&
      nextProps.internetState.stepsDataArrived
    ) {
      nextProps.internetState.stepsDataArrived = false;
      currentState.activeStep =
        nextProps.internetState.steps[0].filter_values.activeStep;
      currentState.step1 = nextProps.internetState.steps[0].filter_values.step1;
      currentState.step2 = nextProps.internetState.steps[0].filter_values.step2;
      currentState.step3 = nextProps.internetState.steps[0].filter_values.step3;
      currentState.step4 = nextProps.internetState.steps[0].filter_values.step4;
      currentState.step5 = nextProps.internetState.steps[0].filter_values.step5;
    }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.move[0].source_internet_details &&
    //   (nextProps.commonState.isGetMove || currentState.isGetMove)
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   currentState.isGetMove = false;
    //   currentState.moveId = nextProps.commonState.move[0].id;
    //   currentState.sourceInternetDetails =
    //     nextProps.commonState.move[0].source_internet_details;
    //   currentState.numberOfDevices =
    //     nextProps.commonState.move[0].source_internet_details.internet_connected_devices;
    //   currentState.numberOfPeople =
    //     nextProps.commonState.move[0].source_internet_details.people_using_internet;
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isExtraPost
    ) {
      nextProps.commonState.isExtraPost = false;
      nextProps.commonAction.moveGet();

      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/internetstep3",
        state: {
          step1: currentState.step1,
          step2: currentState.step2,
          step3: currentState.step3,
          step4: currentState.step4,
          step5: currentState.step5,
        },
      });
    }

    return currentState;
  }

  nextHandler = () => {
    // this.state.step1.Phone == true && this.state.step1.TV == false
    //   ?
    // this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep5",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   })
    // : this.state.step1.TV == true
    // ?
    // this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep3",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   })
    // : this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep5",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   });

    const payload = {
      page_name: "Internet",
      filter_values: {
        activeStep: this.state.step1.Phone == true ? 4 : 5,
        step1: this.state.step1,
        step2: this.state.step2,
        step3: this.state.step3,
        step4: this.state.step4,
        step5: this.state.step5,
      },
    };

    this.props.internetAction.changeSteps(payload);
    this.props.commonAction.extraPost({
      moveId: this.state.moveId,
      body: {
        ...this.state.sourceInternetDetails,
        internet_connected_devices: this.state.numberOfDevices,
        people_using_internet: this.state.numberOfPeople,
      },
    });
  };

  setCheckboxValStep3 = async (item: any, value: any) => {
    const step3 = { ...this.state.step3, [item]: !value };
    await this.setState({
      step3: step3,
    });
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  setCheckboxValStep4 = async (item: any, value: any) => {
    const step4 = { ...this.state.step4, [item]: !value };
    await this.setState({
      step4: step4,
    });
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Int/Cable"}
            tabId={5}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="internet2-main">
              <div className="internet2-heading">
                <div className="internet2">Internet Preferences </div>
                <div>
                  <div className="titleNumberInternet">
                    <div className="left-number">2</div>
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
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-internet">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}

              {
                <div className="script-div">
                  {this.state.scriptContent &&
                    this.state.scriptContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper-internet2-script">
                          <div className="points-div-internet2">
                            <div className="outer-point-internet2">
                              <div className="inner-point-internet2"></div>
                            </div>
                            <div className="vertical-line-internet2"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-internet2"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }

              <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  <div className="outer-point-internet2">
                    <div className="inner-point-internet2"></div>
                  </div>
                  <div className="vertical-line-internet2"></div>
                </div>

                <div className="point-content-internet2">
                  How many devices are connected to the internet?
                  <div className="inputDiv">
                    <CustomizedSelect
                      label="Select number of devices"
                      value={this.state.numberOfDevices}
                      options={this.state.numberOfDevicesOptions}
                      placeholder={
                        this.state.numberOfDevices
                          ? this.state.numberOfDevices
                          : "Select"
                      }
                      onChange={(e: any) => {
                        this.setState({ numberOfDevices: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  <div className="outer-point-internet2">
                    <div className="inner-point-internet2"></div>
                  </div>
                  <div className="vertical-line-internet2"></div>
                </div>

                <div className="point-content-internet2">
                  How many people are going to use the internet?
                  <div className="inputDiv">
                    <CustomizedSelect
                      label="Select number of people"
                      value={this.state.numberOfPeople}
                      options={this.state.numberOfPeopleOptions}
                      placeholder={
                        this.state.numberOfPeople
                          ? this.state.numberOfPeople
                          : "Select"
                      }
                      onChange={(e: any) => {
                        this.setState({ numberOfPeople: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  <div className="outer-point-internet2">
                    <div className="inner-point-internet2"></div>
                  </div>
                  <div className="vertical-line-internet2"></div>
                </div>

                <div className="point-content-internet2">
                  What do people in your home use internet for?
                  <div className="internetStep2FlexDiv">
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step3.movies}
                        commonImg={Person1}
                        commonCardText="Streaming Movies & Shows"
                        SelectHandler={() =>
                          this.setCheckboxValStep3(
                            "movies",
                            this.state.step3.movies
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step3.videoGames}
                        commonImg={Person2}
                        commonCardText="Playing Online Games"
                        SelectHandler={() =>
                          this.setCheckboxValStep3(
                            "videoGames",
                            this.state.step3.videoGames
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step3.webEmail}
                        commonImg={Person3}
                        commonCardText="Browsing Web & Email"
                        SelectHandler={() =>
                          this.setCheckboxValStep3(
                            "webEmail",
                            this.state.step3.webEmail
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step3.wfh}
                        commonImg={Person4}
                        commonCardText="Work From Home"
                        SelectHandler={() =>
                          this.setCheckboxValStep3("wfh", this.state.step3.wfh)
                        }
                      />
                    </div>
                    {/* <div className="serviceCard">
                    <CommonCard
                      isSelected={this.state.step3.downloading}
                      commonImg={Person4}
                      commonCardText="Connecting Smart Devices"
                      SelectHandler={() =>
                        this.setCheckboxValStep3(
                          "downloading",
                          this.state.step3.downloading
                        )
                      }
                    />
                  </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  <div className="outer-point-internet2">
                    <div className="inner-point-internet2"></div>
                  </div>
                  <div className="vertical-line-internet2"></div>
                </div>
                <div className="point-content-internet2"></div>
              </div> */}
              <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  <div className="outer-point-internet2">
                    <div className="inner-point-internet2"></div>
                  </div>
                  <div className="vertical-line-internet2"></div>
                </div>

                <div className="point-content-internet2">Great, thank you!</div>
              </div>
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
                  pathname: "/dashboard/concierge/workflow/internetstep2",
                  state: {
                    step1: this.state.step1,
                    step2: this.state.step2,
                    step3: this.state.step3,
                    step4: this.state.step4,
                    step5: this.state.step5,
                  },
                })
              }
              ButtonOnClick2={() => {
                this.nextHandler();
              }}
              button2Disabled={
                !(
                  (this.state.step3.wfh ||
                    this.state.step3.movies ||
                    this.state.step3.videoGames ||
                    this.state.step3.webEmail) &&
                  this.state.numberOfDevices &&
                  this.state.numberOfPeople
                )
                  ? true
                  : false
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
    internetAction: bindActionCreators(InternetAction, dispatch),
    commonAction: bindActionCreators(Action, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  internetState: state.internet,
  commonState: state.common,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternetDetailsStep);
