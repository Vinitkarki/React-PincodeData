import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [flag, setFlag] = useState(true);

  const [fetchedData, setFetchedData] = useState({});
  const [pincode, setPincode] = useState(0);
  const [postOffices, setPostOffices] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(postOffices);
    } else {
      const filterData = postOffices.filter((item) =>
        item.Name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterData);
    }
    setFilterValue(e.target.value);
  };

  const handleChange = async (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async () => {
    const len = pincode.toString();
    const length = len.length;

    if (length === 6) {
      try {
        const { data } = await axios.get(
          ` https://api.postalpincode.in/pincode/${pincode}`
        );
        // console.log(data);
        if (data[0].Status === "Error") {
          alert("“Couldn’t find the postal data you’re looking for…”");
        } else {
          setFetchedData(data[0]);
          setPostOffices(data[0].PostOffice);
          setData(data[0].PostOffice);
          setFlag(false);
        }
      } catch (error) {
        console.log("Error:" + error);
      }
    } else {
      alert("Pincode length is not 6");
    }

    // // console.log(data[0].Message);
  };

  return (
    <>
      {flag ? (
        <div className="form">
          <h4>Enter Pincode</h4>
          <input onChange={handleChange} type="Number" placeholder="Pincode" />
          <button onClick={handleSubmit}>Lookup</button>
        </div>
      ) : (
        <div>
          <div className="result">
            <h4>Pincode : {pincode}</h4>
            <h4>Message: {fetchedData.Message}</h4>
            <input
              onChange={(e) => {
                handleFilter(e);
              }}
              className="filter"
              type="text"
              placeholder="Filter"
              value={filterValue}
            />
          </div>
          {data.map((postOffice) => (
            <div className="post_offices" key={postOffice.Name}>
              <p>Name : {postOffice.Name}</p>
              <p>Barnch Type : {postOffice.BranchType}</p>
              <p>Delivery Status : {postOffice.DeliveryStatus}</p>
              <p>District : {postOffice.District}</p>
              <p>Division : {postOffice.Division}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
