import { Fragment, useState } from "react";
import { BottomNavigation, Divider, Typography, Grid } from "@mui/material";
import myLinks from "../myLinks";
import NavLinkComponent from "../header/NavLinkComponent";
import nextKey from "generate-my-key";

const FooterComponent = () => {
  const [value, setValue] = useState(0);
  return (
    <Fragment>
      <Divider></Divider>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {myLinks.map((mylink) => (
              <NavLinkComponent to={mylink.to} key={nextKey()}>
                {mylink.children}
              </NavLinkComponent>
            ))}
          </BottomNavigation>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            margin={3}
          >
            {"Copyright © "}
            Yam Katz {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FooterComponent;
