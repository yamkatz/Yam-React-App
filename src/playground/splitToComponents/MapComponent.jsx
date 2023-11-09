import React from "react";
import { Container } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import nextKey from "generate-my-key";

let dataFromServer = [
  {
    title: "first card",
    subtitle: "card1",
    phone: "0556602233",
    address: "California USA",
    cardNumber: 123,
    image: "assets/img-6.jpg",
    alt: "tiki",
  },
  {
    title: "second card",
    subtitle: "card2",
    phone: "0556602233",
    address: "California USA",
    cardNumber: 123,
    image: "assets/img-6.jpg",
    alt: "tiki",
  },
  {
    title: "third card",
    subtitle: "card3",
    phone: "0556602233",
    address: "California USA",
    cardNumber: 123,
    image: "assets/img-6.jpg",
    alt: "tiki",
  },
  {
    title: "fourth card",
    subtitle: "card4",
    phone: "0556602233",
    address: "California USA",
    cardNumber: 123,
    image: "assets/img-6.jpg",
    alt: "tiki",
  },
];

const MapComponent = () => {
  return (
    <Container>
      {dataFromServer.map((item) => (
        <CardComponent
          key={nextKey()}
          title={item.title}
          subtitle={item.subtitle}
          phone={item.phone}
          address={item.address}
          cardNumber={item.cardNumber}
          image={item.image}
          alt={item.alt}
        />
      ))}
    </Container>
  );
};
export default MapComponent;
