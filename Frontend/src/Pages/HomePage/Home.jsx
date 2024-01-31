import React, { useState } from "react";
import TherapyPage1 from "../../Components/HomePageComponents/TherapyPage1";
import TherapyPage2 from "../../Components/HomePageComponents/TherapyPage2";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../Redux/Slices/user";
import './home.css';
import TherapyHeader from "../../Molecules/TherapyHeader";


const Home = () => {

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)

  const [formData, setFormData] = useState({
    name: {
      firstName: userInfo.name.firstName,
      lastName: userInfo.name.lastName
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
    
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      description: formData.description,
      address: {
        houseno: formData.houseno,
        locality: formData.locality,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      language: formData.language,
      timings: new Array(formData.time1, formData.time2, formData.time3, formData.time4)
    }
    console.log(typeof(formData.dob), formData.dob)
    console.log(data);
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
