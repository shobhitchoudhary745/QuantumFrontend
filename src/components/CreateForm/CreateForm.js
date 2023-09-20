import React from "react";
import { useState } from "react";
import { City, State, Country } from "country-state-city";
import axios from "axios";
function CreateForm() {
  
  const countries = Country.getAllCountries();
  
  const [isoCountry,setIsoCountry] = useState("");
  const [isoState,setIsoState] = useState("")
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const handleChange1 = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');

    setFirstName(result);
  };
  const handleChange2 = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');

    setLastName(result);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://formbackend-cikr.onrender.com/forms',{firstName,lastName,email,country,state,city,dob,age,gender}).then(data=>{
     
      alert("user Created Successfully!")
    }).catch(e=>{
     
      if(e.response.data.error.includes('dup key')){
        alert('User already exist with this Email!')
      }
    })
  };
  return (
    <div>
      {
        <>
          <p className="text-center my-6 text-blue-500 font-normal text-[2rem]">
            Create User
          </p>
          <div className="flex justify-center items-center my-6">
            <form
              onSubmit={submitHandler}
              className="w-5/6 flex flex-col lg:w-4/6 p-6 bg-[#282831] border border-[#4d4d4d] rounded-lg shadow"
            >
              <div className="flex flex-col  lg:flex-row w-full gap-3">
                <div className="flex col-10 lg:col-3 flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">FirstName</label>
                  <input
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none p-3 after:border-color-blue-500 rounded text-white bg-[#46464f] placeholder:text-white-500"
                    type="text"
                    onChange={handleChange1}
                    value={firstName}
                    placeholder="firstName"
                    required
                  />
                </div>
                <div className="flex col-3 flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">LastName</label>
                  <input
                    required
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none rounded p-3 text-white bg-[#46464f] placeholder:text-white-500"
                    type="text"
                    onChange={handleChange2}
                    value={lastName}
                    placeholder="lastName"
                  />
                </div>
                <div className="flex col-3 flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Email</label>
                  <input
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none p-3 after:border-color-blue-500 rounded text-white bg-[#46464f] placeholder:text-white-500"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col  lg:flex-row justify-center md:justify-start gap-3 mt-3">
                <div className="flex  flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Country</label>
                  <select
                    defaultValue="Country"
                
                    className="border focus:border-blue-500 focus:outline-none border-gray-600 rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => {
                     
                      setIsoCountry(e.target.value);
                      Array.from(e.target).map((data) => {
                        if (data.value === e.target.value) {
                          setCountry(data.label);
                        
                        }
                      });
                    
                      setStates(State.getStatesOfCountry(e.target.value));
                      setCities(
                        City.getCitiesOfState(
                         []
                        )
                      );
                    }}
                    
                  >
                    <option disabled value="Country">
                      Select Countries
                    </option>
                    {countries.map((data, index) => (
                      <option  key={index} label={data.name} value={data.isoCode}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">State</label>
                  <select
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => {
                      setIsoState(e.target.value);
                      
                      setCities(City.getCitiesOfState(isoCountry, e.target.value));
                      Array.from(e.target).map((data) => {
                        if (data.value === e.target.value) {
                          setState(data.label);
                         
                        }
                      });
                    }}
                    defaultValue="State"
                  >
                    <option disabled value="State">Select States</option>
                    {states.map((data, index) => {
                      return (
                        <option
                          key={index}
                          label={data.name}
                          value={data.isoCode}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">City</label>
                  <select
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => setCity(e.target.value)}
                    defaultValue={"City"}
                  >
                    <option value="City">Select Cities</option>
                    {cities.map((data, index) => {
                      return (
                        <option
                          key={index}
                          label={data.name}
                          value={data.name}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row mt-6 gap-3">
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Date Of Birth</label>
                  <input
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    type="date"
                    required
                    onChange={(e) => {
                      const miliseconds = Date.now() - new Date(e.target.value);
                      const ageInYears =
                        miliseconds / (365.25 * 24 * 60 * 60 * 1000);
                      if (ageInYears >= 14) {
                        setDob(e.target.value);
                        setAge(Math.floor(ageInYears));
                      } else {
                        e.target.value = e.target.defaultValue;
                        alert("Age must be greater or equal to 14!");
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Age</label>
                  <input
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    type="text"
                    placeholder="Age"
                    value={age}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Gender</label>
                  <div className="flex gap-3 py-3  items-center ">
                    <label className="text-[#FEFEFF] text-[1.2rem]">
                      <input
                        required
                        onChange={() => setGender("Male")}
                        type="radio"
                        name="gender"
                      />{" "}
                      Male
                    </label>
                    <label className="text-[#FEFEFF] text-[1.2rem]">
                      <input
                        required
                        value={gender}
                        onChange={() => setGender("Female")}
                        type="radio"
                        name="gender"
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="border border-blue-600 hover:opacity-90 w-64 py-3 text-white bg-blue-500 rounded"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </>
      }
    </div>
  );
}

export default CreateForm;
