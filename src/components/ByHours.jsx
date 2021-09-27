import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgPath, altOfImgPath } from "./helper.js";
import { v4 as uuidv4 } from "uuid";
import "swiper/swiper.min.css";

// function to get inner width of screen
function getWindowDimensions() {
  const { innerWidth: width } = window;
  return { width };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const ByHours = ({ hours }) => {
  const { width } = useWindowDimensions();
  // slide per view depending on the width of the device screen
  const perView = () =>
    width < 900
      ? width < 700
        ? width < 601
          ? width < 501
            ? 3
            : 4
          : 5
        : 6
      : 7;

  return (
    <div className="container_hours">
      <Swiper
        slidesPerView={perView()}
        spaceBetween={10}
        grabCursor={true}
        initialSlide={0}
        speed={1000}
      >
        {hours?.map((data) => (
          <SwiperSlide key={uuidv4()} style={{ textAlign: "center" }}>
            <p>{data.timestamp_local.slice(11, 16)}</p>
            <img src={imgPath(data)} alt={altOfImgPath(data)} />
            <p>{data.weather.description}</p>
            <p>
              {Math.round(data.temp)}
              <sup>o</sup>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ByHours;
