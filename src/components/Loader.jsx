import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url("city_backgroud.webp")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <img
        src="loader.gif"
        alt="loading gif"
        style={{ display: "block", margin: "1rem auto 0 auto" }}
      />
    </div>
  );
};

export default Loader;
