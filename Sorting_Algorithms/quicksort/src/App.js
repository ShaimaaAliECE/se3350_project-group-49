import * as React from 'react'
import { Grid, Stack, Button, Container, Typography, Box } from '@mui/material';
import GenerateSteps from './GenerateSteps';

function App() {

  const length = 10;

  const [steps, setSteps] = React.useState([{}])
  const [stepNo, setStepNo] = React.useState(0);

  const [sorted, setSorted] = React.useState(-1);
  const [array, setArray] = React.useState([]);
  const [i, setI] = React.useState(0);
  const [j, setJ] = React.useState(1);
  const [pivot, setPivot] = React.useState();

  const incrementI = () => {
    setI(i + 1);
    console.log(i);
  }
  
  const incrementJ = () => {
    setJ(j + 1);
    console.log(j);
  }

  const startGame = () => {
    setArray(generateArray(length, 50));
    setPivot(length-1);
    setI(-1);
    setJ(0);
    setSteps(GenerateSteps(array));
  }

  const generateArray = (len, range) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random()*range)+1;
    }
    return out;
  }

  const partition = () => {
    let v = [...array];
    let temp = v[i];
    v[i] = v[pivot];
    v[pivot] = temp;
    setArray(v);
    setPivot(i - 1);
    setI(-1);
    setJ(0);
  }

  const swap = () => {
    let v = [...array];
    let temp = v[i];
    v[i] = v[j];
    v[j] = temp;
    setArray(v);
  }

  const changeIndex = () => {
    setI(pivot);
    setJ(pivot + 1);
    setPivot(array.length - 1);
    setSorted(pivot);
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

  const nextStep = () => {
    setStepNo(stepNo++);

  }

  return (

    <Box m={2}>
      <Typography variant='h4'>
        QuickSort Algorithm
      </Typography>
      <Button variant='contained' onClick={startGame}>
        Start Game
      </Button>
      <Typography>
        Current I: {i} ; Current J: {j} ; Current Pivot: {pivot} ;
      </Typography>
      <Grid container>
        {array.map((num, n) =>(
          <Grid item>
            <Button variant='contained'
              sx={{ height: (num * 5), width: 50, borderRadius: 4, backgroundColor: checkColor(n), color: '#000000', border: 1, borderColor: '#000000' }}
              >
              {num}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" justifyContent="left">
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
        </Stack>
        <Button variant='contained' onClick={nextStep}>
          Next Step
        </Button>
      </Stack>
    </Box>
  )
}

export default App;
