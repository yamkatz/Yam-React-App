const validateCreateCard = (inputToCheck) => {
  const errors = {};
  if (
    !inputToCheck.title ||
    inputToCheck.title.length < 2 ||
    inputToCheck.title.length > 256
  ) {
    errors.title = "Title must be between 2 and 256 characters";
  }
  if (
    !inputToCheck.subtitle ||
    inputToCheck.subtitle.length < 2 ||
    inputToCheck.subtitle.length > 256
  ) {
    errors.subtitle = "Subtitle must be between 2 and 256 characters";
  }
  if (
    !inputToCheck.description ||
    inputToCheck.description.length < 2 ||
    inputToCheck.description.length > 1024
  ) {
    errors.description = "Description must be between 2 and 1024 characters";
  }

  const phonePattern = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
  if (!phonePattern.test(inputToCheck.phone)) {
    errors.phone = "Invalid phone number";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(inputToCheck.email)) {
    errors.email = "Invalid email address";
  }

  const webPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (inputToCheck.web && !webPattern.test(inputToCheck.web)) {
    errors.web = "Invalid web address";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (inputToCheck.url && !urlPattern.test(inputToCheck.url)) {
    errors.url = "Invalid URL";
  }

  const altPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (inputToCheck.alt && !altPattern.test(inputToCheck.alt)) {
    errors.alt = "Invalid Alt value";
  }

  const statePattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (inputToCheck.state && !statePattern.test(inputToCheck.state)) {
    errors.state = "Invalid State value";
  }

  const countryPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!countryPattern.test(inputToCheck.country)) {
    errors.country = "Invalid Country value";
  }

  const cityPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!cityPattern.test(inputToCheck.city)) {
    errors.city = "Invalid City value";
  }

  const streetPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!streetPattern.test(inputToCheck.street)) {
    errors.street = "Invalid Street value";
  }

  const houseNumberPattern = /^[1-9]\d*$/;
  if (!houseNumberPattern.test(inputToCheck.houseNumber)) {
    errors.houseNumber = "Invalid House Number value";
  }

  const zipPattern = /^[1-9]\d*$/;
  if (inputToCheck.zip && !zipPattern.test(inputToCheck.zip)) {
    errors.zip = "Invalid Zip value";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

export { validateCreateCard };
