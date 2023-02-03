import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.scss";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import VerticalProgress from "../../components/atoms/VerticalProgress";
// import TableComponent from "../../components/atoms/Table/Table";
// import SortByDropdown from "../../components/atoms/SortByDropDown";
import SearchComponent from "../../components/atoms/Search";
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import SortIcon from '@material-ui/icons/Sort';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import * as Action from "../../store/dashboard/actions";
import * as CommonAction from "../../store/common/actions";
import { bindActionCreators } from "redux";
// import Switch from "@material-ui/core/Switch";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { CircularProgress } from "@material-ui/core";
// import CustomizedInput from "../../components/atoms/CustomizedInput";
import TableNew from "../../components/atoms/Table/newTable";

type initialProps = {
  history: any;
  dashboardAction?: any;
  dashboardState?: any;
  commonAction?: any;
  commonState?: any;
};

type initialState = {
  tabClicked: string;
  anchorEl: any;
  menuList: any;
  searchInp: string;
  data: any;
  dataTable: any;
  page: number;
  totalPage: number;
  isDataArrived: boolean;
  isDataArrived2: boolean;
  requestFor: string;
  requestType: string;
  rowData: any;
  myAppointments: boolean;
  myLeads: boolean;
  allLeads: boolean;
  topOpen: boolean;
  loader: boolean;
  loader2: boolean;
  nameClickLoader: boolean;
  totalRecords: number;
};

class Dashboard extends Component<initialProps, initialState> {
  state: initialState = {
    requestFor: "me",
    requestType: "appointments",
    tabClicked: "daily",
    isDataArrived: true,
    isDataArrived2: true,
    anchorEl: null,
    menuList: [
      {
        name: "HTL",
      },
      {
        name: "LTH",
      },
    ],
    searchInp: "",
    data: [],
    dataTable: [],
    page: 1,
    totalPage: 0,
    rowData: null,
    myAppointments: true,
    myLeads: false,
    allLeads: false,
    topOpen: false,
    loader: true,
    loader2: true,
    nameClickLoader: false,
    totalRecords: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    localStorage.setItem("leftPanel", "true");
    this.props.dashboardAction.users({
      requestFor: "me",
      requestType: "appointments",
      searchVal: "",
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });

    if (
      this.props &&
      this.props.commonState &&
      !this.props.commonState.userDataArrived
    ) {
      this.props.commonAction.userGet();
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.dashboardState &&
      nextProps.dashboardState.users &&
      nextProps.dashboardState.users.data &&
      nextProps.dashboardState.userDataArrived
    ) {
      nextProps.dashboardState.userDataArrived = false;
      // let totalpage: number =
      //   nextProps.dashboardState.users.data.length % 5 == 0
      //     ? parseInt(
      //         (nextProps.dashboardState.users.data.length / 5).toString()
      //       )
      //     : parseInt(
      //         (nextProps.dashboardState.users.data.length / 5).toString()
      //       ) + 1;
      // currentState.totalPage = totalpage;

      let tableData: any = [];
      let filteredRecord: number =
        nextProps.dashboardState.users.recordsFiltered;
      nextProps.dashboardState.users.data.map((item: any, index: any) => {
        tableData.push({
          // no: index + 1,
          no: (currentState.page - 1) * 10 + index + 1,
          id: item[0],
          name: item[1],
          email: item[2],
          conciergeName: item[3],
          brokerage: item[4],
          moveDate: item[5],
          apptDateTime: item[6]
            ? new Date(item[6])
                .toLocaleString("en-US")
                .toString()
                .replaceAll("/", "-")
            : "NA",
          status: item[7] ? item[7] : "NA",
        });
      });

      currentState.data = tableData;
      // currentState.dataTable = tableData.slice(0, 5);
      currentState.loader = false;
      currentState.totalRecords = filteredRecord;
    }

    if (
      nextProps &&
      nextProps.dashboardState &&
      nextProps.dashboardState.user &&
      nextProps.dashboardState.user.data &&
      currentState.isDataArrived2
    ) {
      currentState.isDataArrived2 = false;
      let filteredRecord: number =
        nextProps.dashboardState.user.recordsFiltered;
      let tableData2: any = [];

      nextProps.dashboardState.user.data.map((item: any, index: any) => {
        tableData2.push({
          // no: index + 1,
          no: (currentState.page - 1) * 10 + index + 1,
          id: item[0],
          name: item[1],
          email: item[2],
          brokerage: item[4],
          conciergeName: item[3],
          moveDate: item[5],
          apptDateTime: item[6]
            ? new Date(item[6])
                .toLocaleString("en-US")
                .toString()
                .replaceAll("/", "-")
            : "NA",
          status: item[7] ? item[7] : "NA",
        });
      });

      currentState.data = tableData2;
      currentState.loader = false;
      currentState.totalRecords = filteredRecord;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.moveWithHashCode &&
      nextProps.commonState.moveWithHashCode[0] &&
      nextProps.commonState.isMoveWithHashCode
    ) {
      // console.log("nextProps", nextProps.commonState);
      let token =
        nextProps.commonState.moveWithHashCode[0] &&
        nextProps.commonState.moveWithHashCode[0].user_ref &&
        nextProps.commonState.moveWithHashCode[0].user_ref.token;
      localStorage.setItem("moveeasytoken", token);
      // nextProps.commonAction.moveGet()
      if (
        !(
          localStorage.getItem("nameUser") || localStorage.getItem("phoneUser")
        ) &&
        !localStorage.getItem("noAnswer")
      ) {
        localStorage.setItem(
          "nameUser",
          nextProps.commonState.moveWithHashCode[0].user_ref.first_name.concat(
            " " + nextProps.commonState.moveWithHashCode[0].user_ref.last_name
          )
        );
        localStorage.setItem(
          "phoneUser",
          nextProps.commonState.moveWithHashCode[0].user_ref.phone
        );
      }

      if (currentState.rowData && currentState.rowData.status === "Completed") {
        nextProps.history.push({
          pathname: "/dashboard/concierge/workflow/summaryfinal",
          state: currentState.rowData,
        });
      } else {
        nextProps.history.push({
          pathname: "/dashboard/concierge/workflow/discovery",
          state: currentState.rowData,
        });
      }

      // console.log("rowData",currentState.rowData)

      localStorage.removeItem("noShow");
      // console.log("history",nextProps.history)
      nextProps.commonState.isMoveWithHashCode = false;
    }

    return currentState;
  }

