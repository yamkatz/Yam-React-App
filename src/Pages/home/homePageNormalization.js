const homePageNormalization = (dataFromServer, id) => {
  for (let user of dataFromServer) {
    if (Array.isArray(user.likes)) {
      user.likes = Boolean(user.likes.find((userId) => userId === id));
    } else {
      user.likes = false;
    }
  }
  return dataFromServer;
};

export default homePageNormalization;
