const favCardsNormalization = (dataFromServer, id) => {
  return dataFromServer.filter((card) => card.likes.includes(id));
};

export default favCardsNormalization;