  handleBackPagination = async (e: any) => {
    if (this.state.page != 1) {
      await this.setState({ page: this.state.page - 1 });
      this.props.dashboardAction.users({
        requestFor: this.state.requestFor,
        requestType: this.state.requestType,
        searchVal: this.state.searchInp,
        page: this.state.topOpen
          ? (this.state.page - 1) * 5
          : (this.state.page - 1) * 10,
        length: this.state.topOpen ? 5 : 10,
      });
    }
  };
  handleNextPagination = async () => {
    let totalpage: number = 0;
    if (this.state.topOpen) {
      totalpage =
        this.state.totalRecords % 5 == 0
          ? parseInt((this.state.totalRecords / 5).toString())
          : parseInt((this.state.totalRecords / 5).toString()) + 1;
    } else {
      totalpage =
        this.state.totalRecords % 10 == 0
          ? parseInt((this.state.totalRecords / 10).toString())
          : parseInt((this.state.totalRecords / 10).toString()) + 1;
    }
    if (this.state.page != totalpage) {
      await this.setState({ page: this.state.page + 1 });
      this.props.dashboardAction.users({
        requestFor: this.state.requestFor,
        requestType: this.state.requestType,
        searchVal: this.state.searchInp,
        page: this.state.topOpen
          ? (this.state.page - 1) * 5
          : (this.state.page - 1) * 10,
        length: this.state.topOpen ? 5 : 10,
      });
    }
  };

  handlePagination = async (e: any) => {
    await this.setState({ page: parseInt(e.target.innerText), loader2: true });
    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };

  columns = [
    {
      Header: "No",
      accessor: "no",
      sorting: false,
    },
    {
      Header: "Name",
      accessor: "name",
      accessor2: "email",
      sorting: false,
      Cell: (rowData: any) => {
        this.setState({ rowData: rowData, nameClickLoader: true });
        let payload = { hash_code: rowData.id };
        this.props.commonAction.moveWithHashCode(payload);
        localStorage.setItem("scriptHashCode", rowData.id);
      },
    },
    // {
    //   Header: "Email",
    //   accessor: "email",
    //   sorting: false,
    // },
    {
      Header: "Brokerage",
      accessor: "brokerage",
    },
    {
      Header: "Concierge Name",
      accessor: "conciergeName",
    },
    {
      Header: "Move Date",
      accessor: "moveDate",
      sorting: false,
    },
    {
      Header: "Appt Date And Time",
      accessor: "apptDateTime",
      sorting: false,
    },
    {
      Header: "Status",
      accessor: "status",
      sorting: false,
      Cell: (rowData: any) => {
        return (
          <div
            className="soldDiv"
            style={{
              backgroundColor:
                rowData.original.status == "Completed" ? "#81C975" : "",
            }}
          >
            {rowData.original.status}
          </div>
        );
      },
    },
  ];

