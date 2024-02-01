const validatePhone = (phone) => {
  const regex = /^[6789]\d{9}$/;

  return regex.test(phone);
};

const validateAddress = (address) => {
  // const regex = /^\d$/;
  // return regex.test(address.houseNo);
  return true;
};

module.exports = { validatePhone, validateAddress };
