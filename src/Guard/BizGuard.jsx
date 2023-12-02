import { useSelector } from "react-redux";

const BizGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && userData.isBusiness && !userData.isAdmin) {
    return children;
  }
};
export default BizGuard;
