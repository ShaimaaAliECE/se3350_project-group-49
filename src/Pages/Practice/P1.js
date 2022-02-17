import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MsApp from '../../mergesort/MsApp'

export default function P1() {

  return (
    
    <Box >
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Box > 
            <Box sx={{ height: '40vh' }}>
              <MsApp mode={0}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}