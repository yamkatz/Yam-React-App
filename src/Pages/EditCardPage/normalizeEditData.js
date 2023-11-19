const normalizeEditData = (inputsValue) => {
  return {
    title: inputsValue.title,
    subtitle: inputsValue.subtitle,
    description: inputsValue.description,
    phone: inputsValue.phone,
    email: inputsValue.email,
    web: inputsValue.web,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
      state: inputsValue.state,
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
      zip: inputsValue.zip,
    },
  };
};
export { normalizeEditData };
