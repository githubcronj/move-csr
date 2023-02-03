import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./InsuranceStep4.scss";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";
import MoversInputs from "../../components/Movers/Inputs/MoverInputs";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as CommonAction from "../../store/common/actions";
import * as InsuranceAction from "../../store/insurance/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  history?: any;
  commonState: any;
  commonAction: any;
  insuranceState: any;
  insuranceAction: any;
};

type initialState = {
  moveId: string;
  birthdate: any;
  gender: any;
  maritalStatus: any;
  genderOption: any;
  maritalOption: any;
  closed: boolean;
  isGetMove: boolean;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  continueClick: boolean;
};

class InsuranceStep4 extends React.Component<initialProps, initialState> {
  state: initialState = {
    scriptContent: [],
    isDataArrived: true,
    hintContent: "",
    moveId: "",
    birthdate: "",
    gender: "",
    maritalStatus: "",
    genderOption: [
      { value: "", label: "" },
      { value: "Female", label: "Female" },
      { value: "Male", label: "Male" },
      { value: "Other", label: "Other" },
    ],
    maritalOption: [
      { value: "", label: "" },
      { value: "Single", label: "Single" },
      { value: "Married", label: "Married" },
      { value: "Domestic Partner", label: "Domestic Partner" },
      { value: "Divorced", label: "Divorced" },
      { value: "Separated", label: "Separated" },
      { value: "Widowed", label: "Widowed" },
    ],
    closed: false,
    isGetMove: true,
    objectionCompleted: true,
    loader: true,
    continueClick: false,
  };

  componentDidMount() {
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        birthdate:
          this.props.commonState.move[0].insurance_detail.date_of_birth,
        gender: this.props.commonState.move[0].insurance_detail.gender,
        maritalStatus:
          this.props.commonState.move[0].insurance_detail.marital_status,
      });
    } else {
      this.props.commonAction.moveGet();
    }

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "insurance",
    });
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.move[0] &&
      (nextProps.commonState.isGetMove || currentState.isGetMove)
    ) {
      nextProps.commonState.isGetMove = false;
      currentState.isGetMove = false;
      currentState.moveId = nextProps.commonState.move[0].id;
      currentState.birthdate =
        nextProps.commonState.move[0].insurance_detail.date_of_birth;
      currentState.gender =
        nextProps.commonState.move[0].insurance_detail.gender;
      currentState.maritalStatus =
        nextProps.commonState.move[0].insurance_detail.marital_status;
    }

    if (
      nextProps &&
      nextProps.insuranceState &&
      nextProps.insuranceState.isUpdatePersonal
    ) {
      nextProps.insuranceState.isUpdatePersonal = false;
      nextProps.commonAction.moveGet();
      nextProps.history.push("/dashboard/concierge/workflow/insurancestep5");
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

    return currentState;
  }

  handleChange = (e: any, name: string) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };
  handleSelect = (e: any, name: string) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };
  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  backButtonHandler = () => {
    this.props.history.push("/dashboard/concierge/workflow/insurancestep3");
  };

  nextButtonHandler = () => {
    this.setState({ continueClick: true });
    const { birthdate, gender, maritalStatus } = this.state;
    if (birthdate && gender && maritalStatus && this.state.moveId) {
      const payload = {
        gender: gender,
        marital_status: maritalStatus,
        occupation: null,
        career_status: null,
        is_secondary_holder_exist: false,
        secondary_holder_first_name: null,
        secondary_holder_last_name: null,
        spouse_gender: null,
        accepted_terms: true,
        date_of_birth: new Date(birthdate).toISOString().split("T")[0],
      };
      this.props.insuranceAction.updatePersonal({
        move_id: this.state.moveId,
        payload,
      });
    }
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
            <div className="insurance4-main">
              <div className="insurance4-heading">
                <div className="insurance4">Insurance </div>
                <div>
                  <div className="titleNumberInsurance">
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
                      <div className="point-content-wrapper-insurance4-script">
                        <div className="points-div-insurance4">
                          <div className="outer-point-insurance4">
                            <div className="inner-point-insurance4"></div>
                          </div>
                          <div className="vertical-line-insurance4"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-insurance4"
                        ></div>
                      </div>
                    );
                  })}
                </div>
              }
              <div className="point-content-wrapper-insurance4">
                <div className="points-div-insurance4">
                  <div className="outer-point-insurance4">
                    <div className="inner-point-insurance4"></div>
                  </div>
                  <div className="vertical-line-insurance4"></div>
                </div>

                <div className="point-content-insurance4">
                  Confirm your home specifications?
                </div>
              </div>
              <div className="InputflexDiv">
                <div className="leftDiv">
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance4">
                        <div className="points-div-insurance4">
                          <div className="outer-point-insurance4">
                            <div className="inner-point-insurance4"></div>
                          </div>
                          <div className="vertical-line-insurance4"></div>
                        </div>

                        <div className="point-content-insurance4">
                          <MoversInputs
                            title="Birthdate"
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleSelect(e, "birthdate")
                                }
                                label="BIRTHDATE"
                                value={this.state.birthdate}
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={
                                  !this.state.birthdate &&
                                  this.state.continueClick
                                }
                              />
                            }
                          />
                          <div className="error">
                            {!this.state.birthdate &&
                              this.state.continueClick &&
                              "Please select birthdate."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance4">
                        <div className="points-div-insurance4">
                          <div className="outer-point-insurance4">
                            <div className="inner-point-insurance4"></div>
                          </div>
                          <div className="vertical-line-insurance4"></div>
                        </div>

                        <div className="point-content-insurance4">
                          <MoversInputs
                            title="Marital status"
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "maritalStatus")
                                }
                                label="SELECT MARITAL STATUS"
                                value={this.state.maritalStatus}
                                options={this.state.maritalOption}
                                error={
                                  !this.state.maritalStatus &&
                                  this.state.continueClick
                                }
                              />
                            }
                          />
                          <div className="error">
                            {!this.state.maritalStatus &&
                              this.state.continueClick &&
                              "Please select marital status."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightDiv">
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance4">
                        <div className="points-div-insurance4">
                          <div className="outer-point-insurance4">
                            <div className="inner-point-insurance4"></div>
                          </div>
                          <div className="vertical-line-insurance4"></div>
                        </div>
                        <div className="point-content-insurance4">
                          <MoversInputs
                            title="Gender"
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "gender")
                                }
                                label="SELECT GENDER"
                                value={this.state.gender}
                                options={this.state.genderOption}
                                error={
                                  !this.state.gender && this.state.continueClick
                                }
                              />
                            }
                          />
                          <div className="error">
                            {!this.state.gender &&
                              this.state.continueClick &&
                              "Please select gender"}
                          </div>
                        </div>
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
    commonAction: bindActionCreators(CommonAction, dispatch),
    insuranceAction: bindActionCreators(InsuranceAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  insuranceState: state.insurance,
});

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceStep4);
