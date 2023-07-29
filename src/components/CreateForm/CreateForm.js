import React from "react";
import { useState } from "react";
import Preview from "../Preview/Preview";
function CreateForm() {
  const [type, setType] = useState("text");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [fields, setFields] = useState([]);
  const [preview, setPreview] = useState(false);
  const [set, setName] = useState(new Set());

  const addQuestions = (e) => {
    e.preventDefault();
    if (!question.trim().length || !title.trim().length) {
      window.alert("Question & Title are required");
      return;
    }
    if (set.has(question.toLowerCase().trim())) {
      window.alert("This question is Already taken!");
      return;
    }
    let temp = set;
    temp.add(question.toLowerCase().trim());
    setName(temp);
    const form = {
      required,
      placeholder,
      question,
      type,
    };
    setFields((pre) => [...pre, form]);
    setPlaceholder("");
    setQuestion("");
    setType("text");
    setRequired(false);
  };
  const clearForm = (e) => {
    e.preventDefault();
    const check = window.confirm("Are you sure you want to clear form ?");
    if (check) {
      e.preventDefault();
      setFields([]);
      setTitle("");
      setPlaceholder("");
      setRequired(false);
      setType("text");
      setQuestion("");
      let temp = set;
      temp.clear();
      setName(temp);
    }
  };

  return (
    <div>
      {!preview && (
        <>
          <p className="text-center my-6 text-blue-500 font-normal text-[2rem]">
            Create Form
          </p>
          <div className="flex justify-center items-center my-6">
            <form 
              onSubmit={addQuestions}
              className="w-5/6 lg:w-4/6 p-6 bg-[#282831] border border-[#4d4d4d] rounded-lg shadow"
            >
              <div className="flex flex-col gap-3">
                <label className="text-[#FEFEFF]">Title</label>
                <input
                  {...(fields.length > 0 ? { disabled: "disabled" } : {})}
                  className="border border-gray-600 focus:border-blue-500 focus:outline-none p-3 after:border-color-blue-500 rounded text-white bg-[#46464f] placeholder:text-white-500"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Title"
                  required
                />
                <label className="text-[#FEFEFF]">Question</label>
                <input
                  required
                  className="border border-gray-600 focus:border-blue-500 focus:outline-none rounded p-3 text-white bg-[#46464f] placeholder:text-white-500"
                  type="text"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  placeholder="Question"
                />
                <label className="text-[#FEFEFF]">Placeholder</label>
                <input
                  className="border border-gray-600 rounded focus:border-blue-500 focus:outline-none text-white p-3 bg-[#46464f] placeholder:text-white-500"
                  type="text"
                  onChange={(e) => setPlaceholder(e.target.value)}
                  value={placeholder}
                  placeholder="Enter Placeholder"
                />
              </div>
              <div className="flex justify-center md:justify-start gap-3 mt-3">
                <div className="flex flex-col gap-3">
                  <label className="text-[#FEFEFF]">Type</label>
                  <select
                    className="border focus:border-blue-500 focus:outline-none border-gray-600 rounded text-white bg-[#46464f] p-3 w-[120px] md:w-[15rem]"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value="text">text</option>
                    <option value="number">number</option>
                    <option value="password">password</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[#FEFEFF]">Required</label>
                  <select
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3 w-[120px] md:w-[15rem]"
                    onChange={() => setRequired((prev) => !prev)}
                    value={required}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="border border-blue-600 hover:opacity-90 w-64 py-3 text-white bg-blue-500 rounded"
                >
                  Add Question
                </button>
                {fields.length > 0 && (
                  <button
                    className="border border-blue-600 hover:opacity-90 w-64 py-3 text-white bg-blue-500 rounded"
                    onClick={clearForm}
                  >
                    Clear Form
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 justify-center items-center m-6">
        {preview && (
          <Preview
            fields={fields}
            title={title}
            setFields={setFields}
            setTitle={setTitle}
            setPreview={setPreview}
            setName={setName}
          />
        )}
      </div>
      <div className="flex justify-center items-center my-6">
        {fields.length > 0 ? (
          <p
            onClick={() => setPreview((prev) => !prev)}
            className="cursor-pointer text-[1.2rem] text-right underline hover:text-[#ff0000ce] text-[blue]"
          >
            {preview === false ? "Preview Form" : "Add More Questions"}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CreateForm;
