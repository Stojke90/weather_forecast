import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./style/App.css";
import ByHours from "./components/ByHours";
import Current from "./components/Current";
import Days from "./components/Days";
import Loader from "./components/Loader";

const App = () => {
  // state for search city,input value
  const [city, setCity] = useState("");
  // state for coordinates
  const [coordinates, setCoordinates] = useState("");
  // state for 24 hours weather forecast
  const [hours, setHours] = useState([]);
  // state for 7 days weather forecast
  const [sevenDays, setSevenDays] = useState([]);
  // state for current weather forecast
  const [current, setCurrent] = useState({});

  // check if geolocation exists on device,is enable or not,
  //  and if approved get position latitude and longitude of currrent position
  useLayoutEffect(() => {
    const success = (position) =>
      setCoordinates(
        `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );

    const errors = (err) => console.warn(`ERROR(${err.code}): ${err.message}`);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            alert("You need to enable geolocation");
          }
          result.onchange = function () {
            alert(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  // fetch all data for weather forecast
  const getWeather = async () => {
    const location = city === "" ? coordinates : `&city=${city}`;

    await axios
      .all([
        axios.get(
          `${process.env.REACT_APP_BASE_URL}forecast/hourly?${location}${process.env.REACT_APP_API_KEY}&hours=24`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}forecast/daily?${location}${process.env.REACT_APP_API_KEY}&days=7`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}current?${location}${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `https://api.weatherbit.io/v2.0/subscription/usage?${process.env.REACT_APP_API_KEY}`
        ),
      ])
      .then(
        axios.spread((next24Hours, next7days, currentWF, callLeft) => {
          next24Hours.status === 200 && setHours(next24Hours.data.data);
          next7days.status === 200 && setSevenDays(next7days.data.data);
          currentWF.status === 200 && setCurrent(currentWF.data.data[0]);
          callLeft.status === 200 && console.log(callLeft.data.calls_remaining);
        })
      )
      .catch((err) => alert(err.message));
    city !== "" && setCity("");
  };

  // function for set city name,value from input
  const getCity = (e) => setCity(e.target.value);

  // first time initial call fun getWeather and every next time when coordinates are not empthy string
  useEffect(() => {
    coordinates !== "" && getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  // listener for getWeather function,to fetch all data on press enter key on keyboards
  const handleKeyPress = (e) => {
    e.code === "Enter" && getWeather();
  };

  // if data is retrived
  const ifDataRetrieved =
    Object.keys(current).length > 0 && hours.length > 0 && sevenDays.length > 0;

  // set text color and shadow depending on the time of day
  useLayoutEffect(() => {
    if (Object.keys(current).length > 0) {
      document.querySelector("body").style.backgroundImage = `url('${
        current.pod === "d" ? "day.jpg" : "night.jpg"
      }')`;
      document.querySelector(".container").style.backgroundImage = `url('${
        current.pod === "d" ? "day.jpg" : "night.jpg"
      }')`;
    }
  }, [current]);

  return (
    <>
      {ifDataRetrieved ? (
        <section className="container">
          <Current
            city={city}
            getWeather={getWeather}
            getCity={getCity}
            current={current}
            sevenDays={sevenDays}
            handleKeyPress={handleKeyPress}
          />
          <Days sevenDays={sevenDays} />
          <ByHours hours={hours} />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
