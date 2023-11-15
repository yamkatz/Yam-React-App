import { useSelector } from "react-redux";

const AdminGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && userData.isAdmin) {
    return children;
  }
};

export default AdminGuard;
