import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const userId = userData?._id ?? "";
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUserValues();
    }
  }, [userId]);

  const fetchUserValues = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setInputsValue(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleEditBtn = () => {
    navigate(ROUTES.EDITPRO);
  };

  return (
    <Box
      style={{
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Grid container justifyContent="space-evenly" marginTop={8}>
        <Box>
          <img
            src={
              inputsValue.image
                ? `${inputsValue.image.url}`
                : "/public/assets/imgs/profilepic.jpg"
            }
            alt={
              inputsValue.image
                ? `${inputsValue.image.alt}`
                : "Default Profile Pic"
            }
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "15px",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        textAlign="center"
        justifyContent="space-evenly"
      >
        <Box>
          <Typography
            variant="h3"
            fontFamily="lucida"
            textTransform="uppercase"
          >
            {inputsValue.name
              ? `${inputsValue.name.first} ${inputsValue.name.last}`
              : ""}
          </Typography>
          <Typography variant="h6" textAlign="center">
            Phone: {inputsValue.phone}
          </Typography>
          <Typography variant="h6" textAlign="center">
            Country:
            {inputsValue.address ? `${inputsValue.address.country}` : ""}
          </Typography>
          <Typography variant="h6" textAlign="center">
            City:
            {inputsValue.address ? `${inputsValue.address.city}` : ""}
          </Typography>
          <Typography variant="h6" textAlign="center">
            Street:
            {inputsValue.address ? `${inputsValue.address.street}` : ""}
          </Typography>
          <Typography variant="h6" textAlign="center">
            House Number:
            {inputsValue.address ? `${inputsValue.address.houseNumber}` : ""}
          </Typography>
          <Typography variant="h6" textAlign="center">
            Zip:
            {inputsValue.address ? `${inputsValue.address.zip}` : ""}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={inputsValue.isBusiness || false}
              />
            }
            label="Business Account"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" margin={5}>
          <Button variant="contained" color="primary" onClick={handleEditBtn}>
            Edit
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
