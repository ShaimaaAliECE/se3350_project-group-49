import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MsApp from '../../../mergesort/MsApp';

export default function L4S1() {

  return (
    
    <Box >
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Box > 
            <Box sx={{ height: '40vh' }}>
              <MsApp mode={4}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}