import { useSelector } from "react-redux";

const GuestGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && !userData.isBusiness && !userData.isAdmin) {
    return children;
  }
};
export default GuestGuard;
