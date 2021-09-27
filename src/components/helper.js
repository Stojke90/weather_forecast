// function for the image path, using the time data we search for the image
export const imgPath = (data) =>
  `images/${data.weather.code}/${data.weather.icon}.png`;

// function for the alt name path, using the time data we search for the name for image
export const altOfImgPath = (data) =>
  `Weather App ${data.pod === "n" ? "Night " : "Day "}${
    data.weather.description
  }`;

// creates a new date object with the current set time,from milliseconds to time HH:MM
export const time = (data) => {
  const date = new Date(data * 1000);
  return date.toString().substring(15, 21);
};

// function for set day in week,from date to string
export const dayOfWeek = (data) => {
  const day = new Date(data.valid_date.split("-").join(","))
    .toString()
    .slice(0, 3);

  if (day === "Mon") {
    return "Monday";
  } else if (day === "Tue") {
    return "Tuesday";
  } else if (day === "Wed") {
    return "Wednesday";
  } else if (day === "Thu") {
    return "Thursday";
  } else if (day === "Fri") {
    return "Friday";
  } else if (day === "Sat") {
    return "Saturday";
  } else if (day === "Sun") {
    return "Sunday";
  }

  return day;
};
