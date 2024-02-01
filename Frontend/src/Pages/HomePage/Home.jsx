import React, { useState } from "react";
import TherapyPage1 from "../../Components/HomePageComponents/TherapyPage1";
import TherapyPage2 from "../../Components/HomePageComponents/TherapyPage2";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../Redux/Slices/user";
import './home.css';
import TherapyHeader from "../../Molecules/TherapyHeader";
import { Navbar } from "../../Components/Navbar/Navbar";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Home = () => {

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)
  const navigate = useNavigate();

  const inititalFormData = {
    name: {
      firstName: userInfo.name.firstname,
      lastName: userInfo.name.lastname
    }
  }

  // console.log(userInfo)
  const [formData, setFormData] = useState(inititalFormData);

  const [step, setStep] = useState(1);

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  function separateCountryCodeAndNumber(phone) {
    
    const [countryCode, number] = phone.split(' ');
  
    const phoneObject = {
      countryCode: countryCode,
      number: number
    };
  
    return phoneObject;
  }

  const handleFormSubmit = async () => {

    const phone = separateCountryCodeAndNumber(formData.phone)
    const timings = new Array(formData.time1, formData.time2, formData.time3, formData.time4);
    const filteredTimings = timings.filter(time => time !== undefined);
    
    const data = {
      email: formData.email,
      phone: phone,
      DOB: formData.dob,
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
      userId: userInfo._id
    }
    
    // console.log(data);
    const res = await axios.post('http://localhost:5000/therapy/create', data);

    // console.log(res)
    if(res.data.success){
      alert('Therapy appointment booked!');
      setFormData(inititalFormData)
      setStep(1)
      navigate("/")

    }else{
      alert('Error creating therapy: ', res.data.message);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    
    <div className="form-container">
      <Navbar/>
      <TherapyHeader/>
      <div className="form-component-container">
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
      </div>
      

      {step < 2 && 
      <button onClick={handleNext} className="therapy-form-submit-btn">Next</button>
      
      }
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
