import React, { useEffect, useState } from "react";
import TherapyPage1 from "../../Components/HomePageComponents/TherapyPage1";
import TherapyPage2 from "../../Components/HomePageComponents/TherapyPage2";
import { useSelector } from "react-redux";
import "./home.css";
import TherapyHeader from "../../Molecules/TherapyHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  therapyPage1Validation,
  createTimingsArray,
  therapyPage2Validation,
  createDataToSend,
} from "../../Utils/therapyValidations";

const Home = () => {
  

  const navigate = useNavigate();

  const [inititalFormData, setInititalFormData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    language: "english",
  });

  const userInfo = useSelector((state) => state.userInfo);
  const userId = userInfo._id;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(inititalFormData);

  useEffect(() => {
    async function fetchingUser() {
      const token = localStorage.getItem("token");
      const userData = await axios.get(
        `http://localhost:5000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(userData.data);
      setFormData({
        name: {
          firstName: userData.data.name.firstname,
          lastName: userData.data.name.lastname,
        },
        language: userData.data.language,
      });

      setInititalFormData({
        name: {
          firstName: userData.data.name.firstname,
          lastName: userData.data.name.lastname,
        },
        language: userData.data.language,
      })
    }
    fetchingUser();
  }, []);

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleNext = () => {
    const isValid = therapyPage1Validation(formData);
    if (isValid) {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async () => {
    const filteredTimings = createTimingsArray(formData);
    const isValid = therapyPage2Validation(formData, filteredTimings);
    if (isValid) {
      const data = createDataToSend(formData, filteredTimings, userInfo._id);

      // console.log(data);

      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:5000/therapy/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          alert("Therapy appointment booked!");
          setFormData(inititalFormData);
          setStep(1);
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <div className="form-container">
        <TherapyHeader />

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

        {step < 2 && (
          <div className="therapy-next-btn-container">
            <button
              onClick={handleNext}
              className="therapy-form-submit-btn"
              id="therapy-btn-next"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="therapy-btn-container">
            <button onClick={handleBack} className="therapy-form-nav-btn">
              Back
            </button>
            <button
              onClick={handleFormSubmit}
              className="therapy-form-submit-btn"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
