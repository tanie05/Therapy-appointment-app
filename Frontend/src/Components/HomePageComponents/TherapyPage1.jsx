import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./therapyForms.css";
import "react-phone-input-2/lib/style.css";
import { MuiTelInput } from 'mui-tel-input'
import dayjs from "dayjs"; 
export default function TherapyPage1({ formData, onFormDataChange }) {

  const [showEmailError, setShowEmailError] = useState(false);
  const [showDateError, setshowDateError] = useState(false);

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

  function validateEmail(e) {
    const email = e.target.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowEmailError(emailRegex.test(email) === false)
  }
  const validateDateOfBirth = (dob) => {
    const dobString = value.$d;
    const dobDate = new Date(dobString);
    const todaydate = new Date();
    setshowDateError(dobDate >= todaydate)
  };


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
        value={formData.phone || "91"} 
        onChange={handlePhoneChange} 
        defaultCountry={'in'}
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
            className="therapy-form-field"
              label="Date of Birth"
              value={formData.dob ? formData.dob : dayjs()}
              onChange={handleDateChange}
              name="dob"
            />
          </LocalizationProvider>


        </div>

        <div>
          <div className="therapy-row">
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
          <div className="therapy-row">
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
