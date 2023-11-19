const validateEditCard = (inputToCheck) => {
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
  if (!inputToCheck.phone) {
    errors.phone = "Phone is required";
  } else if (!phonePattern.test(inputToCheck.phone)) {
    errors.phone = "Invalid phone number";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(inputToCheck.email)) {
    errors.email = "Invalid email address";
  }
  if (!inputToCheck.email) {
    errors.email = "Email address is required";
  }

  const webPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (inputToCheck.web && !webPattern.test(inputToCheck.web)) {
    errors.web = "Invalid web address";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (inputToCheck.url && !urlPattern.test(inputToCheck.url)) {
    errors.url = "Invalid URL";
  }

  const altPattern = /^[1-9]\d*$/;
  if (inputToCheck.alt && !altPattern.test(inputToCheck.alt)) {
    errors.alt = "Invalid Alt value";
  }

  const statePattern = /^[1-9]\d*$/;
  if (inputToCheck.state && !statePattern.test(inputToCheck.state)) {
    errors.state = "Invalid State value";
  }

  const countryPattern = /^[a-zA-Z\s,'-]+$/;
  if (!countryPattern.test(inputToCheck.country)) {
    errors.country = "Invalid Country value";
  }
  if (!inputToCheck.country) {
    errors.country = "Country is required";
  }

  const cityPattern = /^[a-zA-Z0-9\s,'-]*$/;
  if (!cityPattern.test(inputToCheck.city)) {
    errors.city = "Invalid City value";
  }
  if (!inputToCheck.city) {
    errors.city = "City is required";
  }

  const streetPattern = /^[a-zA-Z0-9\s,'-]*$/;
  if (!streetPattern.test(inputToCheck.street)) {
    errors.street = "Invalid Street value";
  }
  if (!inputToCheck.street) {
    errors.street = "Street is required";
  }

  const houseNumberPattern = /^[1-9]\d*$/;
  if (!houseNumberPattern.test(inputToCheck.houseNumber)) {
    errors.houseNumber = "Invalid House Number value";
  }
  if (!inputToCheck.houseNumber) {
    errors.houseNumber = "house number is required";
  }

  const zipPattern = /^[1-9]\d*$/;
  if (inputToCheck.zip && !zipPattern.test(inputToCheck.zip)) {
    errors.zip = "Invalid Zip value";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
export { validateEditCard };
