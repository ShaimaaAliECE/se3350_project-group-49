import * as React from "react";
import { Box, Grid } from "@mui/material/";
import MsApp from "../../../MSORT/MsApp";

//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW

export default function Level1() {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <MsApp mode={3}/>
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ height: "100vh" }} />
        </Grid>
      </Grid>
    </Box>
  );
}
