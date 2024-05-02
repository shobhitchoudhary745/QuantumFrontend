import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LightTheme = {
  textColor: "#333",
  axisLineColor: "#ccc",
  gridLineColor: "#eee",
  barColor: "#8884d8",
  lineColor: "#8884d8",
};

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 200, pv: 2400, amt: 2400 },
  { name: "Sep", uv: 300, pv: 1398, amt: 2210 },
  { name: "Oct", uv: 200, pv: 9800, amt: 2290 },
  { name: "Nov", uv: 278, pv: 3908, amt: 2000 },
  { name: "Dec", uv: 189, pv: 4800, amt: 2181 },
];

function Component() {
  const [csvData, setCsvData] = useState(
    JSON.parse(localStorage.getItem("setCsvData")) || ""
  );
  const [videoPath, setVideoPath] = useState(
    localStorage.getItem("setVideoPath") || ""
  );

  const renderTableHeaders = () => {
    const headers = Object.keys(csvData[0]);
    return headers.map((header, index) => (
      <th
        style={{
          border: "1px solid black",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          textAlign: "center",
        }}
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
        style={{ backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#f9f9f9" }}
      >
        {Object.values(row).map((value, columnIndex) => (
          <td
            key={columnIndex}
            style={{ padding: "10px", border: "1px solid #ddd" }}
          >
            {value}
          </td>
        ))}
      </tr>
    ));
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
          {csvData && (
            <div className="csv-table">
              <div className="d-flex justify-content-center mt-2">
                <video
                  style={{
                    height: "400px",
                    width: "90%",
                    alignItems: "center",
                  }}
                  src={videoPath}
                  controls
                />
              </div>

              <div className="mt-4 d-flex justify-content-center flex-wrap">
                <div className="m-5" style={{ width: "40%" }}>
                  <h2 className="text-center">Line Chart</h2>
                  <LineChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" stroke={LightTheme.axisLineColor} />
                    <YAxis stroke={LightTheme.axisLineColor} />
                    <CartesianGrid stroke={LightTheme.gridLineColor} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={LightTheme.lineColor}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </div>

                <div className="m-5" style={{ width: "40%" }}>
                  <h2 className="text-center">Bar Chart</h2>
                  <BarChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" stroke={LightTheme.axisLineColor} />
                    <YAxis stroke={LightTheme.axisLineColor} />
                    <CartesianGrid stroke={LightTheme.gridLineColor} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill={LightTheme.barColor} />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </div>

                <div className="m-5" style={{ width: "40%" }}>
                  <h2 className="text-center">Pie Chart</h2>
                  <PieChart width={600} height={300}>
                    <Pie
                      dataKey="uv"
                      data={data}
                      fill={LightTheme.barColor}
                      label
                    />
                  </PieChart>
                </div>

                <div className="m-5" style={{ width: "40%" }}>
                  <h2 className="text-center">Area Chart</h2>
                  <AreaChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" stroke={LightTheme.axisLineColor} />
                    <YAxis stroke={LightTheme.axisLineColor} />
                    <CartesianGrid stroke={LightTheme.gridLineColor} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      fill={LightTheme.lineColor}
                    />
                  </AreaChart>
                </div>
              </div>
              <h2 className="mt-4 text-center">Logs</h2>
              <table
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  width: "100%",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    {renderTableHeaders()}
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
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

export default Component;
