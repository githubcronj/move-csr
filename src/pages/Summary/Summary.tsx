import React from "react";
import "./Summary.scss";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SummaryFirstCard from "../../components/summary/SummaryFirstCard";
import * as CommonAction from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SummaryImage from "../../Assets/images/Summary/summaryImage.svg";

type initialProps = {
  history?: any;
  commonState?: any;
  commonAction?: any;
};

type initialState = {
  listContent: any;
  name: string;
  email: string;
  isDataArrived: boolean;
  selectedMovers: any;
  selectedInsurance: any;
  selectedSecurity: any;
  selectedUtilities: any;
  selectedInternet: any;
};

class Summary extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: ["To summarise, you have chosen:"],
    name: "",
    email: "",
    isDataArrived: true,
    selectedMovers: [],
    selectedInsurance: [],
    selectedSecurity: [],
    selectedUtilities: [],
    selectedInternet: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      let ele = document.querySelector(".animationDiv");
      let ele2 = document.querySelector(".summarymaindiv");
      if (ele !== null) {
        ele.setAttribute("style", "display: none");
      }
      if (ele2 !== null) {
        ele2.setAttribute("style", "display: block");
      }
    }, 2000);
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      let first_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.first_name;
      let last_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.last_name;
      let email =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.email;
      this.setState({
        name: first_name.concat(" " + last_name),
        email: email,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move &&
      nextProps.commonState.move[0] &&
      nextProps.commonState.move[0].id &&
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;
      const data =
        nextProps.commonState &&
        nextProps.commonState.move &&
        nextProps.commonState.move.length > 0 &&
        nextProps.commonState.move[0];
      let first_name = data && data.user_ref && data.user_ref.first_name;
      let last_name = data && data.user_ref && data.user_ref.last_name;
      let email = data && data.user_ref && data.user_ref.email;
      currentState.name = first_name.concat(" " + last_name);
      currentState.email = email;
      let moveId = data && data.id;
      const payload = {
        service: "",
        moveId: moveId,
      };
      nextProps.commonAction.orderGet(payload);
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let moversData: any = [];
      let insuranceData: any = [];
      let securityData: any = [];
      let internetData: any = [];
      let utilitiesData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service == "Professional Movers") {
          moversData.push(item);
        }
        if (item.service == "Insurance") {
          insuranceData.push(item);
        }
        if (item.service == "Home Security") {
          securityData.push(item);
        }
        if (item.service == "Internet/Cable") {
          internetData.push(item);
        }
        if (item.service == "Utilities") {
          utilitiesData.push(item);
        }
      });

      currentState.selectedMovers = moversData;
      currentState.selectedInsurance = insuranceData;
      currentState.selectedSecurity = securityData;
      currentState.selectedInternet = internetData;
      currentState.selectedUtilities = utilitiesData;
    }
    return currentState;
  }

  render() {
    return (
      <div>
        <div className="animationDiv">
          <div className="ConciergeFlowPage">
            <div className="conciergeFlowHeading">Concierge workflow</div>

            <div>
              <ConciergeTabs
                tabName={"Summary"}
                tabId={8}
                history={this.props.history}
              />
            </div>
            <div className="component-div">
              <div>
                <div className="summary-first-card">
                  <SummaryFirstCard
                    name={this.state.name}
                    email={this.state.email}
                    timeAmountDisabled={true}
                  />
                </div>
              </div>
              <div className="componetContent">
                <div className="summary-main">
                  <div className="summary-heading">
                    <div className="summary">Final Summary </div>
                    <div></div>
                  </div>

                  {this.state.listContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-summary">
                        <div className="points-div-summary">
                          <div className="outer-point-summary">
                            <div className="inner-point-summary"></div>
                          </div>
                          <div className="vertical-line-summary"></div>
                        </div>

                        <div className="point-content-summary">{item}</div>
                      </div>
                    );
                  })}

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      <div className="point-content-summary-title">Movers</div>
                      <div className="point-content-summary-para">
                        You have selected {this.state.selectedMovers.length}{" "}
                        movers,{" "}
                        <span className="highlighted-text">
                          {this.state.selectedMovers.map((item2: any) => {
                            return item2.plan_detail.name + " , ";
                          })}
                        </span>
                        their numbers are{" "}
                        <span className="highlighted-text">
                          {this.state.selectedMovers.map((item2: any) => {
                            return item2.plan_detail.phone_no + " , ";
                          })}
                        </span>
                        respectively. For the next steps, you can expect a call
                        from the within 24-48 hours. Incase you didn’t receive a
                        call, please let us know, or you can call to their
                        number directly. Curabitur blandit tempus porttitor.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean lacinia bibendum nulla sed consectetur. Fusce
                        dapibus, tellus ac cursus commodo, tortor mauris
                        condimentum nibh, ut fermentum massa justo sit amet
                        risus.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      <div className="point-content-summary-title">
                        Insurance
                      </div>
                      <div className="point-content-summary-para">
                        You have shown interest in{" "}
                        <span className="highlighted-text">Kemper</span> for
                        insurance service, their number is{" "}
                        <span className="highlighted-text">
                          +1 777-464-5748
                        </span>
                        , you can expect a call from them within 24-48 hours.
                        Incase you didn’t receive a call, please let us know, or
                        you can call to their number directly. Curabitur blandit
                        tempus porttitor. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Aenean lacinia bibendum
                        nulla sed consectetur. Fusce dapibus, tellus ac cursus
                        commodo, tortor mauris condimentum nibh, ut fermentum
                        massa justo sit amet risus.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      <div className="point-content-summary-title">
                        Security
                      </div>
                      <div className="point-content-summary-para">
                        You have been assigned{" "}
                        <span className="highlighted-text">Josh</span> as your
                        consultant, and an apointment has been fixed on{" "}
                        <span className="highlighted-text">
                          August 8th at 10:00 am.
                        </span>{" "}
                        You may expect a call or a text from him at the same
                        time. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      <div className="point-content-summary-title">
                        Internet / Cable
                      </div>
                      <div className="point-content-summary-para">
                        You have shown interest in{" "}
                        <span className="highlighted-text">ADT</span> for
                        internet services, your confirmation number is{" "}
                        <span className="highlighted-text">#123456789</span> and
                        the installation date is on{" "}
                        <span className="highlighted-text">
                          August 8th at 10:00 am.
                        </span>{" "}
                        You may expect a call or a text from at the same time.
                        Maecenas faucibus mollis interdum.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      <div className="point-content-summary-title">
                        Utilities
                      </div>
                      <div className="point-content-summary-para">
                        The utility providers in your area for -Electricity is{" "}
                        <span className="highlighted-text">AEP Ohio</span> ,the
                        confirmation number is{" "}
                        <span className="highlighted-text">#123456789,</span>{" "}
                        and the service will start from{" "}
                        <span className="highlighted-text">
                          August 8, 2021.
                        </span>{" "}
                        -Gas is{" "}
                        <span className="highlighted-text">Columbus Gas</span>{" "}
                        of Ohio ,the confirmation number is{" "}
                        <span className="highlighted-text">#123456789,</span>{" "}
                        and the service will start from{" "}
                        <span className="highlighted-text">
                          August 8, 2021.
                        </span>{" "}
                        -Water is{" "}
                        <span className="highlighted-text">
                          City of Columbus, Department of Public Utilities
                        </span>{" "}
                        ,their contact number is{" "}
                        <span className="highlighted-text">
                          +1 777-464-5748,
                        </span>{" "}
                        and the service has to be availed by you and set up on
                        your own, unfortunately, the company is unable to help
                        with it. -Trash is{" "}
                        <span className="highlighted-text">
                          City of Columbus, Recyling Department
                        </span>{" "}
                        ,their contact number is{" "}
                        <span className="highlighted-text">
                          +1 777-464-5748,
                        </span>{" "}
                        and the service has to be availed by you and set up on
                        your own, unfortunately, the company is unable to help
                        with it. Praesent commodo cursus magna, vel scelerisque
                        nisl consectetur et. Sed posuere consectetur est at
                        lobortis. Maecenas sed diam eget risus varius blandit
                        sit amet non magna.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>
                    <div className="point-content-summary">
                      <div className="point-content-summary-title">
                        Home Pros
                      </div>
                      <div className="point-content-summary-para">
                        The services you have requested are{" "}
                        <span className="highlighted-text">
                          electrician, plumbing, wallpaper removal and interior
                          painting
                        </span>{" "}
                        Curabitur blandit tempus porttitor. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Aenean lacinia
                        bibendum nulla sed consectetur. Fusce dapibus, tellus ac
                        cursus commodo, tortor mauris condimentum nibh, ut
                        fermentum massa justo sit amet risus.
                      </div>
                    </div>
                  </div>

                  <div className="point-content-wrapper-summary">
                    <div className="points-div-summary">
                      <div className="outer-point-summary">
                        <div className="inner-point-summary"></div>
                      </div>
                      <div className="vertical-line-summary"></div>
                    </div>

                    <div className="point-content-summary">
                      We will now send you an email with all this information
                      summarised.
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="WorkflowButtons">
                <WorkflowButton
                  buttonText1={
                    // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                    "No-show"
                    // : "Back"
                  }
                  buttonText2={
                    // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                    "Start workflow"
                    // : "Next"
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
                      "/dashboard/concierge/workflow/utilitiesstep3"
                    )
                  }
                  ButtonOnClick2={() => {
                    this.props.history.push(
                      "/dashboard/concierge/workflow/homeprosstep2"
                    );
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="summarymaindiv">
          <div className="summaryTitle">Congratulations</div>
          <div className="summarySubTitle">You’ve made an order!</div>
          <div className="summaryImage">
            <img src={SummaryImage} />
          </div>
          <div className="unitsCommissionFlexDiv">
            <div className="unitsCommissionDiv">
              <div className="unitsDiv">
                <div className="unitsTitle">Units sold</div>
                <div className="unitsNumber">14</div>
              </div>
              <div className="commissionDiv">
                <div className="commissionTitle">Commission earnt</div>
                <div className="commissionNumber">
                  <div className="dollorDiv">$</div>
                  <div className="AmountDiv">139</div>
                </div>
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText2={"Finish"}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick2={() => {
                this.props.history.push(
                  "/dashboard/concierge/workflow/summaryfinal"
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
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
