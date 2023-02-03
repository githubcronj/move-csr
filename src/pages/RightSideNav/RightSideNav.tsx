import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./rightSideNav.scss";
import EventAvailableRoundedIcon from "@material-ui/icons/EventAvailableRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "../../components/atoms/Button";
import TaskChecklist from "../../components/atoms/TaskCheckList/TaskChecklist";
import AutoComplete from "../../components/atoms/AutoComplete";
import HelpDeskCard from "../../components/atoms/HelpDeskCard";
import * as Action from "../../store/dashboard/actions";
import * as CommonAction from "../../store/common/actions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const localizer = momentLocalizer(moment);

const myEventsList: any = [];

type initialProps = {
  dashboardAction?: any;
  dashboardState?: any;
  commonAction?: any;
  commonState?: any;
};

type initialState = {
  calenderClicked: boolean;
  helpClicked: boolean;
  assignmentClicked: boolean;
  view: any;
  todayDate: any;
  assignmentButton: string;
  helpCardsData: any;
  helpSearchOptions: any;
  value: any;
  search: boolean;
  taskArray: any;
  task: any;
  isDataArrived: boolean;
  customerNotes: boolean;
  warmTransfer: boolean;
  note: any;
  noteArray: any;
  hash_code: any;
  securityWarmTransferNumber: string;
  insuranceWarmTransferNumber: string;
  energyWarmTransferNumber: string;
  solarWarmTransferNumber: string;
};

class RightSideNav extends Component<initialProps, initialState> {
  state: initialState = {
    calenderClicked: false,
    helpClicked: false,
    assignmentClicked: false,
    view: "month",
    todayDate: new Date(),
    assignmentButton: "all",
    helpCardsData: [],
    helpSearchOptions: [],
    value: "",
    task: "",
    search: false,
    taskArray: [
      { task_name: "Call Marino", completed: true },
      { task_name: "Set Up Call with Support", completed: true },
      { task_name: "Set Up Call with AT & T", completed: false },
      { task_name: "Set Up A Meeting with Ven", completed: false },
      { task_name: "Call Lucy", completed: false },
      { task_name: "Read Up on Insuranc", completed: false },
      { task_name: "Call at 11 am with Ven", completed: false },
    ],
    isDataArrived: true,
    customerNotes: false,
    warmTransfer: false,
    note: "",
    noteArray: [
      // {
      //   note_name:
      //     "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.",
      //   date: "07/06/2021",
      //   categoryName: "Movers",
      // },
      // {
      //   note_name:
      //     "Sed posuere consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
      //   date: "02/06/2021",
      //   categoryName: "Insurance",
      // },
    ],
    hash_code: "",
    securityWarmTransferNumber: "9876543210",
    insuranceWarmTransferNumber: "9876543210",
    energyWarmTransferNumber: "9876543210",
    solarWarmTransferNumber: "9876543210",
  };

  async componentDidMount() {
    this.props.dashboardAction.users();
    let helpSearchOptions: any = [];
    await this.setState({
      helpCardsData: [
        {
          heading: "INSURANCE BASICS",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda nemo repudiandae velit est neque quidem, pariatur eaque aut, cupiditate ut laboriosam. Magni perferendis enim, odit dolor soluta porro consectetur asperiores?",
        },
        {
          heading: "INSURANCE FOR HOME",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda nemo repudiandae velit est neque quidem, pariatur eaque aut, cupiditate ut laboriosam. Magni perferendis enim, odit dolor soluta porro consectetur asperiores?",
        },
      ],
    });

    this.state.helpCardsData.map((item: any) => {
      helpSearchOptions.push({
        title: item.heading,
      });
    });

    this.setState({
      helpSearchOptions: helpSearchOptions,
    });

    if (
      localStorage.getItem("scriptHashCode") &&
      localStorage.getItem("scriptHashCode") !== null
    ) {
      let hashCode = localStorage.getItem("scriptHashCode");
      let payload = { hash_code: hashCode };
      this.props.commonAction.getNotes(payload);
      this.setState({ hash_code: hashCode });
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
      currentState.isDataArrived
    ) {
      currentState.isDataArrived = false;

      nextProps.dashboardState.users.data.map((item: any) => {
        myEventsList.push({
          start: new Date(item[6]),
          end: new Date(item[6]),
          title: "Event",
        });
      });
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.getNotes &&
      nextProps.commonState.isGetNotes
    ) {
      nextProps.commonState.isGetNotes = false;
      currentState.noteArray = nextProps.commonState.getNotes;
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.addNotes &&
      nextProps.commonState.isAddNotes
    ) {
      nextProps.commonState.isAddNotes = false;
      currentState.note = "";
      let payload = {
        hash_code: currentState.hash_code,
      };
      nextProps.commonAction.getNotes(payload);
    }

    return currentState;
  }

