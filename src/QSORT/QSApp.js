import React, { useState, useEffect } from 'react'
import { Grid, Stack, Button, Typography, Box } from '@mui/material';
import GenerateSteps from './GenerateSteps';
import errorAudio from '../Sounds/Ooof.mp3';
import correctAudio from '../Sounds/Yay.mp3';
import Gameover from "../Music/Gameover.mp3";
import WinnerSound from "../Music/Winner.mp3";
import {authAxios} from '../Interceptors/authAxios';

// Declare variables
let steps = [];
let currStep = {};

let length = 10;
let range = 20;

function QSApp({mode}) {

  // Modes:
  // 0: Lesson, no interaction
  // 1: Tutorial, user interaction, no penalties, can enter own array
  // 2: Test level 1 - 10 numbers (1 - 20)
  // 3: Test level 2 - 15 numbers (1 - 40)
  // 4: Test level 3 - 20 numbers (1 - 50)
  // 5: Test level 4 - 50 numbers (1 - 100)

  // Set the mode of the app
  if (mode === 2) {
    length = 10;
    range = 20;
  } else if (mode === 3) {
    length = 15;
    range = 40;
  } else if (mode === 4) {
    length = 20;
    range = 50;
  } else if (mode === 5) {
    length = 50;
    range = 100;
  }

  // const [steps, setSteps] = React.useState([]);

  // Declare needed states
  const [stepNo, setStepNo] = React.useState(0);

  const [sorted, setSorted] = React.useState(-1);
  const [array, setArray] = React.useState([]);
  const [userArray, setUserArray] = React.useState("");
  const [i, setI] = React.useState(0);
  const [j, setJ] = React.useState(1);
  const [pivot, setPivot] = React.useState();
  const [playing, setPlaying] = React.useState(false);
  const [lives, setLives] = React.useState(3);
  const [time, setTime] = useState(0);
  const [clearTime, setClearTime] = React.useState(0);
  const [win, setWin] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  // Use effect for incrementing the timer while the game is being played
  useEffect(() => {
    if (playing) {
      const timerId = setInterval(() => setTime(time + 2), 10);
      // console.log(time)
      return () => clearInterval(timerId);
    }
  }, [time, playing]);


  useEffect(() => {
    endGame();
  }, [lives])

  // Function to split the custom array after commas and then set it
  const splitterOfArrays = () => {

    let newArr = userArray.split(',').map(Number)

    if (!newArr.some(isNaN)) {
      console.log(newArr);
      return newArr;
    }
    else {
      alert("enter in a valid number array in (a,b,c) format where the letters represent numbers")
    }
  }

  // Increment I button check
  const incrementI = () => {
    // setI(i + 1);
    if (currStep.case === "increment i") {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Increment J button check
  const incrementJ = () => {
    // setJ(j + 1);
    if (currStep.case === "increment j") {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Set needed values when game is started
  const startGame = () => {
    resetGame();
    let thisArray = [];
    if (isTestMode() || userArray === "") {
      thisArray = generateArray(length, range);
      setArray(thisArray);
    } else {
      thisArray = splitterOfArrays();
      setArray(thisArray);
    }
    steps = GenerateSteps(thisArray);
    setPlaying(true);
    // setSteps(thisSteps);
    updateValues();
    initializeFirstStep();
  }

  // Function to fix a bug where the first step did nothing
  const initializeFirstStep = () => {
    setStepNo(stepNo + 1);
    updateValues(); 
  }

  // Update the values with the ones found from the JSON array
  const updateValues = () => {
    // console.log(steps);
    // console.log(steps[stepNo]);
    console.log(steps);
    currStep = steps[stepNo];
    console.log(currStep);
    // console.log(currStep);
    setI(currStep.currentI);
    setJ(currStep.currentJ);
    setPivot(currStep.currentPivot);
    setArray(currStep.currentArray);
    setSorted(currStep.sorted);
  }

  // Function to generate a random array with a defined length and range
  const generateArray = (len, ran) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random() * ran) + 1;
    }
    return out;
  }

  // Partition button check
  const partition = () => {
    // let v = [...array];
    // let temp = v[i];
    // v[i] = v[pivot];
    // v[pivot] = temp;
    // setArray(v);
    // setPivot(i - 1);
    // setI(-1);
    // setJ(0);
    if (currStep.case === "partition") {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Swap button check
  const swap = () => {
    // let v = [...array];
    // let temp = v[i];
    // v[i] = v[j];
    // v[j] = temp;
    // setArray(v);
    if (currStep.case === "swap") {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Change index button check
  const changeIndex = () => {
    if (currStep.case === "change index") {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Determine the colour of a button
  const checkColor = (n) => {
    if (n <= sorted) {
      return '#9f9f9f'
    } else if (n === i) {
      return '#e91e63'
    } else if (n === j) {
      return '#4caf50'
    } else if (n === pivot) {
      return '#673ab7'
    } else {
      return '#ffffff'
    }
  }

  // const testFunction = () => {
  //   console.log(steps);
  // }

  // Go to the next step for practice modes
  const nextStep = () => {
    if (currStep.case === "compare" || isTestMode() === false) {
      new Audio(correctAudio).play();
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      new Audio(errorAudio).play();
      alert("Incorrect! Try again!");
    }
  }

  // Check if the game mode is a test mode
  const isTestMode = () => {
    if (mode > 1) {
      return true;
    } else {
      return false;
    }
  }

  // Check if the gamemode is a practice mode
  const isPracticeMode = () => {
    if (mode === 1) {
      return true;
    } else {
      return false;
    }
  }

  // Function to display the timer
  const displayTime = () => {
    let minutes = Math.floor((time / 100 / 60)).toString().padStart(2, "0");
    let seconds = Math.floor((time / 100 % 60)).toString().padStart(2, "0");
    let ms = (time).toString().padStart(2, "0").slice(-2);
    // console.log(minutes + ":" + seconds + ":" + ms);
    return minutes + ":" + seconds + ":" + ms;
  }

  // Function to draw the lives
  const drawLives = () => {
    let dispLives = [];
    for (let i = 0; i < lives; i++) {
      dispLives.push(<label key={i} style={{ border: "solid 1px black" }}>{"<3"}</label>);
    }
    return (
      <div>
        {
          dispLives
        }
      </div>
    );
  }

  // Function to check when the game has ended
  const endGame = () => {
    if (stepNo === steps.length && steps.length > 0) {
      setWin(true);
      setRefresh(true);
      new Audio(WinnerSound).play();
      alert("You win!\n Time: " + displayTime() +  "\n Lives: " + lives);
      if (win) {
        resetGame();
      }
    } else if (lives <= 0 && isTestMode()) {
      setRefresh(true);
      new Audio(Gameover).play();
      alert("You lose! Better luck next time, chump.");
      resetGame();
    } 
  }

  // Function to reset game values
  const resetGame = () => {

    if (mode >= 2 && refresh) {
      authAxios.post('http://10.142.0.2:5000/newStat',{
        level: mode - 1,
        algorithm: "QuickSort",
        time: time,
        lives: lives,
        success: win
      }).then(res=>console.log(res)).catch(err=>console.log(err));
      setRefresh(false);
    }

    setPlaying(false);
    setStepNo(0);
    setSorted(-1);
    setArray([])
    setUserArray("");
    setI(0);
    setJ(1);
    setPivot();
    setLives(3);
    setTime(0);
    setClearTime(0);
    setWin(false);
    steps = [];
    currStep = {};

    // console.log("Reset function is called!");
  }

  const setLessonText = () => {
    switch(currStep.case) {
      case "increment j":
        return "Compare the value at index J to the value at the pivot. It's larger, so increment it";
      case "increment i":
        return "Since the value at index J is larger than the pivot, increment I";
      case "partition":
        return "Now that J has reached the pivot, partition the array, placing the pivot in it's final location";
      case "swap":
        return "Now swap the values at I and J";
      default:
        return "Left-most item is now sorted, so change the indices";
    }
  }

  return (

    <Box m={2}>
      <Typography variant='h4'>
        QuickSort Algorithm
      </Typography>
      {isTestMode() ? null : <input type="text" placeholder="a,b,c but in numbers" required onChange={e => setUserArray(e.target.value)}>

      </input>}
      <Button variant='contained' onClick={startGame}>
        Start Game
      </Button>
      <Button variant='contained' onClick={resetGame}>
        Save Results
      </Button>
      {playing ? <Typography>
        Current I: {i} ; Current J: {j} ; Current Pivot: {pivot} ; Timer: {displayTime()}
      </Typography> : null}
      <Grid container alignItems='center' justifyContent='center' spacing={2}>
        {array.map((num, n) => (
          <Grid item>
            <Button variant='contained'
              sx={{ height: 50, width: 50, borderRadius: 4, backgroundColor: checkColor(n), color: '#000000', border: 1, borderColor: '#000000' }}
            >
              {num}
            </Button>
          </Grid>
        ))}
      </Grid>
      {playing ?
      <Stack direction="row" justifyContent="space-between">
        {(isTestMode() || isPracticeMode()) ? <Stack direction="row" justifyContent="left">
          <Button variant='contained' onClick={incrementI}>
            Increment 'I'
          </Button>
          <Button variant='contained' onClick={incrementJ}>
            Increment 'J'
          </Button>
          <Button variant='contained' onClick={partition}>
            Partition
          </Button>
          <Button variant='contained' onClick={swap}>
            Swap
          </Button>
          <Button variant='contained' onClick={changeIndex}>
            Change Indices
          </Button>



          {/* <Button variant='contained' onClick={testFunction}>
            Test
          </Button> */}

        </Stack> : null}
        {isTestMode() ? null : <Button variant='contained' onClick={nextStep}>
          Next Step
        </Button>}
      </Stack> : null}
      {playing ?
      <Stack direction='column'>
        <Typography variant='h6'>
          {isTestMode() ? null : setLessonText()}
        </Typography>
        <Typography variant='h6'>
          {stepNo}/{steps.length}
        </Typography>
      </Stack> : null}
      {(playing && isTestMode())? drawLives() : null}
      {endGame()}
    </Box>
  )
}

export default QSApp;
