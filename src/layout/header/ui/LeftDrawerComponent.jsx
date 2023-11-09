import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>
        {[
          "Home page",
          "About",
          "Register",
          "Login",
          "Favorite cards",
          "Edit card",
          "Create card",
          "Sandbox",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
