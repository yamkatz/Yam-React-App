import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Switch } from "@mui/material";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import FilterComponent from "./ui/FilterComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const HeaderComponent = ({ isDarkTheme, onThemeChange, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const handleProfilePage = () => {
    if (token) {
      navigate(ROUTES.PROFILE);
    } else {
      toast.error("You need to be a logged in user to access your profile");
    }
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate(ROUTES.LOGIN);
      window.location.reload();
      setToken(null);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 15 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BIZCARD.com
          </Typography>

          <Links userRole={userRole} />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              onClick={handleProfilePage}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {token && (
              <Typography
                variant="button"
                color="inherit"
                onClick={handleLogout}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              >
                Logout
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};

export default HeaderComponent;
