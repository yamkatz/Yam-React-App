import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { normalizeRegisterData } from "./normalizeRegisterData";
import { validateRegister } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { Alert } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
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

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsBusinessAccount(event.target.checked);
  };

  const isSubmitDisabled = () => {
    const requiredFields = [
      "first",
      "last",
      "email",
      "password",
      "phone",
      "country",
      "city",
      "street",
      "houseNumber",
    ];
    return requiredFields.some((field) => !inputsValue[field]);
  };

  const renderTextField = (name, label, props = {}) => (
    <Grid item xs={12} sm={6} key={name}>
      {name === "password" && (
        <Tooltip
          title={
            <Typography variant="body1">
              Password must be at least nine characters long and contain an
              uppercase letter, a lowercase letter, a number, and one of the
              following characters: !@#$%^&*-
            </Typography>
          }
        >
          <InfoOutlinedIcon style={{ marginRight: "5px", cursor: "pointer" }} />
        </Tooltip>
      )}
      <TextField
        required={props.required}
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={`new-${name}`}
        value={inputsValue[name]}
        onChange={handleInputsChange}
        {...props}
      />
      {errorsState && errorsState[name] && (
        <Alert severity="warning">{errorsState[name]}</Alert>
      )}
    </Grid>
  );

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const joiResponse = validateRegister({ inputsValue });
      setErrorsState(joiResponse);
      if (!joiResponse) return;

      const errors = validateRegister(inputsValue);
      if (errors) return;

      let request = normalizeRegisterData(inputsValue, isBusinessAccount);
      const { data } = await axios.post("/users", request);

      navigate(ROUTES.LOGIN);
      toast("You signed up successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error(err);
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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {renderTextField("first", "First Name", { required: true })}
          {renderTextField("middle", "Middle Name", { sm: 4 })}
          {renderTextField("last", "Last Name", { required: true })}
          {renderTextField("email", "Email Address", { required: true })}
          {renderTextField("password", "Password", {
            type: "password",
            required: true,
          })}
          {renderTextField("phone", "Phone", { required: true })}
          {renderTextField("url", "Url")}
          {renderTextField("alt", "Alt")}
          {renderTextField("state", "State")}
          {renderTextField("country", "Country", { required: true })}
          {renderTextField("city", "City", { required: true })}
          {renderTextField("street", "Street", { required: true })}
          {renderTextField("houseNumber", "House Number", { required: true })}
          {renderTextField("zip", "Zip")}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="primary" onChange={handleCheckboxChange} />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitDisabled()}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
