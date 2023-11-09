import { Box, Button, Divider } from "@mui/material";
import { Fragment } from "react";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";

const ButtonsComponent = () => {
  return (
    <Fragment>
      <Divider>Buttons</Divider>
      <Box display="flex" justifyContent="space-evenly">
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
        <Button>text</Button>
      </Box>
      <Divider>Disabled buttons</Divider>
      <Box display="flex" justifyContent="space-evenly">
        <Button variant="contained" disabled startIcon={<BedroomBabyIcon />}>
          disabled contained button
        </Button>
        <Button variant="outlined" disabled>
          disabled outlined button
        </Button>
        <Button disabled>disabled text button</Button>
      </Box>
    </Fragment>
  );
};
export default ButtonsComponent;
