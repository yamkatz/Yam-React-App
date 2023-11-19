import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import FavCardsNormalization from "./favCardsNormalization";
import authTokenService from "../../service/authTokenService";

const FavCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const isLoggedIn = authTokenService.isUserLoggedIn();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        const normalizedData = FavCardsNormalization(data, userData?._id);
        setDataFromServer(normalizedData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData?._id]);

  const handleDeleteCard = (_id) => {
    console.log("_id to delete (FavCardsPage)", _id);
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.filter((card) => card._id !== _id)
    );
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleLikeCard = (_id) => {
    // Your handleLikeCard logic here
  };

  return (
    <Container>
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

export default FavCardsPage;
