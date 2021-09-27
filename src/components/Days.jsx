import React from "react";
import { v4 as uuidv4 } from "uuid";
import { imgPath, altOfImgPath, dayOfWeek } from "./helper.js";
const Days = ({ sevenDays }) => {
  const next7days = sevenDays && sevenDays.filter((data, i) => i !== 0);

  return (
    <div className="container_days">
      {next7days?.map((byDay) => (
        <section key={uuidv4()} className="weather_by_day">
          <div className="day_of_week">
            <p>{dayOfWeek(byDay)}</p>
          </div>
          <div className="img_day_of_week">
            <img
              src={imgPath(byDay)}
              alt={altOfImgPath(byDay)}
              style={{ filter: "drop-shadow(2px 4px 6px black)" }}
            />
          </div>
          <div className="temp_day_of_week">
            <span>
              {Math.round(byDay.low_temp)}
              <sup>o</sup>
              &nbsp;-&nbsp;
              {Math.round(byDay.high_temp)}
              <sup>o</sup>
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Days;
