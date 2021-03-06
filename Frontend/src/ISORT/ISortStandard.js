import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { insertionsort } from '../Sorting_Algorithms/insertionsort';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ISortStandard() {

  const [playing, setPlaying] = React.useState(false);
  const [step, setStep] = React.useState(-1);
  const [index, setIndex] = React.useState(0);
  const [currentElem, setCurrentElem] = React.useState(0);
  const [sorted, setSorted] = React.useState([]);
  const [unsorted, setUnsorted] = React.useState([]);
  const [secondarySort, setSecondarySort] = React.useState([]);
  const [startButton, setStartButton] = React.useState("Start");

  const [lost, setLost] = React.useState(false);
  

  function startPlaying(){
      console.log("TEST 1");
      setStartButton("Restart");
      setPlaying(true);
      let out = generateArray(10,20);
      setUnsorted([...out]);
      console.log("TEST 2");
      let newSorted = insertionsort(out);
      setSorted([...newSorted]);
      setSecondarySort([]);
      setStep(-1);
      setIndex(-1);

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
        }
        else if(checkStep()){
            let elem = unsorted.shift();
            setCurrentElem(elem);
            setUnsorted([...unsorted]);
            secondarySort.push(elem);
            setSecondarySort([...secondarySort]);
            setStep(step+1);
            setIndex(step+1);
        }
      }
    }
  }

  function handleComparison(){
      if(!lost){
        if(!checkEqualArray(secondarySort, sorted)){
            if(checkStep()){
                ;
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
                
            }

            
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
      else if( (secondarySort.length == 0)){
          return "Select the first element in the unsorted array";
      }
      else if(checkEqualArray(secondarySort, sorted)){
        return "WINNER";
      }
      else if((secondarySort.length == 1) || (checkStep())){
          return "From the unsorted list, select the first element in the array"
      }
      else
        return "Shift the newest element in the sorted list";
    }
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

      <Typography textAlign="left">INSERTION SORT: STANDARD</Typography>
      <Divider/>

      

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
              <Button id={i} color="info" onClick={(e) => handleClick(e, i)} >{unsorted[i]}</Button>
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
          <Button variant="contained" onClick={handleComparison} startIcon={<ArrowBackIosIcon />}></Button>
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