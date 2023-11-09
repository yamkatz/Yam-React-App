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

const TemplateCardComponent = ({ title, subTitle, image }) => {
  return (
    <Card
      sx={{
        width: 280,
        m: 2,
        boxShadow: "2px 2px 5px",
        border: "3px solid grey",
        borderRadius: "8px",
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ width: "100%", height: 400 }}
          component="img"
          image={image}
          alt="Surf School"
        />
        <CardHeader
          title={title}
          subTitle={subTitle}
          sx={{ backgroundColor: "teal", color: "black" }}
        />
        <CardContent sx={{ backgroundColor: "lightgrey" }}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Phone: </span>0543332221
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            California,USA
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Mail: </span>
            Surfin@gmail.com
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TemplateCardComponent;
