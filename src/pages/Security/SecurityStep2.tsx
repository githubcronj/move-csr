import React from "react";
import "./securityStep1.scss";
import "./securityStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import SecurityUpdatedCard from "../../components/Security/SecurityUpdatedCard";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import adt from "../../Assets/images/Security/adt.png";
import Vivint from "../../Assets/images/Security/vivint.png";
import Simplisafe from "../../Assets/images/Security/simpliSafe.png";
import alder from "../../Assets/images/Security/alder.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiltersSecurity from "../../components/Security/FiltersSecurity";
import * as Action from "../../store/common/actions";
import * as MoversAction from "../../store/move/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import Modal from "../../components/atoms/Modal";
import TableComponent from "../../components/atoms/Table/Table";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
  moversAction: any;
  moversState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  Providers: any;
  Installations: any;
  filtersOpen: boolean;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  openModal: boolean;
  data: any;
  moveId: string;
  internetData: any;
  notInterested: boolean;
};

class SecurityStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    hintContent: "",
    listContent: [
      {
        id: "1",
        title: "ADT",
        logo: adt,
        planType: "Remote",
        price: "29",
        isSelected: false,
      },
      {
        id: "2",
        title: "Vivint",
        logo: Vivint,
        planType: "Remote",
        price: "47",
        isSelected: false,
      },
      {
        id: "3",
        title: "Alder",
        logo: alder,
        planType: "Remote",
        price: "59",
        isSelected: false,
      },
      {
        id: "4",
        title: "Simplisafe",
        logo: Simplisafe,
        planType: "Remote",
        price: "99",
        isSelected: false,
      },
    ],
    closed: false,
    Providers: [
      { name: "ADT", value: false, count: 4 },
      { name: "Vivint", value: false, count: 4 },
      { name: "Simplisafe", value: false, count: 4 },
      { name: "Alder", value: false, count: 4 },
    ],

    Installations: [
      { name: "Professional", value: false, count: 1 },
      { name: "DIY", value: false, count: 2 },
      { name: "Professional & DIY", value: false, count: 2 },
    ],

    filtersOpen: false,
    scriptContent: [],
    objectionCompleted: true,
    loader: true,
    openModal: false,
    data: [],
    moveId: "",
    internetData: [],
    notInterested: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "home-security",
      page: 2,
    });
    if (
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move.length > 0 &&
      this.props.commonState.move[0]
    ) {
      const data =
        this.props.commonState &&
        this.props.commonState.move &&
        this.props.commonState.move.length > 0 &&
        this.props.commonState.move[0];
      const dest: any = data && data.destination;
      this.setState({
        moveId: data.id,
      });
      const payload = {
        // service: "Home Security",
        service: "",
        moveId: data.id,
      };
      this.props.commonAction.orderGet(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.getSkipService
    ) {
      this.props.commonState.getSkipService.map((item: any) => {
        if (
          item.service_name === "Home Security" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({ moveId: cur.move[0].id });
      const payload = {
        // service: "Home Security",
        service: "",
        moveId: cur.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
    }
    if (prev.getSkipService !== cur.getSkipService && cur.getSkipService) {
      cur.getSkipService.map((item: any) => {
        if (
          item.service_name === "Home Security" &&
          item.reason_type === "Not Interested"
        ) {
          this.setState({ notInterested: true });
        }
      });
    }

    const prevMover = prevProps && prevProps.moversState;
    const curMover = this.props && this.props.moversState;
    if (
      prevMover.cancelEntireMoverOrder !== curMover.cancelEntireMoverOrder &&
      curMover.cancelEntireMoverOrder !== null
    ) {
      const payload1 = {
        service: "",
        moveId: this.state.moveId,
      };
      this.props.commonAction.orderGet(payload1);

      this.setState({ openModal: false });
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
      nextProps.commonState.order &&
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let orderData: any = [];
      let internetData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (item.service === "Home Security") orderData.push(item);
        if (item.service === "Internet/Cable" || item.service === "TV") {
          internetData.push(item);
        }
      });
      currentState.data = orderData;
      currentState.internetData = internetData;
      currentState.loader = false;

      // if(!orderData.length){
      //   if(!( nextProps && nextProps.history &&
      //     nextProps.history.location &&
      //     nextProps.history.location.state &&
      //     nextProps.history.location.state.notInterested)){
      //   nextProps.history.push('/dashboard/concierge/workflow/securitystep1')
      //     }
      // }
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  changeProviders = (val: any) => {
    this.setState({
      Providers: val,
    });
  };

  changeInstallations = (val: any) => {
    this.setState({
      Installations: val,
    });
  };

  clearAll = () => {
    let providers = this.state.Providers.map((item: any) => {
      if (item.value) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });

    let installations = this.state.Installations.map((item: any) => {
      if (item.value) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });

    this.setState({
      Providers: providers,
      Installations: installations,
    });
  };

  onSelectHandler = (selectedItem: any) => {
    // console.log();
    let items = this.state.listContent;
    items.map((item: any) => {
      if (selectedItem.id === item.id && !item.isSelected) {
        item.isSelected = true;
      }
      // if (selectedItem.id === item.id && item.isSelected)
      else {
        item.isSelected = false;
      }
    });
    this.setState({ listContent: items });
  };

  formatAMPM = (date: any) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  // getFormattedDate = (date: any) => {
  //   var year = date.getFullYear();

  //   var month = (1 + date.getMonth()).toString();
  //   month = month.length > 1 ? month : "0" + month;

  //   var day = date.getDate().toString();
  //   day = day.length > 1 ? day : "0" + day;

  //   return month + "/" + day + "/" + year.toString().substring(2, 4);
  // };

  cancelOrderHandler = () => {
    let orders: any = [];
    this.state.data.map((item: any) => {
      orders.push(item.id);
      return orders;
    });

    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  columns = [
    // {
    //   title: "Action",
    //   // field: "product_type",
    //   sorting: false,
    // },
    {
      title: "Scheduled date",
      field: "appointment_date",
      sorting: false,
      // render: (row: any) => {
      //   console.log(row);
      //   return <div>{row.plan_detail && row.plan_detail.name}</div>;
      // },
    },
    {
      title: "Scheduled time",
      field: "appointment_time",
      sorting: false,
      // render: (row: any) => {
      //   return <div>{row.plan_detail && row.plan_detail.phone_no}</div>;
      // },
    },
    {
      title: "Order no.",
      field: "order_id",
      sorting: false,
    },
  ];

  render() {
    let data: any = [];
    let noDataMessage: string = "";
    if (
      (this.props &&
        this.props.history &&
        this.props.history.location &&
        this.props.history.location.state &&
        this.props.history.location.state.notInterested) ||
      (this.state.notInterested && this.state.data.length === 0)
    ) {
      data = [];
      noDataMessage = "Not Interested";
    } else if (this.state.data.length != 0) {
      data = this.state.data;
      noDataMessage = "No records to display";
    } else {
      data = [];
      noDataMessage = "No records to display";
    }
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
              <div className="OpenModal-job">Cancellation confirmation!</div>
              <div className="order-confirmation-number">
                Do you really want to cancel the order made for this customer?
              </div>

              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() => this.setState({ openModal: false })}
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Go Back
                </Button>
                <Button
                  className="Button1"
                  // backgroundColor="#EC6133"
                  onClick={() => this.cancelOrderHandler()}
                  color="#fff"
                  backgroundColor={"#EC6133"}
                  margin="0 0 0 30px"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}

        <div>
          <ConciergeTabs
            // tabHandler={this.tabHandler}
            tabName={"Security"}
            tabId={4}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="security2-main">
              <div className="security2-heading">
                <div className="security2">Security </div>
                <div>
                  <div className="titleNumberMover">
                    <div className="left-number">2</div>
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
                <div className="helpful-div-mover">
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
                        <div className="point-content-wrapper-security2-script">
                          <div className="points-div-security2">
                            <div className="outer-point-security2">
                              <div className="inner-point-security2"></div>
                            </div>
                            <div className="vertical-line-security2"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-security2"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }
              <div className="main-bottom-security2">
                {/* <div className="point-content-wrapper-security2">
                  <div className="points-div-security2">
                    <div className="outer-point-security2">
                      <div className="inner-point-security2"></div>
                    </div>
                    <div className="vertical-line-security2"></div>
                  </div>

                  <div className="point-content-security2">
                    <div className="top-3-heading">
                      <div className="heading-top">
                        Here are your personalised quotes
                      </div>
                      {this.state.filtersOpen == false ? (
                        <div className="filters-div">
                          <div> Filters</div>
                          <div
                            className="expandIcon"
                            onClick={() => {
                              this.setState({
                                filtersOpen: true,
                              });
                            }}
                          >
                            <ExpandMoreIcon style={{ color: "#52BDE6" }} />
                          </div>
                        </div>
                      ) : null}
                      {this.state.filtersOpen ? (
                        <div className="filters-main-outer">
                          <FiltersSecurity
                            Providers={this.state.Providers}
                            changeProviders={(val: any) =>
                              this.changeProviders(val)
                            }
                            Installations={this.state.Installations}
                            changeInstallations={(val: any) =>
                              this.changeInstallations(val)
                            }
                            clearAllHandler={this.clearAll}
                            clickAway={() => {
                              this.setState({
                                filtersOpen: false,
                              });
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="security-others-cards-div">
                      {this.state.listContent.map((item: any) => {
                        return (
                          <div className="security-card">
                            <SecurityUpdatedCard
                              title={item.title}
                              logo={item.logo}
                              planType={item.planType}
                              Price={item.price}
                              selected={item.isSelected}
                              onSelectClick={() => this.onSelectHandler(item)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div> */}
                {/* {this.state.data.length &&
                this.props &&
                this.props.history &&
                this.props.history.location &&
                this.props.history.location.state &&
                this.props.history.location.state.scheduleCallBackData ? (
                  <div className="callBackSchedule">
                    <div className="scheduleText">Call Back Schedule</div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Name:</div>
                      <div className="flexDetailDiv">
                        {`${this.props.history.location.state.scheduleCallBackData.firstName} 
                      ${this.props.history.location.state.scheduleCallBackData.lastName}
                      `}
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Phone number:</div>
                      <div className="flexDetailDiv">
                        {
                          this.props.history.location.state.scheduleCallBackData
                            .phone
                        }
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Email:</div>
                      <div className="flexDetailDiv">
                        {
                          this.props.history.location.state.scheduleCallBackData
                            .email
                        }
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Zipcode:</div>
                      <div className="flexDetailDiv">
                        {
                          this.props.history.location.state.scheduleCallBackData
                            .zipCode
                        }
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Date:</div>
                      <div className="flexDetailDiv">
                        {new Date(
                          this.props.history.location.state.scheduleCallBackData.installationDate
                        ).toDateString()}
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Time:</div>
                      <div className="flexDetailDiv">
                        {this.formatAMPM(
                          new Date(
                            this.props.history.location.state.scheduleCallBackData.installationDate
                          )
                        )}
                      </div>
                    </div>
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Order number:</div>
                      <div className="flexDetailDiv">
                        {
                          this.props.history.location.state.scheduleCallBackData
                            .orderNumber
                        }
                      </div>
                    </div>
                  </div>
                ) : this.state.data.length &&
                  this.props &&
                  this.props.history &&
                  this.props.history.location &&
                  this.props.history.location.state &&
                  this.props.history.location.state.warmTransferData ? (
                  <div className="callBackSchedule">
                    <div className="flexDiv">
                      <div className="flexTitleDiv">Order number:</div>
                      <div className="flexDetailDiv">
                        {
                          this.props.history.location.state.warmTransferData
                            .orderNumber
                        }
                      </div>
                    </div>
                    <div className="scheduleDetails">
                      The customer have been setup for warm transfer
                    </div>
                  </div>
                ) : this.state.data ? (
                  this.state.data.map((item: any) => {
                    return (
                      <div className="callBackSchedule">
                        {(this.props &&
                          this.props.history &&
                          this.props.history.location &&
                          this.props.history.location.state &&
                          this.props.history.location.state.notInterested) ||
                        this.state.notInterested ? null : (
                          <div className="flexDiv">
                            <div className="flexTitleDiv">Order number:</div>
                            <div className="flexDetailDiv">{item.order_id}</div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : null} */}
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">Order Summary</div>
                  {this.state.loader ? (
                    <CircularProgress />
                  ) : (
                    <div className="SummaryTableDiv">
                      <TableComponent
                        data={data}
                        columns={this.columns}
                        className="SummaryTable"
                        // onRowClick={() => console.log("hii")}
                        pageSize={data.length}
                        nopagination
                        noDataMessage={noDataMessage}
                      />
                    </div>
                  )}

                  <div className="buttonDiv">
                    <Button
                      className="editOrderButton"
                      disabled={this.state.data.length ? true : false}
                      onClick={() => {
                        if (!this.state.data.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/securitystep1"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </Button>
                    <Button
                      className="cancleOrderButton"
                      disabled={this.state.data.length ? false : true}
                      onClick={() => this.setState({ openModal: true })}
                    >
                      Cancel Entire Order
                    </Button>
                  </div>
                </div>
                {/* {(this.props &&
                  this.props.history &&
                  this.props.history.location &&
                  this.props.history.location.state &&
                  this.props.history.location.state.notInterested) ||
                this.state.notInterested ? (
                  <div>Not Interested</div>
                ) : (
                  <div className="buttonDiv">
                    <Button
                      className="editOrderButton"
                      disabled={this.state.data.length ? true : false}
                      onClick={() => {
                        if (!this.state.data.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/securitystep1"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </Button>
                    <Button
                      className="cancleOrderButton"
                      disabled={this.state.data.length ? false : true}
                      onClick={() => this.setState({ openModal: true })}
                    >
                      Cancel Entire Order
                    </Button>
                  </div>
                )} */}
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
                  pathname:
                    // this.state.data
                    // ? "/dashboard/concierge/workflow/insurancestep2"
                    //   :
                    "/dashboard/concierge/workflow/securitystep1",
                })
              }
              ButtonOnClick2={() => {
                // this.props.history.push({
                //   pathname: "/dashboard/concierge/workflow/internetstep1",
                //   // state: {
                //   //   selectedSecurity: this.state.listContent.filter(
                //   //     (item: any) => item.isSelected
                //   //   ),
                //   // },
                // });
                if (this.state.internetData.length) {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/internetthankyou"
                  );
                } else {
                  this.props.history.push(
                    "/dashboard/concierge/workflow/internetstep2"
                  );
                }
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
    moversAction: bindActionCreators(MoversAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityStep2);
