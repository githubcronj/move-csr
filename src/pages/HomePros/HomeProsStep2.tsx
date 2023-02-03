import React from "react";
import "./HomeProsStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "../../components/atoms/Button";
import ChatIcon from "@material-ui/icons/Chat";
import Modal from "../../components/atoms/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import ObjectionCard1 from "../../components/Objection/ObjectionCard1";
import ObjectionCard2 from "../../components/Objection/ObjectionCard2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as Action from "../../store/common/actions";
import * as HomeprosAction from "../../store/homePros/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProviderServicesCard from "../../components/HomePros/PopularServicesCard";
import provide from "../../Assets/images/HomePros/asset-1.png";
import AllServicesCard from "../../components/HomePros/AllServicesCards";
import SearchComponent from "../../components/atoms/Search";
// import window from "../../Assets/images/HomePros/asset-2.png";

type initialProps = {
  HomeProsStepActive: any;
  HomeProsStepTotal: any;
  history?: any;
  commonAction: any;
  commonState: any;
  homeprosAction: any;
  homeprosState: any;
};

type initialState = {
  closed: boolean;
  listContentObjection: any;
  listContentObjection2: any;
  objectionClick: boolean;
  currentObjectionStep: number;
  objectionList1: any;
  selected: boolean;
  objectionCompleted: boolean;
  isDataArrived: boolean;
  hintContent: string;
  popularService: any;
  allService: any;
  success: boolean;
  searchInput: string;
  searchClick: boolean;
  selectedService: any;
  destinationAddress: string;
  allWithoutData: any;
  moveId: string;
};

class HomeProsStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    hintContent: "",
    closed: false,
    objectionCompleted: false,
    objectionClick: false,
    currentObjectionStep: 1,
    success: false,
    objectionList1: [
      {
        objection1: "I’m setting up internet myself",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "That’s been taken care of",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "Don’t know when we will be moving in",
        possibility: "4 possible rebutals",
        selected: false,
      },
      {
        objection1: "Other (specify)",
        possibility: "4 possible rebutals",
        selected: false,
      },
    ],
    listContentObjection: [
      "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue",
      "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.",
      "Lorem ipsum dolor sit amet.",
    ],
    listContentObjection2: [
      {
        objection2: "I can facilitate when your date changes",
        selected: false,
      },
      {
        objection2: "I can help you with the perfect date to move",
        selected: false,
      },
      {
        objection2: "My team will help you with this, you don’t have to worry",
        selected: false,
      },
    ],
    selected: false,
    popularService: [],
    allService: [],
    searchInput: "",
    searchClick: false,
    selectedService: [],
    destinationAddress: "",
    allWithoutData: [],
    moveId: "",
  };

  componentDidUpdate(prevProps: any) {
    let prev: any = prevProps.homeprosState;
    let cur: any = this.props.homeprosState;
    if (prev.ourVendor !== cur.ourVendor && cur.isGetOurVendor) {
      cur.isGetOurVendor = false;

      let allService: any = [];
      cur.ourVendor.map((item: any) => {
        allService.push({ ...item, selected: false });
        return allService;
      });

      let popularService: any = [];
      let popularCardData: any = cur.ourVendor.slice(0, 6);
      popularCardData.map((item: any) => {
        popularService.push({ ...item, selected: false });
        return popularService;
      });
      this.setState({
        popularService: popularService,
        allService: allService,
        allWithoutData: allService,
      });
    }

    // if (
    //   prev.postOrderHomePros !== cur.postOrderHomePros &&
    //   cur.isPostOrderHomePros &&
    //   cur.postOrderHomePros.message &&
    //   cur.postOrderHomePros.message === "Home Pros Request Sent Successfully"
    // ) {
    //   cur.isPostOrderHomePros = false;
    //   this.setState({ success: true });
    // }

    const prevM = prevProps && prevProps.commonState;
    const curM = this.props && this.props.commonState;

    if (prevM.move !== curM.move && curM.move && curM.move[0]) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        destinationAddress:
          this.props.commonState.move[0].destination_full_address,
      });
    }
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };
  objectionCardHandler = (item: any) => {
    let objectionList = this.state.objectionList1;
    objectionList.map((item2: any) => {
      if (item2.objection1 == item.objection1) {
        item2.selected = true;
      } else {
        item2.selected = false;
      }
    });

    this.setState({
      objectionList1: objectionList,
    });
  };

  selectHandler = (item: any) => {
    this.setState({
      selected: true,
    });
    let objectionList2 = this.state.listContentObjection2;
    objectionList2.map((item2: any) => {
      if (item2.objection2 == item.objection2) {
        item2.selected = true;
      } else {
        item2.selected = false;
      }
    });

    this.setState({
      listContentObjection2: objectionList2,
    });
  };
  selectCardHandler = (item: any) => {
    this.setState({
      selected: true,
    });
    let cardSelect = this.state.popularService;
    cardSelect.map((item1: any) => {
      if (item1.id == item.id) {
        item1.selected = !item.selected;
      }
    });
    // let selectedService = ;
    this.setState({
      popularService: cardSelect,
    });
  };
  selectServiceCardHandler = (item: any) => {
    let servicecardSelect = this.state.allService;
    servicecardSelect.map((item1: any) => {
      if (item1.id == item.id) {
        item1.selected = !item.selected;
      }
    });
    this.setState({
      selected: true,
    });
    this.setState({
      allService: servicecardSelect,
    });
  };
  thankuHomeProsHandle = () => {
    this.props.history.push("/dashboard/concierge/workflow/homeprosthankyou");
  };
  moveToSuccessHandle = () => {
    let selectedService: any = [];
    this.state.allService.map((item: any) => {
      if (item.selected) {
        // this.state.popularService.map((item2: any) => {
        // if (item2.selected && item.id !== item2.id) {
        selectedService.push(item.name);
        //   }
        // });
      }
    });
    this.state.popularService.map((item2: any) => {
      if (item2.selected && !item2.name.includes(selectedService)) {
        selectedService.push(item2.name);
      }
    });

    if (this.state.moveId && this.state.moveId !== "") {
      let payload = {
        move_id: this.state.moveId,
        type: "Home Pros",
        home_pros: selectedService,
        requested_by_csr: true,
        // address: this.state.destinationAddress,
      };
      // this.props.homeprosAction.postOrderHomePros(payload);
      this.props.commonAction.appointmentPost(payload);
      if (this.state.selected == true) {
        this.setState({
          // success: true,
          selectedService: selectedService,
        });
      }
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "home-pros",
      page: 1,
    });

    this.props.homeprosAction.getOurVendors();
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        moveId: this.props.commonState.move[0].id,
        destinationAddress:
          this.props.commonState.move[0].destination_full_address,
      });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
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
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 1) {
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
      // currentState.listContent = points;
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
      currentState.success = true;
      // nextProps.history.push("/dashboard/concierge/workflow/moversthankyou");
    } else if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.appointmentPost &&
      nextProps.commonState.error !== null
    ) {
      window.alert(`${nextProps.commonState.error}`);
      nextProps.commonState.error = null;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.postSkipService &&
      nextProps.commonState.isPostSkipService
    ) {
      nextProps.commonState.isPostSkipService = false;
      nextProps.history.push({
        pathname: "/dashboard/concierge/workflow/homeprosthankyou",
        state: {
          notInterested: true,
        },
      });
    }

    return currentState;
  }

  handleSearchChange = async (e: any) => {
    await this.setState({ searchInput: e.target.value });
    let allService: any = [];
    this.state.allWithoutData.map((item: any) => {
      let name: string = item.name.toLowerCase();
      let search: string = this.state.searchInput.toLowerCase();
      if (name.match(search)) {
        allService.push(item);
        return allService;
      }
    });
    this.setState({ allService: allService });
  };
  searchClicked = () => {
    let allService: any = [];
    this.state.allWithoutData.map((item: any) => {
      let name: string = item.name.toLowerCase();
      let search: string = this.state.searchInput.toLowerCase();
      if (name.match(search)) {
        allService.push(item);
        return allService;
      }
    });
    this.setState({ allService: allService });
  };

  notInterested = () => {
    if (this.state.moveId !== "") {
      let payload: any = {
        move: this.state.moveId,
        service_name: "Home Pros",
        reason: "",
        reason_type: "Not Interested",
      };
      this.props.commonAction.postSkipService(payload);
    }
  };

  render() {
    // let allService: any = [];
    // allService = this.state.allService;
    // if (this.state.searchInput !== "") {
    //   allService = this.state.allService.map((item: any) => {
    //     let name: string = item.name.toLowerCase();
    //     let search: string = this.state.searchInput.toLowerCase();
    //     if (name.match(search)) {
    //       return item;
    //     }
    //   });
    // this.state.allService = service;
    // }
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Home Pros"}
            tabId={9}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="homePros2-main">
              <div className="homePros2-heading">
                <div className="homePros2">Home Pros </div>
                <div>
                  <div className="titleNumberHomePros">
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
                    onClick={() => {
                      this.setState({ objectionClick: true });
                    }}
                  >
                    Objection
                  </Button>
                  <Button
                    startLogo={<ArrowForwardIcon />}
                    className="scheduleCallButton"
                    color="#465b74"
                    backgroundColor="#ffffff"
                    border="1px solid #465b74"
                    onClick={() => {
                      this.notInterested();
                    }}
                  >
                    Not Interested
                  </Button>
                </div>
              </div>
              {this.state.objectionClick &&
              this.state.currentObjectionStep < 4 ? (
                <Modal
                  isShowModal={this.state.objectionClick}
                  onCloseModal={() => this.setState({ objectionClick: false })}
                  showClose={false}
                  className="ObjectionModal"
                >
                  <div className="objection-modal-main">
                    <div className="module-objection-heading">
                      <div className="module-div">Movers</div>
                      <div className="objection-list">
                        {this.state.currentObjectionStep == 3
                          ? "Final Objection"
                          : "  Objection List"}
                      </div>

                      <div
                        className="cross-objection"
                        onClick={() => {
                          this.setState({ objectionClick: false });
                        }}
                      >
                        <ClearIcon
                          style={{
                            color: "#EC6133",
                            height: "15px",
                            width: "15px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                    {this.state.currentObjectionStep < 3 ? (
                      <div className="objection-step-1">
                        <div className="one-top-wrapper">
                          <div className="one">1</div>
                          <div className="one-heading">
                            Please select the category of clients objection
                          </div>
                        </div>

                        <div className="objection-1-cards">
                          {this.state.objectionList1.map((item: any) => {
                            return (
                              <div className="objection-1-card">
                                <ObjectionCard1
                                  objection1={item.objection1}
                                  possibility={item.possibility}
                                  selected={item.selected}
                                  onClick={() => {
                                    this.objectionCardHandler(item);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {this.state.currentObjectionStep == 2 ? (
                      <div className="objection-step-2">
                        <div className="one-top-wrapper">
                          <div className="one">2</div>
                          <div className="one-heading">Customer mindset</div>
                        </div>

                        {this.state.listContentObjection.map((item: any) => {
                          return (
                            <div className="point-content-wrapper-homePros2">
                              <div className="points-div-homePros2">
                                <div className="outer-point-homePros2">
                                  <div className="inner-point-homePros2"></div>
                                </div>
                                <div className="vertical-line-homePros2"></div>
                              </div>

                              <div className="point-content-homePros2">
                                {item}
                              </div>
                            </div>
                          );
                        })}

                        <div className="one-top-wrapper">
                          <div className="one">3</div>
                          <div className="one-heading">Suggested Rebuttals</div>
                        </div>

                        <div className="rebuttals">
                          {this.state.listContentObjection2.map(
                            (item3: any) => {
                              return (
                                <div className="rebuttal-card">
                                  <ObjectionCard2
                                    objection2={item3.objection2}
                                    selected={item3.selected}
                                    onSelectClick={() => {
                                      this.selectHandler(item3);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : null}

                    {this.state.currentObjectionStep == 3 ? (
                      <div className="final-objection">
                        <div className="one-top-wrapper">
                          <div className="one">1</div>
                          <div className="one-heading">Customer mindset</div>
                        </div>
                        <div className="mindset-div-bottom">
                          {this.state.objectionList1.map((item: any) => {
                            if (item.selected == true) {
                              return (
                                <div className="point-content-wrapper2-homePros2">
                                  <div className="points-div-homePros2">
                                    <div className="outer-point-homePros2">
                                      <div className="inner-point-homePros2"></div>
                                    </div>
                                  </div>

                                  <div className="point-content-homePros2">
                                    {item.objection1}
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>

                        <div className="one-top-wrapper">
                          <div className="one">2</div>
                          <div className="one-heading">Suggested Rebuttals</div>
                        </div>

                        <div className="rebuttals">
                          {this.state.listContentObjection2.map(
                            (item3: any) => {
                              return (
                                <div className="rebuttal-card">
                                  <ObjectionCard2
                                    objection2={item3.objection2}
                                    selected={item3.selected}
                                    onSelectClick={() => {
                                      this.selectHandler(item3);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : null}

                    <div className="WorkflowButtons">
                      <WorkflowButton
                        buttonText1={
                          this.state.currentObjectionStep == 2 &&
                          this.state.selected
                            ? "Final Objection"
                            : this.state.currentObjectionStep == 3
                            ? "Not Interested"
                            : " Go Back"
                        }
                        buttonText2={"Success"}
                        buttonStartLogo1={
                          this.state.selected ? <ArrowBackIcon /> : null
                        }
                        buttonStartLogo2={<ArrowForwardIcon />}
                        ButtonOnClick1={() =>
                          this.state.currentObjectionStep == 1 ||
                          this.state.currentObjectionStep == 3
                            ? this.setState({
                                objectionClick: false,
                              })
                            : this.state.currentObjectionStep == 2 &&
                              this.state.selected
                            ? this.setState({
                                currentObjectionStep: 3,
                              })
                            : this.setState({
                                currentObjectionStep:
                                  this.state.currentObjectionStep - 1,
                              })
                        }
                        ButtonOnClick2={() =>
                          this.state.currentObjectionStep == 2
                            ? this.setState({
                                currentObjectionStep: 4,
                              })
                            : this.setState({
                                currentObjectionStep:
                                  this.state.currentObjectionStep + 1,
                              })
                        }
                      />
                    </div>
                  </div>
                </Modal>
              ) : null}

              {
                <Modal
                  isShowModal={this.state.currentObjectionStep == 4}
                  onCloseModal={() =>
                    this.setState({
                      objectionClick: false,
                      objectionCompleted: true,
                      currentObjectionStep: 1,
                    })
                  }
                  showClose={false}
                  className="ObjectionCongratsModal"
                >
                  <div className="congrats-main">
                    <CheckCircleOutlineIcon
                      style={{
                        color: "#347A35",
                        height: "50px",
                        width: "50px",
                      }}
                    />
                    <div className="great-job">Great Job,Congrats!</div>
                  </div>
                </Modal>
              }
              {this.state.closed == false && this.state.hintContent ? (
                <div className="helpful-div-homePros">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="provide-service-main">
            <div className="provide-service-head">Popular Services</div>
            <div className="provide-service-card">
              {this.state.popularService &&
                this.state.popularService.map((item: any) => {
                  return (
                    <ProviderServicesCard
                      serviceimg={item.image}
                      selected={item.selected}
                      onSelectValue={() => {
                        this.selectCardHandler(item);
                      }}
                      name={item.name}
                    />
                  );
                })}
            </div>
          </div>
          <div className="search-by-service">
            <SearchComponent
              placeholder="Search plumbing, electrician etc."
              value={this.state.searchInput}
              onSearchClick={() => this.searchClicked()}
              onSearchChange={(e: any) => {
                // this.setState({ searchInput: e.target.value });
                this.handleSearchChange(e);
              }}
            />
          </div>
          <div className="all-services-div ">
            <div className="all-services-head">{`All services (${this.state.allService.length})`}</div>
            <div className="all-services-main">
              {this.state.allService &&
                this.state.allService.map((item: any) => {
                  return (
                    <AllServicesCard
                      servicestypes={item.name}
                      iconCheck={item.selected}
                      onClick={() => {
                        this.selectServiceCardHandler(item);
                      }}
                    />
                  );
                })}
            </div>
          </div>
          {this.state.success ? (
            <Modal
              isShowModal={this.state.success}
              showClose={false}
              onCloseModal={() => this.setState({ success: false })}
              className="SuccessCongratsModal"
            >
              <div className="success-main">
                <CheckCircleOutlineIcon
                  style={{
                    color: "#347A35",
                    height: "55px",
                    width: "55px",
                  }}
                />
                <div className="success-head">Success!</div>
                <div className="success-details">
                  {`${this.state.selectedService.length} services has been added for help`}
                </div>
                <div className="success-button">
                  <Button
                    className="button-inner"
                    onClick={this.thankuHomeProsHandle}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          ) : null}

          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Continue"}
              buttonStartLogo1={""}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/homeprosstep1"
                )
              }
              ButtonOnClick2={this.moveToSuccessHandle}
              button2Disabled={!(this.state.selected ? true : false)}
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
    homeprosAction: bindActionCreators(HomeprosAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  homeprosState: state.homePros,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeProsStep2);
