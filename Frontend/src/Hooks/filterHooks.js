import { useState } from "react";

const useFilter = (url, handleApi) => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

  //   const handleAccessCode = (data) => {
  //     console.log("hi");
  //     setAccessCode(data);
  //   };

  return {
    email,
    setEmail,
    accessCode,
    setAccessCode,
  };
};

export default useFilter;
