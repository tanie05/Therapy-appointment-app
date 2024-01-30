import React, { useState } from "react";
import TherapyPage1 from "../../Components/TherapyPage1";
import TherapyPage2 from "../../Components/TherapyPage2";
import './home.css';
import TherapyHeader from "../../Components/TherapyHeader";
const Home = () => {
  const [formData, setFormData] = useState({
    name: {
      firstName: "Tanvi",
      lastName: "Sharma"
    }
  });

  const [step, setStep] = useState(1);

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleFormSubmit = async () => {
    console.log(formData);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    
    <div className="form-container">
      <TherapyHeader/>
      {step === 1 && (
        <TherapyPage1
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
      )}
      {step === 2 && (
        <TherapyPage2
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
      )}

      {step < 2 && <button onClick={handleNext} className="therapy-form-submit-btn">Next</button>}
      {step === 2 && (
        <div className="therapy-btn-container">
          <button onClick={handleBack} className="therapy-form-nav-btn">Back</button>
          <button onClick={handleFormSubmit} className="therapy-form-submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Home;
