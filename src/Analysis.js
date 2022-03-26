import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { sizing } from '@mui/system';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar } from '@mui/material';

//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW
import StarIcon from '@mui/icons-material/Star';

export default function Analysis() {
   
  return (

    <Box >
    <Grid container spacing={1}>
      <Grid item xs={2}>
      
      <Box sx={{ bgcolor: '#b3e5fc', height: '100vh' }} />
 
      </Grid>
      <Grid item xs={8}>
      <Container >
      <List>
      
      <ListItem>
      <Box sx={{  height: '10vh' }} />
      </ListItem>
      <ListItem>
          <Typography variant = "h4" >
         Analysis
          </Typography>
      </ListItem>
<Divider/>
      <ListItem>
          <Typography variant = "h6" align="center">
          stuff goes here
          </Typography>
      </ListItem>
    
    
      </List>
    </Container>
      </Grid>

 

      <Grid item xs ={2}>
      <Box sx={{ bgcolor: '#b3e5fc', height: '100vh' }} />
      </Grid>
    </Grid>
  </Box>
  );
}