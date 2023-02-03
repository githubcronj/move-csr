import React from "react";
import Button from "../../../components/atoms/Button";
import FlagIcon from "@material-ui/icons/Flag";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import SecurityIcon from "@material-ui/icons/Security";
import LockIcon from "@material-ui/icons/Lock";
import WifiIcon from "@material-ui/icons/Wifi";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import "./ConciergeTabs.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CommonAction from "../../../store/common/actions";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import { Link } from "react-router-dom";
import Modal from "../../../components/atoms/Modal";
import CustomizedInput from "../../../components/atoms/CustomizedInput";

type InitialProps = {
  tabHandler?: any;
  tabName?: string;
  tabId?: number;
  history?: any;
  rowData?: any;
  commonState?: any;
  commonAction?: any;
};

type InitialState = {
  tabsList: any;
  tabName: string;
  destinationZip: string;
  destination_full_address: string;
  moveId: string;
  selectedMovers: any;
  selectedInsurance: any;
  selectedSecurity: any;
  selectedUtilities: any;
  selectedInternet: any;
  selectedEnergy: any;
  selectedSolar: any;
  selectedHomePros: any;
  orders: any;
  tabValue: any;
  tabId: number;
  skipModal: boolean;
  reason: string;
  clickedTab: any;
  skippedMovers: boolean;
  skippedInsurance: boolean;
  skippedSecurity: boolean;
  skippedUtilities: boolean;
  skippedInternet: boolean;
  skippedEnergy: boolean;
  skippedSolar: boolean;
  skippedHomePros: boolean;
  notInterestedMovers: boolean;
  notInterestedInsurance: boolean;
  notInterestedSecurity: boolean;
  notInterestedUtilities: boolean;
  notInterestedInternet: boolean;
  notInterestedEnergy: boolean;
  notInterestedSolar: boolean;
  notInterestedHomePros: boolean;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class ConcieregeTabs extends React.Component<InitialProps, InitialState> {
  state: InitialState = {
    tabName: "",
    destinationZip: "",
    destination_full_address: "",
    moveId: "",
    tabsList: [],
    selectedMovers: [],
    selectedInsurance: [],
    selectedSecurity: [],
    selectedUtilities: [],
    selectedInternet: [],
    selectedEnergy: [],
    selectedSolar: [],
    selectedHomePros: [],
    orders: [],
    tabValue: 0,
    tabId: 0,
    skipModal: false,
    reason: "",
    clickedTab: "",
    skippedMovers: false,
    skippedInsurance: false,
    skippedSecurity: false,
    skippedUtilities: false,
    skippedInternet: false,
    skippedEnergy: false,
    skippedSolar: false,
    skippedHomePros: false,
    notInterestedMovers: false,
    notInterestedInsurance: false,
    notInterestedSecurity: false,
    notInterestedUtilities: false,
    notInterestedInternet: false,
    notInterestedEnergy: false,
    notInterestedSolar: false,
    notInterestedHomePros: false,
  };

  componentDidMount() {
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
        destinationZip: dest && dest.zip_code,
        destination_full_address: data && data.destination_full_address,
        moveId: data.id,
      });
      const payload = {
        service: "",
        moveId: data.id,
      };
      this.props.commonAction.orderGet(payload);
      this.props.commonAction.getSkipService(payload);
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
    let tabValue = 0;
    if (window.location.pathname.includes("discovery")) {
      tabValue = 0;
    } else if (window.location.pathname.includes("movers")) {
      tabValue = 1;
    } else if (window.location.pathname.includes("insurance")) {
      tabValue = 2;
    } else if (window.location.pathname.includes("security")) {
      tabValue = 3;
    } else if (window.location.pathname.includes("internet")) {
      tabValue = 4;
    } else if (window.location.pathname.includes("utilities")) {
      tabValue = 5;
    } else if (window.location.pathname.includes("energy")) {
      tabValue = 6;
    } else if (window.location.pathname.includes("solar")) {
      tabValue = 7;
    } else if (window.location.pathname.includes("homepros")) {
      tabValue = 8;
    } else if (window.location.pathname.includes("summary")) {
      tabValue = 9;
    }
    this.setState({ tabValue: tabValue });
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({
        destinationZip:
          cur.move[0].destination && cur.move[0].destination.zip_code,
        destination_full_address: cur.move[0].destination_full_address,
        moveId: cur.move[0].id,
      });
      const payload = {
        service: "",
        moveId: cur.move[0].id,
      };
      this.props.commonAction.orderGet(payload);
      this.props.commonAction.getSkipService(payload);
    }

    if (prev.order !== cur.order && cur.order) {
      // this.setState({
      //   unitCount: cur.order.length ? cur.order.length.toString() : "0",
      // });
      let moversData: any = [];
      let insuranceData: any = [];
      let securityData: any = [];
      let internetData: any = [];
      let utilitiesData: any = [];
      let solarData: any = [];
      let energyData: any = [];
      let homeProsData: any = [];
      cur.order.map((item: any) => {
        if (
          item.service == "Professional Movers" ||
          item.service === "DIY Move"
        ) {
          moversData.push(item);
        }
        if (item.service == "Insurance") {
          insuranceData.push(item);
        }
        if (item.service == "Home Security") {
          securityData.push(item);
        }
        if (item.service == "Internet/Cable" || item.service == "TV") {
          internetData.push(item);
        }
        if (item.service == "Energy" || item.product_type == "Energy") {
          energyData.push(item);
        }
        if (item.service == "Solar" || item.product_type == "Solar") {
          solarData.push(item);
        }
        if (
          item.service == "Utilities" &&
          (item.product_type !== "Energy" || item.product_type !== "Solar")
        ) {
          utilitiesData.push(item);
        }
        if (item.service == "Home Pros" || item.product_type == "Home Pros") {
          homeProsData.push(item);
        }
      });

      this.setState({
        orders: cur.order,
        selectedMovers: moversData,
        selectedInsurance: insuranceData,
        selectedSecurity: securityData,
        selectedInternet: internetData,
        selectedUtilities: utilitiesData,
        selectedEnergy: energyData,
        selectedSolar: solarData,
        selectedHomePros: homeProsData,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: InitialProps,
    currentState: InitialState
  ) {
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.order &&
    //   nextProps.commonState.order.length &&
    //   nextProps.commonState.orderDataArrived
    // ) {
    //   let moversData: any = [];
    //   let insuranceData: any = [];
    //   let securityData: any = [];
    //   let internetData: any = [];
    //   let utilitiesData: any = [];
    //   let solarData: any = [];
    //   let energyData: any = [];
    //   nextProps.commonState.order.map((item: any) => {
    //     if (item.service == "Professional Movers") {
    //       moversData.push(item);
    //     }
    //     if (item.service == "Insurance") {
    //       insuranceData.push(item);
    //     }
    //     if (item.service == "Home Security") {
    //       securityData.push(item);
    //     }
    //     if (item.service == "Internet/Cable" || item.service == "TV") {
    //       internetData.push(item);
    //     }
    //     if (item.service == "Energy" || item.product_type == "Energy") {
    //       energyData.push(item);
    //     }
    //     if (item.service == "Solar" || item.product_type == "Solar") {
    //       solarData.push(item);
    //     }
    //     if (
    //       item.service == "Utilities" &&
    //       (item.product_type !== "Energy" || item.product_type !== "Solar")
    //     ) {
    //       utilitiesData.push(item);
    //     }
    //   });

    //   currentState.orders = nextProps.commonState.order;
    //   currentState.selectedMovers = moversData;
    //   currentState.selectedInsurance = insuranceData;
    //   currentState.selectedSecurity = securityData;
    //   currentState.selectedInternet = internetData;
    //   currentState.selectedUtilities = utilitiesData;
    //   currentState.selectedEnergy = energyData;
    //   currentState.selectedSolar = solarData;
    // }

    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.isGetMove
    // ) {
    //   // console.log("nextProps", nextProps.commonState.move[0])
    //   nextProps.commonState.isGetMove = false;

    //   currentState.destinationZip =
    //     nextProps.commonState.move[0].destination &&
    //     nextProps.commonState.move[0].destination.zip_code;
    //   currentState.destination_full_address =
    //     nextProps.commonState.move[0].destination_full_address;
    //   currentState.moveId = nextProps.commonState.move[0].id;

    //   const payload = {
    //     service: "",
    //     moveId: nextProps.commonState.move[0].id,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    //   nextProps.commonAction.getSkipService(payload);
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.getSkipService &&
      nextProps.commonState.isGetSkipService
    ) {
      nextProps.commonState.isGetSkipService = false;
      let skippedMovers: boolean = false;
      let skippedInsurance: boolean = false;
      let skippedSecurity: boolean = false;
      let skippedUtilities: boolean = false;
      let skippedInternet: boolean = false;
      let skippedEnergy: boolean = false;
      let skippedSolar: boolean = false;
      let skippedHomePros: boolean = false;
      let notInterestedMovers: boolean = false;
      let notInterestedInsurance: boolean = false;
      let notInterestedSecurity: boolean = false;
      let notInterestedUtilities: boolean = false;
      let notInterestedInternet: boolean = false;
      let notInterestedEnergy: boolean = false;
      let notInterestedSolar: boolean = false;
      let notInterestedHomePros: boolean = false;

      nextProps.commonState.getSkipService.map((item: any) => {
        if (item.service_name === "Professional Movers") {
          if (item.reason_type === "Skipped By CSR") {
            skippedMovers = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedMovers = true;
          }
        }
        if (item.service_name === "Insurance") {
          if (item.reason_type === "Skipped By CSR") {
            skippedInsurance = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedInsurance = true;
          }
        }
        if (item.service_name === "Home Security") {
          if (item.reason_type === "Skipped By CSR") {
            skippedSecurity = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedSecurity = true;
          }
        }
        if (item.service_name === "Internet/Cable") {
          if (item.reason_type === "Skipped By CSR") {
            skippedInternet = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedInternet = true;
          }
        }
        if (item.service_name === "Utilities") {
          if (item.reason_type === "Skipped By CSR") {
            skippedUtilities = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedUtilities = true;
          }
        }
        if (item.service_name === "Energy") {
          if (item.reason_type === "Skipped By CSR") {
            skippedEnergy = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedEnergy = true;
          }
        }
        if (item.service_name === "Solar") {
          if (item.reason_type === "Skipped By CSR") {
            skippedSolar = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedSolar = true;
          }
        }
        if (item.service_name === "Home Pros") {
          if (item.reason_type === "Skipped By CSR") {
            skippedHomePros = true;
          } else if (item.reason_type === "Not Interested") {
            notInterestedHomePros = true;
          }
        }
      });

      currentState.skippedMovers = skippedMovers;
      currentState.skippedInsurance = skippedInsurance;
      currentState.skippedSecurity = skippedSecurity;
      currentState.skippedUtilities = skippedUtilities;
      currentState.skippedInternet = skippedInternet;
      currentState.skippedEnergy = skippedEnergy;
      currentState.skippedSolar = skippedSolar;
      currentState.skippedHomePros = skippedHomePros;
      currentState.notInterestedMovers = notInterestedMovers;
      currentState.notInterestedInsurance = notInterestedInsurance;
      currentState.notInterestedSecurity = notInterestedSecurity;
      currentState.notInterestedUtilities = notInterestedUtilities;
      currentState.notInterestedInternet = notInterestedInternet;
      currentState.notInterestedEnergy = notInterestedEnergy;
      currentState.notInterestedSolar = notInterestedSolar;
      currentState.notInterestedHomePros = notInterestedHomePros;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.postSkipService &&
      nextProps.commonState.isPostSkipService
    ) {
      // const payload = {
      //   service: "",
      //   moveId: currentState.moveId,
      // };
      // nextProps.commonAction.getSkipService(payload);
      nextProps.commonState.isPostSkipService = false;
      let tabId: any;
      if (
        localStorage.getItem("nextTabId") &&
        localStorage.getItem("nextTabId") != null &&
        localStorage.getItem("nextTabId") != ""
      ) {
        tabId = localStorage.getItem("nextTabId");
      }
      console.log("nextTabId", tabId);
      if (tabId === "2") {
        if (
          currentState.selectedInsurance.length ||
          currentState.notInterestedInsurance
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/insurancestep2",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/insurancestep1",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "3") {
        if (
          currentState.selectedSecurity.length ||
          currentState.notInterestedSecurity
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/securitystep2",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/securitystep1",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "4") {
        if (
          currentState.selectedInternet.length ||
          currentState.notInterestedInternet
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/internetthankyou",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/internetstep2",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "5") {
        if (
          currentState.selectedUtilities.length ||
          currentState.notInterestedUtilities
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/utilitiesthankyou",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/utilitiesstep2",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "6") {
        if (
          currentState.selectedEnergy.length ||
          currentState.notInterestedEnergy
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/energystep2",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/energystep1",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "7") {
        if (
          currentState.selectedSolar.length ||
          currentState.notInterestedSolar
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/solarstep2",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/solarstep1",
            // state: nextProps.rowData,
          });
        }
      }
      if (tabId === "8") {
        if (
          currentState.selectedHomePros.length ||
          currentState.notInterestedHomePros
        ) {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/homeprosthankyou",
            // state: nextProps.rowData,
          });
        } else {
          nextProps.history.push({
            pathname: "/dashboard/concierge/workflow/homeprosstep2",
            // state: nextProps.rowData,
          });
        }
      }

      if (tabId === "9") {
        nextProps.history.push({
          pathname: "/dashboard/concierge/workflow/summarystep1",
          // state: nextProps.rowData,
        });
      }
      currentState.tabId = parseInt(tabId);
      currentState.skipModal = false;
    }
    return currentState;
  }

  confirmSkip = async (nextTabId: number) => {
    let serviceName: any = "";
    if (
      localStorage.getItem("skipServiceName") &&
      localStorage.getItem("skipServiceName") != null
    ) {
      serviceName = localStorage.getItem("skipServiceName");
    }
    if (this.state.moveId !== "" && this.state.reason !== "") {
      let payload: any = {
        move: this.state.moveId,
        service_name: serviceName,
        reason: this.state.reason,
        reason_type: "Skipped By CSR",
      };
      this.props.commonAction.postSkipService(payload);
    }
    // localStorage.setItem("nextTabId", nextTabId.toString());
    // await this.setState({ skipModal: false, tabId: nextTabId });
  };

  followUpSkip = () => {};

  handleChange = (newValue: any) => {
    // setValue(newValue);
    // setValue(parseInt(newValue.currentTarget.id.split("-")[2]));
    this.setState({
      tabValue: parseInt(newValue.currentTarget.id.split("-")[2]),
    });
  };

  render() {
    let userType: string = "";
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.user &&
      this.props.commonState.user.user_type
    ) {
      userType = this.props.commonState.user.user_type;
    }
    // console.log(this.props.tabId);

    let tabsList: any = [];
    tabsList = [
      {
        id: 1,
        name: "Discovery",
        icon:
          this.props.tabId && this.props.tabId > 1 ? (
            <CheckCircleOutlineRoundedIcon />
          ) : (
            <FlagIcon />
          ),
        pathname: "/dashboard/concierge/workflow/discovery",
        // tabId: 0,
        onClick: () => {
          this.setState({ tabId: 0 });
          this.props.history.push({
            pathname: "/dashboard/concierge/workflow/discovery",
            // state: this.props.rowData,
          });
        },
        className:
          this.props.tabId && this.props.tabId > 1
            ? "completed"
            : this.props.tabId && this.props.tabId === 1
            ? "selected"
            : "other",
      },
      {
        id: 2,
        name: "Movers",
        icon: this.state.selectedMovers.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <LocalShippingIcon />
        ),
        // pathname: !this.state.selectedMovers.length
        //   ? "/dashboard/concierge/workflow/moversstep1"
        //   : "/dashboard/concierge/workflow/moversthankyou",
        // tabId: 1,
        className:
          // this.props.tabId &&
          // this.props.tabId > 2 &&
          this.state.selectedMovers.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 2
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 2 &&
              this.state.selectedMovers.length === 0 &&
              this.state.skippedMovers
            ? "skipped"
            : this.props.tabId && this.props.tabId === 2
            ? "selected"
            : "other",
        onClick: () => {
          this.setState({ tabId: 1 });
          if (
            this.state.selectedMovers.length ||
            this.state.notInterestedMovers
          ) {
            this.props.history.push({
              pathname: "/dashboard/concierge/workflow/moversthankyou",
              // state: this.props.rowData,
            });
          } else {
            this.props.history.push({
              pathname: "/dashboard/concierge/workflow/moversstep1",
              state: this.state.selectedMovers,
            });
          }
        },
      },
      {
        id: 3,
        name: "Insurance",
        icon: this.state.selectedInsurance.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <SecurityIcon />
        ),
        // pathname: !this.state.selectedInsurance.length
        //   ? "/dashboard/concierge/workflow/insurancestep1"
        //   : "/dashboard/concierge/workflow/insurancestep2",
        tabId: 2,
        className:
          // this.props.tabId &&
          // this.props.tabId > 3 &&
          this.state.selectedInsurance.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 3
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 3 &&
              this.state.selectedInsurance.length === 0 &&
              this.state.skippedInsurance
            ? "skipped"
            : this.props.tabId && this.props.tabId === 3
            ? "selected"
            : "other",

        onClick: () => {
          console.log("hii");
          if (
            this.state.tabValue == 1 &&
            !this.state.selectedMovers.length &&
            !this.state.skippedMovers &&
            !this.state.notInterestedMovers
          ) {
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({
                skipModal: true,
                clickedTab: 2,
              });
            }
          } else {
            this.setState({ tabId: 2 });
            if (
              this.state.selectedInsurance.length ||
              this.state.notInterestedInsurance
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/insurancestep2",
                state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/insurancestep1",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 4,
        name: "Security",
        icon: this.state.selectedSecurity.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <LockIcon />
        ),
        // pathname: !this.state.selectedSecurity.length
        //   ? "/dashboard/concierge/workflow/securitystep1"
        //   : "/dashboard/concierge/workflow/securitystep2",
        tabId: 3,
        className:
          // this.props.tabId &&
          // this.props.tabId > 4 &&
          this.state.selectedSecurity.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 4
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 4 &&
              this.state.selectedSecurity.length === 0 &&
              this.state.skippedSecurity
            ? "skipped"
            : this.props.tabId && this.props.tabId === 4
            ? "selected"
            : "other",

        onClick: () => {
          console.log("hsgsg");
          if (
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 3 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 3 });
            }
          } else {
            this.setState({ tabId: 3 });
            if (
              this.state.selectedSecurity.length ||
              this.state.notInterestedSecurity
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/securitystep2",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/securitystep1",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 5,
        name: "Int/Cable",
        icon: this.state.selectedInternet.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <WifiIcon />
        ),
        // pathname: !this.state.selectedInternet.length
        //   ? "/dashboard/concierge/workflow/internetstep2"
        //   : "/dashboard/concierge/workflow/internetthankyou",
        tabId: 4,
        className:
          // this.props.tabId &&
          // this.props.tabId > 5 &&
          this.state.selectedInternet.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 5
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 5 &&
              this.state.selectedInternet.length === 0 &&
              this.state.skippedInternet
            ? "skipped"
            : this.props.tabId && this.props.tabId === 5
            ? "selected"
            : "other",

        onClick: () => {
          if (
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity
            ) {
              localStorage.setItem("skipServiceName", " Home Security");
              this.setState({ skipModal: true, clickedTab: 4 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 4 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 4 });
            }
          } else {
            this.setState({ tabId: 4 });
            if (
              this.state.selectedInternet.length ||
              this.state.notInterestedInternet
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/internetThankyou",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/internetstep2",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 6,
        name: "Utilities",
        icon: this.state.selectedUtilities.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <AcUnitIcon />
        ),
        // pathname: !this.state.selectedUtilities.length
        //   ? "/dashboard/concierge/workflow/utilitiesstep2"
        //   : "/dashboard/concierge/workflow/utilitiesthankyou",
        tabId: 5,
        className:
          // this.props.tabId &&
          // this.props.tabId > 6 &&
          this.state.selectedUtilities.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 6
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 6 &&
              this.state.selectedUtilities.length === 0 &&
              this.state.skippedUtilities
            ? "skipped"
            : this.props.tabId && this.props.tabId === 6
            ? "selected"
            : "other",

        onClick: () => {
          if (
            (this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet &&
              !this.state.notInterestedInternet) ||
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet
            ) {
              localStorage.setItem("skipServiceName", "Internet/Cable");
              this.setState({ skipModal: true, clickedTab: 5 });
            }
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity
            ) {
              localStorage.setItem("skipServiceName", "Home Security");
              this.setState({ skipModal: true, clickedTab: 5 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 5 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 5 });
            }
          } else {
            this.setState({ tabId: 5 });
            if (
              this.state.selectedUtilities.length ||
              this.state.notInterestedUtilities
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/utilitiesthankyou",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/utilitiesstep2",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 7,
        name: "Energy",
        icon: this.state.selectedEnergy.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <FormatPaintIcon />
        ),
        // pathname: !this.state.selectedEnergy.length
        //   ? "/dashboard/concierge/workflow/energystep1"
        //   : "/dashboard/concierge/workflow/energystep2",
        tabId: 6,
        className:
          // this.props.tabId &&
          // this.props.tabId > 7 &&
          this.state.selectedEnergy.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 7
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 7 &&
              this.state.selectedEnergy.length === 0 &&
              this.state.skippedEnergy
            ? "skipped"
            : this.props.tabId && this.props.tabId === 7
            ? "selected"
            : "other",

        onClick: () => {
          if (
            (this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities &&
              !this.state.notInterestedUtilities) ||
            (this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet &&
              !this.state.notInterestedInternet) ||
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities
            ) {
              localStorage.setItem("skipServiceName", "Utilities");
              this.setState({ skipModal: true, clickedTab: 6 });
            }
            if (
              this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet
            ) {
              localStorage.setItem("skipServiceName", "Internet/Cable");
              this.setState({ skipModal: true, clickedTab: 6 });
            }
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity
            ) {
              localStorage.setItem("skipServiceName", "Home Security");
              this.setState({ skipModal: true, clickedTab: 6 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 6 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 6 });
            }
          } else {
            this.setState({ tabId: 6 });
            if (
              this.state.selectedEnergy.length ||
              this.state.notInterestedEnergy
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/energystep2",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/energystep1",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 8,
        name: "Solar",
        icon: this.state.selectedSolar.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <WbSunnyIcon />
        ),
        // pathname: !this.state.selectedSolar.length
        //   ? "/dashboard/concierge/workflow/solarstep1"
        //   : "/dashboard/concierge/workflow/solarstep2",
        tabId: 7,
        className:
          // this.props.tabId &&
          // this.props.tabId > 8 &&
          this.state.selectedSolar.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 8
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 8 &&
              this.state.selectedSolar.length === 0 &&
              this.state.skippedSolar
            ? "skipped"
            : this.props.tabId && this.props.tabId === 8
            ? "selected"
            : "other",

        onClick: () => {
          if (
            (this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy &&
              !this.state.notInterestedEnergy) ||
            (this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities &&
              !this.state.notInterestedUtilities) ||
            (this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet &&
              !this.state.notInterestedInternet) ||
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy
            ) {
              localStorage.setItem("skipServiceName", "Energy");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
            if (
              this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities
            ) {
              localStorage.setItem("skipServiceName", "Utilities");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
            if (
              this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet
            ) {
              localStorage.setItem("skipServiceName", "Internet/Cable");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.selectedSecurity
            ) {
              localStorage.setItem("skipServiceName", "Home Security");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.selectedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 7 });
            }
          } else {
            this.setState({ tabId: 7 });
            if (
              this.state.selectedSolar.length ||
              this.state.notInterestedSolar
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/solarstep2",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/solarstep1",
                // state: this.props.rowData,
              });
            }
          }
        },
      },
      {
        id: 9,
        name: "Home Pros",
        icon: this.state.selectedHomePros.length ? (
          <CheckCircleOutlineRoundedIcon />
        ) : (
          <FormatPaintIcon />
        ),
        onClick: () => {
          if (
            (this.state.tabValue == 7 &&
              !this.state.selectedSolar.length &&
              !this.state.skippedSolar &&
              !this.state.notInterestedSolar) ||
            (this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy &&
              !this.state.notInterestedEnergy) ||
            (this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities &&
              !this.state.notInterestedUtilities) ||
            (this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet &&
              !this.state.notInterestedInternet) ||
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 7 &&
              !this.state.selectedSolar.length &&
              !this.state.skippedSolar
            ) {
              localStorage.setItem("skipServiceName", "Solar");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy
            ) {
              localStorage.setItem("skipServiceName", "Energy");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities
            ) {
              localStorage.setItem("skipServiceName", "Utilities");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet
            ) {
              localStorage.setItem("skipServiceName", "Internet/Cable");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity
            ) {
              localStorage.setItem("skipServiceName", "Home Security");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 8 });
            }
          } else {
            this.setState({ tabId: 8 });
            if (
              this.state.selectedHomePros.length ||
              this.state.notInterestedHomePros
            ) {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/homeprosthankyou",
                // state: this.props.rowData,
              });
            } else {
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/homeprosstep2",
                // state: this.props.rowData,
              });
            }
          }
        },
        // pathname: !this.state.selectedHomePros.length
        //   ? "/dashboard/concierge/workflow/homeprosstep1"
        //   : "/dashboard/concierge/workflow/homeprosthankyou",
        tabId: 8,
        className:
          // this.props.tabId &&
          // this.props.tabId > 9 &&
          this.state.selectedHomePros.length > 0 &&
          this.props.tabId &&
          this.props.tabId !== 9
            ? "completed"
            : this.props.tabId &&
              this.props.tabId !== 9 &&
              this.state.selectedHomePros.length === 0 &&
              this.state.skippedHomePros
            ? "skipped"
            : this.props.tabId && this.props.tabId === 9
            ? "selected"
            : "other",
      },
      {
        id: 10,
        name: "Summary",
        icon: <FlagIcon />,
        onClick: () => {
          if (
            (this.state.tabValue == 8 &&
              !this.state.selectedHomePros.length &&
              !this.state.skippedHomePros &&
              !this.state.notInterestedHomePros) ||
            (this.state.tabValue == 7 &&
              !this.state.selectedSolar.length &&
              !this.state.skippedSolar &&
              !this.state.notInterestedSolar) ||
            (this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy &&
              !this.state.notInterestedEnergy) ||
            (this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities &&
              !this.state.notInterestedUtilities) ||
            (this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet &&
              !this.state.notInterestedInternet) ||
            (this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity &&
              !this.state.notInterestedSecurity) ||
            (this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance &&
              !this.state.notInterestedInsurance) ||
            (this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers &&
              !this.state.notInterestedMovers)
          ) {
            if (
              this.state.tabValue == 8 &&
              !this.state.selectedHomePros.length &&
              !this.state.skippedHomePros
            ) {
              localStorage.setItem("skipServiceName", "Home Pros");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 7 &&
              !this.state.selectedSolar.length &&
              !this.state.skippedSolar
            ) {
              localStorage.setItem("skipServiceName", "Solar");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 6 &&
              !this.state.selectedEnergy.length &&
              !this.state.skippedEnergy
            ) {
              localStorage.setItem("skipServiceName", "Energy");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 5 &&
              !this.state.selectedUtilities.length &&
              !this.state.skippedUtilities
            ) {
              localStorage.setItem("skipServiceName", "Utilites");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 4 &&
              !this.state.selectedInternet.length &&
              !this.state.skippedInternet
            ) {
              localStorage.setItem("skipServiceName", "internet/Cable");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 3 &&
              !this.state.selectedSecurity.length &&
              !this.state.skippedSecurity
            ) {
              localStorage.setItem("skipServiceName", "Home Security");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 2 &&
              !this.state.selectedInsurance.length &&
              !this.state.skippedInsurance
            ) {
              localStorage.setItem("skipServiceName", "Insurance");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
            if (
              this.state.tabValue == 1 &&
              !this.state.selectedMovers.length &&
              !this.state.skippedMovers
            ) {
              localStorage.setItem("skipServiceName", "Professional Movers");
              this.setState({ skipModal: true, clickedTab: 9 });
            }
          } else {
            this.setState({ tabId: 9 });
            // if (this.state.orders.length) {
            this.props.history.push({
              pathname: "/dashboard/concierge/workflow/summarystep1",
              // state: this.props.rowData,
            });
            // }
          }
        },
        // pathname: "/dashboard/concierge/workflow/summarystep1",
        tabId: 9,
      },
    ];

    return (
      <div className="TabsButtonDivMain">
        {this.state.skipModal ? (
          <Modal
            isShowModal={this.state.skipModal}
            onCloseModal2={() => this.setState({ skipModal: false })}
            showClose={true}
            className="SkipModal"
          >
            <div className="SkipModalTitle">Looks like you are skipping</div>
            <div className="SkipModalSubTitle">
              Enter the reason to skip the flow.
            </div>

            <div className="inputDiv">
              <div className="inputTitle">Enter Reason</div>
              <CustomizedInput
                className="CustomInput"
                label="Enter Reason..."
                value={this.state.reason}
                onChange={(e: any) => this.setState({ reason: e.target.value })}
              />
            </div>

            <div className="SkipModalButton">
              <Button
                className="followUpButton"
                onClick={() => this.followUpSkip()}
                backgroundColor="#fff"
                color={"#465B74"}
              >
                Follow Up
              </Button>
              <Button
                className="confirmButton"
                onClick={() => this.confirmSkip(this.state.clickedTab)}
                color="#fff"
                backgroundColor={"#465B74"}
              >
                Confirm
              </Button>
            </div>
          </Modal>
        ) : null}
        {/* {tabsList &&
          tabsList.map((item: any) => {
            return (
              <div className="ButtonDiv">
                <Button
                  startLogo={
                    // this.props.tabId && this.props.tabId > item.id ? (
                    //   <CheckCircleOutlineRoundedIcon />
                    // ) : (
                    item.icon
                    // )
                  }
                  className={
                    this.props.tabName && this.props.tabName === `${item.name}`
                      ? "TabsButton-active"
                      : this.props.tabId && this.props.tabId > item.id
                      ? "TabsButton-completed"
                      : "TabsButton"
                  }
                  onClick={() => {
                    item.onClick();
                  }}
                  disabled={
                    !(
                      this.state.destinationZip &&
                      this.state.destination_full_address
                    )
                      ? true
                      : userType == "Home Security Expert"
                      ? item.tabName != "Security"
                      : false
                  }
                >
                  {item.name}
                </Button>
              </div>
            );
          })} */}
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tabValue}
            onChange={(e: any) => {
              if (this.state.destinationZip) {
                this.handleChange(e);
              }
            }}
            indicatorColor="primary"
            // textColor="primary"
            // variant="simple"
            aria-label="simple tabs example"
            TabIndicatorProps={{ style: { background: "transparent" } }}
          >
            {tabsList &&
              tabsList.map((item: any) => {
                return (
                  <Tab
                    // component={Link}
                    // to={{
                    //   pathname: item.pathname,
                    // }}
                    onClick={() => item.onClick()}
                    disabled={
                      !(
                        this.state.destinationZip &&
                        this.state.destination_full_address
                      )
                        ? true
                        : userType == "Home Security Expert"
                        ? item.tabName != "Security"
                        : false
                    }
                    label={item.name}
                    icon={item.icon}
                    {...a11yProps(this.state.tabId)}
                    className={item.className}
                  />
                  // <div className="ButtonDiv">
                  //   <Button
                  //     startLogo={
                  //       // this.props.tabId && this.props.tabId > item.id ? (
                  //       //   <CheckCircleOutlineRoundedIcon />
                  //       // ) : (
                  //       item.icon
                  //       // )
                  //     }
                  //     className={
                  //       this.props.tabName &&
                  //       this.props.tabName === `${item.name}`
                  //         ? "TabsButton-active"
                  //         : this.props.tabId && this.props.tabId > item.id
                  //         ? "TabsButton-completed"
                  //         : "TabsButton"
                  //     }
                  //     onClick={() => {
                  //       item.onClick();
                  //     }}
                  //     disabled={
                  //       !(
                  //         this.state.destinationZip &&
                  //         this.state.destination_full_address
                  //       )
                  //         ? true
                  //         : userType == "Home Security Expert"
                  //         ? item.tabName != "Security"
                  //         : false
                  //     }
                  //   >
                  //     {item.name}
                  //   </Button>
                  // </div>
                );
              })}
          </Tabs>
        </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConcieregeTabs);
