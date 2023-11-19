import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import WelcomeComponent from "../../components/WelcomeComponent";
import authTokenService from "../../service/authTokenService";

let initialDataFromServer = [];

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        console.log("data", data);
        initialDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    console.log("filter", filter);
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

  const isLoggedIn = authTokenService.isUserLoggedIn();

  const handleDeleteCard = (_id) => {
    console.log("_id to delete (HomePage)", _id);
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.filter((card) => card._id !== _id)
    );
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleLikeCard = (_id) => {
    // Find the card in the dataFromServer array
    const likedCard = dataFromServer.find((card) => card._id === _id);

    // Toggle the like status
    likedCard.likes = !likedCard.likes;

    // Update the state
    setDataFromServer([...dataFromServer]);

    // Update the server with the new like status using Axios
    axios
      .patch(`/cards/${_id}`, { likes: likedCard.likes })
      .then((response) => {
        console.log("Card liked successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error liking card:", error);
      });
  };

  return (
    <Container>
      <WelcomeComponent />
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
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
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
