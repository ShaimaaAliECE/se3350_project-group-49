import React, { useState, useEffect } from 'react'


import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import { BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import Home from "./Home";
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NavbarVer2 from './NavbarVer2';
import Sort1 from "./Pages/Lessons/Sort1"
import Level1 from './Pages/Testing Pages/Level1';
import Level2 from './Pages/Testing Pages/Level2';
import Level3 from './Pages/Testing Pages/Level3';
import Level4 from './Pages/Testing Pages/Level4';


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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Template() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (


    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <NavbarVer2/>
   
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />

        
        <Box sx={{ overflow: 'auto' }}>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Sort Type 1" {...a11yProps(0)} />
        <Tab label="Sort Type 2" {...a11yProps(1)} />
        <Tab label="Sort Type 3" {...a11yProps(2)} />
        <Tab label="Sort Type 4" {...a11yProps(3)} />
  
      </Tabs>
          
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
    


      <TabPanel value={value} index={0}>
        <Level1/>
      </TabPanel>


      <TabPanel value={value} index={1}>
        <Level2/>
      </TabPanel>



      <TabPanel value={value} index={2}>
        <Level3/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Level4/>
      </TabPanel>



    

     
      </Box>
    </Box>
  )


}


export default Template
