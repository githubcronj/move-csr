import React from "react";
import "./summaryStep1.scss";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import SummaryFirstCard from "../../components/summary/SummaryFirstCard";
import * as CommonAction from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MoversAction from "../../store/move/actions";
import TableComponent from "../../components/atoms/Table/Table";
import Modal from "../../components/atoms/Modal";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  history?: any;
  commonState?: any;
  commonAction?: any;
  moversState?: any;
  moversAction?: any;
};

type initialState = {
  listContent: any;
  showModal: boolean;
  name: string;
  email: string;
  isDataArrived: boolean;
  selectedMovers: any;
  selectedInsurance: any;
  selectedSecurity: any;
  selectedUtilities: any;
  selectedInternet: any;
  selectedEnergy: any;
  selectedSolar: any;
  selectedHomePros: any;
  moveId: string;
  CancelMoversOrder: boolean;
  cancelEntireOrderModal: boolean;
  CancelUtilitiesOrder: boolean;
  CancelInsuranceOrder: boolean;
  CancelSecurityOrder: boolean;
  CancelEnergyOrder: boolean;
  CancelSolarOrder: boolean;
  CancelHomeProsOrder: boolean;
  loader: boolean;
  skippedMovers: boolean;
  skippedInsurance: boolean;
  skippedSecurity: boolean;
  skippedInternet: boolean;
  skippedUtilities: boolean;
  skippedEnergy: boolean;
  skippedSolar: boolean;
  skippedHomePros: boolean;
  notInterestedMovers: boolean;
  notInterestedInsurance: boolean;
  notInterestedSecurity: boolean;
  notInterestedInternet: boolean;
  notInterestedUtilities: boolean;
  notInterestedEnergy: boolean;
  notInterestedSolar: boolean;
  notInterestedHomePros: boolean;
};

