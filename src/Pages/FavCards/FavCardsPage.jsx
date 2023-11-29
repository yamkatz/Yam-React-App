import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, useTheme } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import favCardsNormalization from "./favCardsNormalization";
import AuthTokenService from "../../service/authTokenService";
import { toast } from "react-toastify";
import MoreInfoComponent from "../../components/MoreInfoComponent";

const FavCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const isLoggedIn = AuthTokenService.isUserLoggedIn();
  const [selectedCard, setSelectedCard] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        const normalizedData = favCardsNormalization(data, userData?._id);
        setDataFromServer(normalizedData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData?._id]);

  const isAuth = () => {
    if (isLoggedIn && (userData.isBusiness || userData.isAdmin)) {
      return true;
    } else return false;
  };

  const handleDeleteCard = (_id) => {
    const cardIndex = dataFromServer.findIndex((card) => card._id === _id);

    if (cardIndex !== -1) {
      const updatedData = [...dataFromServer];
      updatedData.splice(cardIndex, 1);

      setDataFromServer(updatedData);

      axios
        .delete(`/cards/${_id}`)
        .then(() => {
          toast.success("Card deleted successfully! 😁", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          const errorMessage = userData.isBusiness
            ? "You can only delete your own cards! 🚫"
            : "Error deleting the card ❌";

          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setDataFromServer([...dataFromServer]);
          console.error("Error deleting card:", error);
        });
    } else {
      console.error("Card not found in the dataFromServer array");
    }
  };

  const handleEditCard = (_id) => {
    const cardToEdit = dataFromServer.find((card) => card._id === _id);
    if (cardToEdit && cardToEdit.user_id === userData._id) {
      navigate(`${ROUTES.EDITCARD}/${_id}`);
    } else {
      toast("You can only edit your own cards!🚫", {
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
  };

  const handleLikeCard = (_id) => {
    setDataFromServer((dataCopy) =>
      dataCopy.map((card) =>
        card._id === _id ? { ...card, likes: !card.likes } : card
      )
    );

    axios
      .patch(`/cards/${_id}`, {
        likes: !dataFromServer.find((card) => card._id === _id).likes,
      })
      .then(() => {})
      .catch((error) => {
        toast.error("Error liking the card ❌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.error("Error liking card:", error);
      });
  };

  const handleShowDetails = (cardDetails) => {
    setSelectedCard(cardDetails);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

  return (
    <Container>
      <Typography variant="h2" fontFamily="lucida" textAlign="center">
        Welcome to Your Favorite Cards Page!
      </Typography>
      <Typography
        textAlign="center"
        sx={{
          marginBottom: 3,
          [theme.breakpoints.down("sm")]: {},
        }}
      >
        Here you can find your favorite cards. Explore the cards you liked.
      </Typography>

      {/* Favorite Cards Grid */}
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              description={card.description}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.likes}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onLikeCard={handleLikeCard}
              isLoggedIn={isLoggedIn}
              isAuth={isAuth}
              userData={userData}
              onShowDetails={handleShowDetails}
            />
          </Grid>
        ))}
        {selectedCard && (
          <MoreInfoComponent
            cardDetails={selectedCard}
            onClose={handleCloseDetails}
          />
        )}
      </Grid>
    </Container>
  );
};

export default FavCardsPage;
