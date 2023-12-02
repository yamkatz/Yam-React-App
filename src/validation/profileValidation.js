const profileValidation = (inputToCheck) => {
  const errors = {};

  const firstPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!firstPattern.test(inputToCheck.name.first)) {
    errors.first = "Invalid first name";
  }

  const middlePattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (
    inputToCheck.name.middle &&
    !middlePattern.test(inputToCheck.name.middle)
  ) {
    errors.middle = "Invalid middle name";
  }

  const lastPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!lastPattern.test(inputToCheck.name.last)) {
    errors.last = "Invalid last name";
  }

  const phonePattern = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
  if (!phonePattern.test(inputToCheck.phone)) {
    errors.phone = "Invalid phone number";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (inputToCheck.image.url && !urlPattern.test(inputToCheck.image.url)) {
    errors.url = "Invalid URL";
  }

  const altPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (inputToCheck.image.alt && !altPattern.test(inputToCheck.image.alt)) {
    errors.alt = "Invalid Alt value";
  }

  const statePattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (
    inputToCheck.address.state &&
    !statePattern.test(inputToCheck.address.state)
  ) {
    errors.state = "Invalid State value";
  }

  const countryPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!countryPattern.test(inputToCheck.address.country)) {
    errors.country = "Invalid Country value";
  }

  const cityPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!cityPattern.test(inputToCheck.address.city)) {
    errors.city = "Invalid City value";
  }

  const streetPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (!streetPattern.test(inputToCheck.address.street)) {
    errors.street = "Invalid Street value";
  }

  const houseNumberPattern = /^[1-9]\d*$/;
  if (!houseNumberPattern.test(inputToCheck.address.houseNumber)) {
    errors.houseNumber = "Invalid House Number value";
  }

  const zipPattern = /^[1-9]\d*$/;
  if (inputToCheck.address.zip && !zipPattern.test(inputToCheck.address.zip)) {
    errors.zip = "Invalid Zip value";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export { profileValidation };
