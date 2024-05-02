import React, { useState } from "react";
import { Col, Form, Row, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", video);

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://scienda-backend.adaptable.app/upload-video",
        formData
      );
      console.log(data.location, "d");
      const response = await axios.post("http://localhost:5000/upload", {
        video: data?.location,
      });

      localStorage.setItem("setCsvData", JSON.stringify(response.data.data));
      localStorage.setItem("setVideoPath", response.data.video_path);
      setLoading(false);
      navigate("/component");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const renderTableHeaders = () => {
    const headers = Object.keys(csvData[0]);
    return headers.map((header, index) => (
      <th
        style={{ border: "1px solid black", textAlign: "center" }}
        key={index}
      >
        {header.toUpperCase()}
      </th>
    ));
  };

  const renderTableRows = () => {
    return csvData.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        style={{ border: "1px solid black", textAlign: "center" }}
      >
        {Object.values(row).map((value, columnIndex) => (
          <td key={columnIndex}>{value}</td>
        ))}
      </tr>
    ));
  };
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setVideo(e.target.files[0]);

    reader.onload = () => {
      setVideoUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="header align-items-center justify-content-between">
        <div className="m-3">
          <img
            alt="logo image"
            className="logo"
            src="https://tse2.mm.bing.net/th?id=OIP.IqTRAs5mCxZsy-4d34QazgHaFr&pid=Api&P=0&h=180"
          />
        </div>
        <div className="mx-4">
          <p className="m-0">Artificial intelligence</p>
        </div>
      </div>
      <div className="d-flex flex-column body">
        <div className="main-content">
          <Row
            style={{ marginBottom: "40px" }}
            className={`align-items-center`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Select Video</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={handleFileChange}
                type="file"
                accept="video/*"
                placeholder="Select Video"
              />
            </Col>
          </Row>
          {videoUrl && (
            <div className="preview">
              <div className="align-items-center justify-content-center mb-1">
                {videoUrl && (
                  <video
                    style={{ height: "400px", width:"90%", alignItems: "center" }}
                    src={videoUrl}
                    controls
                  />
                )}
              </div>
              <div className="align-items-center">
                <Button onClick={submitHandler} className="pt-2 pb-2">
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="footer align-items-center justify-content-center">
          Copyright © 2014-2024 Quantum It. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;