  columns1 = [
    {
      Header: "No",
      accessor: "no",
      sorting: false,
    },
    {
      Header: "Name",
      accessor: "name",
      accessor2: "email",
      sorting: false,
      Cell: (rowData: any) => {
        this.setState({ rowData: rowData, nameClickLoader: true });
        let payload = { hash_code: rowData.id };
        this.props.commonAction.moveWithHashCode(payload);
        localStorage.setItem("scriptHashCode", rowData.id);
      },
    },
    // {
    //   Header: "Email",
    //   accessor: "email",
    //   sorting: false,
    // },
    {
      Header: "Brokerage",
      accessor: "brokerage",
    },
    {
      Header: "Concierge Name",
      accessor: "conciergeName",
    },
    {
      Header: "Move Date",
      accessor: "moveDate",
      sorting: false,
    },
    {
      Header: "Appt Date And Time",
      accessor: "apptDateTime",
      sorting: false,
    },
    {
      Header: "Status",
      accessor: "status",
      sorting: false,
      Cell: (rowData: any) => {
        return (
          <div
            className="soldDiv"
            style={{
              backgroundColor:
                rowData.original.status == "Completed" ? "#81C975" : "",
            }}
          >
            {rowData.original.status}
          </div>
        );
      },
    },
  ];

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onSearchChange = (e: any) => {
    this.setState({ searchInp: e.target.value });

    if (this.state.searchInp == "") {
      this.props.dashboardAction.users({
        requestFor: this.state.requestFor,
        requestType: this.state.requestType,
        searchVal: "",
        page: this.state.topOpen
          ? (this.state.page - 1) * 5
          : (this.state.page - 1) * 10,
        length: this.state.topOpen ? 5 : 10,
      });
    }
  };

  onSearchClick = () => {
    // let data: any = [];
    // data = this.state.data.filter((item: any) => {
    //     if(item.name.toLowerCase().match(this.state.searchInp.toLowerCase()) || item.brokerage.toLowerCase().match(this.state.searchInp.toLowerCase())) {
    //         return item
    //     }
    // })
    // this.setState({data: data})

    this.setState({
      page: 1,
    });

    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };

  handleMyAppointments = async () => {
    await this.setState({
      myAppointments: true,
      myLeads: false,
      allLeads: false,
      requestFor: "me",
      requestType: "appointments",
      loader: true,
      searchInp: "",
    });
    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };
  handleMyLeads = async () => {
    await this.setState({
      myAppointments: false,
      myLeads: true,
      allLeads: false,
      requestFor: "me",
      requestType: "leads",
      loader: true,
      searchInp: "",
    });
    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };
  handleAllLeads = async () => {
    await this.setState({
      myAppointments: false,
      myLeads: false,
      allLeads: true,
      requestFor: "all",
      requestType: "leads",
      loader: true,
      searchInp: "",
    });
    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };

  handleTopOpen = async () => {
    await this.setState({ topOpen: !this.state.topOpen });
    this.props.dashboardAction.users({
      requestFor: this.state.requestFor,
      requestType: this.state.requestType,
      searchVal: this.state.searchInp,
      page: this.state.topOpen
        ? (this.state.page - 1) * 5
        : (this.state.page - 1) * 10,
      length: this.state.topOpen ? 5 : 10,
    });
  };

