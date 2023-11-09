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
const ComponentCard3 = () => {
  return (
    <Card
      sx={{
        width: 300,
        m: 3,
        boxShadow: "2px 2px 5px",
        border: "3px solid grey",
        borderRadius: "8px",
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ width: "100%", height: "auto" }}
          component="img"
          image="/assets/img-6.jpg"
        ></CardMedia>
        <CardHeader
          title="Tiki's waves"
          subheader="surf school"
          sx={{ backgroundColor: "teal", color: "black" }}
        />
        <CardContent sx={{ backgroundColor: "lightgrey" }}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Phone: </span>0543332221
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            Hawaii
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Mail: </span>
            Tiki@gmail.com
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ComponentCard3;
