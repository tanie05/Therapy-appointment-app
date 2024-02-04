function countNumbersInString(inputString) {
  console.log(inputString);
  var count = 0;
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
      count++;
    }
  }
  console.log(count);
  return count;
}

export function parsePhoneNumber(phoneString) {
  const pattern = /\+(\d+)(?:\s*(.*))?/;
  const match = phoneString.match(pattern);

  if (match) {
    const countryCode = match[1];
    const number = match[2] || "";

    if (countNumbersInString(number) < 10) {
      return null;
    }
    return { countryCode, number };
  } else {
    return null;
  }
}

export function therapyPage1Validation(formData) {
  console.log(formData);
  if (
    !formData.city ||
    !formData.houseno ||
    !formData.locality ||
    !formData.state ||
    !formData.country ||
    !formData.phone ||
    !formData.DOB
  ) {
    alert("Enter all required values");
    return false;
  } else if (parsePhoneNumber(formData.phone) === null) {
    alert("Enter a valid phone number");
    return false;
  } else {
    return true;
  }
}

export function createTimingsArray(formData) {
  const timings = new Array(
    formData.time1,
    formData.time2,
    formData.time3,
    formData.time4
  );
  const filteredTimings = timings.filter((time) => time !== undefined);
  return filteredTimings;
}
export function therapyPage2Validation(formData, filteredTimings) {
  if (!formData.healthPlan || !formData.description) {
    alert("Enter all required values");
    return false;
  } else if (filteredTimings.length === 0) {
    alert("Choose atleast a single timing for appointment");
    return false;
  } else {
    return true;
  }
}

export function createDataToSend(formData, filteredTimings, userId) {
  const phone = parsePhoneNumber(formData.phone);
  const data = {
    email: formData.email,
    phone: phone,
    DOB: formData.DOB.$d,
    description: formData.description,
    address: {
      houseNo: formData.houseno,
      locality: formData.locality,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    },
    language: formData.language,
    timings: filteredTimings,
    healthPlan: formData.healthPlan,
    userId: userId,
  };
  return data;
}
