import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cabf7ae04ec3f7e2bb0c60bd670866e7`;

  // const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=bandung&appid=cabf7ae04ec3f7e2bb0c60bd670866e7`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      searchLocation("");
    }
  };

  const inputLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input value={location} onChange={inputLocation} onKeyPress={searchLocation} placeholder="Enter Location" type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="city">
            <h3>{data.name}</h3>
          </div>
          <div className="temp">{data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null}</div>
          <div className="desc">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{Math.round(data.main.feels_like - 273.15)}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed} MPH</p> : null}
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
