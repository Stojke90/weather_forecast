import React from "react";
import { imgPath, altOfImgPath, time, dayOfWeek } from "./helper";

const Current = ({
  city,
  getWeather,
  getCity,
  current,
  sevenDays,
  handleKeyPress,
}) => {
  return (
    <div className="container_current">
      <section className="left">
        <div className="upper_left">
          <h2 style={{ color: "blue" }}>{current.city_name}</h2>
          <div className="curr_data">
            <p style={{ fontSize: "1.5rem" }}>
              {Math.round(current.temp)}
              <sup>o</sup>
            </p>
            <img
              src={imgPath(current)}
              alt={altOfImgPath(current)}
              style={{ filter: "drop-shadow(2px 4px 6px black)" }}
            />
            <p style={{ fontSize: "1.1rem" }}>{current.weather.description}</p>
          </div>
        </div>
        <div className="lower_left">
          <p>
            {sevenDays[0].valid_date} {dayOfWeek(sevenDays[0])}
          </p>
        </div>
      </section>

      <section className="right">
        <div className="search_city">
          <input
            type="text"
            name="search"
            placeholder="Search city...ex.Belgrade"
            value={city}
            onChange={(e) => getCity(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button onClick={() => getWeather()} className="search_btn">
            <img src="magnifying_glass.png" alt="magnifying glass" />
          </button>
        </div>

        <div className="current_con_text">
          <p className="current_text">
            Sunrise: <span>{time(sevenDays[0].sunrise_ts)}</span>
          </p>
          <p className="current_text">
            Sunset: <span>{time(sevenDays[0].sunset_ts)}</span>
          </p>
          <p className="current_text">
            Pressure: <span>{current.pres} mb</span>
          </p>
          <p className="current_text">
            Wind:{" "}
            <span>
              {current.wind_cdir} {current.wind_spd.toFixed(2)} m/s
            </span>
          </p>
          <p className="current_text">
            Feels Like:{" "}
            <span>
              {Math.round(current.app_temp)}
              <sup>o</sup>
            </span>
          </p>
          <p className="current_text">
            Visibility: <span>{current.vis} KM</span>
          </p>
          <p className="current_text">
            Precipitation:{" "}
            <span>{current.precip === null ? 0 : current.precip} mm/hr</span>
          </p>
          <p className="current_text">
            Snowfall:{" "}
            <span>{current.snow === null ? 0 : current.snow} mm/hr</span>
          </p>
          <p className="current_text">
            UV Index: <span>{current.uv}</span>
          </p>
          <p className="current_text">
            Air Quality: <span>{current.aqi}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Current;
