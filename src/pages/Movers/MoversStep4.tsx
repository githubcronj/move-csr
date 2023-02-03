import React from "react";
import "./moversStep4.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import MoversRatingCard from "../../components/Movers/MoversRatingCard";
// import SortByDropdown from "../../components/atoms/SortByDropDown";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../../store/move/actions";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonNew from "../../components/atoms/Button";
import * as Action2 from "../../store/common/actions";
import { CircularProgress } from "@material-ui/core";
import PODS from "../../Assets/images/Movers/banner.svg";
import PodCards from "../../components/Movers/PodCard";
import BudgetImage from "../../Assets/images/Movers/Budget.svg";
import PenskeImage from "../../Assets/images/Movers/Penske.svg";
import SortByDropdown from "../../components/atoms/SortByDropDown";
import { AnyNsRecord, AnyPtrRecord } from "dns";

type initialProps = {
  history?: any;
  moversStepActive: any;
  moversStepTotal: any;
  moversAction?: any;
  moversState?: any;
  commonAction?: any;
  commonState?: any;
};

type initialState = {
  listContent: any;
  top: any;
  bottom: any;
  closed: boolean;
  tabClicked: string;
  anchorEl: any;
  menuList: any;
  isDataArrived: boolean;
  showModal: boolean;
  isDataArrived2: boolean;
  hintContent: string;
  isDataArrived3: boolean;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  showPods?: boolean;
  podCardsData: any;
  sortBy: string;
  orderData: any;
  disabled: boolean;
};

