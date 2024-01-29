const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};
const validateDateOfBirth = (dob) => {
  const currdate = new Date(dob);
  const todaydate = new Date();
  return currdate <= todaydate;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateDateOfBirth,
};
