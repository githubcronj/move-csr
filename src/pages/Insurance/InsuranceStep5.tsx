import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./InsuranceStep5.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import InsuranceDiscount from "../../components/Insurance/InsuranceDiscount";
import womenImg from "../../Assets/images/Insurance/Group 34072.svg";
import InsuranceCard from "../../components/Insurance/InsuranceCard";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as InsuranceAction from "../../store/insurance/actions";
import Image from "../../Assets/images/Insurance/image1.svg";
import * as CommonAction from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  history?: any;
  insuranceState: any;
  insuranceAction: any;
  commonState: any;
  commonAction: any;
};

type initialState = {
  closed: boolean;
  insuranceCardData: any;
  selectedPlanData: any;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  isQuoteListDataArrived: boolean;
  objectionCompleted: boolean;
  loader: boolean;
  loader2: boolean;
};

class InsuranceStep5 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    scriptContent: [],
    hintContent: "",
    closed: false,
    insuranceCardData: [
      // {
      //   id: "1",
      //   image: Image,
      //   insuranceName: "State Auto",
      //   monthlyCost: "9",
      //   yearlyCost: "100",
      //   currency: "$",
      //   isSelected: false,
      // },
      // {
      //   id: "2",
      //   image: "",
      //   insuranceName: "Safeco Insurace",
      //   monthlyCost: "9",
      //   yearlyCost: "100",
      //   currency: "$",
      //   isSelected: false,
      // },
      // {
      //   id: "3",
      //   image: "",
      //   insuranceName: "Travelers",
      //   monthlyCost: "9",
      //   yearlyCost: "100",
      //   currency: "$",
      //   isSelected: false,
      // },
      // {
      //   id: "4",
      //   image: "",
      //   insuranceName: "ASI Progressive",
      //   monthlyCost: "9",
      //   yearlyCost: "100",
      //   currency: "$",
      //   isSelected: false,
      // },
      // {
      //   id: "5",
      //   image: "",
      //   insuranceName: "Stillwater",
      //   monthlyCost: "9",
      //   yearlyCost: "100",
      //   currency: "$",
      //   isSelected: false,
      // },
    ],
    selectedPlanData: [],
    isQuoteListDataArrived: true,
    objectionCompleted: true,
    loader: true,
    loader2: true,
  };

  componentDidMount() {
    this.props.insuranceAction.insuranceQuote();
    this.props.insuranceAction.insuranceQuoteList();
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedPlanData &&
      this.props.history.location.state.insuranceCardData
    ) {
      this.setState({
        selectedPlanData: this.props.history.location.state.selectedPlanData,
        insuranceCardData: this.props.history.location.state.insuranceCardData,
      });
    }

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "insurance",
    });
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.props.insuranceAction.insuranceQuote();
      this.props.insuranceAction.insuranceQuoteList();
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
      nextProps.commonState.script.map((item: any) => {
        if (item.page_number === 5) {
          points = item.script_content.split("|");
          hintContent.push(item.hint_content);
        }
      });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      currentState.scriptContent = points;
      currentState.hintContent = hintPara;
      currentState.loader = false;
    }

    if (
      nextProps &&
      nextProps.insuranceState &&
      nextProps.insuranceState.quote &&
      nextProps.insuranceState.isQuote
      // currentState.isQuoteListDataArrived
    ) {
      // currentState.isQuoteListDataArrived = false;
      // console.log(nextProps);
      let data: any = [];
      nextProps.insuranceState.quote.map((item: any) => {
        data.push(item);
      });
      currentState.insuranceCardData = data;
      nextProps.insuranceState.isQuote = false;
      currentState.loader2 = false;
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  handlePlanClick = (selectedItem: any) => {
    let items = this.state.insuranceCardData;
    items.map((item: any) => {
      if (selectedItem.id === item.id && !item.isSelected) {
        item.isSelected = true;
      }
      // if (selectedItem.id === item.id && item.isSelected)
      else {
        item.isSelected = false;
      }
    });
    let selectedPlanData = items.filter((item: any) => item.isSelected);
    this.setState({
      insuranceCardData: items,
      selectedPlanData: selectedPlanData,
    });
  };

  backButtonHandler = () => {
    this.props.history.push("/dashboard/concierge/workflow/insurancestep4");
  };

  nextButtonHandler = () => {
    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/insurancestep6",
      state: {
        selectedPlanData: this.state.selectedPlanData,
        insuranceCardData: this.state.insuranceCardData,
      },
    });
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Insurance"}
            tabId={3}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="insurance5-main">
              <div className="insurance5-heading">
                <div className="insurance5">Insurance </div>
                <div>
                  <div className="titleNumberInsurance">
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
                <div className="helpful-div-insurance">
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
                      <div className="point-content-wrapper-insurance5-script">
                        <div className="points-div-insurance5">
                          <div className="outer-point-insurance5">
                            <div className="inner-point-insurance5"></div>
                          </div>
                          <div className="vertical-line-insurance5"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-insurance5"
                        ></div>
                      </div>
                    );
                  })}
                </div>
              }
              <div className="point-content-wrapper-insurance5">
                <div className="points-div-insurance5">
                  <div className="outer-point-insurance5">
                    <div className="inner-point-insurance5"></div>
                  </div>
                  <div className="vertical-line-insurance5"></div>
                </div>

                <div className="point-content-insurance5">
                  Here are some estimated quotes
                  {/* <div className="insuranceDiscountDiv">
                    <InsuranceDiscount
                      insuranceDcHandle={() => console.log("Hello")}
                      dcheading={"Unlock additional providers discounts"}
                      dcsubheading={
                        "Answer few more questions and availability for eligible discounts"
                      }
                      insurancebutton={"Get Started"}
                      imgdiscount={womenImg}
                    />
                  </div> */}
                  {this.state.loader2 == true ? (
                    <div style={{ margin: "15px auto", textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  ) : null}
                  {this.state.insuranceCardData.map((item: any) => {
                    return (
                      <div className="InsuranceCards">
                        <InsuranceCard
                          image={item.image_url}
                          insuranceName={item.carrier_name}
                          monthlyCost={
                            item.data &&
                            item.data.quote &&
                            item.data.quote.annual_premium &&
                            item.data.quote.term
                              ? (
                                  item.data.quote.annual_premium /
                                  item.data.quote.term
                                ).toFixed(2)
                              : ""
                          }
                          yearlyCost={
                            item.data &&
                            item.data.quote &&
                            item.data.quote.annual_premium
                          }
                          term={
                            item.data && item.data.quote && item.data.quote.term
                          }
                          isViewCoverage={
                            item.data && item.data.quote ? true : false
                          }
                          currency="$"
                          isSelected={item.isSelected}
                          PlanButtonClick={() => this.handlePlanClick(item)}
                          CoverageHandler={() => console.log()}
                        />
                      </div>
                    );
                  })}
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
              ButtonOnClick1={() => this.backButtonHandler()}
              ButtonOnClick2={() => this.nextButtonHandler()}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    insuranceAction: bindActionCreators(InsuranceAction, dispatch),
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  insuranceState: state.insurance,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceStep5);
