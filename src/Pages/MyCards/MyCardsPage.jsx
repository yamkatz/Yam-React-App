import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import AuthTokenService from "../../service/authTokenService";
import myCardsNormalization from "./myCardsNormalization"; // Import the normalization file
import { toast } from "react-toastify";

const MyCardsPage = () => {
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const isLoggedIn = AuthTokenService.isUserLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/cards/my-cards")
        .then(({ data }) => {
          console.log("All cards from the server:", data);

          const myCardsData = myCardsNormalization(data, userData?._id);
          console.log("My cards:", myCardsData);

          setMyCards(myCardsData);
        })
        .catch((err) => {
          console.log("Error fetching cards:", err);
        });
    }
  }, [isLoggedIn, userData?._id]);
  const isAuth = () => {
    if (isLoggedIn && (userData.isBusiness || userData.isAdmin)) {
      return true;
    } else return false;
  };
  const handleDeleteCard = (_id) => {
    axios
      .delete(`/cards/${_id}`)
      .then(() => {
        setMyCards((myCardsCopy) =>
          myCardsCopy.filter((card) => card._id !== _id)
        );
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
        toast.error("Error deleting the card ❌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error deleting card:", error);
      });
  };

  const handleEditCard = (_id) => {
    // Find the card in the myCards state
    const cardToEdit = myCards.find((card) => card._id === _id);

    // Check if the card exists and if the user is the creator of the card
    if (cardToEdit && cardToEdit.user_id === userData?._id) {
      // User is authorized to edit the card, navigate to the edit card page
      navigate(`${ROUTES.EDITCARD}/${_id}`);
    } else {
      // User is not authorized, show a toast message
      toast.error("You can only edit your own cards! 🚫", {
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
    setMyCards((myCardsCopy) =>
      myCardsCopy.map((card) =>
        card._id === _id ? { ...card, likes: !card.likes } : card
      )
    );
    axios
      .patch(`/cards/${_id}`, {
        likes: !myCards.find((card) => card._id === _id).likes,
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
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Created Cards Page!
      </Typography>
      <Typography variant="body1" paragraph>
        Explore and manage the cards you've created. Make any edits or deletions
        as needed.
      </Typography>
      <Grid container spacing={2}>
        {myCards.map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onLikeCard={handleLikeCard}
              isLoggedIn={isLoggedIn}
              isAuth={isAuth}
              userData={userData}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default MyCardsPage;
