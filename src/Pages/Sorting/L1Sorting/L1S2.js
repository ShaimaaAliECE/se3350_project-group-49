import * as React from "react";
import { Box, Grid, Typography } from "@mui/material/";
import QSApp from "../../../QSORT/QSApp";

//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW

export default function Level1() {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <QSApp mode={2}/>
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ height: "100vh" }} />
        </Grid>
      </Grid>
    </Box>
  );
}
