import React from "react";
import "./InternetStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import CommonCard from "../../components/atoms/CommonCard";
import Wifi from "../../Assets/images/Internet/Cable-Internet.svg";
import TV from "../../Assets/images/Internet/Cable-Tv.svg";
import Phone from "../../Assets/images/Internet/Cable-Phone.svg";
import Person1 from "../../Assets/images/Internet/Cable-Person1.svg";
import Person2 from "../../Assets/images/Internet/Cable-Person2.svg";
import Person3 from "../../Assets/images/Internet/Cable-Person3.svg";
import Person4 from "../../Assets/images/Internet/Cable-Person4.svg";
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
import ATANDT from "../../Assets/images/Internet/At&T.svg";
import Xfinity from "../../Assets/images/Internet/xfinity.svg";
import HughesNet from "../../Assets/images/Internet/hughesNet.svg";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  providersData: any;
  providerName: string;
  providerOptions: any;
  payAmount: string;
  isGetMove: boolean;
  moveId: string;
  zipCode: string;
  sourceInternetDetails: any;
};

class InternetStep2 extends React.Component<initialProps, initialState> {
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
    providersData: [
      {
        name: "AT&T",
        image: ATANDT,
        isLaunch: false,
      },
      {
        name: "Xfinity",
        image: Xfinity,
        isLaunch: false,
      },
      {
        name: "HughesNet",
        image: HughesNet,
        isLaunch: false,
      },
    ],
    providerName: "NA",
    providerOptions: [
      { value: "", label: "" },
      { value: "Xfinity", label: "Xfinity" },
      { value: "AT&T", label: "AT&T" },
      { value: "HughesNet", label: "HughesNet" },
    ],
    payAmount: "",
    isGetMove: true,
    moveId: "",
    zipCode: "",
    sourceInternetDetails: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.internetAction.getSteps();
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
      page: 1,
    });
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  nextHandler = async () => {
    if (this.state.step1.internet == false) {
      await this.setState({
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
      });
    }
    if (this.state.step1.TV == false) {
      await this.setState({
        step4: {
          entertaiment: false,
          sports: false,
          kids: false,
          films: false,
        },
      });
    }

    if (this.state.step1.Phone == false) {
      await this.setState({
        step5: {
          localAndLongDistanceCall: false,
          internationalCall: false,
        },
      });
    }

    if (this.state.step1.Phone == true) {
      await this.setState({
        step5: {
          localAndLongDistanceCall: true,
          internationalCall: true,
        },
      });
    }
    // if (this.state.step1.internet == true) {
    // this.props.history.push({
    //   pathname: "/dashboard/concierge/workflow/internetdetailsstep",
    //   state: {
    //     step1: this.state.step1,
    //     step2: this.state.step2,
    //     step3: this.state.step3,
    //     step4: this.state.step4,
    //     step5: this.state.step5,
    //   },
    // });
    // } else if (this.state.step1.TV == true) {
    //   this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep3",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   });
    // } else if (this.state.step1.Phone == true && this.state.step1.TV == false) {
    //   this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep5",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   });
    // } else {
    //   this.props.history.push({
    //     pathname: "/dashboard/concierge/workflow/internetstep5",
    //     state: {
    //       step1: this.state.step1,
    //       step2: this.state.step2,
    //       step3: this.state.step3,
    //       step4: this.state.step4,
    //       step5: this.state.step5,
    //     },
    //   });
    // }

    const payload = {
      page_name: "Internet",
      filter_values: {
        activeStep:
          this.state.step1.TV == true
            ? 3
            : this.state.step1.Phone == true
            ? 4
            : 5,
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
        internet_provider: this.state.providerName,
        paid_amount: this.state.payAmount,
      },
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
      let points: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 2) {
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

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move[0] &&
      (nextProps.commonState.isGetMove || currentState.isGetMove)
    ) {
      nextProps.commonState.isGetMove = false;
      currentState.isGetMove = false;
      currentState.moveId = nextProps.commonState.move[0].id;
      currentState.zipCode =
        nextProps.commonState.move[0].destination &&
        nextProps.commonState.move[0].destination.zip_code;
      currentState.sourceInternetDetails =
        nextProps.commonState.move[0].source_internet_details;
      currentState.providerName =
        nextProps.commonState.move[0].source_internet_details.internet_provider;
      currentState.payAmount =
        nextProps.commonState.move[0].source_internet_details.paid_amount;

      let payload = {
        zip_code: nextProps.commonState.move[0].destination.zip_code,
      };
      nextProps.internetAction.getProvider(payload);
    }

    if (
      nextProps &&
      nextProps.internetState &&
      nextProps.internetState.providerData &&
      nextProps.internetState.isProviderDataArrived
    ) {
      nextProps.internetState.isProviderDataArrived = false;
      let providerData: any = [];
      let providerOptions: any = [{ value: "", label: "" }];
      nextProps.internetState.providerData.map((item: any) => {
        providerData.push(item);
        providerOptions.push({
          value: item.name,
          label: item.name,
          item: item,
        });
      });
      currentState.providersData = providerData;
      currentState.providerOptions = providerOptions;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isExtraPost
    ) {
      nextProps.commonState.isExtraPost = false;
      nextProps.commonAction.moveGet();

      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/internetdetailsstep",
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

  setCheckboxValStep1 = async (item: any, value: any) => {
    const step1 = { ...this.state.step1, [item]: !value };

    await this.setState({
      step1: step1,
    });
  };

  setCheckboxValStep2 = async (item: any, value: any) => {
    const step2 = { ...this.state.step2, [item]: !value };
    await this.setState({
      step2: step2,
    });
  };

  setCheckboxValStep3 = async (item: any, value: any) => {
    const step3 = { ...this.state.step3, [item]: !value };
    await this.setState({
      step3: step3,
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
                    <div className="left-number">1</div>
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
                            <div className="vertical-line-intranet"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-internet2 point-content-internet-margin"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }

              <div className="point-content-wrapper-internet2">
                <div className="points-div-internet2">
                  {/* <div className="outer-point-internet1">
                    <div className="inner-point-internet1"></div>
                  </div> */}
                  <div className="vertical-line-intranet"></div>
                </div>

                <div className="point-content-internet2">
                  <div className="internetStep2FlexDiv internetProviderSpace">
                    {this.state.providersData.length ? (
                      <div className="providers-in-area">
                        The providers in your area are
                      </div>
                    ) : null}
                    {this.state.providersData &&
                      this.state.providersData.map((item: any) => {
                        return (
                          <div className="serviceCard">
                            <CommonCard
                              isSelected={item.isLaunch}
                              commonImg={item.logo}
                              commonCardText={item.name}
                              SelectHandler={() =>
                                // this.props.history.push({
                                //   pathname:
                                //     "/dashboard/concierge/workflow/internetstep5",
                                //   state: {
                                //     providerData: item,
                                //   },
                                // })
                                item && item.web_link
                                  ? window.open(item.web_link, "_blank")
                                  : null
                              }
                              buttonText="Launch"
                              className="commonServiceCard"
                              buttonbox={true}
                            />
                          </div>
                        );
                      })}
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
                  What provider are you using?
                  <div className="inputDiv">
                    <CustomizedInput
                      label="Enter Provider Name"
                      value={this.state.providerName}
                      onChange={(e: any) =>
                        this.setState({ providerName: e.target.value })
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
                  What services do you have with them?
                  <div className="internetStep2FlexDiv">
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step1.internet}
                        commonImg={Wifi}
                        commonCardText="Internet"
                        SelectHandler={() =>
                          this.setCheckboxValStep1(
                            "internet",
                            this.state.step1.internet
                          )
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step1.TV}
                        commonImg={TV}
                        commonCardText="Tv"
                        SelectHandler={() =>
                          this.setCheckboxValStep1("TV", this.state.step1.TV)
                        }
                      />
                    </div>
                    <div className="serviceCard">
                      <CommonCard
                        isSelected={this.state.step1.Phone}
                        commonImg={Phone}
                        commonCardText="Phone"
                        SelectHandler={() =>
                          this.setCheckboxValStep1(
                            "Phone",
                            this.state.step1.Phone
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
                  How much are you paying?
                  <div className="inputDiv">
                    <CustomizedInput
                      label="Enter Amount"
                      value={this.state.payAmount}
                      onChange={(e: any) =>
                        this.setState({
                          payAmount: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* {this.state.step1.internet == true ? (
                <div className="further-internet-1">
                  <div className="point-content-wrapper-internet2">
                    <div className="points-div-internet2">
                      <div className="outer-point-internet2">
                        <div className="inner-point-internet2"></div>
                      </div>
                      <div className="vertical-line-internet2"></div>
                    </div>

                    <div className="point-content-internet2">
                      How many people are going to use the internet?
                      <div className="internetStep2FlexDiv">
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={this.state.step2.one}
                            commonImg={Person1}
                            commonCardText="Person1"
                            SelectHandler={() =>
                              this.setCheckboxValStep2(
                                "one",
                                this.state.step2.one
                              )
                            }
                          />
                        </div>
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={this.state.step2.two}
                            commonImg={Person2}
                            commonCardText="Person2"
                            SelectHandler={() =>
                              this.setCheckboxValStep2(
                                "two",
                                this.state.step2.two
                              )
                            }
                          />
                        </div>
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={this.state.step2.three}
                            commonImg={Person3}
                            commonCardText="Person3"
                            SelectHandler={() =>
                              this.setCheckboxValStep2(
                                "three",
                                this.state.step2.three
                              )
                            }
                          />
                        </div>
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={this.state.step2.four}
                            commonImg={Person4}
                            commonCardText="Person4"
                            SelectHandler={() =>
                              this.setCheckboxValStep2(
                                "four",
                                this.state.step2.four
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null} */}

              {/* {this.state.step1.internet == true ? (
                <div className="further-internet-2">
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
                            isSelected={this.state.step3.wfh}
                            commonImg={Person3}
                            commonCardText="Browsing Web & Email"
                            SelectHandler={() =>
                              this.setCheckboxValStep3(
                                "wfh",
                                this.state.step3.wfh
                              )
                            }
                          />
                        </div>
                        <div className="serviceCard">
                          <CommonCard
                            isSelected={this.state.step3.videoCalls}
                            commonImg={Person4}
                            commonCardText="Making Video Calls"
                            SelectHandler={() =>
                              this.setCheckboxValStep3(
                                "videoCalls",
                                this.state.step3.videoCalls
                              )
                            }
                          />
                        </div>
                        <div className="serviceCard">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Continue"}
              buttonStartLogo1={<ArrowBackIcon />}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/securitystep2"
                )
              }
              ButtonOnClick2={() => {
                this.nextHandler();
              }}
              button2Disabled={
                !(
                  this.state.step1.Phone ||
                  this.state.step1.TV ||
                  this.state.step1.internet
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

export default connect(mapStateToProps, mapDispatchToProps)(InternetStep2);
