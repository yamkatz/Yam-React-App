const myCardsNormalization = (dataFromServer, userId) => {
  for (let card of dataFromServer) {
    if (Array.isArray(card.likes)) {
      card.likes = Boolean(
        card.likes.find((likedUserId) => likedUserId === userId)
      );
    } else {
      card.likes = false;
    }
  }
  return dataFromServer;
};

export default myCardsNormalization;
