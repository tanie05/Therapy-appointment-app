export default function validateEmail(email) {
  // Regular expression for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the provided email matches the regex
  return emailRegex.test(email);
}
export const validateDateOfBirth = (dob) => {
  const currdate = new Date(dob);
  const todaydate = new Date();
  if (dob === "") return false;
  return currdate <= todaydate;
};

export const validateName = (name) => {
  const regex = /^[a-zA-Z][a-zA-Z ]*$/;
  if (!regex.test(name)) {
    return false;
  }
  return true;
};

// Output: true
