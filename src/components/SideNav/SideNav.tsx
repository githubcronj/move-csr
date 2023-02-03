import React from "react";
import { NavLink } from "react-router-dom";
import MoveEasyLogo from "../../Assets/images/SideNav/moveeasyLogo.svg";
import MoveEasy from "../../Assets/images/SideNav/MoveEasy.svg";
import HomeIcon from '@material-ui/icons/Dashboard';
import CustomersIcon from '@material-ui/icons/SupervisedUserCircle';
import LeadsIcon from '@material-ui/icons/Highlight';
import LiveTrackerIcon from '@material-ui/icons/TrackChanges';
import StaticticsHubIcon from '@material-ui/icons/InsertChart';
import NoInterestListIcon from '@material-ui/icons/RemoveCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import DailyTrackerIcon from '@material-ui/icons/MultilineChart';
import AppointmentViewIcon from '@material-ui/icons/EventSeat';
import "./SideNav.scss"

type initialProps = {
  toggleNav: boolean;
  toggleSideNav: any;
};

type initialState = {
  navClass: boolean;
};

class SideNav extends React.Component<initialProps, initialState> {
  state: initialState = {
    navClass: true,
  };

  render() {
    const superAdminLinks = [
      {   
        main: "Home",
        subLinks: [
          {
            link: "/dashboard",
            heading: "Home",
            exact: true,
            icon: <HomeIcon className="icon" />,
          },
        ],
      }, 
      {
        main: "Customers",
        subLinks: [
          {
            link: "/customers",
            heading: "Customers",
            exact: true,
            icon: <CustomersIcon className="icon" />,
          },
        ],
      },
      {
        main: "All Leads",
        subLinks: [
          {
            link: "/leads",
            heading: "All Leads",
            exact: true,
            icon: <LeadsIcon className="icon" />,
          },
        ],
      },
      {
        main: "Live Tracker",
        subLinks: [
          {
            link: "/live_tracker",
            heading: "Live Tracker",
            exact: true,
            icon: <LiveTrackerIcon className="icon" />,
          },
        ],
      },
      {
        main: "Appointment view",
        subLinks: [
          {
            link: "/appointment_view",
            heading: "Appointment view",
            exact: true,
            icon: <AppointmentViewIcon className="icon" />,
          },
        ],
      },
      {
        main: "Statistics Hub",
        subLinks: [
          {
            link: "/statistics_hub",
            heading: "Statistics Hub",
            exact: true,
            icon: <StaticticsHubIcon className="icon" />,
          },
        ],
      },
      {
        main: "No interest List",
        subLinks: [
          {
            link: "/no_interest_list",
            heading: "No interest List",
            exact: true,
            icon: <NoInterestListIcon className="icon" />,
          },
        ],
      },
      {
        main: "Daily Tracker",
        subLinks: [
          {
            link: "/daily_tracker",
            heading: "Daily Tracker",
            exact: true,
            icon: <DailyTrackerIcon className="icon" />,
          },
        ],
      },
      {
        main: "Settings",
        subLinks: [
          {
            link: "/settings",
            heading: "Settings",
            exact: true,
            icon: <SettingsIcon className="icon" />,
          },
        ],
      },
     
    ];
    let sidebarValues = superAdminLinks;
    return (
      <nav
        id={!this.props.toggleNav ? "sidebar" : "sidebar-toggle"}
        className={
          this.state.navClass === true ? "text-start" : "active text-start"
        }
        // onClick={this.props.toggleSideNav}
      >
        <div>
         <div className="LogoDiv">
          <div className="moveEasyLogoDiv" >
            <img src={MoveEasyLogo} onClick={this.props.toggleSideNav}  /> 
          </div>
          <div className="moveEasyLogo">
            <img src={MoveEasy} onClick={this.props.toggleSideNav} />
          </div>
         </div>
          <ul className="list-unstyled">
            {sidebarValues.map((row, index) => {
              return (
                <React.Fragment key={(row.main)}>
                  {row.subLinks.map((sublink) => {
                    return (
                      <div>
                        <li
                          key={
                            (sublink.heading)
                          } 
                          className="links"
                        >
                          <NavLink
                            to={sublink.link}
                            title={sublink.heading}
                            className="navLinks"
                          >
                            <div className="SidenavImageDiv">{sublink.icon}</div>
                            <span className="subLinkHeading">{sublink.heading}</span>
                          </NavLink>
                         
                        </li>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}
export default SideNav;
