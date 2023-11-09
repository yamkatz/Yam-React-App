import { Box, Divider, Grid } from "@mui/material";
import { Fragment } from "react";

const GridComponent = () => {
  return (
    <Fragment>
      <Divider>auto</Divider>
      <Grid container>
        <Grid item xs>
          1
        </Grid>
        <Grid item xs>
          2
        </Grid>
      </Grid>
      <Divider>8 - 4</Divider>
      <Grid container>
        <Grid item xs={8}>
          1
        </Grid>
        <Grid item xs={4}>
          2
        </Grid>
      </Grid>
      <Divider>responsive</Divider>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ backgroundColor: "red" }}>1</Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ backgroundColor: "red" }}>1</Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ backgroundColor: "red" }}>1</Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default GridComponent;
