import * as React from 'react'
import { Grid, Stack, Button, Container, Typography, Box } from '@mui/material';

function App() {

  const length = 10;

  const [array, setArray] = React.useState([]);
  const [i, setI] = React.useState(0);
  const [j, setJ] = React.useState(1);
  const [pivot, setPivot] = React.useState();
  const [canPivot, setCanPivot] = React.useState(false);

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
    setI(0);
    setJ(1);
  }

  const generateArray = (len, range) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random()*range)+1;
    }
    return out;
  }

  const selectPivot = (n) => {
    if (canPivot) {
      setPivot(n);
      setCanPivot(false);
    }
  }

  const editPivot = () => {
    setCanPivot(!canPivot);
  }

  const swap = () => {
    let v = [...array];
    let temp = v[i];
    v[i] = v[j];
    v[j] = temp;
    setArray(v);
  }

  const checkColor = (n) => {
    if (n === i) {
      return '#e91e63'
    } else if (n === j) {
      return '#4caf50'
    } else if (n === pivot) {
      return '#673ab7'
    } else {
      return '#ffffff'
    }
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
        Current I: {i} ; Current J: {j} ; Current Pivot: {pivot} ; Changing Pivot: {canPivot}
      </Typography>
      <Grid container>
        {array.map((num, n) =>(
          <Grid item>
            <Button variant='contained' onClick={selectPivot(n)} 
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
          <Button variant='contained' onClick={editPivot}>
            Set Pivot
          </Button>
          <Button variant='contained' onClick={swap}>
            Swap
          </Button>
        </Stack>
        <Button variant='contained'>
          Next Step
        </Button>
      </Stack>
    </Box>
  )
}

export default App;
