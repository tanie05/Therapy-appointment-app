import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import "./therapyForms.css";
import Flatpickr from "react-flatpickr";
import("flatpickr/dist/themes/material_blue.css");

export default function TherapyPage2({ formData, onFormDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: value });
  };

  const addAppointmentTime = (name, value) => {
    console.log("time - ", value[0]);
    onFormDataChange({ [name]: value[0] });
  };

  const options = {
    enableTime: true,
    minTime: "09:00",
    maxTime: "18:00",
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    disable: [
      function (date) {
        // Disable weekends
        return date.getDay() === 0 || date.getDay() === 6;
      },
    ],
    minDate: "today",
  };

  return (
    <div className="therapy--form--container">
      <div className="therapy-form">
        <div className="therapy-row">
          <Flatpickr
            options={options}
            placeholder="Appointment time 1"
            name="time1"
            value={formData.time1 || ""}
            className="therapy-form-field datetime-picker"
            onChange={(e) => addAppointmentTime("time1", e)}
            required
          />

          <Flatpickr
            options={options}
            placeholder="Appointment time 2"
            name="time2"
            value={formData.time2 || ""}
            className="therapy-form-field datetime-picker"
            onChange={(e) => addAppointmentTime("time2", e)}
          />
        </div>

        <div className="therapy-row">
          <Flatpickr
            options={options}
            placeholder="Appointment time 3"
            name="time3"
            value={formData.time3 || ""}
            className="therapy-form-field datetime-picker"
            onChange={(e) => addAppointmentTime("time3", e)}
          />

          <Flatpickr
            options={options}
            placeholder="Appointment time 4"
            name="time4"
            value={formData.time4 || ""}
            className="therapy-form-field datetime-picker"
            onChange={(e) => addAppointmentTime("time4", e)}
          />
        </div>

        <div className="therapy-row">
          <TextField
            required
            className="therapy-form-field"
            label="Health Plan Name"
            variant="standard"
            name="healthPlan"
            value={formData.healthPlan}
            onChange={handleInputChange}
          />

          <select
            defaultValue={"english"}
            className="therapy-form-field language-select"
            name="language"
            value={formData.language || "english"}
            onChange={handleInputChange}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>

        <div className="therapy-row">
          <textarea
            required
            className="therapy-form-field therapy-description"
            name="description"
            rows="8"
            placeholder="Briefly describe your reason to seek therapy"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
