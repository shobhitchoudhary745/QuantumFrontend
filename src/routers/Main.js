import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    axios
      .get(`http://localhost:4000/users`, {
        "Content-Type": "application/json",
      })
      .then((data) => {
        setUsers(data.data);
        console.log(data.data);
      })
      .catch((e) => {});
  }, []);
  const logout = (e) => {
    e.preventDefault();
    const check = window.confirm("Are you sure you want to logout ?");
    if (check) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  const search = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    const arr = users.filter((user) => {
      if (
        user.Name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value) ||
        user.dob.toLowerCase().includes(value)
      )
        return true;
      return false;
    });
    setSearchArr(arr);
  };
  return (
    <div>
      {users.length > 0 && (
        <>
          <div className="flex my-4 flex-col md:flex-row w-full gap-3 items-center md:justify-between">
            <input
              onChange={search}
              className=" m-1 w-5/6 md:w-2/6 lg:w-1/6 py-[0.4rem] px-2  rounded-md bg-[#46464f] text-white placeholder:text-white"
              placeholder="Search User By Name, Email..."
              type={"text"}
            />
            <button
              onClick={logout}
              className=" bg-[#3742FA] m-1 py-[0.4rem] px-2 text-white text-[18px] rounded-md w-4/6 md:w-2/6 lg:w-1/12 "
            >
              Logout
            </button>
          </div>
          <table className=" w-full pt-5 overflow-x-scroll h-auto rounded-md">
            <thead className="rounded-lg break-all">
              <tr >
                <th className=" text-justify  bg-[#46464F] text-[#C7C5D0]  text-[14px] p-4 ">
                  #
                </th>
                <th className=" text-justify  bg-[#46464F] text-[#C7C5D0]  text-[14px] p-4 ">
                  Name
                </th>
                <th className=" text-justify  bg-[#46464F] text-[#C7C5D0]  text-[14px] p-4 ">
                  Date Of Birth
                </th>
                <th className=" text-justify bg-[#46464F] text-[#C7C5D0]  text-[14px] p-4 ">
                  Email
                </th>
                <th className=" text-justify bg-[#46464F] text-[#C7C5D0]  text-[14px] p-4 ">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {(searchArr.length>0?searchArr:users).map((items, i) => {
                return i % 2 == 1 ? (
                  <tr key={i} className="m-2 p-4 text-justify break-all">
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#23232A] break-all">
                      {i + 1}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#23232A] break-all">
                      {items.Name}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#23232A] break-all">
                      {items.dob}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#23232A] break-all">
                      {items.email}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#23232A] break-all">
                      {items.role}
                    </td>
                  </tr>
                ) : (
                  <tr key={i} className="m-2 p-4 text-justify break-all">
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#282831] break-all">
                      {i + 1}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#282831] break-all">
                      {items.Name}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#282831] break-all">
                      {items.dob}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#282831] break-all">
                      {items.email}
                    </td>
                    <td className="m-2 text-[#C7C5D0] p-2.5 text-justify capitalize text-[14px] bg-[#282831] break-all">
                      {items.role}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Main;
