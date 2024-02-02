import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./therapyForms.css";
import "react-phone-input-2/lib/style.css";
import { MuiTelInput } from "mui-tel-input";

export default function TherapyPage1({ formData, onFormDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: value });
  };

  function handlePhoneChange(value) {
    onFormDataChange({ phone: value });
  }

  function handleDateChange(value) {
    const dobString = value.$d;
    const dobDate = new Date(dobString);
    onFormDataChange({ dob: dobDate });
  }

  return (
    <div className="therapy-form-one-container">
      <form>
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
          <MuiTelInput
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />

          <TextField
            className="therapy-form-field"
            variant="standard"
            type={"email"}
            name="email"
            label="Email"
            value={formData.email ? formData.email : ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="therapy-description"
              label="Date of Birth"
              value={formData.dob ? formData.dob : ""}
              onChange={handleDateChange}
              name="dob"
            />
          </LocalizationProvider>
        </div>

        <div className="address-container">
          <div className="address-row">
            <TextField
              required
              className="therapy-form-field"
              label="House Number"
              variant="standard"
              name="houseno"
              value={formData.houseno}
              onChange={handleInputChange}
            />
            <TextField
              required
              className="therapy-form-field"
              label="Locality"
              variant="standard"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
            />
            <TextField
              required
              className="therapy-form-field"
              label="City"
              variant="standard"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="address-row">
            <TextField
              required
              className="therapy-form-field"
              label="State"
              variant="standard"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <TextField
              required
              className="therapy-form-field"
              label="Country"
              variant="standard"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
