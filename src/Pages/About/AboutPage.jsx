import { Container, Divider, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  const navigate = useNavigate();
  const handleSignUP = () => {
    navigate(ROUTES.REGISTER);
  };

  const theme = useTheme();

  return (
    <Container>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage: `url('/assets/imgs/About.jpg')`,
            alt: "businessPIC",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "block",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        />
        <Grid item xs={12} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography variant="h2" fontFamily="lucida" textAlign="center">
                Welcome to BIZCARDS!
              </Typography>
              <Typography
                textAlign="center"
                sx={{
                  marginBottom: 3,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1.2rem",
                  },
                }}
              >
                Introducing BIZCARDS, providing you with a premier solution for
                amplifying your business's visibility to potential clients. Our
                user-friendly platform allows you to effortlessly design,
                customize, and publish your business card. As a guest user, you
                can browse through a diverse collection of business cards, add
                them to your favorites, and draw inspiration for your own
                design. If you're a registered business user, you can create,
                edit, and publish your own card to showcase your brand.
                <br />
                Click below to join us now!
              </Typography>
              <Divider sx={{ marginTop: 2 }}></Divider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleSignUP}
              >
                Sign Up!
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
