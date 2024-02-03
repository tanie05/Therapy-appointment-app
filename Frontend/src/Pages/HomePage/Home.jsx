import React, { useEffect, useState } from "react";
import TherapyPage1 from "../../Components/HomePageComponents/TherapyPage1";
import TherapyPage2 from "../../Components/HomePageComponents/TherapyPage2";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../Redux/Slices/user";
import "./home.css";
import TherapyHeader from "../../Molecules/TherapyHeader";
import { Navbar } from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const userId = userInfo._id;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    language: "english",
  });

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
    }
    fetchingUser();
  }, []);

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleNext = () => {
    setStep(step + 1);
  };
  function countNumbersInString(inputString) {
    console.log(inputString);
    var count = 0;
    for (let i = 0; i < inputString.length; i++) {
      if (
        inputString[i] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      ) {
        count++;
      }
    }
    console.log(count);
    return count;
  }
  function parsePhoneNumber(phoneString) {
    const pattern = /\+(\d+)(?:\s*(.*))?/;
    const match = phoneString.match(pattern);

    if (match) {
      const countryCode = match[1];
      const number = match[2] || "";

      if (countNumbersInString(number) < 10) {
        return null;
      }
      return { countryCode, number };
    } else {
      return null;
    }
  }

  const handleFormSubmit = async () => {
    const timings = new Array(
      formData.time1,
      formData.time2,
      formData.time3,
      formData.time4
    );
    const filteredTimings = timings.filter((time) => time !== undefined);

    // console.log(formData);
    if (
      !formData.city ||
      !formData.houseno ||
      !formData.locality ||
      !formData.state ||
      !formData.country ||
      !formData.healthPlan ||
      !formData.phone ||
      !formData.DOB
    ) {
      alert("Enter all required values");
    } else if (filteredTimings.length === 0) {
      alert("Choose atleast a single timing for appointment");
    } else if (parsePhoneNumber(formData.phone) === null) {
      alert("Enter a valid phone number");
    } else {
      const phone = parsePhoneNumber(formData.phone);

      const data = {
        email: formData.email,
        phone: phone,
        DOB: formData.DOB.$d,
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
        userId: userInfo._id,
      };

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

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <Navbar />
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
