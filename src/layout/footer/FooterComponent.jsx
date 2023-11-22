import { Fragment, useState } from "react";
import { BottomNavigation, Divider, Typography, Grid } from "@mui/material";
import NavLinkComponent from "../header/NavLinkComponent";
import nextKey from "generate-my-key";
import myLinks, {
  loggedInLinksGuest,
  loggedInLinksIsBusiness,
  loggedOutLinks,
  loggedInLinksAdmin,
} from "../../layout/myLinks";
import { useSelector } from "react-redux";

const FooterComponent = () => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  const linksToUserRole = () => {
    if (!userData) {
      return loggedOutLinks;
    } else if (userData.isBusiness && !userData.isAdmin) {
      return loggedInLinksIsBusiness;
    } else if (userData.isAdmin) {
      return loggedInLinksAdmin;
    } else {
      return loggedInLinksGuest;
    }
  };

  const linksToShow = loggedIn ? linksToUserRole() : loggedOutLinks;

  return (
    <Fragment>
      <Divider></Divider>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <BottomNavigation
            showLabels
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {linksToShow.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
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
