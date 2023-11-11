import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { ImGoogle } from "react-icons/im";
import { IoLogoTwitter } from "react-icons/io";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handler(e) {
    e.preventDefault();
    axios
      .post(
        `http://localhost:4000/users/login`,
        {
          email,
          password,
        },
        { "Content-Type": "application/json" }
      )
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);
        navigate("/main");
      })
      .catch((e) => {
        window.alert("user not found with this email and password");
      });
  }

  return (
    <>
      { 
        <>
          <div className="flex w-full rounded-xl justify-center mt-2 min-h-[98vh] md:min-h-[95vh]">
            <div  className="px-10 w-[100%] md:w-[50%] lg:w-[30%] flex flex-col bg-[#23232A] text-white">
              <div className="flex flex-col items-center justify-center">
                {" "}
                <h1 className="font-semibold text-[30px] text-center  pt-4 uppercase text-white">
                  Login
                </h1>
                <Link
                  to="/signup"
                  className="text-center text-[18px] text-[#3742FA] cursor-pointer underline underline-offset-1 "
                >
                  don't have an account ?
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <label className="text-[14px] text-gray-400 font-light">
                    Email
                  </label>
                  <input
                    className=" p-[0.4rem]  rounded-md bg-[#46464f] placeholder:text-white"
                    autoComplete="new-password"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    type={"email"}
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[14px] text-gray-400 font-light">
                    Password
                  </label>
                  <input
                    className=" p-[0.4rem]  rounded-md bg-[#46464f] placeholder:text-white"
                    autoComplete="new-password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    type={"password"}
                    required
                  />
                </div>
                <div className="flex items-center gap-3 text-[14px] font-normal">
                  <input type="checkbox" />
                  Keep me logged in
                </div>

                <div>
                  <button onClick={handler} className=" font-bold bg-[#3742FA] text-white text-[18px] rounded-md w-full py-1">
                    Login
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <hr className="h-[0.5px] border-none bg-slate-600 my-8 w-[60%] mx-auto" />{" "}
                or
                <hr className="h-[0.5px] border-none bg-slate-600 my-8 w-[60%] mx-auto" />
              </div>

              <div className="flex flex-col gap-4">
                <button className="border flex justify-center items-center gap-2 text-[16px] border-[#C8C8C8] py-2 rounded-md">
                  <ImGoogle />
                  sign in with Google
                </button>
                <button className="border flex justify-center items-center gap-2 text-[16px] border-[#C8C8C8] py-2 rounded-md">
                  <AiFillFacebook className="text-[18px]" />
                  sign in with Facebook
                </button>
                <button className="border flex justify-center items-center gap-2 text-[16px] border-[#C8C8C8] py-2 rounded-md">
                  <IoLogoTwitter className="text-blue-400" />
                  sign in with Twitter
                </button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Login;
