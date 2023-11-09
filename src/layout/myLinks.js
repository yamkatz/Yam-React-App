import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.FAVCARDS, children: "Favorite cards" },
  { to: ROUTES.EDITCARD, children: "Edit card" },
  { to: ROUTES.CREATECARD, children: "Create card" },
  { to: ROUTES.MYCARDS, children: "My cards" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About" },
];
const loggedInLinksGuest = [
  { to: ROUTES.FAVCARDS, childer: "Favorite cards" },
  { to: "/profile", children: "Profile page" },
];
const loggedInLinksIsBusiness = [
  { to: ROUTES.FAVCARDS, childer: "Favorite cards" },
  { to: ROUTES.EDITCARD, children: "Edit card" },
  { to: ROUTES.CREATECARD, children: "Create card" },
  { to: ROUTES.MYCARDS, children: "My cards" },
  { to: "/profile", children: "Profile page" },
];
const loggedInLinksAdmin = [
  { to: ROUTES.FAVCARDS, childer: "Favorite cards" },
  { to: ROUTES.EDITCARD, children: "Edit card" },
  { to: ROUTES.CREATECARD, children: "Create card" },
  { to: ROUTES.MYCARDS, children: "My cards" },
  { to: ROUTES.SANDBOX, children: "sandbox" },
  { to: "/profile", children: "Profile page" },
];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export default myLinks;
export {
  alwaysLinks,
  loggedInLinksGuest,
  loggedInLinksIsBusiness,
  loggedOutLinks,
  loggedInLinksAdmin,
};
