import React, { useState, useEffect } from 'react'
import { Grid, Stack, Button, Typography, Box } from '@mui/material';
import GenerateSteps from './GenerateSteps';

let steps = [];
let currStep = {};

let length = 10;
let range = 20;
let mode = 1;

function QSApp({mode}) {

  // Modes:
  // 0: Lesson, no interaction
  // 1: Tutorial, user interaction, no penalties, can enter own array
  // 2: Test level 1 - 10 numbers (1 - 20)
  // 3: Test level 2 - 15 numbers (1 - 40)
  // 4: Test level 3 - 20 numbers (1 - 50)
  // 5: Test level 4 - 50 numbers (1 - 100)

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

  useEffect(() => {
    if (playing) {
      const timerId = setInterval(() => setTime(time + 2), 10);
      // console.log(time)
      return () => clearInterval(timerId);
    }
  }, [time, playing]);

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

  const incrementI = () => {
    // setI(i + 1);
    if (currStep.case === "increment i") {
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

  const incrementJ = () => {
    // setJ(j + 1);
    if (currStep.case === "increment j") {
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

  const startGame = () => {
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
  }

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

  const generateArray = (len, ran) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random() * ran) + 1;
    }
    return out;
  }

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
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

  const swap = () => {
    // let v = [...array];
    // let temp = v[i];
    // v[i] = v[j];
    // v[j] = temp;
    // setArray(v);
    if (currStep.case === "swap") {
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

  const changeIndex = () => {
    if (currStep.case === "change index") {
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

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

  const nextStep = () => {
    if (currStep.case === "compare" || isTestMode() === false) {
      setStepNo(stepNo + 1);
      updateValues(); 
    } else if (isTestMode()) {
      alert("Incorrect! Try again!");
      setLives(lives - 1);
    } else {
      alert("Incorrect! Try again!");
    }
  }

  const isTestMode = () => {
    if (mode > 1) {
      return true;
    } else {
      return false;
    }
  }

  const isPracticeMode = () => {
    if (mode === 1) {
      return true;
    } else {
      return false;
    }
  }

  const displayTime = () => {
    let minutes = Math.floor((time / 100 / 60)).toString().padStart(2, "0");
    let seconds = Math.floor((time / 100 % 60)).toString().padStart(2, "0");
    let ms = (time).toString().padStart(2, "0").slice(-2);
    // console.log(minutes + ":" + seconds + ":" + ms);
    return minutes + ":" + seconds + ":" + ms;
  }

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

  const endGame = () => {
    if (stepNo === steps.length && steps.length > 0) {
      alert("You win!");
      resetGame();
    } else if (lives <= 0) {
      alert("You lose! Better luck next time, chump.");
      resetGame();
    }
  }

  const resetGame = () => {
    // const [stepNo, setStepNo] = React.useState(0);

    // const [sorted, setSorted] = React.useState(-1);
    // const [array, setArray] = React.useState([]);
    // const [userArray, setUserArray] = React.useState("");
    // const [i, setI] = React.useState(0);
    // const [j, setJ] = React.useState(1);
    // const [pivot, setPivot] = React.useState();
    // const [playing, setPlaying] = React.useState(false);
    // const [lives, setLives] = React.useState(3);
    // const [time, setTime] = useState(0);

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
    steps = [];
    currStep = {};
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
      <Typography>
        Current I: {i} ; Current J: {j} ; Current Pivot: {pivot} ; Timer: {displayTime()}
      </Typography>
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
        <Button variant='contained' onClick={nextStep}>
          Next Step
        </Button>
      </Stack>
      <Stack direction='column'>
        <Typography variant='h6'>
          {isTestMode() ? null : setLessonText()}
        </Typography>
        <Typography variant='h6'>
          {stepNo}/{steps.length}
        </Typography>
      </Stack>
      {drawLives()}
      {endGame()}
    </Box>
  )
}

export default QSApp;