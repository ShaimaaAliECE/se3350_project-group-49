import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { insertionsort } from '../Sorting_Algorithms/insertionsort';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';

import errorAudio from '../Sounds/Ooof.mp3';
import correctAudio from '../Sounds/Yay.mp3';
import loserAudio from '../Music/Gameover.mp3';

export default function ISortL2() {

    const [playing, setPlaying] = React.useState(false);
    const [lost, setLost] = React.useState(false);

    const [step, setStep] = React.useState(-1);
    const [index, setIndex] = React.useState(0);
    const [currentElem, setCurrentElem] = React.useState(0);
    const [sorted, setSorted] = React.useState([]);
    const [unsorted, setUnsorted] = React.useState([]);
    const [secondarySort, setSecondarySort] = React.useState([]);

    const [startButton, setStartButton] = React.useState("Start");
    
    const [heartOne, setHeartOne] = React.useState("error");
    const [heartTwo, setHeartTwo] = React.useState("error");
    const [heartThree, setHeartThree] = React.useState("error");
    const [lostALife, setLostALife] = React.useState(false);

    const [time, setTime] = React.useState(0);
    
    //starts game. Resets all useStates to game starting position.
    function startPlaying(){
        setStartButton("Restart");
        setPlaying(true);
        let out = generateArray(15,40);
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

    //starts timer when game playing
    React.useEffect(()=>{
      if(playing){
        if(!(getText() == "WINNER" || getText() == "LOSER")){
        const timerId = setInterval(() => setTime(time+1), 10);
            return () => clearInterval(timerId);
            
        }
      }
    })

    //returns time formatted in mm:ss::msms
    function displayTime(){
      let minutes = Math.floor((time/100/60)).toString().padStart(2,"0");
      let seconds = Math.floor((time/100%60)).toString().padStart(2,"0");
      let ms = (time).toString().padStart(2,"0").slice(-2);
      return minutes+":"+seconds+":"+ms;
    }
     
    //handles click on any button in unsorted array
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
              new Audio(correctAudio).play();
          }
          else if(checkStep()){
              let elem = unsorted.shift();
              console.log(elem);
              setCurrentElem(elem);
              setUnsorted([...unsorted]);
              secondarySort.push(elem);
              setSecondarySort([...secondarySort]);
              setStep(step+1);
              setIndex(step+1);
              setLostALife(false);
              new Audio(correctAudio).play();
          }
          else loseLife();
          }
          else loseLife();
      }
    }
  
    //handles comparison button when sorting secondary array
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
                  new Audio(correctAudio).play();
                  
              }
  
              else loseLife();
          }
      }
    }

  //ensures the action taken by user is correct. Returns true if step right
  function checkStep(){
    const clonedSort = [...secondarySort];
    let checkSorted = insertionsort(clonedSort);
    if(checkEqualArray(secondarySort, checkSorted)){ console.log("TRUE"); return true;} 
    else{console.log("FALSE"); return false;}
  }

  //checks to see if two arrays are equal. Used for ending game.
  function checkEqualArray(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  //displays winner / loser text when game over.
  function getText(){
    if(playing){
        if(lost){
            return "LOSER";
        }
        else if(checkEqualArray(secondarySort, sorted)){
            setPlaying(false);
        }
    }
    else if(checkEqualArray(secondarySort, sorted) && secondarySort.length > 0){
      return "WINNER";
    }
  }

  //removes a heart from screen when user takes a wrongful action
  function loseLife(){
    new Audio(errorAudio).play();
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
      new Audio(loserAudio).play();
    }
}

//gets color of heart. Red if still alive and grey if heart lost.
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

//gets button color. If mistake was made on last step, the button of current step will become red. If last step was correct, the button of current step will be green.
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

//generates an array of any size or range
const generateArray = (len, range) => {
  let out = [];
  for (let i = 0; i < len; i++) {
    out[out.length] = Math.floor(Math.random()*range)+1;
  }
  return out;
}

//html code
return (
  

  <Box >
    <Grid container spacing={1}>

   
    <Grid item xs={11}>

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