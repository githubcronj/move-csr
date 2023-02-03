import React from "react";
import "./InternetStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import CommonCard from "../../components/atoms/CommonCard";
import USA from "../../Assets/images/Internet/Cable-USA.svg";
import International from "../../Assets/images/Internet/Cable-International.svg";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as InternetAction from "../../store/internet/actions";
import * as Action from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";

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
};

class InternetStep4 extends React.Component<initialProps, initialState> {
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
      videoCalls: false,
      downloading: false,
      noneOfThese: false,
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
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
    });
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
      nextProps.commonState.script.map((item: any) => {
        if (item.page_number === 4) {
          points = item.script_content.split("|");
          hintContent.push(item.hint_content);
        }
      });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      currentState.scriptContent = points;
      currentState.hintContent = hintPara;
      currentState.loader = false;
    }
    // console.log("inside",    nextProps.internetState.stepsDataArrived)
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

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  nextHandler = () => {
    this.props.history.push("/dashboard/concierge/workflow/internetstep5");
    const payload = {
      page_name: "Internet",
      filter_values: {
        activeStep: 5,
        step1: this.state.step1,
        step2: this.state.step2,
        step3: this.state.step3,
        step4: this.state.step4,
        step5: this.state.step5,
      },
    };

    this.props.internetAction.changeSteps(payload);
  };

  setCheckboxValStep5 = async (item: any, value: any) => {
    const step5 = { ...this.state.step5, [item]: !value };
    await this.setState({
      step5: step5,
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
                <div className="internet2">Internet / Cable </div>
                <div>
                  <div className="titleNumberInternet">
                    <div className="left-number">4</div>
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
                  {this.state.scriptContent.map((item: any) => {
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
                  What do you usually use your home phone for?
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
                  <div className="internetStep2FlexDiv">
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step5.localAndLongDistanceCall}
                        commonImg={USA}
                        commonCardText="Local & long distance calling"
                        SelectHandler={() =>
                          this.setCheckboxValStep5(
                            "localAndLongDistanceCall",
                            this.state.step5.localAndLongDistanceCall
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step5.internationalCall}
                        commonImg={International}
                        commonCardText="International calling"
                        SelectHandler={() =>
                          this.setCheckboxValStep5(
                            "internationalCall",
                            this.state.step5.internationalCall
                          )
                        }
                      />
                    </div>
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
                  Great, thank you! I’m now going to find you some quotes.
                </div>
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
                this.state.step1.TV == true
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/internetstep3",
                      state: {
                        step1: this.state.step1,
                        step2: this.state.step2,
                        step3: this.state.step3,
                        step4: this.state.step4,
                        step5: this.state.step5,
                      },
                    })
                  : this.props.history.push({
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
                !this.state.step5.internationalCall &&
                !this.state.step5.localAndLongDistanceCall
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

export default connect(mapStateToProps, mapDispatchToProps)(InternetStep4);
