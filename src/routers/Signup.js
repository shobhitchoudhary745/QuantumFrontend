import React, { useState } from "react";
// import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("01");
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState("1983");
  const [role,setRole] = useState("Admin");
  function handler(e) {
    e.preventDefault();
    let obj = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let number = obj[month];
    // console.log(number);
    const Name = firstName + " " + surName;
    const dob = date + "-" + number + "-" + year;

    axios
      .post(
        `https://quantumbackend-9wc8.onrender.com/users`,
        {
          Name,
          email,
          password,
          dob,
          role
        },
        { "Content-Type": "application/json" }
      )
      .then((data) => {
        if (data.data.token) {
          localStorage.setItem("token", data.token);
          window.alert("your account is successfully created");
          navigate("/main");
        }
        console.log(data);
      })
      .catch((e) => {
        if (e.response.data.code === 11000) {
          alert("Email is already Exist!");
        }
      });
  }
  return (
    <div className="flex w-full rounded-xl justify-center mt-2 min-h-[98vh] md:min-h-[95vh]">
      <div className="px-0 md:px-8 w-[100%] md:w-[60%] lg:w-[33%] flex flex-col  items-center bg-[#23232A] text-white">
        <div className="flex flex-col items-center justify-center">
          {" "}
          <h1 className="font-semibold text-[30px] text-center  pt-4 uppercase text-white">
            SignUp
          </h1>
          <Link
            to="/"
            className="text-center mb-3 text-[18px] text-[#3742FA] cursor-pointer underline underline-offset-1 "
          >
            Already have an account ?
          </Link>
        </div>
        <div className="flex flex-col my-3">
          <div className="flex justify-center gap-3 w-full my-3">
            <input
              className=" w-[40%] md:w-full py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
              autoComplete="new-password"
              placeholder="First name"
              onChange={(e)=>setFirstName(e.target.value)}
              type={"text"}
              required
            />
            <input
              className="w-[40%] md:w-full  py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
              autoComplete="new-password"
              placeholder="Surname"
              onChange={(e)=>setSurName(e.target.value)}
              type={"text"}
              required
            />
          </div>
          <div className="flex justify-center my-3">
            <input
              className=" w-5/6 md:w-full py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
              type="email"
              placeholder="Email adress"
              onChange={(e)=>setEmail(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="flex justify-center my-3">
            <input
              className="w-5/6 md:w-full py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
              type="email"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex my-3 flex-col">
            <label className="text-[14px] flex justify-center w-full text-gray-400 font-light">
              Date Of Birth
            </label>
            <div className="flex w-full justify-center gap-2">
              <select
                className="w-[26%] md:w-2/6 py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
                id="date"
                onChange={(e)=>setDate(e.target.value)}
              >
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
              <select
                className="w-[26%] md:w-2/6 py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
                id="month"
                onChange={(e)=>setMonth(e.target.value)}
              >
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
              </select>
              <select
                className="w-[26%] md:w-2/6 py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white"
                id="year"
                onChange={(e)=>setYear(e.target.value)}
              >
                <option>1983</option>
                <option>1984</option>
                <option>1985</option>
                <option>1986</option>
                <option>1987</option>
                <option>1988</option>
                <option>1989</option>
                <option>1990</option>
                <option>1991</option>
                <option>1992</option>
                <option>1993</option>
                <option>1994</option>
                <option>1995</option>
                <option>1996</option>
                <option>1997</option>
                <option>1998</option>
                <option>1999</option>
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
                <option>2003</option>
                <option>2004</option>
                <option>2005</option>
                <option>2006</option>
                <option>2007</option>
                <option>2008</option>
                <option>2009</option>
                <option>2010</option>
                <option>2011</option>
                <option>2012</option>
                <option>2013</option>
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
            </div>
          </div>
          <div className="flex items-center  mb-3 flex-col">
            <label className="text-[14px] text-gray-400 font-light">
              Role
            </label>
            
            <select onChange={(e)=>setRole(e.target.value)} className=" w-5/6 md:w-full py-[0.4rem] px-2  rounded-md bg-[#46464f] placeholder:text-white">
               <option>Admin</option>
               <option>Publisher</option>
               <option>Reviewer</option>
               <option>Moderator</option>
            </select>
          </div>
          <div className="mt-4 flex justify-center">
          <button onClick={handler} className=" font-bold bg-[#3742FA] text-white text-[18px] rounded-md w-4/6 py-1">
            Sign Up
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