  render() {
    let totalpage: number = 0;
    let loader = this.state.loader2;
    if (this.state.topOpen) {
      totalpage =
        this.state.totalRecords % 5 === 0
          ? parseInt((this.state.totalRecords / 5).toString())
          : parseInt((this.state.totalRecords / 5).toString()) + 1;
      // loader = false;
      // this.state.data.length % 5 == 0
      //   ? parseInt((this.state.data.length / 5).toString())
      //   : parseInt((this.state.data.length / 5).toString()) + 1;
    } else {
      totalpage =
        this.state.totalRecords % 10 === 0
          ? parseInt((this.state.totalRecords / 10).toString())
          : parseInt((this.state.totalRecords / 10).toString()) + 1;
      // loader = false;
      // this.state.data.length % 10 == 0
      //   ? parseInt((this.state.data.length / 10).toString())
      //   : parseInt((this.state.data.length / 10).toString()) + 1;
    }
    let tdata: any = [];
    tdata = this.state.data.sort((a: any, b: any) => {
      let aDate = new Date(a.moveDate);
      let bDate = new Date(b.moveDate);
      return bDate.valueOf() - aDate.valueOf();
    });
    let tableData: any = [];
    tdata.map((item: any, index: number) => {
      tableData.push({
        ...item,
        no: index + 1,
      });
    });
    let data: any = this.state.data;
    loader = false;
    // if (this.state.page == 1) {
    //   // data = this.state.data.slice(0, 5);
    //   if (this.state.topOpen) {
    //     data = tableData.slice(0, 5);
    //   } else {
    //     data = tableData.slice(0, 10);
    //   }
    //   loader = false;
    // } else {
    //   // data = this.state.data;
    //   data = tableData;
    //   let start = data.length / this.state.page;
    //   if (this.state.topOpen) {
    //     data = tableData.slice(start, start + 5);
    //   } else {
    //     data = tableData.slice(start, start + 10);
    //   }
    //   // data = data.slice(start, start + 5);
    //   loader = false;
    // }
    return (
      <div>
        {this.state.nameClickLoader ? (
          <CircularProgress />
        ) : (
          <div className="Dashboard-main">
            <div className="target-button-wrapper">
              <div className="targets-heading">Your Targets</div>
              <div className="collapse-button">
                <div
                  className="icon-div"
                  onClick={() => {
                    // this.setState({
                    //   topOpen: !this.state.topOpen,
                    // });
                    this.handleTopOpen();
                  }}
                >
                  {this.state.topOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
              </div>
            </div>
            {this.state.topOpen ? (
              <div className="upper-div">
                <div className="card-one">
                  <div className="top-wrapper">
                    <div className="great-job">
                      <div className="heading-great">Great Job,Jeff!</div>
                      <div className="sub-heading-great">
                        {" "}
                        You are nearing your daily target 👏
                      </div>
                    </div>
                    <div className="tab-div">
                      <div
                        className={
                          this.state.tabClicked == "daily"
                            ? "tab-active"
                            : "tab"
                        }
                        onClick={() => {
                          this.setState({
                            tabClicked: "daily",
                          });
                        }}
                      >
                        Daily
                      </div>
                      <div
                        className={
                          this.state.tabClicked == "weekly"
                            ? "tab-active"
                            : "tab"
                        }
                        onClick={() => {
                          this.setState({
                            tabClicked: "weekly",
                          });
                        }}
                      >
                        Weekly
                      </div>
                      <div
                        className={
                          this.state.tabClicked == "monthly"
                            ? "tab-active"
                            : "tab"
                        }
                        onClick={() => {
                          this.setState({
                            tabClicked: "monthly",
                          });
                        }}
                      >
                        Monthly
                      </div>
                    </div>
                  </div>
                  <div className="bottom-wrapper">
                    <div className="progress-div">
                      <div className="progress-text">
                        <div className="text">Moving</div>
                        <ProgressBar
                          now={100}
                          label={<div className="label-div"> 3 UNITS</div>}
                          className="progress-bar"
                        />
                      </div>
                      <div className="progress-text">
                        <div className="text">Security</div>
                        <ProgressBar
                          now={66}
                          label={<div className="label-div"> 2 UNITS</div>}
                          className="progress-bar"
                        />
                      </div>
                      <div className="progress-text">
                        <div className="text">Internet</div>
                        <ProgressBar
                          now={33}
                          label={<div className="label-div"> 1 UNITS</div>}
                          className="progress-bar"
                        />
                      </div>
                      <div className="progress-text">
                        <div className="text">Moving</div>
                        <ProgressBar
                          now={100}
                          label={<div className="label-div"> 3 UNITS</div>}
                          className="progress-bar"
                        />
                      </div>
                      <div className="progress-text">
                        <div className="text">Other</div>
                        <ProgressBar
                          now={66}
                          label={<div className="label-div"> 2 UNITS</div>}
                          className="progress-bar"
                        />
                      </div>
                    </div>

                    <div className="units-div">
                      <div className="div-1-unit">
                        <div className="unit-wrapper">
                          <div className="unit-number">15</div>
                          <div className="unit-text">Units Assigned</div>
                        </div>
                        <div className="unit-wrapper">
                          <div className="unit-number">6</div>
                          <div className="unit-text">Units Pending</div>
                        </div>
                      </div>

                      <div className="div-2-unit">
                        <div className="unit-wrapper-2">
                          <div className="unit-number">9</div>
                          <div className="unit-text">Units Sold</div>
                        </div>
                        <div className="unit-wrapper-2">
                          <div className="unit-number">
                            <sup>$</sup>130<sup>99</sup>
                          </div>
                          <div className="unit-text">Commission Earned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-two">
                  <div className="top-wrapper-2">
                    <div className="great-job">
                      <div className="heading-great">Overall Progress</div>
                    </div>
                  </div>
                  <div className="bottom-wrapper-2">
                    <div className="vertical-progress">
                      <div className="progress-1">
                        {/* <ProgressBar now={100} label={`100%`} className="progress-test" /> */}
                        <VerticalProgress
                          progress={100}
                          className="progress-test"
                          percent={100}
                        />
                      </div>
                      <div className="progress-2">
                        <VerticalProgress
                          progress={20}
                          className="progress-test"
                          percent={20}
                        />
                      </div>
                      <div className="progress-3">
                        <VerticalProgress
                          progress={4}
                          className="progress-test"
                          percent={4}
                        />
                      </div>
                    </div>
                    <div className="vertical-description">
                      <div className="flex-div">
                        <div className="dot1"></div>
                        <div className="content">
                          Daily Target : <span className="span-top">15</span>/15
                          units
                        </div>
                      </div>
                      <div className="flex-div">
                        <div className="dot2"></div>
                        <div className="content">
                          Weekly Target : <span className="span-top">15</span>
                          /75 units
                        </div>
                      </div>
                      <div className="flex-div">
                        <div className="dot3"></div>
                        <div className="content">
                          Monthly Target : <span className="span-top">15</span>
                          /375 units
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="lower-div">
              <div className="dashboardFlexDiv">
                <div className="dashboardFlexDiv2">
                  <div className="CustomerListTitle">My Customer List</div>
                  {/* <div className="toggle-1">
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item style={{ fontWeight: "bold" }}>
                      Appt. View
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={this.state.requestType}
                        onChange={this.handleRequestType}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </Grid>
                    <Grid item>Leads View</Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="toggle-2">
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item style={{ fontWeight: "bold" }}>
                      Me
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={this.state.requestFor}
                        onChange={this.handleRequestFor}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </Grid>
                    <Grid item>All</Grid>
                  </Grid>
                </Typography>
              </div> */}

                  {/* <div>
       
                <SortByDropdown
                  sortByName="Appt. Date & Time"
                  handleMenu={this.handleMenu}
                  handleClose={this.handleClose}
                  anchorEl={this.state.anchorEl}
                  onMenuClick={() => console.log()}
                  menuList={this.state.menuList}
                />
              </div> */}
                </div>
                <div className="SearchBoxDiv">
                  <SearchComponent
                    value={this.state.searchInp}
                    placeholder="Search by name or brokerage"
                    onSearchChange={this.onSearchChange}
                    onSearchClick={this.onSearchClick}
                  />
                </div>
              </div>
              <div className="appointment-buttons">
                <div
                  className={
                    this.state.myAppointments
                      ? "my-appointments-active"
                      : "my-appointments"
                  }
                  onClick={() => {
                    // if (!this.state.loader) {
                    this.handleMyAppointments();
                    // }
                  }}
                >
                  My Appointments
                </div>

                <div
                  className={
                    this.state.myLeads ? "my-leads-active" : "my-leads"
                  }
                  onClick={() => {
                    // if (!this.state.loader) {
                    this.handleMyLeads();
                    // }
                  }}
                >
                  My Leads
                </div>

                <div
                  className={
                    this.state.allLeads ? "all-leads-active" : "all-leads"
                  }
                  onClick={() => {
                    // if (!this.state.loader) {
                    this.handleAllLeads();
                    // }
                  }}
                >
                  All Leads
                </div>
              </div>
              {this.state.loader === true || loader ? (
                <CircularProgress />
              ) : (
                // <TableComponent
                //   data={data}
                //   columns={this.state.allLeads ? this.columns1 : this.columns}
                //   className=""
                //   onRowClick={() => console.log("hii")}
                //   page={this.state.page}
                //   handleBack={this.handleBackPagination}
                //   handleNext={this.handleNextPagination}
                //   totalPage={this.state.totalPage}
                //   handlePagination={this.handlePagination}
                // />
                <TableNew
                  data={data}
                  columns={this.state.allLeads ? this.columns1 : this.columns}
                  page={this.state.page}
                  handleBack={this.handleBackPagination}
                  handleNext={this.handleNextPagination}
                  totalPage={totalpage}
                  handlePagination={this.handlePagination}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    dashboardAction: bindActionCreators(Action, dispatch),
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  dashboardState: state.dashboard,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
