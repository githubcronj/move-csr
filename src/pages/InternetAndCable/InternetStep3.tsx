import React from "react";
import "./InternetStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import CommonCard from "../../components/atoms/CommonCard";
import Entertainment from "../../Assets/images/Internet/Cable-Entertainment.svg";
import Sports from "../../Assets/images/Internet/Cable-Sports.svg";
import Films from "../../Assets/images/Internet/Cable-Films.svg";
import Kids from "../../Assets/images/Internet/Cable-Kids.svg";
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
import MoversInputs from "../../components/Movers/Inputs/MoverInputs";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";
import apple from "../../Assets/images/Internet/apple tv.svg";
import hulu from "../../Assets/images/Internet/Hulu.svg";
import sling from "../../Assets/images/Internet/sling.svg";
import netflix from "../../Assets/images/Internet/netflix.svg";
import prime from "../../Assets/images/Internet/prime.svg";
import disney from "../../Assets/images/Internet/disney.svg";

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
  tvOptions: any;
  numberOfTv: number;
  streamingServices: any;
  otherServiceName: string;
  isGetMove: boolean;
  moveId: string;
  sourceInternetDetails: any;
};

class InternetStep3 extends React.Component<initialProps, initialState> {
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
    tvOptions: [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
    ],
    numberOfTv: 1,
    streamingServices: [
      {
        serviceName: "Apple Tv",
        serviceImage: apple,
        isSelected: false,
      },
      {
        serviceName: "Hulu",
        serviceImage: hulu,
        isSelected: false,
      },
      {
        serviceName: "Sling",
        serviceImage: sling,
        isSelected: false,
      },
      {
        serviceName: "Youtube",
        serviceImage: sling,
        isSelected: false,
      },
      {
        serviceName: "Netflix",
        serviceImage: netflix,
        isSelected: false,
      },
      {
        serviceName: "Amazon Prime",
        serviceImage: prime,
        isSelected: false,
      },
      {
        serviceName: "Disney plus",
        serviceImage: disney,
        isSelected: false,
      },
      {
        serviceName: "Others",
        serviceImage: sling,
        isSelected: false,
      },
    ],
    otherServiceName: "",
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
      page: 3,
    });

    // this.props.commonAction.moveGet();
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      let streamingService = this.state.streamingServices;
      streamingService.map((item: any) => {
        if (
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .streaming_services &&
          this.props.commonState.move[0].source_internet_details.streaming_services.includes(
            item.serviceName
          )
        ) {
          item.isSelected = true;
        }
      });
      this.setState({
        moveId: this.props.commonState.move[0].id,
        sourceInternetDetails:
          this.props.commonState.move[0].source_internet_details,
        numberOfTv:
          this.props.commonState.move[0].source_internet_details.no_of_tv,
        streamingServices: streamingService,
      });
    }
    this.props.internetAction.getSteps();
  }

  componentDidUpdate(prevProps: any) {
    // window.scrollTo(0, 0);
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      let streamingService = this.state.streamingServices;
      streamingService.map((item: any) => {
        if (
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].source_internet_details &&
          this.props.commonState.move[0].source_internet_details
            .streaming_services &&
          this.props.commonState.move[0].source_internet_details.streaming_services.includes(
            item.serviceName
          )
        ) {
          item.isSelected = true;
        }
      });
      this.setState({
        moveId: this.props.commonState.move[0].id,
        sourceInternetDetails:
          this.props.commonState.move[0].source_internet_details,
        numberOfTv:
          this.props.commonState.move[0].source_internet_details.no_of_tv,
        streamingServices: streamingService,
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
    //   currentState.numberOfTv =
    //     nextProps.commonState.move[0].source_internet_details.no_of_tv;
    //   // currentState.streamingServices=nextProps.commonState.move[0].source_internet_details.streaming_services
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isExtraPost
    ) {
      nextProps.commonState.isExtraPost = false;
      nextProps.commonAction.moveGet();

      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/internettvconfirmation",
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

  handleTv = (e: any) => {
    this.setState({
      numberOfTv: e.target.value,
    });
  };

  nextHandler = () => {
    // this.state.step1.Phone==true ? this.props.history.push({
    //   pathname:"/dashboard/concierge/workflow/internetstep4",
    //   state:{
    //     step1:this.state.step1,
    //     step2:this.state.step2,
    //     step3:this.state.step3,
    //     step4:this.state.step4,
    //     step5:this.state.step5
    //   }
    // }) : this.props.history.push({
    //   pathname:"/dashboard/concierge/workflow/internetstep5",
    //   state:{
    //     step1:this.state.step1,
    //     step2:this.state.step2,
    //     step3:this.state.step3,
    //     step4:this.state.step4,
    //     step5:this.state.step5
    //   }
    // })

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

    let streamingServices: any = [];
    this.state.streamingServices.map((item: any) => {
      if (item.isSelected == true) {
        if (item.serviceName != "Others") {
          streamingServices.push(item.serviceName);
        } else {
          streamingServices.push(this.state.otherServiceName);
        }
      }
    });

    this.props.internetAction.changeSteps(payload);
    this.props.commonAction.extraPost({
      moveId: this.state.moveId,
      body: {
        ...this.state.sourceInternetDetails,
        no_of_tv: this.state.numberOfTv,
        streaming_services: streamingServices,
      },
    });

    // this.props.history.push({
    //   pathname: "/dashboard/concierge/workflow/internettvconfirmation",
    //   state: {
    //     step1: this.state.step1,
    //     step2: this.state.step2,
    //     step3: this.state.step3,
    //     step4: this.state.step4,
    //     step5: this.state.step5,
    //   },
    // });
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };
  otherServiceHandler = (e: any) => {
    const stringValue = /^[^*|\":<>[\]{}`\\()';@&$0-9]+$/;
    if (stringValue.test(String(e.target.value))) {
      this.setState({
        otherServiceName: e.target.value,
      });
    }
  };

  setCheckboxValStep4 = async (item: any, value: any) => {
    const step4 = { ...this.state.step4, [item]: !value };
    await this.setState({
      step4: step4,
    });
  };

  streamingServiceHandler = (item: any) => {
    let streamingServices = this.state.streamingServices;
    streamingServices.map((item2: any) => {
      if (item2 == item) {
        item2.isSelected = !item2.isSelected;
      }
      // else{
      //   item2.isSelected=false
      // }
    });

    this.setState({
      streamingServices: streamingServices,
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
                <div className="internet2">TV Preferences </div>
                <div>
                  <div className="titleNumberInternet">
                    <div className="left-number">3</div>
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
                            className="point-content"
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
                  What do you like to watch?
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
                        isSelected={this.state.step4.entertaiment}
                        commonImg={Entertainment}
                        commonCardText="News and Local Channels"
                        SelectHandler={() =>
                          this.setCheckboxValStep4(
                            "entertaiment",
                            this.state.step4.entertaiment
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step4.sports}
                        commonImg={Sports}
                        commonCardText="Sports & Premium Content"
                        SelectHandler={() =>
                          this.setCheckboxValStep4(
                            "sports",
                            this.state.step4.sports
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step4.kids}
                        commonImg={Kids}
                        commonCardText="Kids Shows"
                        SelectHandler={() =>
                          this.setCheckboxValStep4(
                            "kids",
                            this.state.step4.kids
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step4.films}
                        commonImg={Films}
                        commonCardText="Movies"
                        SelectHandler={() =>
                          this.setCheckboxValStep4(
                            "films",
                            this.state.step4.films
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
                  How many TVs are in the house?
                  <div className="no-of-tv">
                    <MoversInputs
                      // title="Number of Tvs"
                      // icon={<img src={Stories} />}
                      inputComponent={
                        <CustomizedSelect
                          onChange={(e: any) => this.handleTv(e)}
                          label="SELECT NUMBER OF TV"
                          value={this.state.numberOfTv}
                          options={this.state.tvOptions}
                        />
                      }
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
                  What streaming services do you use?
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
                    {this.state.streamingServices.map((item: any) => {
                      return (
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={item.isSelected}
                            commonImg={item.serviceImage}
                            commonCardText={item.serviceName}
                            SelectHandler={() =>
                              this.streamingServiceHandler(item)
                            }
                            sideTitle={
                              item.serviceName == "Others" ? true : false
                            }
                            otherServiceHandler={this.otherServiceHandler}
                            otherServiceName={this.state.otherServiceName}
                            disabled={
                              item.serviceName == "Others" &&
                              !this.state.otherServiceName
                                ? true
                                : false
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
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
              // button2Disabled={
              //   !(
              //     this.state.step4.entertaiment ||
              //     this.state.step4.films ||
              //     this.state.step4.kids ||
              //     this.state.step4.sports
              //   )
              //     ? true
              //     : false
              // }
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

export default connect(mapStateToProps, mapDispatchToProps)(InternetStep3);
