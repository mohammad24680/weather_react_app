import React, { useEffect, useState } from "react";
import axios from "axios";
import Style from "./App/App.module.scss";
function App() {
  const [location, setLocation] = useState("tehran");
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  let componentMounted = true;

  // connect to our api
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=337dc7708bece0a5a47c32a15f222392
    `;

  useEffect(() => {
    const searchLocation = (event) => {
      if (componentMounted) {
        axios.get(url).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
        setLocation("");
      }
      if (!location || location === "") return;
      return () => {
        componentMounted = false;
      };
    };
    searchLocation();
  }, [location]);
  const handleSubmit = (event) => {
    // When applied to an element, it interferes with the inherent function of that element.
    //  For example, when a form is applied, it prevents the form from being registered.
    event.preventDefault();
    setLocation(input);
  };

  return (
    <section className={Style.App}>
      <div className={Style.search}>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter Location"
            type="search"
            name="search"
          />
          <button className={Style.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <div className={Style.Container}>
        <div className={Style.Top}>
          <div className={Style.Location}>
            <p>{data.name}</p>
          </div>
          <div className={Style.temp}>
            {/* we're check to see if the data.main is available return data.main.tem */}
            {data.main ? (
              <h1>
                {data.main.temp.toFixed()}
                <sup>°C</sup>
              </h1>
            ) : null}
          </div>
          <div className={Style.img}>
            {data.weather ? (
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
              />
            ) : null}
          </div>
          <div className={Style.description}>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className={Style.temp_max}>
            <p>Max Temp</p>
            {data.main ? (
              <p>
                {data.main.temp_max.toFixed()}
                <span>°C</span>
              </p>
            ) : null}
          </div>
          <div className={Style.temp_min}>
            <p>Min Temp</p>
            {data.main ? (
              <p>
                {data.main.temp_min.toFixed()}
                <span>°C</span>
              </p>
            ) : null}
          </div>
        </div>
        {/* if there is no data.name everything is undefine */}
        {data.name != undefined && (
          <div className={Style.Bottom}>
            <div className={Style.feels}>
              {data.main ? (
                <p>
                  {data.main.feels_like.toFixed()}
                  <span>°C</span>
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className={Style.humidity}>
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className={Style.wind}>
              {data.wind ? <p>{data.wind.speed} m/s</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className={Style.wind}>
              {data.main ? <p>{data.main.pressure} hPa</p> : null}
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
