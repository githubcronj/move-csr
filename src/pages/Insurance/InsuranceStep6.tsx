import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./InsuranceStep6.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import Button from "../../components/atoms/Button";
import CreateIcon from "@material-ui/icons/Create";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import { formatPhoneInput, validateEmail } from "../../utils/formValidation";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as CommonAction from "../../store/common/actions";
// import * as InsuranceAction from "../../store/insurance/actions";
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";
import OrderCompletionCard from "../../components/OrderCompletionCard/OrderCompletionCard";
import Modal from "../../components/atoms/Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

let re = /^[a-zA-Z0-9]{2,40}$/;

type initialProps = {
  history?: any;
  commonState: any;
  commonAction: any;
  // insuranceState: any;
  // insuranceAction: any;
};

type initialState = {
  closed: boolean;
  selectedCompany: any;
  date: any;
  time: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  isGetMove: boolean;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  moveId: string;
  loader: boolean;
  installationDate: any;
  orderDetails: string;
  orderError: boolean;
  installationError: boolean;
  openModal: boolean;
};

class InsuranceStep6 extends React.Component<initialProps, initialState> {
  state: initialState = {
    scriptContent: [],
    isDataArrived: true,
    hintContent: "",
    closed: false,
    isGetMove: true,
    selectedCompany: [
      {
        id: "1",
        insuranceName: "State Auto",
        monthlyCost: "9",
        yearlyCost: "100",
        currency: "$",
      },
    ],
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    objectionCompleted: true,
    moveId: "",
    loader: true,
    installationDate: "",
    orderDetails: "",
    orderError: false,
    installationError: false,
    openModal: false,
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
        firstName: this.props.commonState.move[0].user_ref.first_name,
        lastName: this.props.commonState.move[0].user_ref.last_name,
        email: this.props.commonState.move[0].user_ref.email,
        phone: this.props.commonState.move[0].user_ref.phone,
        zipCode: this.props.commonState.move[0].destination.zip_code,
      });
    } else {
      this.props.commonAction.moveGet();
    }
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedPlanData
    ) {
      this.setState({
        selectedCompany: this.props.history.location.state.selectedPlanData,
      });
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
      currentState.firstName =
        nextProps.commonState.move[0].user_ref.first_name;
      currentState.lastName = nextProps.commonState.move[0].user_ref.last_name;
      currentState.email = nextProps.commonState.move[0].user_ref.email;
      currentState.phone = nextProps.commonState.move[0].user_ref.phone;
      currentState.zipCode = nextProps.commonState.move[0].destination.zip_code;
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
        if (item.page_number === 6) {
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

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.isAppointmentPost
    // ) {
    //   nextProps.commonState.isAppointmentPost = false;
    //   nextProps.history.push("/dashboard/concierge/workflow/insurancethankyou");
    // }

    return currentState;
  }

  confirmHandler = () => {
    let payload = {
      move_id: this.state.moveId,
      type: "Insurance",
      // carrier_data: this.state.selectedCompany && this.state.selectedCompany[0],
      account_no: this.state.orderDetails,
      install_date: this.state.installationDate,
    };
    // console.log(payload);
    this.props.commonAction.appointmentPost(payload);
    this.setState({
      openModal: false,
    });
  };

  validateFields = () => {
    let validity: boolean = true;
    if (!re.test(this.state.orderDetails)) {
      this.setState({
        orderError: true,
      });
      validity = false;
    }

    if (!this.state.installationDate) {
      this.setState({
        installationError: true,
      });
      validity = false;
    }
    return validity;
  };

  orderSaveHandler = () => {
    if (this.validateFields()) {
      this.setState({
        installationError: false,
        orderError: false,
        openModal: true,
      });
    }
  };

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

  handleEditSelectedCompany = () => {
    this.props.history.push({
      pathname: "/dashboard/concierge/workflow/insurancestep5",
      state: this.props.history.location.state,
    });
  };

  handleSelect = (e: any) => {
    this.setState({ installationDate: e.target.value });
  };

  onChangeOrderDetails = (e: any) => {
    this.setState({ orderDetails: e.target.value });
  };

  handleNext = () => {
    this.props.history.push("/dashboard/concierge/workflow/insurancethankyou");
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
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
                Order Confirmation Number : #{this.state.orderDetails}
              </div>
              <div className="order-confirmation-number">
                Installation date : {this.state.installationDate}
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

        <div>
          <ConciergeTabs
            tabName={"Insurance"}
            tabId={3}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="insurance6-main">
              <div className="insurance6-heading">
                <div className="insurance6">Insurance </div>
                <div>
                  <div className="titleNumberInsurance">
                    <div className="left-number">6</div>
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
                      <div className="point-content-wrapper-insurance6-script">
                        <div className="points-div-insurance6">
                          <div className="outer-point-insurance6">
                            <div className="inner-point-insurance6"></div>
                          </div>
                          <div className="vertical-line-insurance6"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-insurance6"
                        ></div>
                      </div>
                    );
                  })}
                </div>
              }

              <div className="point-content-wrapper-insurance6">
                <div className="points-div-insurance6">
                  <div className="outer-point-insurance6">
                    <div className="inner-point-insurance6"></div>
                  </div>
                  <div className="vertical-line-insurance6"></div>
                </div>

                <div className="point-content-insurance6">
                  Selected insurance company
                  <div className="selectedCompanyDiv">
                    {this.state.selectedCompany.map((item: any) => {
                      return (
                        <div className="companyDiv">
                          <div className="companyName">{item.carrier_name}</div>
                        </div>
                      );
                    })}
                    <div className="editSelectionButtonDiv">
                      <Button
                        className="editSelectionButton"
                        startLogo={<CreateIcon />}
                        backgroundColor="#ffffff"
                        color="#333333"
                        onClick={this.handleEditSelectedCompany}
                      >
                        Edit Selection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="point-content-wrapper-insurance6">
                <div className="points-div-insurance6">
                  <div className="outer-point-insurance6">
                    <div className="inner-point-insurance6"></div>
                  </div>
                  <div className="vertical-line-insurance6"></div>
                </div>

                <div className="point-content-insurance6">
                  Schedule call back
                  <div className="formDiv">
                    <div className="InputsDiv">
                      <div className="inputFlexDiv">
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Call schedule detail
                          </div>
                          <CustomizedInput
                            onChange={(e: any) => this.handleChange(e, "date")}
                            label="Select Date"
                            value={this.state.date}
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                        <div className="inputDiv">
                          <CustomizedInput
                            onChange={(e: any) => this.handleChange(e, "time")}
                            // onChange={(e:any)=> console.log(e.target.value)}
                            label="Select Time"
                            value={this.state.time}
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="InputsDiv">
                      <div className="inputFlexDiv">
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Personal Details
                          </div>
                          <CustomizedInput
                            onChange={(e: any) =>
                              this.handleChange(e, "firstName")
                            }
                            label="Enter First Name"
                            value={this.state.firstName}
                          />
                        </div>
                        <div className="inputDiv">
                          <CustomizedInput
                            onChange={(e: any) =>
                              this.handleChange(e, "lastName")
                            }
                            label="Enter Last Name"
                            value={this.state.lastName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="InputsDiv">
                      <div className="inputFlexDiv">
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Phone Number
                          </div>
                          <CustomizedInput
                            onChange={(e: any) => this.handleChange(e, "phone")}
                            label="Enter Phone Number"
                            value={this.state.phone}
                          />
                        </div>
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Email
                          </div>
                          <CustomizedInput
                            onChange={(e: any) => this.handleChange(e, "email")}
                            label="Enter Email"
                            value={this.state.email}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="InputsDiv">
                      <div className="inputFlexDiv">
                        <div className="inputDiv">
                          <div className="title" style={{ color: "#333333" }}>
                            Zip Code
                          </div>
                          <CustomizedInput
                            onChange={(e: any) =>
                              this.handleChange(e, "zipCode")
                            }
                            label="Enter Zip Code"
                            value={this.state.zipCode}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="submitButtonDiv">
                      <Button
                        className="submitButton"
                        // startLogo={<CreateIcon />}
                        backgroundColor="#465B74"
                        color="#ffffff"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="point-content-wrapper-insurance6">
                <div className="points-div-insurance6">
                  <div className="outer-point-insurance6">
                    <div className="inner-point-insurance6"></div>
                  </div>
                  <div className="vertical-line-insurance6"></div>
                </div>

                <div className="point-content-insurance6">
                  Order completion details
                  <div className="step6FormDiv">
                    <OrderCompletionCard
                      OrderSaveHandler={() => this.orderSaveHandler()}
                      handleSelect={this.handleSelect}
                      installationDate={this.state.installationDate}
                      orderDetails={this.state.orderDetails}
                      onChangeOrderDetails={this.onChangeOrderDetails}
                      orderError={this.state.orderError}
                      installationError={this.state.installationError}
                    />
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
                this.props.history.push(
                  "/dashboard/concierge/workflow/insurancestep5"
                )
              }
              ButtonOnClick2={this.handleNext}
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
    // insuranceAction: bindActionCreators(InsuranceAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  // insuranceState: state.insurance,
});

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceStep6);
