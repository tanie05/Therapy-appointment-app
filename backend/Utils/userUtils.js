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

const areTokenAndParameterIdSame = (id1, id2) => {
    return id1 === id2;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateDateOfBirth,
  areTokenAndParameterIdSame,
};

