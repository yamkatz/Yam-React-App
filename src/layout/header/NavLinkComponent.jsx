import { NavLink } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

const NavLinkComponent = ({ to, children }) => {
  return (
    <Grid item xs={6} sm={3}>
      <NavLink to={to}>
        {({ isActive }) => (
          <Typography
            color={isActive ? "warning.main" : "text.primary"}
            sx={{ p: 2 }}
          >
            {children}
          </Typography>
        )}
      </NavLink>
    </Grid>
  );
};

export default NavLinkComponent;
