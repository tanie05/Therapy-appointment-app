import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./therapyForms.css";
import "react-phone-input-2/lib/style.css";
import MuiPhoneNumber from "material-ui-phone-number";
import dayjs from "dayjs";
export default function TherapyPage1({ formData, onFormDataChange }) {
  const [showEmailError, setShowEmailError] = useState(false);
  const [error, setError] = useState({
    houseNo: false,
    locality: false,
    city: false,
    state: false,
    country: false,
  });

  const emptyCheck = (name, value) => {
    if (value === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: value });
  };

  function handlePhoneChange(value) {
    onFormDataChange({ phone: value });
  }

  function handleDateChange(name, value) {
    // console.log("date change function : ", value.$d)
    onFormDataChange({ [name]: value });
  }

  function validateEmail(e) {
    const email = e.target.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowEmailError(emailRegex.test(email) === false);
  }

  return (
    <div className="therapy--form--container">
      <form className="therapy-form">
        <div className="therapy-row">
          <TextField
            className="therapy-form-field"
            label="First Name"
            variant="standard"
            name="firstName"
            value={formData.name.firstName}
            onChange={handleInputChange}
            disabled
          />
          <br />
          <TextField
            className="therapy-form-field"
            label="Last Name"
            variant="standard"
            name="lastName"
            value={formData.name.lastName}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="therapy-row">
          <MuiPhoneNumber
            onlyCountries={["in", "us", "il"]}
            name="phone"
            defaultCountry={"in"}
            value={formData.phone}
            onChange={handlePhoneChange}
            className="therapy-form-field"
          />

          <TextField
            className="therapy-form-field"
            variant="standard"
            type={"email"}
            name="email"
            label="Email"
            value={formData.email ? formData.email : ""}
            onChange={handleInputChange}
            onBlur={validateEmail}
            helperText={showEmailError ? "Enter a valid email" : ""}
          />
        </div>

        <div className="therapy-row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              className="therapy-form-field"
              label="Date of Birth"
              value={formData.DOB}
              onChange={(val) => handleDateChange("DOB", val)}
              name="DOB"
            />
          </LocalizationProvider>
        </div>

        <div className="address-div">
          <div className="therapy-row">
            <TextField
              className="therapy-form-field"
              label="House Number"
              variant="standard"
              name="houseno"
              value={formData.houseno}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 5,
              }}
              type="Number"
              required
              onBlur={(e) => emptyCheck("houseNo", e.target.value)}
              helperText={error.houseNo ? "Enter a valid house number" : ""}
            />
            <TextField
              required
              className="therapy-form-field"
              label="Locality"
              variant="standard"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 30,
              }}
              onBlur={(e) => emptyCheck("locality", e.target.value)}
              helperText={error.locality ? "Enter your locality" : ""}
            />
            <TextField
              required
              className="therapy-form-field"
              label="City"
              variant="standard"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 30,
              }}
              onBlur={(e) => emptyCheck("city", e.target.value)}
              helperText={error.city ? "Enter your city" : ""}
            />
          </div>
          <div className="therapy-row">
            <TextField
              required
              className="therapy-form-field"
              label="State"
              variant="standard"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 30,
              }}
              onBlur={(e) => emptyCheck("state", e.target.value)}
              helperText={error.state ? "Enter your state" : ""}
            />
            <TextField
              required
              className="therapy-form-field"
              label="Country"
              variant="standard"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 30,
              }}
              onBlur={(e) => emptyCheck("country", e.target.value)}
              helperText={error.country ? "Enter your country" : ""}
            />
          </div>
        </div>
      </form>
      <div id="errorField"></div>
    </div>
  );
}