class SummaryFinal extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: ["To summarise, you have chosen:"],
    showModal: false,
    name: "",
    email: "",
    isDataArrived: true,
    selectedMovers: [],
    selectedInsurance: [],
    selectedSecurity: [],
    selectedUtilities: [],
    selectedInternet: [],
    selectedEnergy: [],
    selectedSolar: [],
    selectedHomePros: [],
    moveId: "",
    CancelMoversOrder: false,
    cancelEntireOrderModal: false,
    CancelUtilitiesOrder: false,
    CancelInsuranceOrder: false,
    CancelSecurityOrder: false,
    CancelEnergyOrder: false,
    CancelSolarOrder: false,
    CancelHomeProsOrder: false,
    loader: true,
    skippedMovers: false,
    skippedInsurance: false,
    skippedSecurity: false,
    skippedInternet: false,
    skippedUtilities: false,
    skippedEnergy: false,
    skippedSolar: false,
    skippedHomePros: false,
    notInterestedMovers: false,
    notInterestedInsurance: false,
    notInterestedSecurity: false,
    notInterestedInternet: false,
    notInterestedUtilities: false,
    notInterestedEnergy: false,
    notInterestedSolar: false,
    notInterestedHomePros: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
      this.setState({
        moveId: data.id,
      });
      const payload = {
        // service: "Movers",
        service: "",
        moveId: data.id,
        isCompleted: true,
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

      this.props.commonState.getSkipService.map((item: any) => {
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

      this.setState({
        skippedMovers,
        skippedInsurance,
        skippedSecurity,
        skippedUtilities,
        skippedInternet,
        skippedEnergy,
        skippedSolar,
        skippedHomePros,
        notInterestedMovers,
        notInterestedInsurance,
        notInterestedSecurity,
        notInterestedUtilities,
        notInterestedInternet,
        notInterestedEnergy,
        notInterestedSolar,
        notInterestedHomePros,
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      let moveId = cur.move[0] && cur.move[0].id;
      let first_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.first_name;
      let last_name =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.last_name;
      let email =
        cur.move[0] && cur.move[0].user_ref && cur.move[0].user_ref.email;
      this.setState({
        name: first_name.concat(" " + last_name),
        email: email,
        moveId: moveId,
      });
      const payload = {
        // service: "Movers",
        service: "",
        moveId: moveId,
        isCompleted: true,
      };
      this.props.commonAction.orderGet(payload);
    }

    if (prev.getSkipService !== cur.getSkipService && cur.getSkipService) {
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

      this.props.commonState.getSkipService.map((item: any) => {
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

      this.setState({
        skippedMovers,
        skippedInsurance,
        skippedSecurity,
        skippedUtilities,
        skippedInternet,
        skippedEnergy,
        skippedSolar,
        skippedHomePros,
        notInterestedMovers,
        notInterestedInsurance,
        notInterestedSecurity,
        notInterestedUtilities,
        notInterestedInternet,
        notInterestedEnergy,
        notInterestedSolar,
        notInterestedHomePros,
      });
    }

    const prevMover = prevProps && prevProps.moversState;
    const curMover = this.props && this.props.moversState;
    if (
      prevMover.cancelEntireMoverOrder !== curMover.cancelEntireMoverOrder &&
      curMover.cancelEntireMoverOrder !== null
    ) {
      if (this.state.moveId && this.state.moveId !== "") {
        const payload1 = {
          service: "",
          moveId: this.state.moveId,
          isComplete: true,
        };
        this.props.commonAction.orderGet(payload1);
      }

      this.setState({
        CancelMoversOrder: false,
        CancelUtilitiesOrder: false,
        cancelEntireOrderModal: false,
        CancelInsuranceOrder: false,
        CancelSecurityOrder: false,
        CancelEnergyOrder: false,
        CancelSolarOrder: false,
        CancelHomeProsOrder: false,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.move[0].id &&
    //   // currentState.isDataArrived
    //   nextProps.commonState.isGetMove
    // ) {
    //   // currentState.isDataArrived = false;
    //   nextProps.commonState.isGetMove = false;
    //   const data =
    //     nextProps.commonState &&
    //     nextProps.commonState.move &&
    //     nextProps.commonState.move.length > 0 &&
    //     nextProps.commonState.move[0];
    //   let first_name = data && data.user_ref && data.user_ref.first_name;
    //   let last_name = data && data.user_ref && data.user_ref.last_name;
    //   let email = data && data.user_ref && data.user_ref.email;
    //   currentState.name = first_name.concat(" " + last_name);
    //   currentState.email = email;
    //   let moveId = data && data.id;
    //   const payload = {
    //     service: "",
    //     moveId: moveId,
    //     isComplete: true,
    //   };
    //   nextProps.commonAction.orderGet(payload);
    // }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.order &&
      // nextProps.commonState.order.length &&
      nextProps.commonState.orderDataArrived
    ) {
      let moversData: any = [];
      let insuranceData: any = [];
      let securityData: any = [];
      let internetData: any = [];
      let utilitiesData: any = [];
      let solarData: any = [];
      let energyData: any = [];
      let homeProsData: any = [];
      nextProps.commonState.order.map((item: any) => {
        if (
          item.service == "Professional Movers" ||
          item.service == "DIY Move"
        ) {
          moversData.push(item);
        }
        if (item.service == "Insurance") {
          insuranceData.push(item);
        }
        if (item.service == "Home Security") {
          securityData.push(item);
        }
        // console.log(item.service);
        if (item.service == "Internet/Cable" || item.service == "TV") {
          // console.log(item.service);
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
        if (item.service == "Home Pros") {
          // console.log(item.service);
          homeProsData.push(item);
        }
      });

      currentState.selectedMovers = moversData;
      currentState.selectedInsurance = insuranceData;
      currentState.selectedSecurity = securityData;
      currentState.selectedInternet = internetData;
      currentState.selectedUtilities = utilitiesData;
      currentState.selectedEnergy = energyData;
      currentState.selectedSolar = solarData;
      currentState.selectedHomePros = homeProsData;
      currentState.loader = false;
    }
    return currentState;
  }

  confirmCancleEntireOrderHandler = () => {
    let orders: any = [];
    if (this.state.CancelMoversOrder) {
      this.state.selectedMovers &&
        this.state.selectedMovers.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelUtilitiesOrder) {
      this.state.selectedUtilities &&
        this.state.selectedUtilities.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelInsuranceOrder) {
      this.state.selectedInsurance &&
        this.state.selectedInsurance.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelSecurityOrder) {
      this.state.selectedSecurity &&
        this.state.selectedSecurity.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelEnergyOrder) {
      this.state.selectedEnergy &&
        this.state.selectedEnergy.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelSolarOrder) {
      this.state.selectedSolar &&
        this.state.selectedSolar.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    } else if (this.state.CancelHomeProsOrder) {
      this.state.selectedHomePros &&
        this.state.selectedHomePros.map((item: any) => {
          orders.push(item.id);
          return orders;
        });
    }

    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  warmTransferHandler = () => {};
  confirmCancleEntireOrderHandlerInternet = () => {
    let orders: any = [];

    this.state.selectedInternet &&
      this.state.selectedInternet.map((item: any) => {
        orders.push(item.id);
        return orders;
      });

    let payload = {
      orders: orders,
    };
    this.props.moversAction.cancelEntireMoverOrder(payload);
  };

  moversColumns = [
    {
      title: "Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      field: "selectedProviders",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.name}</div>;
      },
    },
    {
      title: "Contact details",
      field: "contactDetails",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.phone_no}</div>;
      },
    },
    {
      title: "MoveEasy ID",
      field: "order_id",
      sorting: false,
    },
  ];

  insuranceColumns = [
    {
      title: "Action",
      // field: "product_type",
      sorting: false,
    },
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

  securityColumns = [
    {
      title: "Action",
      // field: "product_type",
      sorting: false,
    },
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

  internetColumns = [
    {
      title: "Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      // field: "selectedProviders",
      sorting: false,
      render: (rowData: any) => {
        return (
          <div>{rowData.plan_detail && rowData.plan_detail.provider_name}</div>
        );
      },
    },
    {
      title: "Order No",
      field: "order_id",
      sorting: false,
    },
    {
      title: "Installation Date",
      field: "install_date",
      sorting: false,
    },
    {
      title: "Contact Number",
      // field: "",
      sorting: false,
      render: (rowData: any) => {
        return <div>{rowData.created_by && rowData.created_by.phone}</div>;
      },
    },
  ];

  utilitiesColumns = [
    {
      title: "Selected utilities",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Selected providers",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.name}</div>;
      },
    },
    {
      title: "Phone number",
      // field: "created_by",
      sorting: false,
      render: (row: any) => {
        return <div>{row.plan_detail && row.plan_detail.phone}</div>;
      },
    },
    {
      title: "Order number",
      field: "order_id",
      sorting: false,
    },
  ];

  energyColumns = [
    {
      title: "Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Scheduled date",
      field: "appointment_date",
      sorting: false,
      // render: (row: any) => {
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

  solarColumns = [
    {
      title: "Type",
      field: "product_type",
      sorting: false,
    },
    {
      title: "Scheduled date",
      field: "appointment_date",
      sorting: false,
      // render: (row: any) => {
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

  homeProsColumns = [
    {
      title: "Order no.",
      field: "order_id",
      sorting: false,
    },
    {
      title: "Service Requested",
      // field: "order_id",
      sorting: false,
      render: (rowData: any) =>
        rowData &&
        rowData.plan_detail &&
        rowData.plan_detail.home_pros &&
        rowData.plan_detail.home_pros.map((item: any) => {
          return <div>{item}</div>;
        }),
    },
  ];

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>
        {this.state.CancelMoversOrder ||
        this.state.CancelUtilitiesOrder ||
        this.state.CancelInsuranceOrder ||
        this.state.CancelSecurityOrder ||
        this.state.CancelSolarOrder ||
        this.state.CancelHomeProsOrder ||
        this.state.CancelEnergyOrder ? (
          <Modal
            isShowModal={
              this.state.CancelMoversOrder ||
              this.state.CancelUtilitiesOrder ||
              this.state.CancelInsuranceOrder ||
              this.state.CancelSecurityOrder ||
              this.state.CancelSolarOrder ||
              this.state.CancelHomeProsOrder ||
              this.state.CancelEnergyOrder
            }
            onCloseModal2={() =>
              this.setState({
                CancelMoversOrder: false,
                CancelUtilitiesOrder: false,
                CancelInsuranceOrder: false,
                CancelSecurityOrder: false,
                CancelEnergyOrder: false,
                CancelSolarOrder: false,
                CancelHomeProsOrder: false,
              })
            }
            showClose={false}
            className="OpenModalMovers"
          >
            <div className="OpenModal-main">
              <div className="OpenModal-job">Cancellation confirmation</div>
              <div>
                <div className="order-confirmation-number">
                  Do you really want to cancel the order made for this customer?
                </div>
                <div className="OpenModal-job">
                  {this.state.CancelMoversOrder
                    ? `${this.state.selectedMovers.length} units will be deducted`
                    : this.state.CancelUtilitiesOrder
                    ? `${this.state.selectedUtilities.length} units will be deducted`
                    : this.state.selectedInsurance
                    ? `${this.state.selectedInsurance.length} units will be deducted`
                    : this.state.selectedSecurity
                    ? `${this.state.selectedSecurity.length} units will be deducted`
                    : this.state.selectedEnergy
                    ? `${this.state.selectedEnergy.length} units will be deducted`
                    : this.state.selectedSolar
                    ? `${this.state.selectedSolar.length} units will be deducted`
                    : this.state.selectedHomePros
                    ? `${this.state.selectedHomePros.length} units will be deducted`
                    : ""}
                </div>
              </div>
              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() =>
                    this.setState({
                      CancelMoversOrder: false,
                      CancelUtilitiesOrder: false,
                      CancelInsuranceOrder: false,
                      CancelSecurityOrder: false,
                      CancelEnergyOrder: false,
                      CancelSolarOrder: false,
                      CancelHomeProsOrder: false,
                    })
                  }
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Go Back
                </Button>
                <Button
                  className="confirmButton"
                  onClick={() => this.confirmCancleEntireOrderHandler()}
                  color="#fff"
                  // backgroundColor={"#465B74"}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        {this.state.cancelEntireOrderModal ? (
          <Modal
            isShowModal={this.state.cancelEntireOrderModal}
            onCloseModal2={() =>
              this.setState({
                cancelEntireOrderModal: false,
              })
            }
            showClose={false}
            className="OpenModalMovers"
          >
            {/* {console.log(this.state.selectedInternet)} */}
            <div className="OpenModal-main">
              <div className="OpenModal-job">Cancellation confirmation</div>
              {/* {true ? (
                // this.state.cancelOrder && this.state.rowData
                <div>
                  <div className="order-confirmation-number">
                    Do you really want to cancel this order?
                  </div>
                  <div className="order-confirmation-number">
                    Selected provider:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {this.state.rowData.selectedProviders} 
                    </span>
                  </div>
                  <div className="order-confirmation-number">
                    Service type :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {this.state.rowData.type} 
                    </span>
                  </div>
                </div>
              ) : ( */}
              <div>
                <div className="order-confirmation-number">
                  Do you really want to cancel the order made for this customer?
                </div>
                <div className="OpenModal-job">{`${this.state.selectedInternet.length} units will be deducted`}</div>
              </div>
              {/* // )} */}

              <div className="OrderSaveButton">
                <Button
                  className="Button1"
                  onClick={() =>
                    this.setState({ cancelEntireOrderModal: false })
                  }
                  color="#fff"
                  backgroundColor={"#465B74"}
                >
                  Go Back
                </Button>
                <Button
                  className="confirmButton"
                  onClick={() => this.confirmCancleEntireOrderHandlerInternet()}
                  color="#fff"
                  // backgroundColor={"#465B74"}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        <div>
          <ConciergeTabs
            tabName={"Summary"}
            tabId={10}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="summary1-first-card">
            <SummaryFirstCard
              name={this.state.name}
              email={this.state.email}
              time="03:20 hrs"
              amount="$123.99"
            />
          </div>
        </div>
        <div className="componetContent">
          <div className="summary1-main">
            <div className="summary1-heading">
              <div className="summary1">Order Summary </div>
            </div>
          </div>

          {this.state.loader ? (
            <CircularProgress />
          ) : (
            <div>
              {this.state.skippedMovers ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Movers (${this.state.selectedMovers.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedMovers}
                      columns={this.moversColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedMovers.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedMovers
                          ? "not Interested"
                          : this.state.skippedMovers
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      onClick={() => {
                        if (!this.state.selectedMovers.length) {
                          this.props.history.push({
                            pathname:
                              "/dashboard/concierge/workflow/moversstep4",
                            state: {
                              selectedFullService: true,
                            },
                          });
                        }
                      }}
                      style={{
                        opacity: this.state.selectedMovers.length ? "0.5" : "1",
                        cursor: this.state.selectedMovers.length
                          ? "default"
                          : "pointer",
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      onClick={() => {
                        if (this.state.selectedMovers.length > 0) {
                          this.setState({
                            CancelMoversOrder: true,
                            CancelUtilitiesOrder: false,
                            CancelInsuranceOrder: false,
                            CancelSecurityOrder: false,
                            CancelEnergyOrder: false,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: false,
                          });
                        }
                      }}
                      style={{
                        opacity:
                          this.state.selectedMovers.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedMovers.length < 1
                            ? "default"
                            : "pointer",
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {this.state.skippedInsurance ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Insurance (${this.state.selectedInsurance.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedInsurance}
                      columns={this.insuranceColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedInsurance.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedInsurance
                          ? "not Interested"
                          : this.state.skippedInsurance
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      style={{
                        opacity:
                          this.state.selectedInsurance.length > 0 ? "0.5" : "1",
                        cursor:
                          this.state.selectedInsurance.length > 0
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (!this.state.selectedInsurance.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/insurancestep1"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        opacity:
                          this.state.selectedInsurance.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedInsurance.length < 1
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (this.state.selectedInsurance.length > 0) {
                          this.setState({
                            CancelMoversOrder: false,
                            CancelUtilitiesOrder: false,
                            CancelInsuranceOrder: true,
                            CancelSecurityOrder: false,
                            CancelEnergyOrder: false,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: false,
                          });
                        }
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {this.state.skippedSecurity ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Security (${this.state.selectedSecurity.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedSecurity}
                      columns={this.securityColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedSecurity.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedSecurity
                          ? "not Interested"
                          : this.state.skippedSecurity
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      style={{
                        opacity:
                          this.state.selectedSecurity.length > 0 ? "0.5" : "1",
                        cursor:
                          this.state.selectedSecurity.length > 0
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (!this.state.selectedSecurity.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/securitystep1"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        opacity:
                          this.state.selectedSecurity.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedSecurity.length < 1
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (this.state.selectedSecurity.length > 0) {
                          this.setState({
                            CancelMoversOrder: false,
                            CancelUtilitiesOrder: false,
                            CancelInsuranceOrder: false,
                            CancelSecurityOrder: true,
                            CancelEnergyOrder: false,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: false,
                          });
                        }
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {this.state.skippedInternet ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Internet (${this.state.selectedInternet.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedInternet}
                      columns={this.internetColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedInternet.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedInternet
                          ? "not Interested"
                          : this.state.skippedInternet
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      onClick={
                        this.state.selectedInternet.length < 3
                          ? () =>
                              this.props.history.push(
                                "/dashboard/concierge/workflow/internetstep1"
                              )
                          : () => null
                      }
                      style={{
                        opacity:
                          this.state.selectedInternet.length < 3 ? "0.5" : "1",
                        cursor:
                          this.state.selectedInternet.length < 3
                            ? "default"
                            : "pointer",
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        opacity:
                          this.state.selectedInternet.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedInternet.length < 1
                            ? "default"
                            : "pointer",
                      }}
                      onClick={
                        this.state.selectedInternet.length < 1
                          ? () => null
                          : () =>
                              this.setState({ cancelEntireOrderModal: true })
                      }
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {this.state.skippedUtilities ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Utilities (${this.state.selectedUtilities.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedUtilities}
                      columns={this.utilitiesColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedUtilities.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedUtilities
                          ? "not Interested"
                          : this.state.skippedUtilities
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      onClick={() => {
                        if (!this.state.selectedUtilities.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/utilitiesstep2"
                          );
                        }
                      }}
                      style={{
                        opacity: this.state.selectedUtilities.length
                          ? "0.5"
                          : "1",
                        cursor: this.state.selectedUtilities.length
                          ? "default"
                          : "pointer",
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        cursor:
                          this.state.selectedUtilities.length < 1
                            ? "default"
                            : "pointer",
                        opacity:
                          this.state.selectedUtilities.length < 1 ? "0.5" : "1",
                      }}
                      onClick={() => {
                        if (this.state.selectedUtilities.length > 0) {
                          this.setState({
                            CancelMoversOrder: false,
                            CancelUtilitiesOrder: true,
                            CancelInsuranceOrder: false,
                            CancelSecurityOrder: false,
                            CancelEnergyOrder: false,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: false,
                          });
                        }
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {this.state.skippedEnergy ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Energy (${this.state.selectedEnergy.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedEnergy}
                      columns={this.energyColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedEnergy.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedEnergy
                          ? "not Interested"
                          : this.state.skippedEnergy
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      style={{
                        opacity:
                          this.state.selectedEnergy.length > 0 ? "0.5" : "1",
                        cursor:
                          this.state.selectedEnergy.length > 0
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (!this.state.selectedEnergy.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/energystep1"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        opacity:
                          this.state.selectedEnergy.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedEnergy.length < 1
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (this.state.selectedEnergy.length > 0) {
                          this.setState({
                            CancelMoversOrder: false,
                            CancelUtilitiesOrder: false,
                            CancelInsuranceOrder: false,
                            CancelSecurityOrder: false,
                            CancelEnergyOrder: true,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: false,
                          });
                        }
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}

              {/* {this.state.skippedSolar ? null : ( */}
              <div className="OrderSummaryDiv">
                <div className="OrderSummary">{`Solar (${this.state.selectedSolar.length})`}</div>
                <div className="SummaryTableDiv">
                  <TableComponent
                    data={this.state.selectedSolar}
                    columns={this.solarColumns}
                    className="SummaryTable"
                    // onRowClick={() => console.log("hii")}
                    pageSize={this.state.selectedSolar.length}
                    nopagination
                    noDataMessage={
                      this.state.notInterestedSolar
                        ? "not Interested"
                        : this.state.skippedSolar
                        ? "skipped by csr"
                        : ""
                    }
                  />
                </div>
                <div className="summaryButtonDiv">
                  <div
                    className="summaryEditButton"
                    style={{
                      opacity:
                        this.state.selectedSolar.length > 0 ? "0.5" : "1",
                      cursor:
                        this.state.selectedSolar.length > 0
                          ? "default"
                          : "pointer",
                    }}
                    onClick={() => {
                      if (!this.state.selectedSolar.length) {
                        this.props.history.push(
                          "/dashboard/concierge/workflow/solarstep1"
                        );
                      }
                    }}
                  >
                    Edit Order
                  </div>
                  <div
                    className="summaryCancleButton"
                    style={{
                      opacity:
                        this.state.selectedSolar.length < 1 ? "0.5" : "1",
                      cursor:
                        this.state.selectedSolar.length < 1
                          ? "default"
                          : "pointer",
                    }}
                    onClick={() => {
                      if (this.state.selectedSolar.length > 0) {
                        this.setState({
                          CancelMoversOrder: false,
                          CancelUtilitiesOrder: false,
                          CancelInsuranceOrder: false,
                          CancelSecurityOrder: false,
                          CancelEnergyOrder: false,
                          CancelSolarOrder: true,
                          CancelHomeProsOrder: false,
                        });
                      }
                    }}
                  >
                    Cancel Entire Order
                  </div>
                </div>
              </div>
              {/* )} */}
              {this.state.skippedHomePros ? null : (
                <div className="OrderSummaryDiv">
                  <div className="OrderSummary">{`Home Pros (${this.state.selectedHomePros.length})`}</div>
                  <div className="SummaryTableDiv">
                    <TableComponent
                      data={this.state.selectedHomePros}
                      columns={this.homeProsColumns}
                      className="SummaryTable"
                      // onRowClick={() => console.log("hii")}
                      pageSize={this.state.selectedHomePros.length}
                      nopagination
                      noDataMessage={
                        this.state.notInterestedHomePros
                          ? "not Interested"
                          : this.state.skippedHomePros
                          ? "skipped by csr"
                          : ""
                      }
                    />
                  </div>
                  <div className="summaryButtonDiv">
                    <div
                      className="summaryEditButton"
                      style={{
                        opacity:
                          this.state.selectedHomePros.length > 0 ? "0.5" : "1",
                        cursor:
                          this.state.selectedHomePros.length > 0
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (!this.state.selectedHomePros.length) {
                          this.props.history.push(
                            "/dashboard/concierge/workflow/homeprosstep2"
                          );
                        }
                      }}
                    >
                      Edit Order
                    </div>
                    <div
                      className="summaryCancleButton"
                      style={{
                        opacity:
                          this.state.selectedHomePros.length < 1 ? "0.5" : "1",
                        cursor:
                          this.state.selectedHomePros.length < 1
                            ? "default"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (this.state.selectedHomePros.length > 0) {
                          this.setState({
                            CancelMoversOrder: false,
                            CancelUtilitiesOrder: false,
                            CancelInsuranceOrder: false,
                            CancelSecurityOrder: false,
                            CancelEnergyOrder: false,
                            CancelSolarOrder: false,
                            CancelHomeProsOrder: true,
                          });
                        }
                      }}
                    >
                      Cancel Entire Order
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(CommonAction, dispatch),
    moversAction: bindActionCreators(MoversAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  moversState: state.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinal);
