import React from "react";
import "./MoversStep3.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import DIY from "../../Assets/images/Movers/DIY.svg";
import PODS from "../../Assets/images/Movers/PODS.svg";
import FullService from "../../Assets/images/Movers/FullService.svg";
import MoversCard from "../../components/Movers/MoversCard/MoversCard";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../../components/atoms/Button";
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  moversStepActive: any;
  moversStepTotal: any;
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  selectedDiy: boolean;
  selectedPods: boolean;
  selectedFullService: boolean;
  hintContent: string;
  isDataArrived2: boolean;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
};

class MoversStep3 extends React.Component<initialProps, initialState> {
  state: initialState = {
    hintContent: "",
    isDataArrived2: true,
    listContent: ["What kind of move are you looking for?"],
    scriptContent: [],
    closed: false,
    selectedDiy: false,
    selectedPods: false,
    selectedFullService: false,
    objectionCompleted: true,
    loader: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "moving",
    });
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

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

      let hintContent: any = [];
      let hintPara: string = "";
      let points: any = [];
      nextProps.commonState.script.map((item: any) => {
        if (item.page_number === 3) {
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

    return currentState;
  }

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
            <div className="mover3-main">
              <div className="mover3-heading">
                <div className="mover3">Movers </div>
                <div>
                  <div className="titleNumberMover">
                    <div className="left-number">3</div>
                    <div className="right-number">5</div>
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
                <div className="helpful-div-mover">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}

              <div className="script-div">
                {this.state.scriptContent.map((item: any) => {
                  return (
                    <div className="point-content-wrapper-mover3-script">
                      <div className="points-div-mover3">
                        <div className="outer-point-mover3">
                          <div className="inner-point-mover3"></div>
                        </div>
                        <div className="vertical-line-mover3"></div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                        className="point-content-mover3"
                      ></div>
                    </div>
                  );
                })}
              </div>
              {this.state.listContent.map((item: any) => {
                return (
                  <div className="point-content-wrapper-mover3">
                    <div className="points-div-mover3">
                      <div className="outer-point-mover3">
                        <div className="inner-point-mover3"></div>
                      </div>
                      <div className="vertical-line-mover3"></div>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                      className="point-content-mover3"
                    ></div>
                  </div>
                );
              })}
              <div className="point-content-wrapper-mover3">
                <div className="points-div-mover3">
                  <div className="outer-point-mover3">
                    <div className="inner-point-mover3"></div>
                  </div>
                  <div className="vertical-line-mover3"></div>
                </div>

                <div className="point-content-mover3">
                  <div className="MoversStep3Flex-div">
                    <div className="moversCardDiv">
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
                    </div>
                    <div className="moversCardDiv">
                      <MoversCard
                        icon={<img src={PODS} />}
                        isRecommended={true}
                        title="PODS"
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
                            selectedFullService:
                              !this.state.selectedFullService,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Continue"
              }
              buttonStartLogo1={
                // this.state.tabName === "" ||
                // this.state.tabName === "Discovery" ? (
                ""
                // ) : (
                //   <ArrowBackIcon />
                // )
              }
              button2BackGround={
                !(
                  this.state.selectedDiy ||
                  this.state.selectedFullService ||
                  this.state.selectedPods
                )
                  ? "grey"
                  : ""
              }
              button2Disabled={
                !(
                  this.state.selectedDiy ||
                  this.state.selectedFullService ||
                  this.state.selectedPods
                )
              }
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() => {
                this.props.history.push(
                  "/dashboard/concierge/workflow/moversstep2"
                );
              }}
              ButtonOnClick2={() => {
                this.props.history.push(
                  "/dashboard/concierge/workflow/moversstep4"
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

export default connect(mapStateToProps, mapDispatchToProps)(MoversStep3);
