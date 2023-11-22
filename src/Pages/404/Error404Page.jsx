import { Container, Divider, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const Error404Page = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  const theme = useTheme();

  return (
    <Container>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage: `url('/assets/imgs/404.jpg')`,
            alt: "404",
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
            <Box component="form" noValidate sx={{ mt: 10 }}>
              <Typography variant="h1" fontFamily="lucida" textAlign="center">
                404
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
                Page Not Found...
              </Typography>
              <Divider sx={{ marginTop: 2 }}></Divider>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleGoHome}
              >
                Go Home
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Error404Page;
