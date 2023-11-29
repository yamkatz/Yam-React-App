import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const MoreInfoComponent = ({ cardDetails, onClose }) => {
  const imageUrl = cardDetails.img || "../../public/assets/imgs/cardmanjpg.jpg";
  const imageAlt = cardDetails.img ? cardDetails.title : "profile";

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Typography
          variant="h4"
          style={{
            marginBottom: "8px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {cardDetails.title}
        </Typography>
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{
            maxWidth: "400px",
            maxHeight: "400px",
            objectFit: "contain",
          }}
        />
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: "8px", right: "8px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" textAlign="center">
          {cardDetails.subtitle}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          {cardDetails.description}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Phone: {cardDetails.phone}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Address: {cardDetails.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

MoreInfoComponent.propTypes = {
  cardDetails: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MoreInfoComponent;
