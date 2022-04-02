import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BSApp from "../../../BSORT/BSApp";
//THIS PAGE IS BUILT ON THE DESIGN INSPIRED BY THE OWL WEBSITE, SKELETON VERSION WITH 2 ACTIVE PAGE BUTTONS, COURSE CONTENT AND OVERVIEW
import StarIcon from "@mui/icons-material/Star";

export default function Level1() {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <BSApp mode={3} />
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ height: "100vh" }} />
        </Grid>
      </Grid>
    </Box>
  );
}
