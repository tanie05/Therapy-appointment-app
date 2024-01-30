import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import "./therapyForms.css";

export default function TherapyPage2({ formData, onFormDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: value });
  };

  const addAppointmentTime = (name, value) => {
    const dateTime = new Date(value.$d);
    onFormDataChange({ [name]: dateTime });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <div className="therapy-row">
          <DateTimePicker
            name="time1"
            value={formData.time1}
            className="therapy-form-field"
            label="Appointment time 1"
            onChange={(val) => addAppointmentTime("time1", val)}
          />
          <DateTimePicker
            name="time2"
            value={formData.time2}
            className="therapy-form-field"
            label="Appointment time 2"
            onChange={(val) => addAppointmentTime("time2", val)}
          />
        </div>

        <div className="therapy-row">
          <DateTimePicker
            name="time3"
            value={formData.time3}
            className="therapy-form-field"
            label="Appointment time 3"
            onChange={(val) => addAppointmentTime("time3", val)}
          />
          <DateTimePicker
            name="time4"
            value={formData.time4}
            className="therapy-form-field"
            label="Appointment time 4"
            onChange={(val) => addAppointmentTime("time4", val)}
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
        </div>

        <div>
          <textarea
            required
            className="therapy-form-field therapy-description"
            name="description"
            rows="10"
            placeholder="Briefly describe your reason to seek therapy"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
