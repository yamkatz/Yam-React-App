import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";
import { useSelector } from "react-redux";
import nextKey from "generate-my-key";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const navigate = useNavigate();
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  const linksToUserRole = () => {
    if (!userData) {
      return [
        { to: ROUTES.HOME, children: "Home" },
        { to: ROUTES.ABOUT, children: "About" },
        { to: ROUTES.REGISTER, children: "Register" },
        { to: ROUTES.LOGIN, children: "Login" },
      ];
    } else if (userData.isBusiness) {
      return [
        { to: ROUTES.HOME, children: "Home" },
        { to: ROUTES.ABOUT, children: "About" },
        { to: ROUTES.FAVCARDS, children: "Favorite cards" },
        { to: ROUTES.MYCARDS, children: "My cards" },
        { to: ROUTES.CREATECARD, children: "Create card" },
      ];
    } else if (userData.isAdmin) {
      return [
        { to: ROUTES.HOME, children: "Home" },
        { to: ROUTES.ABOUT, children: "About" },
        { to: ROUTES.FAVCARDS, children: "Favorite cards" },
        { to: ROUTES.MYCARDS, children: "My cards" },
        { to: ROUTES.CREATECARD, children: "Create card" },
        { to: ROUTES.SANDBOX, children: "Sandbox" },
      ];
    } else {
      return [
        { to: ROUTES.HOME, children: "Home" },
        { to: ROUTES.ABOUT, children: "About" },
        { to: ROUTES.FAVCARDS, children: "Favorite cards" },
      ];
    }
  };

  const linksToShow = loggedIn ? linksToUserRole() : [];

  const handleItemClick = (route) => {
    navigate(route);
    onCloseDrawer();
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      <Box
        sx={{ width: { auto: 250 } }}
        role="presentation"
        onClick={onCloseDrawer}
        onKeyDown={onCloseDrawer}
      >
        <List>
          {linksToShow.map((item) => (
            <ListItem key={nextKey()} disablePadding>
              <ListItemButton onClick={() => handleItemClick(item.to)}>
                <ListItemText primary={item.children} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftDrawerComponent;
