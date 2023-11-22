import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import myLinks, {
  loggedInLinksGuest,
  loggedInLinksIsBusiness,
  loggedOutLinks,
  loggedInLinksAdmin,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
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
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {linksToShow.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={nextKey()}>
          {myItem.children}
        </NavLinkComponent>
      ))}
    </Box>
  );
};

export default Links;
