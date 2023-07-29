import React, { useState } from "react";
import axios from "axios";

function Preview({ fields, setName, title, setTitle, setFields, setPreview }) {
  const [arr, setArr] = useState([]);

  const saveForm = (e) => {
    e.preventDefault();
    const temp = fields;
    for (let i in temp) {
      temp[i].answers = arr[i];
    }
    const body = { fields: temp, title };
    axios
      .post("https://apis-2fuc.onrender.com/forms", body)
      .then((data) => {
        window.alert("Form Created Successfully!");
        setPreview(false);
        setFields([]);
        setTitle("");
        setName(new Set());
      })
      .catch((err) => {
        window.alert("Something went wrong");
      });
  };

  const handleInput = (e, i) => {
    const temp = arr;
    arr[i] = e.target.value;
    setArr(temp);
  };

  return (
    <form
      onSubmit={saveForm}
      className="w-5/6 lg:w-3/6 p-6 m-6 bg-[#282831] border border-[#4d4d4d] rounded-lg shadow "
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
              className="border border-gray-600 focus:border-blue-500 focus:outline-none rounded p-3 text-white bg-[#46464f] placeholder:text-white-500 mb-3"
              type={data.type}
              placeholder={data.placeholder}
              onChange={(e) => handleInput(e, i)}
              {...(data.required ? { required: "required" } : {})}
            />
          </div>
        );
      })}
      <p className="text-center">
        <button
          type="submit"
          className="hover:opacity-90 border border-blue-600 w-32 md:w-64 py-3 mt-6 text-white bg-blue-500 rounded"
        >
          Create Form
        </button>
      </p>
    </form>
  );
}

export default Preview;
