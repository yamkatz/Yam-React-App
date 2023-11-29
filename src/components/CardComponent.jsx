import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CardComponent = ({
  _id,
  title,
  subtitle,
  phone,
  address,
  img,
  alt,
  like,
  description,
  onDeleteCard,
  onEditCard,
  onLikeCard,
  setDataFromServer,
  isLoggedIn,
  isAuth,
  userData,
  onShowDetails,
}) => {
  const handlePhoneClick = () => {};

  const handleDeleteCardClick = () => {
    onDeleteCard(_id);
  };

  const handleClickEditCard = () => {
    onEditCard(_id);
  };

  const handleLikeCardClick = () => {
    onLikeCard(_id, setDataFromServer);
  };

  const handleShowDetailsClick = () => {
    onShowDetails({
      img,
      title,
      subtitle,
      description,
      phone,
      address,
    });
  };

  return (
    <Card>
      <CardActionArea onClick={handleShowDetailsClick}>
        <CardMedia component="img" image={img} alt={alt} />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} subheader={subtitle} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Description:{" "}
            </Typography>
            {description}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {isAuth &&
              isLoggedIn &&
              (userData.isBusiness || userData.isAdmin) && (
                <React.Fragment>
                  <IconButton onClick={handleClickEditCard}>
                    <CreateIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteCardClick}>
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              )}
          </Box>
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <PhoneIcon />
            </IconButton>

            {isLoggedIn && (
              <IconButton onClick={handleLikeCardClick}>
                <FavoriteIcon color={like ? "favActive" : "false"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  like: PropTypes.bool,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
  setDataFromServer: PropTypes.func,
  description: PropTypes.string.isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

CardComponent.defaultProps = {
  img: "../../public/assets/imgs/cardmanjpg.jpg",
  alt: "profile",
};

export default CardComponent;
