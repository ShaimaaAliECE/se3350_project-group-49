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

import { insertionsort } from '../Sorting_Algorithms/insertionsort';
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

export default function ISortLesson() {

  const [playing, setPlaying] = React.useState(false);
  const [step, setStep] = React.useState(-1);
  const [index, setIndex] = React.useState(0);
  const [currentElem, setCurrentElem] = React.useState(0);
  const [sorted, setSorted] = React.useState([]);
  const [unsorted, setUnsorted] = React.useState([]);
  const [secondarySort, setSecondarySort] = React.useState([]);
  const [startButton, setStartButton] = React.useState("Start");
  

  function startPlaying(){
      setStartButton("Restart");
      setPlaying(true);
      let out = generateArray(10,20);
      setUnsorted([...out]);
      let newSorted = insertionsort(out);
      setSorted([...newSorted]);
      setSecondarySort([]);
      setStep(-1);
      setIndex(-1);
  }
   
  function handleClick(){
    
    if(playing){
        if(secondarySort.length == 0 || secondarySort.length == 1){
            
            let elem = unsorted.shift();
            setCurrentElem(elem);
            setUnsorted([...unsorted]);
            secondarySort.push(elem);
            setSecondarySort([...secondarySort]);
            setStep(step+1);
            setIndex(step+1);
        }
        else if(checkStep() && (secondarySort.length < 10)){
            let elem = unsorted.shift();
            setCurrentElem(elem);
            setUnsorted([...unsorted]);
            secondarySort.push(elem);
            setSecondarySort([...secondarySort]);
            setStep(step+1);
            setIndex(step+1);
        }
        else if(!(checkEqualArray(sorted, secondarySort))){
            handleComparison();
        }
    }
    
  }

  function handleComparison(){
      
    console.log(step);
    console.log(index);
    console.log(currentElem);
    
    console.log(secondarySort[index]);
    console.log(secondarySort[index-1]);

    secondarySort[index] = secondarySort[index-1];
    secondarySort[index-1] = currentElem;
    console.log(secondarySort);
    setSecondarySort([...secondarySort]);
    console.log(index);
    setIndex(index-1);
    console.log(index);
    console.log(secondarySort);
        
  }

  function checkStep(){
    const clonedSort = [...secondarySort];
    let checkSorted = insertionsort(clonedSort);
    console.log(secondarySort);
    console.log(checkSorted);
    if(checkEqualArray(secondarySort, checkSorted)){ console.log("TRUE"); return true;} 
    else{console.log("FALSE"); return false;}
  }

  function checkEqualArray(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const generateArray = (len, range) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random()*range)+1;
    }
    return out;
  }

  function getText(){
    if(playing){
      if( (secondarySort.length == 0)){
          return "Select the first element in the unsorted array";
      }
      else if(checkEqualArray(secondarySort, sorted)){
        return "FINISHED";
      }
      else if((secondarySort.length >= 1) && (checkStep())){
          return "From the unsorted list, select the first element in the array"
      }
      else
        return "Shift the newest element in the sorted list";
    }
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
              <Button id={i} color="info">{unsorted[i]}</Button>
            )
            )}
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {secondarySort.map((row, i) => (
              <Button color="info">{secondarySort[i]}</Button>
            )
            )}
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained" onClick={handleClick} startIcon={<ArrowForwardIosIcon />}>NEXT STEP</Button>
        </ButtonGroup>

        <Box sx={{ height: '5vh'}} />

        <Typography>{getText()}</Typography>

        </Box>

      </Grid>

      <Grid item xs={1}>
          <Box sx={{ height: '100vh'}} />
        </Grid>

      </Grid>
    </Box>
  );
}