  onSearchHandler = (e: any) => {
    this.setState({
      value: e.target.value,
      search: false,
    });
  };

  searchClicked = () => {
    this.setState({
      search: true,
    });
  };

  handleChangeTask = (e: any) => {
    this.setState({
      task: e.target.value,
    });
  };
  handleChangeNotes = (e: any) => {
    this.setState({
      note: e.target.value,
    });
  };

  clickNext = () => {
    if (this.state.view === "month") {
      let date = new Date(this.state.todayDate);
      this.setState({
        todayDate: new Date(date.setMonth(date.getMonth() + 1)),
      });
    }
    if (this.state.view === "day") {
      let date = new Date(this.state.todayDate);
      this.setState({ todayDate: new Date(date.setDate(date.getDate() + 1)) });
    }
  };

  clickBack = () => {
    if (this.state.view === "month") {
      let date = new Date(this.state.todayDate);
      this.setState({
        todayDate: new Date(date.setMonth(date.getMonth() - 1)),
      });
    }
    if (this.state.view === "day") {
      let date = new Date(this.state.todayDate);
      this.setState({ todayDate: new Date(date.setDate(date.getDate() - 1)) });
    }
  };
  addButtonClicked = () => {
    this.setState({
      task: "",
    });
    let taskArray = this.state.taskArray;

    taskArray.unshift({
      task_name: this.state.task,
      completed: false,
    });

    this.setState({
      taskArray: taskArray,
    });
  };
  addCustomerNotesButtonClicked = () => {
    // this.setState({
    //   note: "",
    // });
    // let noteArray = this.state.noteArray;
    let category: string = "";
    if (window.location.pathname.includes("insurance")) {
      category = "insurance";
    } else if (window.location.pathname.includes("movers")) {
      category = "movers";
    } else if (window.location.pathname.includes("internet")) {
      category = "internet";
    } else if (window.location.pathname.includes("utilities")) {
      category = "utilities";
    } else if (window.location.pathname.includes("security")) {
      category = "home-security";
    } else if (window.location.pathname.includes("solar")) {
      category = "solar";
    } else if (window.location.pathname.includes("energy")) {
      category = "energy";
    } else if (window.location.pathname.includes("homepros")) {
      category = "ourvendors";
    }

    // noteArray.unshift({
    //   note_name: this.state.note,
    //   date: new Date().toString(),
    //   categoryName: category,
    // });

    // this.setState({
    //   noteArray: noteArray,
    // });
    let payload = {
      csr_notes: this.state.note,
      service: category,
      move: this.state.hash_code,
    };
    this.props.commonAction.addNotes(payload);
  };

  handleChecked = (item: any) => {
    let taskArray = this.state.taskArray;
    taskArray.map((item2: any) => {
      if (item.task_name == item2.task_name) {
        item2.completed = !item2.completed;
      }
    });

    this.setState({
      taskArray: taskArray,
    });
  };

