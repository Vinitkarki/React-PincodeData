import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";

const Form = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [pincode, setPincode] = useState(0);

  const handleChange = async (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async () => {
    const len = pincode.toString();
    const length = len.length;
    if (length < 6) {
      alert("Pincode length is not 6");
    } else {
      const { data } = await axios.get(
        ` https://api.postalpincode.in/pincode/${pincode}`
      );
      //console.log(data);
      // console.log(data[0].Message);
      if (data[0].Status === "Error") {
        alert("“Couldn’t find the postal data you’re looking for…”");
      } else {
        setFetchedData(data[0]);
      }
    }
  };

  return (
    <div className="form">
      <h4>Enter Pincode</h4>
      <input onChange={handleChange} type="Number" placeholder="Pincode" />
      <button onClick={handleSubmit}>Lookup</button>
    </div>
  );
};

export default Form;
