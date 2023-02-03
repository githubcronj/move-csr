import React, { Component } from "react";
import "./Appointment.scss";
import TableStatisticsNew from "../../components/atoms/Table/Tables";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppointmentAnalyticsActions from "../../store/appointmentAnalytics/actions";
import * as CommonActions from "../../store/common/actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import StatisticsCard from "../../components/Statistics/StatisticsCard";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

type initialProps = {
  history: any;
  appointmentAction: any;
  appointmentState: any;
  commonAction: any;
  commonState: any;
};
type initialState = {
  emailAnalytics: boolean;
  textAnalytics: boolean;
  appointment: boolean;
  overall: boolean;
  emailAnalyticsData: any;
  textAnalyticsData: any;
  appointmentData: any;
  overallData: any;
  brokerageOptions: any;
  brokerageValue: any;
  page: number;
  emailCardsData: any;
  open: boolean;
  dateRange: any;
  startDate: any;
  endDate: any;
};
class Appointment extends Component<initialProps, initialState> {
  state: initialState = {
    emailAnalytics: true,
    textAnalytics: false,
    appointment: false,
    overall: false,
    emailAnalyticsData: [],
    textAnalyticsData: [],
    appointmentData: [],
    overallData: null,
    brokerageOptions: [],
    brokerageValue: "",
    page: 1,
    emailCardsData: null,
    open: false,
    dateRange: {},
    startDate: "",
    endDate: "",
  };
  async componentDidMount() {
    let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let today = new Date();
    let startMonth: number = new Date().getMonth() + 1;
    await this.setState({
      startDate:
        new Date(firstDay).getFullYear() +
        "-" +
        startMonth +
        "-" +
        new Date(firstDay).getDate(),
      endDate:
        new Date(today).getFullYear() +
        "-" +
        startMonth +
        "-" +
        new Date(today).getDate(),
    });

    window.scrollTo(0, 0);
    let payload = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    this.props.appointmentAction.getEmailAnalytics(payload);

    this.props.commonAction.brokerageGet({
      key: "",
    });
  }
  componentDidUpdate(prevProps: any) {
    let prev: any = prevProps.appointmentState;
    let cur: any = this.props.appointmentState;
    if (
      prev.getEmailAnalytics !== cur.getEmailAnalytics &&
      cur.getEmailAnalytics &&
      cur.isGetEmailAnalytics
    ) {
      cur.isGetEmailAnalytics = false;
      let EmailAnalyticsData: any = [];
      cur.getEmailAnalytics &&
        cur.getEmailAnalytics.appointment_results &&
        cur.getEmailAnalytics.appointment_results.map((item: any) => {
          EmailAnalyticsData.push({
            campaign: item.utm_campaign,
            count: item.count,
          });
        });

      let emailotherData: any;
      emailotherData = {
        open:
          cur.getEmailAnalytics &&
          cur.getEmailAnalytics.sendgrid_results &&
          cur.getEmailAnalytics.sendgrid_results.open
            ? cur.getEmailAnalytics.sendgrid_results.open.toString()
            : "0",
        click:
          cur.getEmailAnalytics &&
          cur.getEmailAnalytics.sendgrid_results &&
          cur.getEmailAnalytics.sendgrid_results.click
            ? cur.getEmailAnalytics.sendgrid_results.click.toString()
            : "0",
        delivered:
          cur.getEmailAnalytics &&
          cur.getEmailAnalytics.sendgrid_results &&
          cur.getEmailAnalytics.sendgrid_results.delivered
            ? cur.getEmailAnalytics.sendgrid_results.delivered.toString()
            : "0",
      };
      this.setState({
        emailAnalyticsData: EmailAnalyticsData,
        emailCardsData: emailotherData,
      });
    }

    if (
      prev.getTextAnalytics !== cur.getTextAnalytics &&
      cur.getTextAnalytics &&
      cur.isGetTextAnalytics
    ) {
      cur.isGetTextAnalytics = false;
      let textanalyticsData: any = [];
      cur.getTextAnalytics &&
        cur.getTextAnalytics.appointment_results &&
        cur.getTextAnalytics.appointment_results.map((item: any) => {
          textanalyticsData.push({
            campaign: item.utm_campaign,
            count: item.count,
          });
        });
      this.setState({ textAnalyticsData: textanalyticsData });
    }
    if (
      prev.getAppointmentAnalytics !== cur.getAppointmentAnalytics &&
      cur.getAppointmentAnalytics &&
      cur.isGetAppointmentAnalytics
    ) {
      cur.isGetAppointmentAnalytics = false;
      let AppointmentData: any = [];
      cur.getAppointmentAnalytics &&
        cur.getAppointmentAnalytics.map((item: any) => {
          AppointmentData.push({
            campaign: item.utm_campaign,
            count: item.count,
          });
        });
      this.setState({ appointmentData: AppointmentData });
    }

    if (
      prev.getOverallAnalytics !== cur.getOverallAnalytics &&
      cur.getOverallAnalytics &&
      cur.isGetOverallAnalytics
    ) {
      cur.isGetOverallAnalytics = false;
      let OverallData: any = {};
      OverallData = cur.getOverallAnalytics;
      this.setState({ overallData: OverallData });
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
          value: item.slug,
          label: item.name,
        });
      });
      this.setState({ brokerageOptions: brokerageData });
    }
  }
  handleBackPagination = async (e: any) => {
    if (this.state.page != 1) {
      await this.setState({ page: this.state.page - 1 });
    }
  };
  handleNextPagination = async () => {
    let totalpage: number = 0;
    if (this.state.emailAnalytics) {
      totalpage =
        this.state.emailAnalyticsData.length % 10 == 0
          ? parseInt((this.state.emailAnalyticsData.length / 10).toString())
          : parseInt((this.state.emailAnalyticsData.length / 10).toString()) +
            1;
    } else if (this.state.textAnalytics) {
      totalpage =
        this.state.textAnalyticsData.length % 10 == 0
          ? parseInt((this.state.textAnalyticsData.length / 10).toString())
          : parseInt((this.state.textAnalyticsData.length / 10).toString()) + 1;
    } else if (this.state.appointment) {
      totalpage =
        this.state.appointmentData.length % 10 == 0
          ? parseInt((this.state.appointmentData.length / 10).toString())
          : parseInt((this.state.appointmentData.length / 10).toString()) + 1;
    }
    if (this.state.page != totalpage) {
      await this.setState({ page: this.state.page + 1 });
    }
  };
  handlePagination = async (e: any) => {
    await this.setState({ page: parseInt(e.target.innerText) });
  };
  onChangeBrokerageValue = (e: any, value: any) => {
    this.setState({
      brokerageValue: value,
    });
    let payload = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      brokerage: value && value.value ? value.value : "",
    };
    if (this.state.emailAnalytics) {
      this.props.appointmentAction.getEmailAnalytics(payload);
    }
    if (this.state.textAnalytics) {
      this.props.appointmentAction.getTextAnalytics(payload);
    }
    if (this.state.appointment) {
      this.props.appointmentAction.getAppointmentAnalytics(payload);
    }
    if (this.state.overall) {
      this.props.appointmentAction.getOverallAnalytics(payload);
    }
  };

  handleBrokerageValue = async (e: any) => {
    this.props.commonAction.brokerageGet({
      key: e.target.value,
    });
  };

  columns1 = [
    {
      Header: "Campaign",
      accessor: "campaign",
    },
    {
      Header: "Count",
      accessor: "count",
    },
  ];

  handleEmailAnalytics = () => {
    this.setState({
      emailAnalytics: true,
      textAnalytics: false,
      appointment: false,
      overall: false,
      brokerageValue: "",
    });
  };
  handleTextAnalytics = () => {
    this.setState({
      textAnalytics: true,
      emailAnalytics: false,
      appointment: false,
      overall: false,
      brokerageValue: "",
    });

    if (
      this.props &&
      this.props.appointmentState &&
      this.props.appointmentState.getTextAnalytics &&
      this.props.appointmentState.getTextAnalytics.length == 0
    ) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      this.props.appointmentAction.getTextAnalytics(payload);
    }
  };
  handleAppointment = () => {
    this.setState({
      appointment: true,
      overall: false,
      textAnalytics: false,
      emailAnalytics: false,
      brokerageValue: "",
    });
    if (
      this.props &&
      this.props.appointmentState &&
      this.props.appointmentState.getAppointmentAnalytics &&
      this.props.appointmentState.getAppointmentAnalytics.length == 0
    ) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };

      this.props.appointmentAction.getAppointmentAnalytics(payload);
    }
  };
  handleOverall = () => {
    this.setState({
      appointment: false,
      overall: true,
      textAnalytics: false,
      emailAnalytics: false,
      brokerageValue: "",
    });
    if (
      this.props &&
      this.props.appointmentState &&
      this.props.appointmentState.getOverallAnalytics &&
      this.props.appointmentState.getOverallAnalytics.length == 0
    ) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      this.props.appointmentAction.getOverallAnalytics(payload);
    }
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  dateChange = async (range: any) => {
    if (range && range.startDate && range.endDate) {
      let startMonth: number = new Date(range.startDate).getMonth() + 1;
      let endMonth: number = new Date(range.endDate).getMonth() + 1;
      await this.setState({
        dateRange: range,
        startDate:
          new Date(range.startDate).getFullYear() +
          "-" +
          startMonth +
          "-" +
          new Date(range.startDate).getDate(),
        endDate:
          new Date(range.endDate).getFullYear() +
          "-" +
          endMonth +
          "-" +
          new Date(range.endDate).getDate(),
        open: false,
      });
    }
    if (this.state.emailAnalytics) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        brokerage: this.state.brokerageValue && this.state.brokerageValue.value,
      };
      this.props.appointmentAction.getEmailAnalytics(payload);
    }
    if (this.state.textAnalytics) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        brokerage:
          this.state.brokerageValue && this.state.brokerageValue.value
            ? this.state.brokerageValue.value
            : "",
      };
      this.props.appointmentAction.getTextAnalytics(payload);
    }
    if (this.state.appointment) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        brokerage:
          this.state.brokerageValue && this.state.brokerageValue.value
            ? this.state.brokerageValue.value
            : "",
      };
      this.props.appointmentAction.getAppointmentAnalytics(payload);
    }
    if (this.state.overall) {
      let payload = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        brokerage:
          this.state.brokerageValue && this.state.brokerageValue.value
            ? this.state.brokerageValue.value
            : "",
      };
      this.props.appointmentAction.getOverallAnalytics(payload);
    }
  };

  render() {
    let data1 = this.state.emailAnalyticsData;
    let data2 = this.state.textAnalyticsData;
    let data3 = this.state.appointmentData;

    let totalpage: number = 0;
    if (this.state.emailAnalytics) {
      totalpage =
        this.state.emailAnalyticsData.length % 10 == 0
          ? parseInt((this.state.emailAnalyticsData.length / 10).toString())
          : parseInt((this.state.emailAnalyticsData.length / 10).toString()) +
            1;
      if (this.state.page == 1) {
        data1 = data1.slice(0, 10);
      } else {
        let start = data1.length / this.state.page;
        data1 = data1.slice(start, start + 10);
      }
    } else if (this.state.textAnalytics) {
      totalpage =
        this.state.textAnalyticsData.length % 10 == 0
          ? parseInt((this.state.textAnalyticsData.length / 10).toString())
          : parseInt((this.state.textAnalyticsData.length / 10).toString()) + 1;
      if (this.state.page == 1) {
        data2 = data2.slice(0, 10);
      } else {
        let start = data2.length / this.state.page;
        data2 = data2.slice(start, start + 10);
      }
    } else if (this.state.appointment) {
      totalpage =
        this.state.appointmentData.length % 10 == 0
          ? parseInt((this.state.appointmentData.length / 10).toString())
          : parseInt((this.state.appointmentData.length / 10).toString()) + 1;
      if (this.state.page == 1) {
        data3 = data3.slice(0, 10);
      } else {
        let start = data3.length / this.state.page;
        data3 = data3.slice(start, start + 10);
      }
    }

    return (
      <div>
        <div className="table-component">
          <div className="appointment-buttons2">
            <div
              className={
                this.state.emailAnalytics
                  ? "my-appointments-active"
                  : "my-appointments"
              }
              onClick={() => {
                this.handleEmailAnalytics();
              }}
            >
              Email
            </div>

            <div
              className={
                this.state.textAnalytics ? "my-leads-active" : "my-leads"
              }
              onClick={() => {
                this.handleTextAnalytics();
              }}
            >
              Text
            </div>

            <div
              className={
                this.state.appointment ? "all-leads-active" : "all-leads"
              }
              onClick={() => {
                this.handleAppointment();
              }}
            >
              Appointment
            </div>
            <div
              className={this.state.overall ? "all-leads-active" : "all-leads"}
              onClick={() => {
                this.handleOverall();
              }}
            >
              Overall
            </div>
          </div>

          <div className="AppointmentFlexDiv">
            <div className="AppointmentFlexDiv2">
              <div className="rightDiv">
                <div className="dropDown">
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
                          id="outlined-start-adornment"
                          onChange={(e) => this.handleBrokerageValue(e)}
                          variant="outlined"
                          value={this.state.brokerageValue}
                          placeholder="Your Brokerages"
                        />
                      )}
                    />
                  </div>
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
              </div>
            </div>
          </div>

          {this.state.emailAnalytics ? (
            <div className="statsCardsAppointment">
              <StatisticsCard
                statsNo={
                  this.state.emailCardsData && this.state.emailCardsData.click
                }
                statsHeading="Clicked"
              />
              <StatisticsCard
                statsNo={
                  this.state.emailCardsData && this.state.emailCardsData.open
                }
                statsHeading="Open"
              />
              <StatisticsCard
                statsNo={
                  this.state.emailCardsData &&
                  this.state.emailCardsData.delivered
                }
                statsHeading="Delivered"
              />
            </div>
          ) : null}

          {this.state.overall ? (
            <div className="statsCardsAppointment">
              <StatisticsCard
                statsNo={
                  this.state.overallData && this.state.overallData.move_count
                }
                statsHeading="Move"
              />
              <StatisticsCard
                statsNo={
                  this.state.overallData &&
                  this.state.overallData.completed_move_count
                }
                statsHeading="Move Completed"
              />
              <StatisticsCard
                statsNo={
                  this.state.overallData &&
                  this.state.overallData.appointment_count
                }
                statsHeading="Appointment"
              />
            </div>
          ) : null}

          {this.state.emailAnalytics ||
          this.state.textAnalytics ||
          this.state.appointment ? (
            <TableStatisticsNew
              data={
                this.state.emailAnalytics
                  ? data1
                  : this.state.textAnalytics
                  ? data2
                  : this.state.appointment
                  ? data3
                  : null
              }
              columns={this.columns1}
              page={this.state.page}
              handleBack={this.handleBackPagination}
              handleNext={this.handleNextPagination}
              totalPage={totalpage}
              handlePagination={this.handlePagination}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    appointmentAction: bindActionCreators(
      AppointmentAnalyticsActions,
      dispatch
    ),
    commonAction: bindActionCreators(CommonActions, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  appointmentState: state.appointmentanalytics,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
