const myCardsNormalization = (dataFromServer, userId) => {
  for (let card of dataFromServer) {
    // Check if card.likes is an array
    if (Array.isArray(card.likes)) {
      // Update the likes property based on whether the userId is in the array
      card.likes = Boolean(
        card.likes.find((likedUserId) => likedUserId === userId)
      );
    } else {
      // If card.likes is not an array, set it to false
      card.likes = false;
    }
  }
  return dataFromServer;
};

export default myCardsNormalization;
