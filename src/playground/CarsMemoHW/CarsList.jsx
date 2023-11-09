import { Button, TextField } from "@mui/material";
import { Fragment, useCallback, useState, useMemo } from "react";
import CarName from "./CarName";

const CarsList = () => {
  const [cars, setCars] = useState([
    { name: "mazda", id: 1, km: 10000 },
    { name: "subaro", id: 2, km: 8000 },
    { name: "kia", id: 2, km: 18000 },
    { name: "ferrari", id: 2, km: 80900 },
  ]);
  const [txt, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBtnClick = () => {
    setCars((carsState) => [...carsState, txt]);
    setText("");
  };

  return (
    <Fragment>
      <TextField value={txt} onChange={handleTextChange} />
      <Button onClick={handleBtnClick}>Add car</Button>
      {cars.map((car, index) => (
        <CarName key={index}>{car}</CarName>
      ))}
    </Fragment>
  );
};

export default CarsList;
