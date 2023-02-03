import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./CMainTab.scss";

import { Link } from "react-router-dom";
import ConciergeFLow from "./ConciergeFlow/ConciergeFlow";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    // width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: any) => {
    // setValue(newValue);
    setValue(parseInt(newValue.currentTarget.id.split("-")[2]));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="primary"
          variant="scrollable"
          aria-label="simple tabs example"
          TabIndicatorProps={{ style: { background: "#0C152E" } }}
        >
          <Tab
            component={Link}
            to={{
              pathname: `/dashboard/concierge/workflow`,
            }}
            label="Workflow & Script"
            {...a11yProps(0)}
          />
          <Tab
            component={Link}
            to={{
              pathname: ``,
            }}
            label="Activity Monitor"
            {...a11yProps(1)}
          />
          <Tab
            component={Link}
            to={{
              pathname: ``,
            }}
            label="Emails"
            {...a11yProps(2)}
          />
          <Tab
            component={Link}
            to={{
              pathname: ``,
            }}
            label="Calls"
            {...a11yProps(3)}
          />
          <Tab
            component={Link}
            to={{
              pathname: ``,
            }}
            label="Goals"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
          <ConciergeFLow />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Three
        </TabPanel> */}
    </div>
  );
}
