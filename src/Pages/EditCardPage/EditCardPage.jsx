import { useState, useEffect } from "react";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { normalizeEditData } from "./normalizeEditData";
import { validateEditCard } from "../../validation/editCardValidation";

const EditCardPage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
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

  const { _id } = useParams();

  useEffect(() => {
    axios
      .get("/cards/" + _id)
      .then(({ data }) => {
        setInputsValue(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [_id]);

  useEffect(() => {}, [inputsValue]);

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
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
        value={inputsValue[name]}
        autoComplete={`new-${name}`}
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

      const regexErrors = validateEditCard(inputsValue);
      setErrorsState(regexErrors);

      if (!regexErrors) {
        let request = normalizeEditData(inputsValue);

        const { data } = await axios.put("/cards/" + _id, request);

        navigate(ROUTES.MYCARDS);
        toast("Your edits were applied successfully 🔨👷‍♂️", {
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
      console.log("Error updating user status:", err);
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
        Edit your Card
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {renderTextField("title", "Title", { required: true })}
          {renderTextField("subtitle", "Subtitle", { required: true })}
          {renderTextField("description", "Description", { required: true })}
          {renderTextField("phone", "Phone", { required: true })}
          {renderTextField("email", "Email Address", { required: true })}
          {renderTextField("web", "Web", { defaultValue: inputsValue.web })}
          {renderTextField("url", "Url", { defaultValue: inputsValue.url })}
          {renderTextField("alt", "Alt", { defaultValue: inputsValue.alt })}
          {renderTextField("state", "State", {
            defaultValue: inputsValue.state,
          })}
          {renderTextField("country", "Country", { required: true })}
          {renderTextField("city", "City", { required: true })}
          {renderTextField("street", "Street", { required: true })}
          {renderTextField("houseNumber", "House Number", { required: true })}
          {renderTextField("zip", "Zip", { defaultValue: inputsValue.zip })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitDisabled()}
        >
          Edit Card
        </Button>
      </Box>
    </Box>
  );
};

export default EditCardPage;
