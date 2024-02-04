const { convertDateTimeToDateFormat } = require("../Utils/userUtils");

const salesforceNewUser = async (user) => {
  const apiUrl = process.env.SALESFORCE_NEW_USER_ENDPOINT;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  const postData = {
    userId: user._id.toString(),
    firstname: user.name.firstname,
    lastname: user.name.lastname,
    language: user.language,
    email: user.email,
    DOB: convertDateTimeToDateFormat(user.DOB),
    role: user.role,
  };

  console.log(postData);

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        const err = new Error(`HTTP error! Status: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data send to salesforce successfully");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const salesforceUpdateUser = async (id, data) => {
  const apiUrl = process.env.SALESFORCE_UPDATE_USER_ENDPOINT + `${id}`;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  const patchData = {
    firstname: data.name.firstname,
    lastname: data.name.lastname,
    language: data.language,
    email: data.email,
    DOB: data.DOB,
  };

  await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchData),
  })
    .then((response) => {
      if (!response.ok) {
        const err = new Error(`HTTP error! Status: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data send to salesforce successfully");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const salesforceNewTherapy = async (therapy) => {
  const apiUrl = process.env.SALESFORCE_NEW_THERAPY_ENDPOINT;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  const {
    address,
    phone,
    description,
    healthPlan,
    language,
    status,
    timings,
    _id,
    userId,
  } = therapy;

  const postData = {
    address:
      address.houseNo +
      ", " +
      address.locality +
      ", " +
      address.state +
      ", " +
      address.city +
      ", " +
      address.country,
    phone: phone.countryCode + "-" + phone.number,
    description: description,
    healthplan: healthPlan,
    language: language,
    status: status,
    timings: timings[0],
    tid: _id.toString(),
    userid: userId.toString(),
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        const err = new Error(`HTTP error! Status: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data send to salesforce successfully");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

module.exports = {
  salesforceNewUser,
  salesforceNewTherapy,
  salesforceUpdateUser,
};
