import {
  Container,
  Box,
  Typography,
  IconButton,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import TemplateCardComponent from "./TemplateCardComponent";
import { CenterFocusStrong } from "@mui/icons-material";

const CardsContainerComponent = () => {
  return (
    <Grid container justifyContent={"center"} spacing={7}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TemplateCardComponent
          title="Surfin"
          subTitle="surf school"
          image="/assets/img-1.jpg"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TemplateCardComponent
          title="Surf Club"
          subTitle="surf school"
          image="/assets/img-4.jpg"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TemplateCardComponent
          title="Hawwai's Surf School"
          subTitle="surf school"
          image="/assets/img-5.jpg"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TemplateCardComponent
          title="Tikis"
          subTitle="surf school"
          image="/assets/img-6.jpg"
        />
      </Grid>
    </Grid>
  );
};
export default CardsContainerComponent;
