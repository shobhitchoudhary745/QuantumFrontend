import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const [viewForm, setViewForm] = useState([]);
  const [searchArr,setSearchArr] = useState([]);
  useEffect(() => {
    formDatas();
  }, []);

  const formDatas = () => {
    axios
      .get("https://apis-2fuc.onrender.com/getForm")
      .then((data) => {
        setViewForm(data.data.formData);
      })
      .catch((error) => {
        window.alert("Something went Wrong!");
      });
  };

  const deleteForm = (id) => {
    const confirm = window.confirm("Are you sure you want to delete form?");
    if (confirm) {
      axios
        .delete(`https://apis-2fuc.onrender.com/deleteForm/${id}`)
        .then((data) => {
          window.alert("Form Deleted!");
          let temp = viewForm.filter((res) => {
            return res._id != id;
          });
          setViewForm(temp);
        })
        .catch((error) => {
          window.alert("Something went Wrong!");
        });
    }
  };

  const searchForms = (e) => {
    let arr = viewForm.filter(data=>data.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchArr(arr);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-6">
        <div className="flex w-5/6 justify-between items-center flex-col lg:flex-row">
          <input
            onChange={searchForms}
            type="text"
            className="border w-full md:w-4/6 lg:w-4/6 my-6 border-gray-600 focus:border-blue-500 focus:outline-none text-white bg-[#46464f] placeholder:text-white-500 rounded p-3 "
            placeholder="Search Form By Title"
          />
          <button className="border border-blue-600 my-6 w-full md:w-4/6 lg:w-1/6 text-[1.2rem] bg-blue-500 rounded text-white py-2">
            <Link to="/create">Create Form +</Link>
          </button>
        </div>
        <div className="relative w-5/6 m-6 overflow-x-auto shadow-md sm:rounded-lg">
          {viewForm.length > 0 && (
            <table className="w-full text-sm border rounded text-left text-gray-500 border-[#4d4d4d]">
              <thead className="text-xs uppercase bg-gray-700 border border-[#4d4d4d] text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created On
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Questions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View Forms
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border border-[#4d4d4d] ">
                {(searchArr.length>0?searchArr:viewForm).map((data, index) => {
                  return (
                    <tr key={index} className=" border-b bg-gray-900 border-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td scope="row" className="px-6 py-4">
                        {data.title}
                      </td>
                      <td className="px-6 py-4">
                        {data.createdAt.toString().split("T")[0]}
                      </td>
                      <td className="px-6 py-4"> {data.fields.length}</td>
                      <td className="px-6 py-4">
                        <button className="hover:underline text-blue-500">
                          <Link
                            to={{
                              pathname: "view/" + data._id,
                            }}
                          >
                            View
                          </Link>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-red-500 hover:underline"
                          onClick={() => deleteForm(data._id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
