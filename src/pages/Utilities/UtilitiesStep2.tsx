import React from "react";
import "./utilitiesStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Gas from "../../Assets/images/Utilities/Utilites-Gas.svg";
import Electricity from "../../Assets/images/Utilities/Utilites-Electricity.svg";
import Water from "../../Assets/images/Utilities/Utilites-Water.svg";
import Trash from "../../Assets/images/Utilities/Utilites-Trash.svg";
import UtilitiesFirstCard from "../../components/Utilities/UtilitiesFirstCard";
import * as Action from "../../store/utility/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action2 from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import Modal from "../../components/atoms/Modal";
import CustomizedInput from "../../components/atoms/CustomizedInput";

type initialProps = {
  history?: any;
  UtilityAction?: any;
  UtilityState?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  sourceZip: string;
  city: string;
  state: any;
  zipcode: string;
  street: string;
  address: string;
  id: string;
  moveId: string;
  isDataArrived: boolean;
  isDataArrived2: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  electricitySelected: boolean;
  waterSelected: boolean;
  gasSelected: boolean;
  trashSelected: boolean;
  utility_id: string;
  provider_type: string;
  title: string;
  subTitle: string;
  icon: any;
  phone: string;
  loader: boolean;
  electricityCompleted: boolean;
  gasCompleted: boolean;
  electricityAsEmailReason: string;
  gasAsEmailReason: string;
  showModal: boolean;
};

class UtilitiesStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [
      {
        icon: Electricity,
        title: "ELECTRICITY",
        subTitle: "AEP Ohio",
      },
      {
        icon: Water,
        title: "WATER",
        subTitle: "City of Columbus, Department of Public Utilities",
      },
      {
        icon: Gas,
        title: "GAS",
        subTitle: "Columbia Gas of Ohio",
      },
      {
        icon: Trash,
        title: "TRASH",
        subTitle: "City Of Columbus,Recycling Department",
      },
    ],
    closed: false,
    sourceZip: "",
    city: "",
    state: "",
    zipcode: "",
    street: "",
    address: "",
    id: "",
    moveId: "",
    isDataArrived: true,
    isDataArrived2: true,
    scriptContent: [],
    hintContent: "",
    objectionCompleted: true,
    electricitySelected: false,
    waterSelected: true,
    gasSelected: false,
    trashSelected: true,
    utility_id: "",
    provider_type: "",
    title: "",
    subTitle: "",
    icon: null,
    phone: "",
    loader: true,
    gasCompleted: true,
    electricityCompleted: true,
    electricityAsEmailReason: "",
    gasAsEmailReason: "",
    showModal: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.props.commonAction.moveGet();

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "utilities",
      page: 1,
    });

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      const data =
        this.props.commonState &&
        this.props.commonState.move &&
        this.props.commonState.move.length > 0 &&
        this.props.commonState.move[0];
      const dest: any = data && data.destination;
      const source: any = data && data.source;
      this.setState({
        sourceZip: source && source.zip_code,
        city: dest && dest.city_name,
        state: {
          name: dest && dest.state_code ? dest.state_code : "",
          label: dest && dest.state_code ? dest.state_code : "",
        },
        zipcode: dest && dest.zip_code ? dest.zip_code : "",
        street: data && data.destination_street ? data.destination_street : "",
        address:
          data && data.destination_full_address ? data.destination_street : "",
        moveId: data && data.id ? data.id : "",
        id: dest && dest.id ? dest.id : "",
      });

      const payload = {
        source_zip: source && source.zip_code ? source.zip_code : "",
        dest_zip: dest && dest.zip_code ? dest.zip_code : "",
      };
      this.props.UtilityAction.getUtility(payload);
    }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.commonState.move !== this.props.commonState.move &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      const data =
        this.props.commonState &&
        this.props.commonState.move &&
        this.props.commonState.move.length > 0 &&
        this.props.commonState.move[0];
      const dest: any = data && data.destination;
      const source: any = data && data.source;
      this.setState({
        sourceZip: source && source.zip_code,
        city: dest && dest.city_name,
        state: {
          name: dest && dest.state_code ? dest.state_code : "",
          label: dest && dest.state_code ? dest.state_code : "",
        },
        zipcode: dest && dest.zip_code ? dest.zip_code : "",
        street: data && data.destination_street ? data.destination_street : "",
        address:
          data && data.destination_full_address ? data.destination_street : "",
        moveId: data && data.id ? data.id : "",
        id: dest && dest.id ? dest.id : "",
      });

      const payload = {
        source_zip: source && source.zip_code ? source.zip_code : "",
        dest_zip: dest && dest.zip_code ? dest.zip_code : "",
      };
      this.props.UtilityAction.getUtility(payload);
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // if (
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move.length > 0 &&
    //   nextProps.commonState.move[0] &&
    //   isDataArrived
    // ) {
    //   currentState.isDataArrived = false;
    //   const data =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move.length > 0 &&
    //     nextProps.commonState.move[0];
    //   const dest: any = data && data.destination;
    //   const source: any = data && data.source;

    //   currentState.sourceZip = source && source.zip_code;
    //   currentState.city = dest && dest.city_name;
    //   currentState.state = {
    //     name: dest && dest.state_code ? dest.state_code : "",
    //     label: dest && dest.state_code ? dest.state_code : "",
    //   };
    //   currentState.zipcode = dest && dest.zip_code ? dest.zip_code : "";
    //   currentState.street =
    //     data && data.destination_street ? data.destination_street : "";
    //   currentState.address =
    //     data && data.destination_full_address ? data.destination_street : "";
    //   currentState.moveId = data && data.id ? data.id : "";
    //   currentState.id = dest && dest.id ? dest.id : "";

    //   const payload = {
    //     source_zip: source && source.zip_code ? source.zip_code : "",
    //     dest_zip: dest && dest.zip_code ? dest.zip_code : "",
    //   };
    //   nextProps.UtilityAction.getUtility(payload);
    // }

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
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.appointmentPost.orders &&
      nextProps.commonState.isAppointmentPost
    ) {
      nextProps.commonState.isAppointmentPost = false;
      // const payload = {
      //   service: "Utilities",
      //   moveId: currentState.moveId,
      // };
      // nextProps.commonAction.orderGet(payload);
      let orderData: any = [];
      nextProps.commonState.appointmentPost.orders.map((item: any) => {
        orderData.push(item);
      });
      // currentState.orderData = orderData;
      // currentState.showModal = true;
      nextProps.history.push("/dashboard/concierge/workflow/utilitiesthankyou");
    } else if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.error !== null
    ) {
      window.alert(`${nextProps.commonState.error}`);
      nextProps.commonState.error = null;
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  onSelect = (
    name: string,
    id: string,
    icon: string,
    title: string,
    subTitle: string,
    phone: string,
    zipcode: string
  ) => {
    if (name === "Electricity") {
      this.setState({
        utility_id: id,
        provider_type: name,
        electricitySelected: !this.state.electricitySelected,
        electricityCompleted: false,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Water") {
      this.setState({
        utility_id: id,
        provider_type: name,
        waterSelected: !this.state.waterSelected,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Gas") {
      this.setState({
        utility_id: id,
        provider_type: name,
        gasSelected: !this.state.gasSelected,
        gasCompleted: false,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Trash") {
      this.setState({
        utility_id: id,
        provider_type: name,
        title: title,
        subTitle: subTitle,
        icon: icon,
        trashSelected: !this.state.trashSelected,
        phone: phone,
        zipcode: zipcode,
      });
    }
  };

  onComplete = (
    name: string,
    id: string,
    icon: string,
    title: string,
    subTitle: string,
    phone: string,
    zipcode: string
  ) => {
    if (name === "Electricity") {
      this.setState({
        utility_id: id,
        provider_type: name,
        electricitySelected: false,
        electricityCompleted: !this.state.electricityCompleted,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Water") {
      this.setState({
        utility_id: id,
        provider_type: name,
        waterSelected: this.state.waterSelected,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Gas") {
      this.setState({
        utility_id: id,
        provider_type: name,
        gasSelected: false,
        gasCompleted: !this.state.gasCompleted,
        title: title,
        subTitle: subTitle,
        icon: icon,
        phone: phone,
        zipcode: zipcode,
      });
    } else if (name === "Trash") {
      this.setState({
        utility_id: id,
        provider_type: name,
        title: title,
        subTitle: subTitle,
        icon: icon,
        trashSelected: this.state.trashSelected,
        phone: phone,
        zipcode: zipcode,
      });
    }
  };

  onSaveReason = (utility: any) => {
    this.setState({
      showModal: false,
    });
    if (
      this.state.electricitySelected &&
      this.state.gasSelected &&
      this.state.waterSelected &&
      this.state.trashSelected
    ) {
      // this.props.history.push({
      //   pathname:
      //     "/dashboard/concierge/workflow/utilitiesthankyou",
      //   state: {
      //     moveId: this.state.moveId,
      //     selectedUtilities: utility,
      //   },
      // });
      let zipcode: any = "";
      let providerType: any = [];
      utility.map((item: any) => {
        providerType.push(item.provider_type);
        zipcode = item.zipcode;
      });
      let payload = {
        move_id: this.state.moveId,
        type: "Utilities",
        is_in_mail: true,
        data: {
          zipcode: zipcode,
          provider_types: providerType,
        },
      };
      this.props.commonAction.appointmentPost(payload);
      // this.props.history.push(
      //   "/dashboard/concierge/workflow/utilitiesthankyou"
      // );
    }
  };

  render() {
    let moveData =
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move.length > 0 &&
      this.props.commonState.move[0];
    let object: any = {};
    if (
      this.props.UtilityState &&
      this.props.UtilityState.utility &&
      this.props.UtilityState.utility.destination &&
      this.props.UtilityState.utility.source &&
      this.props.UtilityState.utility.destination.length > 0 &&
      this.props.UtilityState.utility.source.length > 0
    ) {
      object = this.props.UtilityState.utility.destination.find((item: any) => {
        return item.city.id === this.state.id;
      });
    }

    let utility = [
      {
        utility_id: object && object.city && object.city.id,
        provider_type: "Electricity",
        icon: Electricity,
        title: "ELECTRICITY",
        subTitle: object && object.electricity_provider_name,
        phone: object && object.electricity_provider_phone,
        selected: this.state.electricitySelected,
        completed: this.state.electricityCompleted,
        zipcode: object && object.zipcode,
        url: object && object.electricity_provider_website,
      },
      {
        utility_id: object && object.city && object.city.id,
        provider_type: "Gas",
        icon: Gas,
        title: "GAS",
        subTitle: object && object.gas_provider_name,
        phone: object && object.gas_provider_phone,
        selected: this.state.gasSelected,
        completed: this.state.gasCompleted,
        zipcode: object && object.zipcode,
        url: object && object.gas_provider_website,
      },
      {
        utility_id: object && object.city && object.city.id,
        provider_type: "Water",
        icon: Water,
        title: "WATER",
        subTitle: object && object.water_provider_name,
        phone: object && object.water_provider_phone,
        selected: this.state.waterSelected,
        zipcode: object && object.zipcode,
        url: object && object.water_provider_website,
      },
      {
        utility_id: object && object.city && object.city.id,
        provider_type: "Trash",
        icon: Trash,
        title: "TRASH",
        subTitle: object && object.trash_provider_name,
        phone: object && object.trash_provider_phone,
        selected: this.state.trashSelected,
        zipcode: object && object.zipcode,
        url: object && object.trash_provider_website,
      },
    ];

    // console.log("object", object);
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        {this.state.showModal ? (
          <Modal
            isShowModal={this.state.showModal}
            onCloseModal={() => this.setState({ showModal: false })}
            showClose={false}
            className="OpenModal"
          >
            <div className="utilititesModalMainDiv">
              {this.state.electricitySelected ? (
                <div className="inputDiv">
                  <div className="title" style={{ color: "#333333" }}>
                    Why you are selecting email option for electiricity?
                  </div>
                  <CustomizedInput
                    onChange={(e: any) =>
                      this.setState({
                        electricityAsEmailReason: e.target.value,
                      })
                    }
                    label="Enter reason"
                    value={this.state.electricityAsEmailReason}
                    className="CustomInput"
                  />
                </div>
              ) : null}
              {this.state.gasSelected ? (
                <div className="inputDiv">
                  <div className="title" style={{ color: "#333333" }}>
                    Why you are selecting email option for gas?
                  </div>
                  <CustomizedInput
                    onChange={(e: any) =>
                      this.setState({ gasAsEmailReason: e.target.value })
                    }
                    label="Enter reason"
                    value={this.state.gasAsEmailReason}
                    className="CustomInput"
                  />
                </div>
              ) : null}
              <div className="buttonDiv">
                <Button
                  className="buttonSave"
                  onClick={() => {
                    this.onSaveReason(utility);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        <div>
          <ConciergeTabs
            tabName={"Utilities"}
            tabId={6}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="utilities-2-main">
              <div className="utilities-2-heading">
                <div className="utilities-2">Utilities </div>
                <div>
                  <div className="titleNumberUtilities">
                    <div className="left-number">1</div>
                    <div className="right-number">2</div>
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
                <div className="helpful-div-utilities">
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
                        <div className="point-content-wrapper-utilities2-script">
                          <div className="points-div-utilities2">
                            <div className="outer-point-utilities2">
                              <div className="inner-point-utilities2"></div>
                            </div>
                            <div className="vertical-line-utilities2"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-utilities2"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }

              <div className="point-content-wrapper-utilities2">
                <div className="points-div-utilities2">
                  <div className="outer-point-utilities2">
                    <div className="inner-point-utilities2"></div>
                  </div>
                  <div className="vertical-line-utilities2"></div>
                </div>

                <div className="point-content-utilities2">
                  As our energy partner, they have exclusive prices and special
                  programs for your new home for both electricity and natural
                  gas.
                  <div>
                    {object && Object.keys(object).length > 0 ? (
                      <div className="utilitiesStep2FlexDiv">
                        {console.log(object)}
                        <div className="first-card">
                          <UtilitiesFirstCard
                            icon={<img src={Electricity} />}
                            title={`ELECTRICITY`}
                            subTitle={
                              object && object.electricity_provider_name
                                ? object.electricity_provider_name
                                : "null"
                            }
                            phone={
                              object && object.electricity_provider_phone
                                ? object.electricity_provider_phone
                                : "null"
                            }
                            onSelectCilck={() =>
                              this.onSelect(
                                "Electricity",
                                object.city.id,
                                Electricity,
                                "ELECTRICITY",
                                object && object.electricity_provider_name
                                  ? object.electricity_provider_name
                                  : "null",
                                object && object.electricity_provider_phone
                                  ? object.electricity_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                            selectedToEmail={this.state.electricitySelected}
                            selectedToComplete={this.state.electricityCompleted}
                            onCompleteClick={() =>
                              this.onComplete(
                                "Electricity",
                                object.city.id,
                                Electricity,
                                "ELECTRICITY",
                                object && object.electricity_provider_name
                                  ? object.electricity_provider_name
                                  : "null",
                                object && object.electricity_provider_phone
                                  ? object.electricity_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                          />
                        </div>

                        <div className="first-card">
                          <UtilitiesFirstCard
                            icon={<img src={Gas} />}
                            title={`GAS`}
                            subTitle={
                              object && object.gas_provider_name
                                ? object.gas_provider_name
                                : "null"
                            }
                            phone={
                              object && object.gas_provider_phone
                                ? object.gas_provider_phone
                                : "null"
                            }
                            onSelectCilck={() =>
                              this.onSelect(
                                "Gas",
                                object.city.id,
                                Gas,
                                "GAS",
                                object && object.gas_provider_name
                                  ? object.gas_provider_name
                                  : "null",
                                object && object.gas_provider_phone
                                  ? object.gas_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                            selectedToEmail={this.state.gasSelected}
                            selectedToComplete={this.state.gasCompleted}
                            onCompleteClick={() =>
                              this.onComplete(
                                "Gas",
                                object.city.id,
                                Gas,
                                "GAS",
                                object && object.gas_provider_name
                                  ? object.gas_provider_name
                                  : "null",
                                object && object.gas_provider_phone
                                  ? object.gas_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                          />
                        </div>
                        <div className="first-card">
                          <UtilitiesFirstCard
                            icon={<img src={Water} />}
                            title={`WATER`}
                            subTitle={
                              object && object.water_provider_name
                                ? object.water_provider_name
                                : "null"
                            }
                            phone={
                              object && object.water_provider_phone
                                ? object.water_provider_phone
                                : "null"
                            }
                            onSelectCilck={() =>
                              this.onSelect(
                                "Water",
                                object.city.id,
                                Water,
                                "WATER",
                                object && object.water_provider_name
                                  ? object.water_provider_name
                                  : "null",
                                object && object.water_provider_phone
                                  ? object.water_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                            selectedToEmail={this.state.waterSelected}
                          />
                        </div>
                        <div className="first-card">
                          <UtilitiesFirstCard
                            icon={<img src={Trash} />}
                            title={`TRASH`}
                            subTitle={
                              object && object.trash_provider_name
                                ? object.trash_provider_name
                                : "null"
                            }
                            phone={
                              object && object.trash_provider_phone
                                ? object.trash_provider_phone
                                : "null"
                            }
                            onSelectCilck={() =>
                              this.onSelect(
                                "Trash",
                                object.city.id,
                                Trash,
                                "TRASH",
                                object && object.trash_provider_name
                                  ? object.trash_provider_name
                                  : "null",
                                object && object.trash_provider_phone
                                  ? object.trash_provider_phone
                                  : "null",
                                object.zipcode
                              )
                            }
                            selectedToEmail={this.state.trashSelected}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* <div className="notInterestedButtonDivUtilities">
                <Button
                  className="notInterestedButton"
                  onClick={() => {
                    this.props.history.push({
                      pathname:
                        "/dashboard/concierge/workflow/UtilitiesThankYou",
                      state: {
                        notInterested: true,
                      },
                    });
                  }}
                >
                  Not Interested
                </Button>
              </div> */}
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
                  "/dashboard/concierge/workflow/internetthankyou"
                )
              }
              ButtonOnClick2={() => {
                if (
                  (this.state.electricitySelected &&
                    this.state.electricityAsEmailReason === "") ||
                  (this.state.gasSelected && this.state.gasAsEmailReason === "")
                ) {
                  this.setState({ showModal: true });
                } else {
                  if (
                    this.state.electricitySelected &&
                    this.state.gasSelected &&
                    this.state.waterSelected &&
                    this.state.trashSelected
                  ) {
                    // this.props.history.push({
                    //   pathname:
                    //     "/dashboard/concierge/workflow/utilitiesthankyou",
                    //   state: {
                    //     moveId: this.state.moveId,
                    //     selectedUtilities: utility,
                    //   },
                    // });
                    let zipcode: any = "";
                    let providerType: any = [];
                    utility.map((item: any) => {
                      providerType.push(item.provider_type);
                      zipcode = item.zipcode;
                    });
                    let payload = {
                      move_id: this.state.moveId,
                      type: "Utilities",
                      is_in_mail: true,
                      data: {
                        zipcode: zipcode,
                        provider_types: providerType,
                      },
                    };
                    this.props.commonAction.appointmentPost(payload);
                    // this.props.history.push(
                    //   "/dashboard/concierge/workflow/utilitiesthankyou"
                    // );
                  } else {
                    this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/utilitiesstep3",
                      state: {
                        moveId: this.state.moveId,
                        selectedUtility: utility,
                      },
                    });
                  }
                }
              }}
              button2Disabled={
                (this.state.electricitySelected ||
                  this.state.electricityCompleted) &&
                (this.state.gasSelected || this.state.gasCompleted) &&
                this.state.waterSelected &&
                this.state.trashSelected
                  ? false
                  : true
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
    UtilityAction: bindActionCreators(Action, dispatch),
    commonAction: bindActionCreators(Action2, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  UtilityState: state.utility,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesStep2);
