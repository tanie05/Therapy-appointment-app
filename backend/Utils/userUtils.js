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

function convertDateTimeToDateFormat(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Pad with zero if needed

  return `${year}-${month}-${day}`;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateDateOfBirth,
  areTokenAndParameterIdSame,
  convertDateTimeToDateFormat,
};
