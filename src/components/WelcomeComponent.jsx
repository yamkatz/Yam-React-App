import { Container, Divider, Typography, Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const WelcomeComponent = () => {
  const navigate = useNavigate();
  const handleSignUP = () => {
    navigate(ROUTES.REGISTER);
  };
  return (
    <Container>
      <Typography variant="h2" fontFamily="lucida" textAlign="center">
        Welcome to BIZCARD!
      </Typography>
      <Typography textAlign="center">
        Introducing BIZCARD, provides you a premier solution for amplifying your
        business's visibility to potential clients. <br /> By using our
        user-friendly platform, you can effortlessly design, customize, and
        publish your business card. being able to see a variety of other
        businesses cards, add to favorite and get inspaired.
      </Typography>
      <Box sx={{ m: 1, textAlign: "center" }}>
        <Fab
          size="small"
          color="primary"
          variant="extended"
          onClick={handleSignUP}
        >
          Join us now!
        </Fab>
      </Box>
      <Divider sx={{ margin: 3 }}></Divider>
    </Container>
  );
};

export default WelcomeComponent;