class MoversStep4 extends React.Component<initialProps, initialState> {
  state: initialState = {
    scriptContent: [],
    hintContent: "",
    isDataArrived3: true,
    tabClicked: "professional",
    anchorEl: null,
    showModal: false,
    isDataArrived: true,
    isDataArrived2: true,
    menuList: [
      {
        name: "High To Low",
        value: "High To Low",
      },
      {
        name: "Low To High",
        value: "Low To High",
      },
    ],
    listContent: [],
    top: [],
    bottom: [],
    closed: false,
    objectionCompleted: true,
    loader: true,
    showPods: false,
    podCardsData: [
      // {
      //   id: "1",
      //   title: "Budget Truck Rental",
      //   image: BudgetImage,
      //   discountPercent: "10%",
      //   selected: false,
      // },
      // {
      //   id: "2",
      //   title: "Penske Truck Rental",
      //   image: PenskeImage,
      //   discountPercent: "10%",
      //   selected: false,
      // },
    ],
    sortBy: "Low To High",
    orderData: [],
    disabled: true,
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.props.moversAction.movers();
    this.props.moversAction.diy();
    const hash_code = localStorage.getItem("scriptHashCode");

    await this.setState({ tabClicked: "professional" });
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.selectedFullService
    ) {
      await this.setState({ tabClicked: "professional" });
    }
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      (this.props.history.location.state.selectedPods ||
        this.props.history.location.state.selectedDiy)
    ) {
      if (this.props.history.location.state.podCardsData) {
        await this.setState({
          podCardsData: this.props.history.location.state.podCardsData,
        });
      }
      await this.setState({ tabClicked: "pods" });
    }

    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "moving",
      page: 3,
      subCategory:
        this.state.tabClicked === "professional"
          ? "professional-mover"
          : "diy-mover",
    });
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;

    if (prev.order !== cur.order && cur.order) {
      let orderData: any = [];
      this.props.commonState.order.map((item: any) => {
        if (
          item.service === "Professional Movers" ||
          item.service === "DIY Move"
        )
          orderData.push(item);
      });
      this.setState({ orderData: orderData });
    }
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      const data = cur.move[0];
      this.props.moversAction.movers();
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.moversState &&
      nextProps.moversState.movers &&
      nextProps.moversState.movers.length &&
      !(
        nextProps.history &&
        nextProps.history.location &&
        nextProps.history.location.state &&
        nextProps.history.location.state.listContent
      ) &&
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;

      let movers: any = [];

      nextProps.moversState.movers.map((item: any) => {
        movers.push({
          id: item.id,
          title: item.name,
          rate: item.overall_rating,
          reviews:
            item.google_num_reviews > item.yelp_num_reviews
              ? item.google_num_reviews
              : item.yelp_num_reviews,
          phone: item.phone_no,
          address: item.address,
          tagBackground: " #F4AE33",
          tagText: item.preferred_text,
          grade: item.bbb_rating,
          selected: false,
          isSelectToEmail: false,
          email_status: "",
          logo: item.van_line_logo,
          van_line_name: item.van_line_name,
          mover_distance: parseFloat(item.mover_distance).toFixed(3),
        });
      });

      currentState.listContent = movers;
      let top: any = movers.slice(0, 3);
      top.sort((a: any, b: any) => {
        return a.mover_distance - b.mover_distance;
      });
      let bottom: any = movers.slice(3);
      bottom.sort((a: any, b: any) => {
        return a.mover_distance - b.mover_distance;
      });

      currentState.top = top;
      currentState.bottom = bottom;
    }

    if (
      nextProps &&
      nextProps.history &&
      nextProps.history.location &&
      nextProps.history.location.state &&
      nextProps.history.location.state.listContent &&
      currentState.isDataArrived2
    ) {
      currentState.isDataArrived2 = false;
      currentState.listContent = nextProps.history.location.state.listContent;
      currentState.top = nextProps.history.location.state.listContent.slice(
        0,
        3
      );
      let bottomData: any = [];
      let data: any = nextProps.history.location.state.listContent.slice(3);
      data.map((item: any) => {
        bottomData.push({ ...item, isSelectToEmail: false });
      });
      currentState.bottom = bottomData;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let hintPara: string = "";
      let points: any = [];
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 4) {
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
      nextProps.moversState &&
      nextProps.moversState.diy &&
      nextProps.moversState.diy.length &&
      nextProps.moversState.diyDataArrived
    ) {
      nextProps.moversState.diyDataArrived = false;
      let podsData: any = [];
      nextProps.moversState.diy.map((item: any) => {
        podsData.push(item);
      });

      currentState.podCardsData = podsData;
    }

    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // selectToEmailButtonHandler = (item: any) => {};

  selectButtonHandler = (item: any) => {
    let listContent = this.state.listContent;
    let selectedCount = 0;
    listContent.map((x: any) => {
      if (x.selected == true || x.isSelectToEmail == true) {
        selectedCount++;
      }
    });

    listContent.map((item2: any) => {
      if (item2.id == item.id && item2.selected == true) {
        item2.selected = false;
      } else if (
        selectedCount < 3 &&
        item2.id == item.id &&
        item2.selected == false
      ) {
        item2.selected = true;
      } else if (
        selectedCount >= 3 &&
        item2.id == item.id &&
        item2.selected == false
      ) {
        this.setState({
          showModal: true,
        });
      }
    });

    this.setState({
      listContent: listContent,
    });
  };

  selectToEmailButtonHandler = (item: any) => {
    let listContent = this.state.listContent;
    let selectedCount = 0;
    listContent.map((x: any) => {
      if (x.selected == true || x.isSelectToEmail == true) {
        selectedCount++;
      }
    });

    listContent.map((item2: any) => {
      if (item2.id == item.id && item2.isSelectToEmail == true) {
        item2.isSelectToEmail = false;
      } else if (
        selectedCount < 3 &&
        item2.id == item.id &&
        item2.isSelectToEmail == false
      ) {
        item2.isSelectToEmail = true;
      } else if (
        selectedCount >= 3 &&
        item2.id == item.id &&
        item2.isSelectToEmail == false
      ) {
        this.setState({
          showModal: true,
        });
      }
    });

    this.setState({
      listContent: listContent,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleBookNow = () => {
    this.setState({
      showPods: true,
    });
  };

  handleClosePODSModal = () => {
    this.setState({ showPods: false });
  };

  handleCancel = () => {
    this.setState({
      showPods: false,
    });
  };
  onfilterHandler = (menuItem: any) => {
    this.setState({ sortBy: menuItem.value, anchorEl: null });
    if (menuItem && menuItem.value === "Low To High") {
      let topData: any = this.state.top;
      topData.sort((a: any, b: any) => {
        return a.mover_distance - b.mover_distance;
      });
      let bottomData: any = this.state.bottom;
      bottomData.sort((a: any, b: any) => {
        return a.mover_distance - b.mover_distance;
      });
      this.setState({ top: topData, bottom: bottomData });
    }

    if (menuItem && menuItem.value === "High To Low") {
      let topData: any = this.state.top;
      topData.sort((a: any, b: any) => {
        return b.mover_distance - a.mover_distance;
      });
      let bottomData: any = this.state.bottom;
      bottomData.sort((a: any, b: any) => {
        return b.mover_distance - a.mover_distance;
      });
      this.setState({ top: topData, bottom: bottomData });
    }
  };

  handlePodsCheck = (selectedItem: any, index: number) => {
    let data = this.state.podCardsData;
    let tempData = data[index];
    tempData.selected = !selectedItem.selected;
    data[index] = tempData;
    this.setState({ podCardsData: data, disabled: false });
  };

  render() {
    let listContent: any = this.state.listContent;
    listContent.map((item: any) => {
      this.state.orderData.map((item2: any) => {
        // let topData: any = this.state.top;
        this.state.top.map((item3: any) => {
          if (
            item2.plan_detail &&
            item2.plan_detail.id &&
            item2.plan_detail.id === item.id &&
            item.id === item3.id
          ) {
            item.selected = true;
          }
        });
        this.state.bottom.map((item3: any) => {
          if (
            item2.plan_detail &&
            item2.plan_detail.id &&
            item2.plan_detail.id === item.id &&
            item.id === item3.id
          ) {
            item.isSelectToEmail = true;
          }
        });
      });
    });
    this.state.listContent = listContent;
    let selected: number = 0;
    this.state.listContent.map((item: any) => {
      if (item.selected == true) {
        selected++;
        this.state.disabled = false;
      }
    });

    const hash_code = localStorage.getItem("scriptHashCode");

    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <Dialog
            className="dialog-box"
            open={this.state.showModal}
            onClose={this.handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" className="alert-dialog-title">
              {"Oops. Only Three Movers are Allowed for Selection"}
            </DialogTitle>

            <DialogActions>
              <ButtonNew
                onClick={this.handleCloseModal}
                className="Modal-button"
              >
                Ok
              </ButtonNew>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <ConciergeTabs
            tabName={"Movers"}
            tabId={2}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="mover4-main">
              <div className="main-inside">
                <div className="mover4-heading">
                  <div className="mover4">Movers </div>
                  <div>
                    <div className="titleNumberMover">
                      <div className="left-number">4</div>
                      <div className="right-number">5</div>
                    </div>
                  </div>
                  {/* <div className="objection-div">
                  <Button className="objection" 
                  startLogo={<ChatIcon />}
                  disabled={this.state.objectionCompleted}
                  color={this.state.objectionCompleted ? '#DADADA' : '#EC6133 ' }
                  border= {this.state.objectionCompleted ? '1px solid #DADADA' : '1px solid #EC6133'}
                  backgroundColor="#fff"
                  //  onClick={() => { this.setState({ objectionClick: true }) }}
                   >
                     Objection
                     </Button>
                </div> */}
                </div>

                <div className="selected-number-div">
                  <div>
                    <div className="titleNumberMover2">
                      <div className="left-number2">Selected Movers</div>
                      <div className="right-number2">{selected}</div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}

              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-mover">
                  {console.log(this.state.hintContent)}
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              <div className="script-div">
                {this.state.scriptContent &&
                  this.state.scriptContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-mover4-script">
                        <div className="points-div-mover4">
                          <div className="outer-point-mover4">
                            <div className="inner-point-mover4"></div>
                          </div>
                          <div className="vertical-line-mover4"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-mover4"
                        ></div>
                      </div>
                    );
                  })}
              </div>
              <div className="main-bottom-mover4">
                <div className="point-content-wrapper-mover4">
                  <div className="points-div-mover4">
                    <div className="outer-point-mover4">
                      <div className="inner-point-mover4"></div>
                    </div>
                    <div className="vertical-line-mover4"></div>
                  </div>

                  <div className="point-content-mover4">
                    <div className="top-3-heading">
                      We’ve matched you with 3 top-rated movers to get free
                      estimates
                    </div>
                  </div>
                </div>
                <div className="point-content-wrapper-mover4">
                  <div className="points-div-mover4">
                    <div className="outer-point-mover4">
                      <div className="inner-point-mover4"></div>
                    </div>
                    <div className="vertical-line-mover4"></div>
                  </div>

                  <div className="point-content-mover4">
                    <div className="top-div-topper">
                      <div className="tabs-div-mover4">
                        <div
                          className="tab-movers-4"
                          style={{
                            background:
                              this.state.tabClicked == "professional"
                                ? "#465B74"
                                : "#E6E8EB",
                            color:
                              this.state.tabClicked == "professional"
                                ? "#fff"
                                : "#333",
                            cursor:
                              this.state.tabClicked == "pods"
                                ? "default"
                                : "pointer",
                          }}
                          // onClick={() => {
                          //   this.setState({ tabClicked: "professional" });
                          //   this.props.commonAction.scriptGet({
                          //     hash_code: hash_code,
                          //     service: "moving",
                          //     page: 3,
                          //     subCategory: "professional-mover",
                          //   });
                          // }}
                        >
                          Professional Movers
                        </div>
                        <div
                          className="tab-movers-4"
                          style={{
                            background:
                              this.state.tabClicked == "pods"
                                ? "#465B74"
                                : "#E6E8EB",
                            color:
                              this.state.tabClicked == "pods" ? "#fff" : "#333",
                            cursor:
                              this.state.tabClicked == "professional"
                                ? "default"
                                : "pointer",
                          }}
                          // onClick={() => {
                          //   this.setState({ tabClicked: "pods" });
                          //   this.props.commonAction.scriptGet({
                          //     hash_code: hash_code,
                          //     service: "moving",
                          //     page: 3,
                          //     subCategory: "diy-mover",
                          //   });
                          // }}
                        >
                          PODS/DIY Moving
                        </div>
                        {/* <div
                          className="tab-movers-4"
                          style={{
                            background:
                              this.state.tabClicked == "diy"
                                ? "#465B74"
                                : "#E6E8EB",
                            color:
                              this.state.tabClicked == "diy" ? "#fff" : "#333",
                          }}
                          onClick={() => {
                            this.setState({ tabClicked: "diy" });
                          }}
                        >
                          DIY moving
                        </div> */}
                      </div>
                      {this.state.tabClicked === "professional" ? (
                        <div className="sort-by-div">
                          <SortByDropdown
                            sortByName="Distance"
                            handleMenu={this.handleMenu}
                            handleClose={this.handleClose}
                            anchorEl={this.state.anchorEl}
                            onMenuClick={this.onfilterHandler}
                            menuList={this.state.menuList}
                            sortByOption={this.state.sortBy}
                          />
                        </div>
                      ) : null}
                    </div>

                    {this.state.tabClicked === "professional" ? (
                      <div className="movers-others-cards-div">
                        <MoversRatingCard content={false} />
                        {this.state.top.map((item: any) => {
                          return (
                            <div className="movers-rating-card">
                              <MoversRatingCard
                                logo={item.logo}
                                title={item.title}
                                rate={item.rate}
                                tagText={item.tagText}
                                reviews={item.reviews}
                                phone={item.phone}
                                address={item.address}
                                recommended={item.recommended}
                                tagBackground={item.tagBackground}
                                selected={item.selected}
                                grade={item.grade}
                                vanline={item.van_line_name}
                                distance={item.mover_distance}
                                onSelectClick={() => {
                                  this.selectButtonHandler(item);
                                }}
                                content={true}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

                    {this.state.tabClicked === "pods" ? (
                      <div className="movers-others-cards-div">
                        <PodCards name="Name" head={true} />
                        {this.state.podCardsData.map(
                          (item: any, index: number) => {
                            return (
                              <PodCards
                                name={item.name}
                                image={item.logo ? item.logo : null}
                                discountPercent={
                                  item.discount ? item.discount : null
                                }
                                isSelected={item.selected}
                                handleCheck={() =>
                                  this.handlePodsCheck(item, index)
                                }
                                buttonText="Select"
                                head={false}
                              />
                            );
                          }
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>

                {this.state.tabClicked === "professional" ? (
                  <div className="point-content-wrapper-mover4">
                    <div className="points-div-mover4">
                      <div className="outer-point-mover4">
                        <div className="inner-point-mover4"></div>
                      </div>
                      <div className="vertical-line-mover4"></div>
                    </div>

                    <div className="point-content-mover4">
                      <div className="other-movers-heading">Other Movers</div>

                      <div className="movers-others-cards-div">
                        <div className="mover-head-change-div">
                          <MoversRatingCard content={false} />
                        </div>
                        {this.state.bottom.map((item: any) => {
                          return (
                            <div className="movers-rating-card">
                              <MoversRatingCard
                                logo={item.logo}
                                title={item.title}
                                rate={item.rate}
                                tagText={item.tagText}
                                reviews={item.reviews}
                                phone={item.phone}
                                address={item.address}
                                recommended={item.recommended}
                                tagBackground={item.tagBackground}
                                selected={item.isSelectToEmail}
                                grade={item.grade}
                                vanline={item.van_line_name}
                                distance={item.mover_distance}
                                onSelectClick={() => {
                                  this.selectToEmailButtonHandler(item);
                                }}
                                content={true}
                                buttonText={
                                  item.isSelectToEmail
                                    ? "Selected To Email"
                                    : "Select To Email"
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Back"
              }
              buttonText2={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Continue"
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
              ButtonOnClick1={() => {
                // this.props.history.push(
                //   "/dashboard/concierge/workflow/moversstep3"
                // );
                this.props &&
                this.props.history &&
                this.props.history.location &&
                this.props.history.location.state &&
                (this.props.history.location.state.selectedPods ||
                  this.props.history.location.state.selectedDiy)
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep1",
                      state: this.props.history.location.state,
                    })
                  : this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep2",
                      state: this.props.history.location.state,
                    });
              }}
              ButtonOnClick2={() => {
                this.state.tabClicked === "pods"
                  ? this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep5",
                      state: {
                        selectedContent: this.state.podCardsData,
                        selectedText: "Pods/DIY Mover",
                      },
                    })
                  : this.props.history.push({
                      pathname: "/dashboard/concierge/workflow/moversstep5",
                      state: {
                        selectedContent: this.state.listContent,
                        // selectedContent: selectedContent,
                        selectedText: "Movers",
                      },
                    });
              }}
              button2Disabled={this.state.disabled}
            />
          </div>
        </div>

        {this.state.showPods ? (
          <div>
            <Dialog
              open={this.state.showPods}
              onClose={this.handleClosePODSModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10%",
                }}
              >
                <img src={PODS} width="200px" height="70px" />
              </div>
              <DialogTitle id="alert-dialog-title">
                {"You will be rerouted to PODS website to complete your order"}
              </DialogTitle>

              <DialogActions>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <ButtonNew
                    onClick={this.handleClosePODSModal}
                    // color="#ffffff"
                    width="300px"
                  >
                    <a
                      href="https://www.pods.com/partners/moveeasy"
                      target="_blank"
                      style={{ color: "#ffffff", textDecoration: "none" }}
                    >
                      Continue to PODS Website
                    </a>
                  </ButtonNew>
                  <ButtonNew
                    onClick={this.handleClosePODSModal}
                    width="300px"
                    backgroundColor="#FFFFFF"
                    boxShadow={"0 0 3px 0 #273E59"}
                    color={"#273E59"}
                    borderRadius="5px"
                    marginTop="20px"
                    fontSize="14px"
                    fontWeight="600"
                  >
                    Cancel
                  </ButtonNew>
                </div>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    moversAction: bindActionCreators(Action, dispatch),
    commonAction: bindActionCreators(Action2, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  moversState: state.move,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoversStep4);
