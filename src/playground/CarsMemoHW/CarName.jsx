import { Button } from "@mui/material";
import { memo } from "react";

const CarName = ({ children }) => {
  console.log("CarName");
  return <Button>{children}</Button>;
};
export default memo(CarName);
