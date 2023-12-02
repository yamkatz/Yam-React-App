import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Box } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import WelcomeComponent from "../../components/WelcomeComponent";
import AuthTokenService from "../../service/authTokenService";
import { toast } from "react-toastify";
import MoreInfoComponent from "../../components/MoreInfoComponent";

let initialDataFromServer = [];
const cardsPerPage = 8;

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initialDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, []);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

  const isLoggedIn = AuthTokenService.isUserLoggedIn();

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
          toast.success("Card deleted successfully!✅");
        })
        .catch((error) => {
          const errorMessage = userData.isBusiness
            ? "You can only delete your own cards! 🚫"
            : "Error deleting the card ❌";
          toast.error(errorMessage);
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
      toast.error("You can only edit your own cards!🚫");
    }
  };

  const handleLikeCard = (_id) => {
    const likedCard = dataFromServer.find((card) => card._id === _id);
    likedCard.likes = !likedCard.likes;
    setDataFromServer([...dataFromServer]);

    axios
      .patch(`/cards/${_id}`, { likes: likedCard.likes })
      .then(() => {})
      .catch((error) => {
        toast.error("Error liking the card ❌");
        console.error("Error liking card:", error);
      });
  };

  const handleShowDetails = (cardDetails) => {
    setSelectedCard(cardDetails);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

  const totalPages = Math.ceil(dataFromServer.length / cardsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const visibleCards = dataFromServer.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <Container>
      <WelcomeComponent />
      <Grid container spacing={2}>
        {visibleCards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subtitle={card.subtitle}
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
      </Grid>
      <Box m={3} textAlign="center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index + 1}
            variant="text"
            onClick={() => handlePageChange(index + 1)}
            sx={{ marginX: 1 }}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
      {selectedCard && (
        <MoreInfoComponent
          cardDetails={selectedCard}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
};

export default HomePage;
