import React from "react";
import "./internetTVConfirmation.scss";
import InfoIcon from "@material-ui/icons/Info";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
// import Discovery from "../../Discovery/Discovery";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";
import * as InternetAction from "../../store/internet/actions";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CommonCard from "../../components/atoms/CommonCard";
import ATANDT from "../../Assets/images/Internet/At&T.svg";
import Xfinity from "../../Assets/images/Internet/xfinity.svg";
import HughesNet from "../../Assets/images/Internet/hughesNet.svg";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
  internetState: any;
  internetAction: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  isDataArrived: boolean;
  hintContent: string;
  loader: boolean;
  loader2: boolean;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  activeStep: number;
  providersData: any;
  providerOptions: any;
  isGetMove: boolean;
  moveId: string;
  sourceInternetDetails: any;
  internet_provider: string;
  paid_amount: string;
  internet_connected_devices: number;
  people_using_internet: number;
  no_of_tv: number;
  streaming_services: any;
};

class Discovery extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [],
    closed: false,
    hintContent: "",
    isDataArrived: true,
    loader: true,
    loader2: true,
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
    activeStep: 0,
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
    isGetMove: true,
    moveId: "",
    sourceInternetDetails: {},
    internet_provider: "",
    paid_amount: "",
    internet_connected_devices: 0,
    people_using_internet: 0,
    no_of_tv: 0,
    streaming_services: [],
    providerOptions: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
      page: 4,
    });

    this.props.internetAction.getSteps();
    //  this.props.commonAction.moveGet()
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
      let points: any = [];
      let hintContent: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 10) {
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
      nextProps.commonState.move[0].source_internet_details &&
      (nextProps.commonState.isGetMove || currentState.isGetMove)
    ) {
      nextProps.commonState.isGetMove = false;
      currentState.isGetMove = false;
      currentState.moveId = nextProps.commonState.move[0].id;
      currentState.sourceInternetDetails =
        nextProps.commonState.move[0].source_internet_details;
      currentState.internet_provider =
        nextProps.commonState.move[0].source_internet_details.internet_provider;
      currentState.paid_amount =
        nextProps.commonState.move[0].source_internet_details.paid_amount;
      currentState.internet_connected_devices =
        nextProps.commonState.move[0].source_internet_details.internet_connected_devices;
      currentState.people_using_internet =
        nextProps.commonState.move[0].source_internet_details.people_using_internet;
      currentState.no_of_tv =
        nextProps.commonState.move[0].source_internet_details.no_of_tv;
      currentState.streaming_services =
        nextProps.commonState.move[0].source_internet_details.streaming_services;
      let payload = {
        zip_code: nextProps.commonState.move[0].destination.zip_code,
      };
      nextProps.internetAction.getProvider(payload);

      let providersData = {
        name: nextProps.commonState.move[0].source_internet_details
          .internet_provider,
        image: null,
        isLaunch: false,
      };
      currentState.providersData = providersData;
      currentState.loader2 = false;
    }
    if (
      nextProps &&
      nextProps.internetState &&
      nextProps.internetState.providerData &&
      nextProps.internetState.isProviderDataArrived
    ) {
      nextProps.internetState.isProviderDataArrived = false;
      let providerOptions: any = [];
      nextProps.internetState.providerData.map((item: any) => {
        providerOptions.push(item);
      });

      currentState.providerOptions = providerOptions;
      currentState.loader2 = false;
    }

    return currentState;
  }

  nextHandler = () => {
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
    // this.state.step1.Phone && this.state.step1.Phone == true
    //   ? this.props.history.push({
    //       pathname: "/dashboard/concierge/workflow/internetstep5",
    //       state: {
    //         step1: this.state.step1,
    //         step2: this.state.step2,
    //         step3: this.state.step3,
    //         step4: this.state.step4,
    //         step5: this.state.step5,
    //       },
    //     })
    //   :
    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/internetstep5",
      state: {
        step1: this.state.step1,
        step2: this.state.step2,
        step3: this.state.step3,
        step4: this.state.step4,
        step5: this.state.step5,
      },
    });
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            // tabHandler={this.tabHandler}
            tabName={"Int/Cable"}
            tabId={5}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            {/* {this.state.tabName == "" ? (
              <div className="conciergeImageDiv">
                <img src={MovingImage} className="conciergeImage" />
              </div>
            ) : null} */}
            <div className="discovery-main">
              <div className="discovery-heading">
                <div className="discovery">Internet/Cable </div>
                <div className="titleNumberInternet">
                  <div className="left-number">4</div>
                  <div className="right-number">7</div>
                </div>
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false && this.state.hintContent ? (
                <div className="helpful-div">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {this.state.loader2 === true ? (
                <div
                // style={{
                //   margin: "57px 15px 0px 0px",
                //   textAlign: "center",
                // }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  <div className="point-content-wrapper">
                    <div className="points-div">
                      <div className="outer-point">
                        <div className="inner-point"></div>
                      </div>
                      <div className="vertical-line"></div>
                    </div>

                    <div className="point-content">
                      <div className="internetFlexDiv">
                        <div className="provider-head">Provider in use</div>

                        {this.state.providerOptions
                          ? this.state.providerOptions.map((item: any) => {
                              return (
                                <div className="serviceCard">
                                  <CommonCard
                                    isSelected={item.isLaunch}
                                    commonImg={item.image}
                                    commonCardText={item.name}
                                    SelectHandler={() =>
                                      // this.props.history.push({
                                      //   pathname:
                                      //     "/dashboard/concierge/workflow/internetstep5",
                                      //   state: {
                                      //     providerData: item,
                                      //   },
                                      // })
                                      item.web_link
                                        ? window.open(item.web_link, "_blank")
                                        : null
                                    }
                                    buttonText="Launch"
                                    className="commonServiceCard"
                                    buttonbox={true}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>

                  {this.state.listContent &&
                    this.state.listContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper">
                          <div className="points-div">
                            <div className="outer-point">
                              <div className="inner-point"></div>
                            </div>
                            <div className="vertical-line"></div>
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

                  <div className="point-content-wrapper">
                    <div className="points-div">
                      <div className="outer-point">
                        <div className="inner-point"></div>
                      </div>
                      <div className="vertical-line"></div>
                    </div>

                    <div className="point-content">
                      <div className="price-wrapper">
                        <div className="price-paid">Price Paid : </div>
                        <div className="price-paid-value">
                          ${this.state.paid_amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="point-content-wrapper">
                    <div className="points-div">
                      <div className="outer-point">
                        <div className="inner-point"></div>
                      </div>
                      <div className="vertical-line"></div>
                    </div>

                    <div className="point-content">
                      You have{" "}
                      <span className="bold">
                        {this.state.people_using_internet} people
                      </span>{" "}
                      using{" "}
                      <span className="bold">
                        {this.state.internet_connected_devices} devices
                      </span>{" "}
                      used mostly for{" "}
                      {this.state.step3.movies == true ? (
                        <span className="bold"> Movies </span>
                      ) : null}
                      {this.state.step3.videoGames == true ? (
                        <span className="bold"> Video Games </span>
                      ) : null}
                      {this.state.step3.wfh == true ? (
                        <span className="bold"> Work From Home </span>
                      ) : null}
                      {this.state.step3.videoCalls == true ? (
                        <span className="bold"> Video Calls </span>
                      ) : null}
                      {this.state.step3.downloading == true ? (
                        <span className="bold"> Downloading </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="point-content-wrapper">
                    <div className="points-div">
                      <div className="outer-point">
                        <div className="inner-point"></div>
                      </div>
                      <div className="vertical-line"></div>
                    </div>

                    <div className="point-content">
                      You have{" "}
                      <span className="bold">{this.state.no_of_tv} TV’s</span>{" "}
                      and normally like to stream
                      {this.state.step4.entertaiment == true ? (
                        <span className="bold"> Entertainment </span>
                      ) : null}
                      {this.state.step4.sports == true ? (
                        <span className="bold"> Sports </span>
                      ) : null}
                      {this.state.step4.kids == true ? (
                        <span className="bold"> Kids </span>
                      ) : null}
                      {this.state.step4.films == true ? (
                        <span className="bold"> Films </span>
                      ) : null}
                      through{" "}
                      {this.state.streaming_services &&
                        this.state.streaming_services.map((item: any) => {
                          return <span className="bold">{item} </span>;
                        })}
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="point-content-wrapper">
                <div className="points-div">
                  <div className="outer-point">
                    <div className="inner-point"></div>
                  </div>
                  <div className="vertical-line"></div>
                </div>

                <div className="point-content">
                  Integer posuere erat a ante venenatis dapibus posuere velit
                  aliquet. Donec sed odio dui. Donec id elit non mi porta
                  gravida at eget metus.
                </div>
              </div> */}
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
                pathname: "/dashboard/concierge/workflow/internetstep3",

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
          />
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(Action, dispatch),
    internetAction: bindActionCreators(InternetAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  internetState: state.internet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);
