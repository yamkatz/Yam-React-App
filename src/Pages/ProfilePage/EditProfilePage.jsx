import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";
import { profileValidation } from "../../validation/profileValidation";
import { normalizeProfileData } from "./normalizeProfileData";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const userId = userData?._id ?? "";

  const [inputsValue, setInputsValue] = useState({
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  });

  useEffect(() => {
    if (userId) {
      fetchUserValues();
    }
  }, [userId]);

  const getFieldByPath = (object, path) => {
    return path.split(".").reduce((acc, current) => acc[current], object);
  };

  const fetchUserValues = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setInputsValue(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleInputsChange = (path, value) => {
    const [rootKey, nestedKey] = path.split(".");

    setInputsValue((currentState) => ({
      ...currentState,
      [rootKey]: {
        ...currentState[rootKey],
        [nestedKey]: value,
      },
    }));
  };

  const renderTextField = (path, label, props) => (
    <Grid item xs={12} key={path}>
      <TextField
        required={props.required}
        fullWidth
        id={path}
        label={label}
        name={path}
        value={getFieldByPath(inputsValue, path) || ""}
        autoComplete={`new-${path}`}
        onChange={(e) => handleInputsChange(path, e.target.value)}
        {...props}
      />
      {errorsState && errorsState[path] && (
        <Alert severity="warning">{errorsState[path]}</Alert>
      )}
    </Grid>
  );

  const handleEdit = async (event) => {
    try {
      event.preventDefault();

      const regexErrors = profileValidation(inputsValue);
      console.log("Regex Errors:", regexErrors);
      setErrorsState(regexErrors);

      if (!regexErrors) {
        const request = normalizeProfileData(inputsValue);

        const { data } = await axios.put(`/users/${userId}`, request);

        navigate(ROUTES.PROFILE);
        toast("Profile edited successfully!🔨👷‍♂️", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        Object.values(regexErrors).forEach((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      }
    } catch (error) {
      console.error("Error editing user details:", error);
    }
  };
  const handleClose = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Edit Your Profile
      </Typography>

      <Grid container spacing={2}>
        {renderTextField("name.first", "First Name", {})}
        {renderTextField("name.middle", "Middle Name", {})}
        {renderTextField("name.last", "Last Name", {})}
        {renderTextField("phone", "Phone", {})}
        {renderTextField("image.url", "Image URL", {})}
        {renderTextField("image.alt", "Image Alt", {})}
        {renderTextField("address.state", "State", {})}
        {renderTextField("address.country", "Country", {})}
        {renderTextField("address.city", "City", {})}
        {renderTextField("address.street", "Street", {})}
        {renderTextField("address.houseNumber", "House Number", {})}
        {renderTextField("address.zip", "ZIP Code", {})}
      </Grid>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Update
        </Button>

        <Button variant="contained" color="secondary" onClick={handleClose}>
          Changed your mind? Go Back 😉
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
