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
import ButtonGroup from '@mui/material/ButtonGroup';
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

import { insertionsort } from '../../Sorting_Algorithms/insertionsort';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW
import StarIcon from '@mui/icons-material/Star';
import { getElementById } from 'domutils';

export default function Sort3() {

  
  const [sorted, setSorted] = React.useState([]);
  const [unsorted, setUnsorted] = React.useState([]);
  const [secondarySort, setSecondarySort] = React.useState([]);
  const [startButton, setStartButton] = React.useState("Start");
  
  function startPlaying(){
      setStartButton("Restart");
      let out = generateArray(10,20);
      generateLessons(out);
      let newSorted = insertionsort(out);
      setSorted([...newSorted]);

  }

  function generateLessons(arr){

    let out = [];
    let iLength = arr.length;

    let k = 0;

    for(let i = 0; i<iLength; i++){
        unsorted[i] = [...arr];
        let value = arr.shift();
        let j = i-1;
        while(j>=0 && value < out[j]){
            out[j+1] = out[j];
            j--;
            secondarySort[k] = [...out];
            k++;
        }
        out[j+1] = value;
        secondarySort[k] = [...out];

        k++;

    }

    setUnsorted([...unsorted]);
    setSecondarySort([...secondarySort]);
    
    console.log(unsorted);
    console.log(secondarySort);

  }
   
  const generateArray = (len, range) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random()*range)+1;
    }
    return out;
  }

  return (
    
    <Box >

      <Grid container spacing={1}>

     
      <Grid item xs={11}>

      <Box sx={{ height: '5vh'}} />

        <Button variant='contained' onClick={startPlaying}>
          {startButton}
        </Button>
     
        <Box>
        <Box sx={{ height: '5vh'}} />

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {unsorted.map((row, i) => (
              <button id={i}>{unsorted[i]}</button>
            )
            )}
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {secondarySort.map((row, i) => (
              <button>{secondarySort[i]}</button>
            )
            )}
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained" startIcon={<ArrowBackIosIcon />}></Button>
          <Button variant="contained" startIcon={<ArrowForwardIosIcon />}></Button>
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <Typography>TEST</Typography>

        </Box>

      </Grid>

      <Grid item xs={1}>
          <Box sx={{ height: '100vh'}} />
        </Grid>

      </Grid>
    </Box>
  );
}