const homePageNormalization = (dataFromServer, id) => {
  for (let user of dataFromServer) {
    // Check if user.likes is an array
    if (Array.isArray(user.likes)) {
      // Update the likes property based on whether the id is in the array
      user.likes = Boolean(user.likes.find((userId) => userId === id));
    } else {
      // If user.likes is not an array, set it to false
      user.likes = false;
    }
  }
  return dataFromServer;
};

export default homePageNormalization;