  render() {
    return (
      <div className="RightSideNav-main">
        <div>
          {" "}
          <div
            className={
              this.state.calenderClicked ||
              this.state.assignmentClicked ||
              this.state.helpClicked ||
              this.state.customerNotes ||
              this.state.warmTransfer
                ? "icon-div-outer-active"
                : "icon-div-outer"
            }
          >
            <div
              className={
                this.state.calenderClicked ? "icon-div-active" : "icon-div"
              }
              onClick={() => {
                this.setState({
                  calenderClicked: true,
                  helpClicked: false,
                  assignmentClicked: false,
                  customerNotes: false,
                  warmTransfer: false,
                });
              }}
            >
              <EventAvailableRoundedIcon />
            </div>
          </div>
          <div
            className={
              this.state.calenderClicked ||
              this.state.assignmentClicked ||
              this.state.helpClicked ||
              this.state.customerNotes ||
              this.state.warmTransfer
                ? "icon-div-outer-active"
                : "icon-div-outer"
            }
          >
            <div
              className={
                this.state.assignmentClicked ? "icon-div-active" : "icon-div"
              }
              onClick={() => {
                this.setState({
                  calenderClicked: false,
                  helpClicked: false,
                  assignmentClicked: true,
                  customerNotes: false,
                  warmTransfer: false,
                });
              }}
            >
              <AssignmentRoundedIcon />
            </div>
          </div>
          <div
            className={
              this.state.calenderClicked ||
              this.state.assignmentClicked ||
              this.state.helpClicked ||
              this.state.customerNotes ||
              this.state.warmTransfer
                ? "icon-div-outer-active"
                : "icon-div-outer"
            }
          >
            <div
              className={
                this.state.helpClicked ? "icon-div-active" : "icon-div"
              }
              onClick={() => {
                this.setState({
                  calenderClicked: false,
                  helpClicked: true,
                  assignmentClicked: false,
                  customerNotes: false,
                  warmTransfer: false,
                });
              }}
            >
              <HelpOutlineRoundedIcon />
            </div>
          </div>
          <div
            className={
              this.state.calenderClicked ||
              this.state.assignmentClicked ||
              this.state.helpClicked ||
              this.state.customerNotes ||
              this.state.warmTransfer
                ? "icon-div-outer-active"
                : "icon-div-outer"
            }
          >
            <div
              className={
                this.state.customerNotes ? "icon-div-active" : "icon-div"
              }
              onClick={() => {
                this.setState({
                  calenderClicked: false,
                  helpClicked: false,
                  assignmentClicked: false,
                  customerNotes: true,
                  warmTransfer: false,
                });
              }}
            >
              <EventNoteIcon />
            </div>
          </div>
          <div
            className={
              this.state.calenderClicked ||
              this.state.assignmentClicked ||
              this.state.helpClicked ||
              this.state.customerNotes ||
              this.state.warmTransfer
                ? "icon-div-outer-active"
                : "icon-div-outer"
            }
          >
            <div
              className={
                this.state.warmTransfer ? "icon-div-active" : "icon-div"
              }
              onClick={() => {
                this.setState({
                  calenderClicked: false,
                  helpClicked: false,
                  assignmentClicked: false,
                  customerNotes: false,
                  warmTransfer: true,
                });
              }}
            >
              <BlurCircularIcon />
            </div>
          </div>
        </div>
        {this.state.calenderClicked ||
        this.state.assignmentClicked ||
        this.state.helpClicked ||
        this.state.customerNotes ||
        this.state.warmTransfer ? (
          <div className="open-right-div">
            <div className="open-top-content-div">
              <div className="open-text">
                <div className="top-heading">
                  {this.state.calenderClicked
                    ? "Calender"
                    : this.state.assignmentClicked
                    ? "Tasks"
                    : this.state.helpClicked
                    ? "Helpdesk"
                    : this.state.customerNotes
                    ? "Customer notes"
                    : "Hot transfer"}
                </div>
                <div className="bottom-heading">
                  {this.state.calenderClicked
                    ? "WHAT'S GOING ON?"
                    : this.state.assignmentClicked
                    ? "WHAT'S HAPPENING TODAY"
                    : this.state.helpClicked
                    ? "HELP WITH THE PRODUCT SALES"
                    : this.state.customerNotes
                    ? "Important notes about this customer"
                    : "Transfer your customer immediately"}
                </div>
              </div>
              <div
                className="icon-div"
                onClick={() => {
                  this.setState({
                    calenderClicked: false,
                    helpClicked: false,
                    assignmentClicked: false,
                    customerNotes: false,
                    warmTransfer: false,
                  });
                }}
              >
                <ChevronRightRoundedIcon />
              </div>
            </div>
            <div className="top-content-body">
              {this.state.calenderClicked ? (
                <div>
                  <div className="buttonCalenderDiv">
                    <div
                      onClick={() => this.setState({ view: "month" })}
                      className={
                        this.state.view === "month"
                          ? "active-calenderButton"
                          : "calenderButton"
                      }
                    >
                      Month
                    </div>
                    <div
                      onClick={() => this.setState({ view: "day" })}
                      className={
                        this.state.view === "day"
                          ? "active-calenderButton"
                          : "calenderButton"
                      }
                    >
                      Day
                    </div>
                  </div>
                  <div className="buttonCalenderDiv">
                    <div className="backArrowCalander">
                      <ChevronLeftIcon
                        className="backArrow"
                        onClick={this.clickBack}
                      />
                    </div>
                    <div className="todayCalander">
                      {this.state.todayDate && this.state.todayDate.toString()
                        ? this.state.todayDate.toString().substring(0, 15)
                        : ""}
                    </div>
                    <div className="nextArrowCalander">
                      <ChevronRightIcon
                        className="backArrow"
                        onClick={this.clickNext}
                      />
                    </div>
                  </div>
                  <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "day"]}
                    view={this.state.view}
                    toolbar={false}
                    date={this.state.todayDate}
                    onNavigate={(date: any) => {
                      this.setState({ todayDate: date });
                    }}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              ) : this.state.assignmentClicked ? (
                <div className="assignment-div">
                  <div className="button-div">
                    <Button
                      className={
                        this.state.assignmentButton == "all"
                          ? "top-button-active"
                          : "top-button"
                      }
                      onClick={() => {
                        this.setState({
                          assignmentButton: "all",
                        });
                      }}
                    >
                      {" "}
                      All{" "}
                    </Button>
                    <Button
                      className={
                        this.state.assignmentButton == "done"
                          ? "top-button-active"
                          : "top-button"
                      }
                      onClick={() => {
                        this.setState({
                          assignmentButton: "done",
                        });
                      }}
                    >
                      {" "}
                      Done{" "}
                    </Button>
                    <Button
                      className={
                        this.state.assignmentButton == "pending"
                          ? "top-button-active"
                          : "top-button"
                      }
                      onClick={() => {
                        this.setState({
                          assignmentButton: "pending",
                        });
                      }}
                    >
                      {" "}
                      Pending{" "}
                    </Button>
                  </div>
                  <div className="task-div">
                    <TaskChecklist
                      placeholder="Type to add new task..."
                      border={"2px dashed #75BA9F"}
                      icon="plus"
                      className="task-main"
                      handleChangeTask={(e: any) => {
                        this.handleChangeTask(e);
                      }}
                      addButtonClicked={this.addButtonClicked}
                      task={this.state.task}
                    />

                    <div>
                      {this.state.taskArray.map((item: any) => {
                        if (this.state.assignmentButton == "all") {
                          return (
                            <TaskChecklist
                              task={item.task_name}
                              border={
                                item.completed
                                  ? "2px dashed transparent"
                                  : "2px solid #E6E8EB"
                              }
                              className="task-main"
                              disabled={true}
                              checked={item.completed}
                              handleChecked={() => {
                                this.handleChecked(item);
                              }}
                            />
                          );
                        } else if (this.state.assignmentButton == "done") {
                          if (item.completed == true) {
                            return (
                              <TaskChecklist
                                task={item.task_name}
                                border={
                                  item.completed
                                    ? "2px dashed transparent"
                                    : "2px solid #E6E8EB"
                                }
                                className="task-main"
                                disabled={true}
                                checked={item.completed}
                                handleChecked={() => {
                                  this.handleChecked(item);
                                }}
                              />
                            );
                          }
                        } else if (this.state.assignmentButton == "pending") {
                          if (item.completed == false) {
                            return (
                              <TaskChecklist
                                task={item.task_name}
                                handleChecked={() => {
                                  this.handleChecked(item);
                                }}
                                border={
                                  item.completed
                                    ? "2px dashed transparent"
                                    : "2px solid #E6E8EB"
                                }
                                className="task-main"
                                disabled={true}
                                checked={item.completed}
                              />
                            );
                          }
                        }
                      })}
                    </div>
                  </div>
                </div>
              ) : this.state.helpClicked ? (
                <div className="help-div-main">
                  <div className="autocomplete-div">
                    <AutoComplete
                      options={this.state.helpSearchOptions}
                      onChangeSearchHandler={(e: any) => {
                        this.onSearchHandler(e);
                      }}
                      searchClicked={() => {
                        this.searchClicked();
                      }}
                      onSelectHandler={(e: any) => {
                        this.onSearchHandler(e);
                      }}
                    />
                  </div>
                  <div className="help-content-div">
                    {this.state.helpCardsData.map((item: any) => {
                      if (
                        this.state.search == true &&
                        item.heading
                          .toLowerCase()
                          .includes(this.state.value.toLowerCase())
                      ) {
                        return (
                          <HelpDeskCard
                            className="help-card"
                            heading={item.heading}
                            content={item.content}
                          />
                        );
                      } else if (
                        this.state.search == false ||
                        this.state.value == ""
                      ) {
                        return (
                          <HelpDeskCard
                            className="help-card"
                            heading={item.heading}
                            content={item.content}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              ) : this.state.customerNotes ? (
                <div className="customerNotes-main-div">
                  <div className="task-div">
                    <TaskChecklist
                      placeholder="Type to add new note..."
                      border={"2px dashed #75BA9F"}
                      icon="plus"
                      className="task-main"
                      handleChangeTask={(e: any) => {
                        this.handleChangeNotes(e);
                      }}
                      addButtonClicked={this.addCustomerNotesButtonClicked}
                      task={this.state.note}
                    />
                  </div>
                  <div className="notesDiv">
                    {this.state.noteArray &&
                      this.state.noteArray.map((item: any) => {
                        return (
                          <div className="note-div">
                            <div className="noteTitle">{item.service}</div>
                            <div className="dateFlexDiv">
                              <div className="noteImageDiv">
                                <InsertDriveFileIcon className="icon" />
                              </div>
                              <div className="dayDateDiv">
                                <div className="dayDiv">
                                  {new Date(item.created)
                                    .toString()
                                    .substring(0, 3)}
                                </div>
                                <div className="dateDiv">
                                  {new Date(item.created)
                                    .toString()
                                    .substring(4, 16)}
                                </div>
                              </div>
                            </div>
                            <div className="notePara">{item.csr_notes}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : this.state.warmTransfer ? (
                <div className="warmTransferMain-div">
                  <div className="warmTransferFlexDiv">
                    <div className="title">
                      Home Security
                      <div className="phoneDiv">
                        {this.state.securityWarmTransferNumber}
                      </div>
                    </div>
                    <div className="arrowDiv">
                      <ArrowForwardIcon className="icon" />
                    </div>
                  </div>
                  <div className="warmTransferFlexDiv">
                    <div className="title">
                      Insurance
                      <div className="phoneDiv">
                        {this.state.insuranceWarmTransferNumber}
                      </div>
                    </div>
                    <div className="arrowDiv">
                      <ArrowForwardIcon className="icon" />
                    </div>
                  </div>
                  <div className="warmTransferFlexDiv">
                    <div className="title">
                      Energy
                      <div className="phoneDiv">
                        {this.state.energyWarmTransferNumber}
                      </div>
                    </div>
                    <div className="arrowDiv">
                      <ArrowForwardIcon className="icon" />
                    </div>
                  </div>
                  <div className="warmTransferFlexDiv">
                    <div className="title">
                      Solar
                      <div className="phoneDiv">
                        {this.state.solarWarmTransferNumber}
                      </div>
                    </div>
                    <div className="arrowDiv">
                      <ArrowForwardIcon className="icon" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(RightSideNav);
