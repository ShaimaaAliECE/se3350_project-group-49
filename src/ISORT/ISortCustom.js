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
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW
import StarIcon from '@mui/icons-material/Star';
import { getElementById } from 'domutils';
export default function ISortCustom() {

    const [playing, setPlaying] = React.useState(false);
    const [step, setStep] = React.useState(-1);
    const [index, setIndex] = React.useState(0);
    const [currentElem, setCurrentElem] = React.useState(0);
    const [sorted, setSorted] = React.useState([]);
    const [unsorted, setUnsorted] = React.useState([]);
    const [secondarySort, setSecondarySort] = React.useState([]);
    const [startButton, setStartButton] = React.useState("Start");

    const [lostALife, setLostALife] = React.useState(false);

  
    const [lost, setLost] = React.useState(false);
  
    const [heartOne, setHeartOne] = React.useState("error");
    const [heartTwo, setHeartTwo] = React.useState("error");
    const [heartThree, setHeartThree] = React.useState("error");

    // const [customLength, setCustomLength] = React.useState(10);
    // const [customRange, setCustomRange] = React.useState(20);

    const [time, setTime] = React.useState(0);
    
  
    function startPlaying(){
        let customLength = document.getElementById('lengthText').value;
        let customRange = document.getElementById('rangeText').value;

        if(customLength == "" || customLength == 1){
            customLength = 10;
        }
        if(customRange == ""){
            customRange = 20;
        }

        setStartButton("Restart");
        setPlaying(true);
        let out = generateArray(customLength, customRange);
        setUnsorted([...out]);
        let newSorted = insertionsort(out);
        setSorted([...newSorted]);
        setSecondarySort([]);
        setStep(-1);
        setIndex(-1);
        setHeartOne("error");
        setHeartTwo("error");
        setHeartThree("error");
        setLost(false);
        setTime(0);
        setLostALife(false);

    }

    React.useEffect(()=>{
      if(playing){
        if(!(getText() == "WINNER" || getText() == "LOSER")){
        const timerId = setInterval(() => setTime(time+1), 10);
        console.log(time)
            return () => clearInterval(timerId);
            
        }
      }
    })

    function displayTime(){
      let minutes = Math.floor((time/100/60)).toString().padStart(2,"0");
      let seconds = Math.floor((time/100%60)).toString().padStart(2,"0");
      let ms = (time).toString().padStart(2,"0").slice(-2);
      return minutes+":"+seconds+":"+ms;
    }
     
    function handleClick(e, i){
        if(!lost){
          if(i == 0){
          if(secondarySort.length == 0 || secondarySort.length == 1){
              let elem = unsorted.shift();
              setCurrentElem(elem);
              setUnsorted([...unsorted]);
              secondarySort.push(elem);
              setSecondarySort([...secondarySort]);
              setStep(step+1);
              setIndex(step+1);
              setLostALife(false);

          }
          else if(checkStep()){
              let elem = unsorted.shift();
              setCurrentElem(elem);
              setUnsorted([...unsorted]);
              secondarySort.push(elem);
              setSecondarySort([...secondarySort]);
              setStep(step+1);
              setIndex(step+1);
              setLostALife(false);

          }
          else loseLife();
          }
          else loseLife();
      }
    }
  
    function handleComparison(){
        if(!lost){
          if(!checkEqualArray(secondarySort, sorted)){
              if(checkStep()){
                  loseLife();
              }
              else if(secondarySort.length > 1){
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
                  setLostALife(false);

              }
  
              else loseLife();
          }
      }
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

  function getText(){
    if(playing){
        if(lost){
            return "LOSER";
        }
        else if(checkEqualArray(secondarySort, sorted)){
            setPlaying(false);
            return "WINNER";
        }
    }
  }

  function loseLife(){
    if(heartThree == "error"){
      setHeartThree("disabled");
      setLostALife(true);
  }
  else if(heartTwo == "error"){
    setHeartTwo("disabled");
    setLostALife(true);
  }
    else if(heartOne == "error"){
      setHeartOne("disabled");
      setLost(true);
    }
}

function getColor(hNum){

  switch(hNum){
      case "h1":
          return heartOne;
      case "h2":
          return heartTwo;
      case "h3":
          return heartThree;        
  }
}

function getButtonColor(ind){
  if(heartOne == "disabled"){
    return "error";
  }
  if(ind == "p0" && (checkStep() || secondarySort.length == 0 || secondarySort.length == 1) && lostALife){
    return "error";
  }
  if(ind == "p0" && (checkStep() || secondarySort.length == 0 || secondarySort.length == 1)){
    return "success";
  }
  let currentElemInd = secondarySort.lastIndexOf(currentElem);
  if(ind == currentElemInd && !(checkStep() || secondarySort.length == 0 || secondarySort.length == 1) && lostALife){
    return "error";
  }
  if(ind == currentElemInd && !(checkStep() || secondarySort.length == 0 || secondarySort.length == 1)){
    return "success";
  }
  return "info";
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

      Enter custom length (greater than 1): <TextField 
        id="lengthText"
        variant='outlined'
        size='small'
        sx={{ width: '10ch' }}
        />

    <Box sx={{ height: '5vh'}} />

        Enter custom range: <TextField 
            id="rangeText"
            variant='outlined'
            size='small'
            sx={{ width: '10ch' }}
            />

    <Box sx={{ height: '5vh'}} />

      <Button variant='contained' onClick={startPlaying}>
        {startButton}
      </Button>
   
      <Box>
      <Box sx={{ height: '2vh'}} />

      <Typography variant='overline'>{displayTime()}</Typography>

      <Box sx={{ height: '1vh'}} />

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {unsorted.map((row, i) => (
            <Button color={getButtonColor("p"+i)} onClick={(e) => handleClick(e, i)} >{unsorted[i]}</Button>
          )
          )}
      </ButtonGroup>

      <Box sx={{ height: '5vh'}} />

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {secondarySort.map((row, i) => (
            <Button id={i} color={getButtonColor(i)}>{secondarySort[i]}</Button>
          )
          )}
      </ButtonGroup>

      <Box sx={{ height: '5vh'}} />

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button variant="contained" onClick={handleComparison} startIcon={<ArrowBackIosIcon />}></Button>
      </ButtonGroup>

      <Button></Button>
      
      <FavoriteIcon color={getColor("h1")}/>
      <FavoriteIcon color={getColor("h2")}/>
      <FavoriteIcon color={getColor("h3")}/>

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