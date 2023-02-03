import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./StatisticsHub.scss";
import StatisticsCard from "../../components/Statistics/StatisticsCard";
import TableStatisticsNew from "../../components/atoms/Table/Tables";
import * as AnalyticsActions from "../../store/analytics/actions";
import * as CommonActions from "../../store/common/actions";
import SearchComponent from "../../components/atoms/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

type initialProps = {
  history: any;
  analyticsAction: any;
  analyticsState: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  aggregateSales: boolean;
  individualSales: boolean;
  digitalReport: boolean;
  digitalReportByProviders: boolean;
  aggregateSalesData: any;
  overallUnitSalesData: any;
  digitalUnitSalesData: any;
  digitalUnitbyProvidersData: any;
  aggregateSalesStatsData: any;
  overallUnitSalesStatsData: any;
  digitalUnitSalesStatsData: any;
  digitalUnitbyProvidersStatsData: any;
  val: string;
  anchorEl: any;
  sortBy: string;
  sortedBy: string;
  menuList: any;
  sortedByOverall: string;
  page: number;
  brokerageOptions: any;
  brokerageValue: any;
  open: boolean;
  dateRange: any;
  startDate: any;
  endDate: any;
};

class StatisticsHub extends Component<initialProps, initialState> {
  state: initialState = {
    aggregateSales: true,
    individualSales: false,
    digitalReport: false,
    digitalReportByProviders: false,
    aggregateSalesData: [],
    overallUnitSalesData: [],
    digitalUnitSalesData: [],
    digitalUnitbyProvidersData: [],
    aggregateSalesStatsData: [],
    overallUnitSalesStatsData: [],
    digitalUnitSalesStatsData: [],
    digitalUnitbyProvidersStatsData: [],
    val: "",
    anchorEl: null,
    sortBy: "Nov 2021",
    sortedBy: "",
    sortedByOverall: "",
    menuList: [
      {
        name: "October 2021",
        value: "October 2021",
      },
      {
        name: "Nov 2021",
        value: "Nov 2021",
      },
    ],
    page: 1,
    brokerageOptions: [],
    brokerageValue: "",
    open: false,
    dateRange: {},
    startDate: "",
    endDate: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let payload = {
      startDate: "",
      endDate: "",
    };
    this.props.analyticsAction.getAggregateSale(payload);
    this.props.analyticsAction.getOverallUnitSale(payload);
    this.props.analyticsAction.getDigitalUnitSale(payload);
    this.props.analyticsAction.getDigitalUnitByProviders(payload);
    this.props.analyticsAction.getAggregateSaleStats(payload);
    this.props.analyticsAction.getOverallUnitSaleStats(payload);
    this.props.analyticsAction.getDigitalUnitSaleStats(payload);
    this.props.analyticsAction.getDigitalUnitByProvidersStats(payload);
    this.props.commonAction.brokerageGet({
      key: "",
    });
  }

