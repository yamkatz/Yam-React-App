import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import { profileValidation } from "../../validation/profileValidation";
import { Alert } from "@mui/material";
import { normalizeProfileData } from "./normalizeProfileData";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";

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

  const fetchUserValues = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setInputsValue(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const isSubmitDisabled = () => {
    const requiredFields = [
      "first",
      "last",
      "phone",
      "country",
      "city",
      "street",
      "houseNumber",
      "zip",
    ];
    return requiredFields.some((field) => !inputsValue[field]);
  };

  const renderTextField = (name, label, props) => (
    <Grid item xs={12} key={name}>
      <TextField
        required={props.required}
        fullWidth
        id={name}
        label={label}
        name={name}
        value={inputsValue[name] || ""}
        autoComplete={`new-${name}`}
        onChange={handleInputsChange}
        {...props}
        defaultValue={
          name === "middle" && inputsValue.middle
            ? inputsValue.middle
            : undefined
        }
      />
      {errorsState && errorsState[name] && (
        <Alert severity="warning">{errorsState[name]}</Alert>
      )}
    </Grid>
  );

  const handleEdit = async (event) => {
    try {
      event.preventDefault();

      const regexErrors = profileValidation(inputsValue);
      setErrorsState(regexErrors);

      if (!regexErrors) {
        let request = normalizeProfileData(inputsValue);

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
      }
    } catch (error) {
      console.error("Error editing user details:", error);
    }
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
      <Box component="form" noValidate onSubmit={handleEdit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {renderTextField("first", "First Name", { required: true })}
          {renderTextField("middle", "Middle Name", {
            defaultValue: inputsValue.middle,
          })}
          {renderTextField("last", "Last Name", { required: true })}
          {renderTextField("phone", "Phone", { required: true })}
          {renderTextField("url", "Image URL", {
            defaultValue: inputsValue.url,
          })}
          {renderTextField("alt", "Image Alt", {
            defaultValue: inputsValue.alt,
          })}
          {renderTextField("state", "State", {
            defaultValue: inputsValue.state,
          })}
          {renderTextField("country", "Country", {
            required: true,
          })}
          {renderTextField("city", "City", { required: true })}
          {renderTextField("street", "Street", { required: true })}
          {renderTextField("houseNumber", "House Number", {
            required: true,
          })}
          {renderTextField("zip", "Zip Code", {
            required: true,
          })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitDisabled()}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
