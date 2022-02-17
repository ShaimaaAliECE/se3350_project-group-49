import React, { useState, useEffect } from "react";


import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NavbarVer2 from "../../../NavbarVer2";
import L1S1 from "./L1S1";
import L1S2 from "./L1S2";
import L1S3 from "./L1S3";
import L1S4 from "./L1S4";

const drawerWidth = 170;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function L1Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <NavbarVer2 />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: "auto" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Merge Sort" {...a11yProps(0)} />
            <Tab label="Quick Sort" {...a11yProps(1)} />
            <Tab label="Bubble Sort" {...a11yProps(2)} />
            <Tab label="Insertion Sort" {...a11yProps(3)} />
          </Tabs>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <TabPanel value={value} index={0}>
          <L1S1 />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <L1S2 />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <L1S3 />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <L1S4 />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default L1Home;
