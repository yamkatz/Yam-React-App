import { useState } from "react";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { validateCreateCard } from "../../validation/createCardValidation";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { normalizeCreateData } from "./normalizeCreateData";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    email: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { id: _id } = useParams();

  const handleInputsChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const isSubmitDisabled = () => {
    const requiredFields = [
      "title",
      "subtitle",
      "description",
      "email",
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
      <TextField
        required={props.required}
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={`new-${name}`}
        defaultValue={inputsValue[name]}
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

      const regexErrors = validateCreateCard(inputsValue);
      setErrorsState(regexErrors);
      if (!regexErrors) {
        let request = normalizeCreateData(inputsValue);
        const { data } = await axios.post("/cards", request);

        navigate(ROUTES.MYCARDS);
        toast("You created a new card 📇✅", {
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
    } catch (err) {
      console.error("Error during form submission:", err);
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
        Create a Card
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {renderTextField("title", "Title", { required: true })}
          {renderTextField("subtitle", "Subtitle", { required: true })}
          {renderTextField("description", "Description", { required: true })}
          {renderTextField("phone", "Phone", { required: true })}
          {renderTextField("email", "Email Address", { required: true })}
          {renderTextField("web", "Web")}
          {renderTextField("url", "Url")}
          {renderTextField("alt", "Alt")}
          {renderTextField("state", "State")}
          {renderTextField("country", "Country", { required: true })}
          {renderTextField("city", "City", { required: true })}
          {renderTextField("street", "Street", { required: true })}
          {renderTextField("houseNumber", "House Number", { required: true })}
          {renderTextField("zip", "Zip")}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitDisabled()}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCardPage;