  componentDidUpdate(prevProps: any) {
    let prev: any = prevProps.analyticsState;
    let cur: any = this.props.analyticsState;

    if (
      prev.getAggregateSale !== cur.getAggregateSale &&
      cur.getAggregateSale &&
      cur.isGetAggregateSale
    ) {
      cur.isGetAggregateSale = false;
      let AggregateSalesData: any = [];
      AggregateSalesData = cur.getAggregateSale;
      this.setState({ aggregateSalesData: AggregateSalesData });
    }

    if (
      prev.getOverallUnitSale !== cur.getOverallUnitSale &&
      cur.getOverallUnitSale &&
      cur.isGetOverallUnitSale
    ) {
      cur.isGetOverallUnitSale = false;
      let overallunitSalesData: any = [];
      overallunitSalesData = cur.getOverallUnitSale;
      this.setState({ overallUnitSalesData: overallunitSalesData });
    }
    if (
      prev.getDigitalUnitSale !== cur.getDigitalUnitSale &&
      cur.getDigitalUnitSale &&
      cur.isGetDigitalUnitSale
    ) {
      cur.isGetDigitalUnitSale = false;
      let digitalunitSalesData: any = [];
      digitalunitSalesData = cur.getDigitalUnitSale;
      this.setState({ digitalUnitSalesData: digitalunitSalesData });
    }
    if (
      prev.getDigitalUnitByProviders !== cur.getDigitalUnitByProviders &&
      cur.getDigitalUnitByProviders &&
      cur.isGetDigitalUnitByProviders
    ) {
      cur.isGetDigitalUnitByProviders = false;
      let digitalunitByProvidersData: any = [];
      digitalunitByProvidersData = cur.getDigitalUnitByProviders;
      this.setState({ digitalUnitbyProvidersData: digitalunitByProvidersData });
    }

    if (
      prevProps.commonState.brokerage !== this.props.commonState.brokerage &&
      this.props.commonState.brokerage &&
      this.props.commonState.brokerageDataArrived
    ) {
      this.props.commonState.brokerageDataArrived = false;
      let brokerageData: any = [];
      this.props.commonState.brokerage.map((item: any) => {
        brokerageData.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({ brokerageOptions: brokerageData });
    }
    if (
      prev.getAggregateSaleStats !== cur.getAggregateSaleStats &&
      cur.getAggregateSaleStats &&
      cur.isGetAggregateSaleStats
    ) {
      cur.isGetAggregateSaleStats = false;
      let AggregateSalesStatsData: any = [];
      AggregateSalesStatsData = cur.getAggregateSaleStats;
      this.setState({ aggregateSalesStatsData: AggregateSalesStatsData });
    }

    if (
      prev.getOverallUnitSaleStats !== cur.getOverallUnitSaleStats &&
      cur.getOverallUnitSaleStats &&
      cur.isGetOverallUnitSaleStats
    ) {
      cur.isGetOverallUnitSaleStats = false;
      let overallunitSalesStatsData: any = [];
      overallunitSalesStatsData = cur.getOverallUnitSaleStats;
      this.setState({ overallUnitSalesStatsData: overallunitSalesStatsData });
    }
    if (
      prev.getDigitalUnitSaleStats !== cur.getDigitalUnitSaleStats &&
      cur.getDigitalUnitSaleStats &&
      cur.isGetDigitalUnitSaleStats
    ) {
      cur.isGetDigitalUnitSaleStats = false;
      let digitalunitSalesStatsData: any = [];
      digitalunitSalesStatsData = cur.getDigitalUnitSaleStats;
      this.setState({ digitalUnitSalesStatsData: digitalunitSalesStatsData });
    }
    if (
      prev.getDigitalUnitByProvidersStats !==
        cur.getDigitalUnitByProvidersStats &&
      cur.getDigitalUnitByProvidersStats &&
      cur.isGetDigitalUnitByProvidersStats
    ) {
      cur.isGetDigitalUnitByProvidersStats = false;
      let digitalunitByProvidersStatsData: any = [];
      digitalunitByProvidersStatsData = cur.getDigitalUnitByProvidersStats;
      this.setState({
        digitalUnitbyProvidersStatsData: digitalunitByProvidersStatsData,
      });
    }
  }

  columns1 = [
    {
      Header: "Date",
      accessor: "created_date",
    },
    {
      Header: "Total Appointments",
      accessor: "appointments",
    },
    {
      Header: "Apointments Started",
      accessor: "appointments_started",
    },
    {
      Header: "Apointments Completed",
      accessor: "appointments_completed",
    },
    {
      Header: "Movers",
      accessor: "movers",
    },
    {
      Header: "Insurance",
      accessor: "insurance",
    },
    {
      Header: "Brokerage Insurance",
      accessor: "brokerage_insurance",
    },
    {
      Header: "Digital",
      accessor: "digital",
    },
    {
      Header: "Security Sales",
      accessor: "security_sales",
    },
    {
      Header: "Security Appoinment",
      accessor: "security_apt",
    },
    {
      Header: "Home Services",
      accessor: "home_pros",
    },
    {
      Header: "Utilites",
      accessor: "default_utilities",
    },
    {
      Header: "Energy",
      accessor: "energy",
    },
    {
      Header: "Solar",
      accessor: "solar",
    },
    {
      Header: "Total Units",
      accessor: "total_units",
    },
    {
      Header: "Total RGU",
      accessor: "total_rgu_units",
    },
  ];
  columns2 = [
    {
      Header: "CONCIERGE",
      accessor: "csr",
    },
    {
      Header: "Movers",
      accessor: "movers",
    },
    {
      Header: "Insurance",
      accessor: "insurance",
    },
    {
      Header: "Brokerage Insurance",
      accessor: "brokerage_insurance",
    },
    {
      Header: "Digital",
      accessor: "digital",
    },
    {
      Header: "Security Sales",
      accessor: "security_sales",
    },
    {
      Header: "Security Appointments",
      accessor: "security_apt",
    },
    {
      Header: "Home services",
      accessor: "home_pros",
    },
    {
      Header: "Energy",
      accessor: "energy",
    },
    {
      Header: "Solar",
      accessor: "solar",
    },
    {
      Header: "Total Units",
      accessor: "total_units",
    },
    {
      Header: "Total RGU",
      accessor: "total_rgu_units",
    },
  ];
  columns3 = [
    {
      Header: "CONCIERGE",
      accessor: "csr",
    },
    // {
    //   Header: "Digital Orders",
    //   accessor: "digitalOrders",
    // },
    {
      Header: "Digital Units",
      accessor: "digital_units",
    },
    {
      Header: "Internet Units",
      accessor: "internet_units",
    },
    {
      Header: "Voice Units",
      accessor: "voice_units",
    },
    {
      Header: "TV Units",
      accessor: "tv_units",
    },
    {
      Header: "Sold Units",
      accessor: "sold_units",
    },
    {
      Header: "On Hold Units",
      accessor: "on_hold_units",
    },
    {
      Header: "Cancelled Units",
      accessor: "cancelled_units",
    },
    {
      Header: "Single Units",
      accessor: "single_orders",
    },
    {
      Header: "Double Units",
      accessor: "double_orders",
    },
    {
      Header: "Triple Units",
      accessor: "triple_orders",
    },
  ];
  columns4 = [
    {
      Header: "Provider",
      accessor: "provider",
    },
    {
      Header: "Digital Units",
      accessor: "digital_units",
    },
    {
      Header: "Internet Units",
      accessor: "internet_units",
    },
    {
      Header: "Voice Units",
      accessor: "voice_units",
    },
    {
      Header: "TV Units",
      accessor: "tv_units",
    },
    {
      Header: "Sold Units",
      accessor: "sold_units",
    },
    {
      Header: "On Hold Units",
      accessor: "on_hold_units",
    },
    {
      Header: "Cancelled Units",
      accessor: "cancelled_units",
    },
    {
      Header: "Single Units",
      accessor: "single_orders",
    },
    {
      Header: "Double Units",
      accessor: "double_orders",
    },
    {
      Header: "Triple Units",
      accessor: "triple_orders",
    },
  ];
  handleAggregateSales = () => {
    this.setState({
      aggregateSales: true,
      individualSales: false,
      digitalReport: false,
      digitalReportByProviders: false,
      startDate: "",
      endDate: "",
      brokerageValue: "",
      val: "",
    });
  };
  handleIndividualSales = () => {
    this.setState({
      individualSales: true,
      aggregateSales: false,
      digitalReport: false,
      digitalReportByProviders: false,
      startDate: "",
      endDate: "",
      brokerageValue: "",
      val: "",
    });
  };
  handleDigitalReport = () => {
    this.setState({
      digitalReport: true,
      digitalReportByProviders: false,
      individualSales: false,
      aggregateSales: false,
      startDate: "",
      endDate: "",
      brokerageValue: "",
      val: "",
    });
  };
  handleDigitalReportByProviders = () => {
    this.setState({
      digitalReport: false,
      digitalReportByProviders: true,
      individualSales: false,
      aggregateSales: false,
      startDate: "",
      endDate: "",
      brokerageValue: "",
      val: "",
    });
  };
  onSearchChange = (e: any) => {
    this.setState({ val: e.target.value });
  };

  onSearchClick = () => {
    // console.log("search");
  };
  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onfilterHandler = () => {};

  handleBackPagination = async (e: any) => {
    if (this.state.page != 1) {
      await this.setState({ page: this.state.page - 1 });
    }
  };
  handleNextPagination = async () => {
    let totalpage: number = 0;
    if (this.state.aggregateSales) {
      totalpage =
        this.state.aggregateSalesData.length % 10 == 0
          ? parseInt((this.state.aggregateSalesData.length / 10).toString())
          : parseInt((this.state.aggregateSalesData.length / 10).toString()) +
            1;
    } else if (this.state.individualSales) {
      totalpage =
        this.state.overallUnitSalesData.length % 10 == 0
          ? parseInt((this.state.overallUnitSalesData.length / 10).toString())
          : parseInt((this.state.overallUnitSalesData.length / 10).toString()) +
            1;
    } else if (this.state.digitalReport) {
      totalpage =
        this.state.digitalUnitSalesData.length % 10 == 0
          ? parseInt((this.state.digitalUnitSalesData.length / 10).toString())
          : parseInt((this.state.digitalUnitSalesData.length / 10).toString()) +
            1;
    } else if (this.state.digitalReportByProviders) {
      totalpage =
        this.state.digitalUnitbyProvidersData.length % 10 == 0
          ? parseInt(
              (this.state.digitalUnitbyProvidersData.length / 10).toString()
            )
          : parseInt(
              (this.state.digitalUnitbyProvidersData.length / 10).toString()
            ) + 1;
    }
    if (this.state.page != totalpage) {
      await this.setState({ page: this.state.page + 1 });
    }
  };

  handlePagination = async (e: any) => {
    await this.setState({ page: parseInt(e.target.innerText) });
  };

  handleBrokerageValue = async (e: any) => {
    // if (e.target.value.length >= 1) {
    this.props.commonAction.brokerageGet({
      key: e.target.value,
    });
    // }
  };

  onChangeBrokerageValue = (e: any, value: any) => {
    this.setState({
      brokerageValue: value,
    });
    let payload = {
      startDate: "",
      endDate: "",
      brokerage: value && value.value ? value.value : "",
    };
    this.props.analyticsAction.getAggregateSale(payload);
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  dateChange = async (range: any) => {
    if (range && range.startDate && range.endDate) {
      await this.setState({
        dateRange: range,
        startDate:
          new Date(range.startDate).getMonth() +
          1 +
          "/" +
          new Date(range.startDate).getDate() +
          "/" +
          new Date(range.startDate).getFullYear(),
        endDate:
          new Date(range.endDate).getMonth() +
          1 +
          "/" +
          new Date(range.endDate).getDate() +
          "/" +
          new Date(range.endDate).getFullYear(),
        open: false,
      });
    }
    if (this.state.aggregateSales) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        brokerage: this.state.brokerageValue,
      };
      this.props.analyticsAction.getAggregateSale(payload);
      this.props.analyticsAction.getAggregateSaleStats(payload);
    }
    if (this.state.individualSales) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      this.props.analyticsAction.getOverallUnitSale(payload);
      this.props.analyticsAction.getOverallUnitSaleStats(payload);
    }
    if (this.state.digitalReport) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      this.props.analyticsAction.getDigitalUnitSale(payload);
      this.props.analyticsAction.getDigitalUnitSaleStats(payload);
    }
    if (this.state.digitalReportByProviders) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      this.props.analyticsAction.getDigitalUnitByProviders(payload);
      this.props.analyticsAction.getDigitalUnitByProvidersStats(payload);
    }
  };
  render() {
    let data1 = this.state.aggregateSalesData;
    let data2 = this.state.overallUnitSalesData;
    let data3 = this.state.digitalUnitSalesData;
    let data4 = this.state.digitalUnitbyProvidersData;
    // const page = [2];
    if (this.state.val) {
      if (this.state.individualSales) {
        data2 = data2.filter((item: any) => {
          let csr: string = item.csr.toLowerCase();
          let search: string = this.state.val.toLowerCase();
          if (csr.match(search)) {
            return item;
          }
        });
      }
      if (this.state.digitalReport) {
        data3 = data3.filter((item: any) => {
          let csr: string = item.csr.toLowerCase();
          let search: string = this.state.val.toLowerCase();
          if (csr.match(search)) {
            return item;
          }
        });
      }
      if (this.state.digitalReportByProviders) {
        data4 = data4.filter((item: any) => {
          let csr: string = item.csr.toLowerCase();
          let search: string = this.state.val.toLowerCase();
          if (csr.match(search)) {
            return item;
          }
        });
      }
    }
    let totalpage: number = 0;
    if (this.state.aggregateSales) {
      totalpage =
        this.state.aggregateSalesData.length % 10 == 0
          ? parseInt((this.state.aggregateSalesData.length / 10).toString())
          : parseInt((this.state.aggregateSalesData.length / 10).toString()) +
            1;
      if (this.state.page == 1) {
        data1 = data1.slice(0, 10);
      } else {
        let start = data1.length / this.state.page;
        data1 = data1.slice(start, start + 10);
      }
    } else if (this.state.individualSales) {
      totalpage =
        this.state.overallUnitSalesData.length % 10 == 0
          ? parseInt((this.state.overallUnitSalesData.length / 10).toString())
          : parseInt((this.state.overallUnitSalesData.length / 10).toString()) +
            1;
      if (this.state.page == 1) {
        data2 = data2.slice(0, 10);
      } else {
        let start = data2.length / this.state.page;
        data2 = data2.slice(start, start + 10);
      }
    } else if (this.state.digitalReport) {
      totalpage =
        this.state.digitalUnitSalesData.length % 10 == 0
          ? parseInt((this.state.digitalUnitSalesData.length / 10).toString())
          : parseInt((this.state.digitalUnitSalesData.length / 10).toString()) +
            1;

      if (this.state.page == 1) {
        data3 = data3.slice(0, 10);
      } else {
        let start = data3.length / this.state.page;
        data3 = data3.slice(start, start + 10);
      }
    } else if (this.state.digitalReportByProviders) {
      totalpage =
        this.state.digitalUnitbyProvidersData.length % 10 == 0
          ? parseInt(
              (this.state.digitalUnitbyProvidersData.length / 10).toString()
            )
          : parseInt(
              (this.state.digitalUnitbyProvidersData.length / 10).toString()
            ) + 1;

      if (this.state.page == 1) {
        data4 = data4.slice(0, 10);
      } else {
        let start = data4.length / this.state.page;
        data4 = data4.slice(start, start + 10);
      }
    }

    return (
      <div>
        <div className="table-component">
          <div className="appointment-buttons1">
            <div
              className={
                this.state.aggregateSales
                  ? "my-appointments-active"
                  : "my-appointments"
              }
              onClick={() => {
                // if (!this.state.loader) {
                this.handleAggregateSales();
                // }
              }}
            >
              Aggregate Sales
            </div>

            <div
              className={
                this.state.individualSales ? "my-leads-active" : "my-leads"
              }
              onClick={() => {
                // if (!this.state.loader) {
                this.handleIndividualSales();
                // }
              }}
            >
              Individual Sales
            </div>

            <div
              className={
                this.state.digitalReport ? "all-leads-active" : "all-leads"
              }
              onClick={() => {
                // if (!this.state.loader) {
                this.handleDigitalReport();
                // }
              }}
            >
              Digital Report
            </div>

            <div
              className={
                this.state.digitalReportByProviders
                  ? "all-leads-active"
                  : "all-leads"
              }
              onClick={() => {
                // if (!this.state.loader) {
                this.handleDigitalReportByProviders();
                // }
              }}
            >
              Digital Report By Providers
            </div>
          </div>

          {this.state.aggregateSales &&
          this.state.aggregateSalesStatsData !== [] ? (
            <div className="statsCards">
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.movers}
                statsHeading="Movers"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.insurance}
                statsHeading="Insurance"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.brokerage_insurance}
                statsHeading="Brokerage Insurance"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.digital}
                statsHeading="Digital"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.security_sales}
                statsHeading="Security Sales"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.security_apt}
                statsHeading="Security Appointment"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.home_pros}
                statsHeading="Home Pros"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.default_utilities}
                statsHeading="Utilities"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.energy}
                statsHeading="Energy"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.solar}
                statsHeading="Solar"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.total_units}
                statsHeading="Total Units"
              />
              <StatisticsCard
                statsNo={this.state.aggregateSalesStatsData.total_rgu_units}
                statsHeading="Total RGU Units"
              />
            </div>
          ) : null}
          {this.state.individualSales &&
          this.state.overallUnitSalesStatsData !== [] ? (
            <div className="statsCards">
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.movers}
                statsHeading="Movers"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.insurance}
                statsHeading="Insurance"
              />
              <StatisticsCard
                statsNo={
                  this.state.overallUnitSalesStatsData.brokerage_insurance
                }
                statsHeading="Brokerage Insurance"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.digital}
                statsHeading="Digital"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.security_sales}
                statsHeading="Security Sales"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.security_apt}
                statsHeading="Security Appointment"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.home_pros}
                statsHeading="Home Pros"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.default_utilities}
                statsHeading="Utilities"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.energy}
                statsHeading="Energy"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.solar}
                statsHeading="Solar"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.total_units}
                statsHeading="Total Units"
              />
              <StatisticsCard
                statsNo={this.state.overallUnitSalesStatsData.total_rgu_units}
                statsHeading="Total RGU Units"
              />
            </div>
          ) : null}
          {this.state.digitalReport &&
          this.state.digitalUnitSalesStatsData !== [] ? (
            <div className="statsCards">
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.digital_units}
                statsHeading="Digital"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.internet_units}
                statsHeading="Internet"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.voice_units}
                statsHeading="Voice"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.tv_units}
                statsHeading="TV"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.sold_units}
                statsHeading="Sold"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.on_hold_units}
                statsHeading="On Hold"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.cancelled_units}
                statsHeading="Cancelled"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.single_orders}
                statsHeading="Single"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.double_orders}
                statsHeading="Double"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitSalesStatsData.triple_orders}
                statsHeading="Triple"
              />
            </div>
          ) : null}
          {this.state.digitalReportByProviders &&
          this.state.digitalUnitbyProvidersStatsData !== [] ? (
            <div className="statsCards">
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.digital_units
                }
                statsHeading="Digital"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.internet_units
                }
                statsHeading="Internet"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitbyProvidersStatsData.voice_units}
                statsHeading="Voice"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitbyProvidersStatsData.tv_units}
                statsHeading="TV"
              />
              <StatisticsCard
                statsNo={this.state.digitalUnitbyProvidersStatsData.sold_units}
                statsHeading="Sold"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.on_hold_units
                }
                statsHeading="On Hold"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.cancelled_units
                }
                statsHeading="Cancelled"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.single_orders
                }
                statsHeading="Single"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.double_orders
                }
                statsHeading="Double"
              />
              <StatisticsCard
                statsNo={
                  this.state.digitalUnitbyProvidersStatsData.triple_orders
                }
                statsHeading="Triple"
              />
            </div>
          ) : null}
          <div className="StatisticsFlexDiv">
            <div className="StatisticsFlexDiv2">
              {this.state.aggregateSales ? (
                <div className="CustomerListTitle">Daily Stats</div>
              ) : this.state.digitalReport ? (
                <div className="CustomerListTitle">Concierge Stats</div>
              ) : this.state.individualSales ? (
                <div className="CustomerListTitle">Concierge Stats</div>
              ) : this.state.digitalReportByProviders ? (
                <div className="CustomerListTitle">Concierge Stats</div>
              ) : null}
              <div className="rightDiv">
                <div className="dropDown">
                  {this.state.aggregateSales ? (
                    <div className="dropDownValue">
                      <div className="sortByText">Filter By:</div>
                      <Autocomplete
                        id="free-solo-demo"
                        onChange={(e, value) =>
                          this.onChangeBrokerageValue(e, value)
                        }
                        options={this.state.brokerageOptions}
                        getOptionLabel={(option: any) => option.label}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="sortbydropdown"
                            //  label="Search..."
                            id="outlined-start-adornment"
                            onChange={(e) => this.handleBrokerageValue(e)}
                            variant="outlined"
                            value={this.state.brokerageValue}
                            placeholder="Your Brokerages"
                          />
                        )}
                      />
                    </div>
                  ) : null}
                  <div className="dropDownValue">
                    <div
                      className="daterangepickerDiv"
                      onClick={() => this.setState({ open: true })}
                    >
                      {this.state.startDate && this.state.endDate
                        ? `Filter By: ${this.state.startDate} - ${this.state.endDate}`
                        : `Filter By: YYYY/MM/DD - YYYY/MM/DD`}
                      <div className="arrowDown">
                        <KeyboardArrowDownIcon />
                      </div>
                    </div>
                    <DateRangePicker
                      open={this.state.open}
                      toggle={this.toggle}
                      onChange={(range) => {
                        this.dateChange(range);
                      }}
                      wrapperClassName="daterangepicker"
                    />
                  </div>
                </div>
                {this.state.aggregateSales ||
                this.state.digitalReportByProviders ? null : (
                  <div className="SearchBoxDiv">
                    <SearchComponent
                      value={this.state.val}
                      placeholder="Search by concierge name"
                      onSearchChange={this.onSearchChange}
                      onSearchClick={this.onSearchClick}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <TableStatisticsNew
            data={
              this.state.aggregateSales
                ? data1
                : this.state.individualSales
                ? data2
                : this.state.digitalReport
                ? data3
                : this.state.digitalReportByProviders
                ? data4
                : null
            }
            columns={
              this.state.aggregateSales
                ? this.columns1
                : this.state.individualSales
                ? this.columns2
                : this.state.digitalReport
                ? this.columns3
                : this.state.digitalReportByProviders
                ? this.columns4
                : null
            }
            page={this.state.page}
            handleBack={this.handleBackPagination}
            handleNext={this.handleNextPagination}
            totalPage={totalpage}
            handlePagination={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    analyticsAction: bindActionCreators(AnalyticsActions, dispatch),
    commonAction: bindActionCreators(CommonActions, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  analyticsState: state.analytics,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsHub);
