import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    viewSaveForm();
  }, []);

  const viewSaveForm = () => {
    axios
      .get(`https://apis-2fuc.onrender.com/getSingleForm/${params.id}`)
      .then((data) => {
        setTitle(data.data.formData.title);
        setFields(data.data.formData.fields);
      })
      .catch((err) => {
        window.alert("Something went wrong");
      });
  };

  const saveForm = (e) => {
    e.preventDefault();
    window.alert("Form submited Successfully");
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-5">
      {fields.length>0&&
        <form
          onSubmit={saveForm}
          className="w-full lg:w-3/6 p-6 m-6  rounded-lg shadow bg-[#282831] border border-[#4d4d4d]"
        >
          <p className="font-normal text-center text-blue-500 text-[2rem]">
            {title}
          </p>
          {fields.map((data, i) => {
            return (
              <div key={i} className="flex flex-col gap-3">
                <label className="text-[#FEFEFF]">
                  {data.question}{" "}
                  <span className="text-[red]">{data.required ? "*" : ""}</span>
                </label>
                <input
                  autoComplete="new-password"
                  className="border border-gray-600 focus:border-blue-500 focus:outline-none text-white bg-[#46464f] placeholder:text-white-500 rounded p-3 mb-3"
                  type={data.type}
                  defaultValue={data.answers}
                  placeholder={data.placeholder}
                  {...(data.required ? { required: "required" } : {})}
                />
              </div>
            );
          })}
          <p className="text-center">
            <button
              type="submit"
              className="hover:opacity-90 border border-blue-600 w-32 md:w-64 py-3 m-3 text-white bg-blue-500 rounded"
            >
              Submit Form
            </button>
          </p>
        </form>
      }
    </div>
  );
}

export default ViewForm;
