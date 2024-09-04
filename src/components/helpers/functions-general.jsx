import React from "react";

export const urlPathHrLocal = "http://localhost/react-vite/viter-local-hr-v2";
export const imgUrlPathHrLocal =
  "http://localhost/react-vite/viter-local-hr-v2/public/img";
export const mediaUrlPathHrLocal = "media";

export const devApiUrl = `${urlPathHrLocal}/rest`;
export const devBaseUrl = `${urlPathHrLocal}`;
export const devBaseImgUrl = `${imgUrlPathHrLocal}`;
export const devBaseMediaUrl = `${mediaUrlPathHrLocal}`;
export const devNavUrl = "";
export const apiVersion = "/v2";

export const UrlDeveloper = "developer";

// dev key from thunder client
export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};

// get the id of specific data
export const getUrlParam = (id) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const param = urlParams.get(id);
  // return param;
  return urlParams;
};


// formatting date and time
export const setTimeZone = "Asia/Taipei";

export const formatDate = (dateVal, val = "", format = "") => {
  const formatedDate = val;
  if (typeof dateVal !== "undefined" && dateVal !== "") {
    // formatting date
    const event = new Date(dateVal);

    return event.toLocaleString("en", options(format));
  }
  return formatedDate;
};


export const options = (format) => {
  const options =
    format === "with-weeks"
      ? {
          timeZone: setTimeZone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      : format === "timezone-name"
      ? {
          timeZoneName: "short",
        }
      : format === "weeks"
      ? {
          timeZone: setTimeZone,
          weekday: "long",
        }
      : format === "no-year-with-weeks"
      ? {
          timeZone: setTimeZone,
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      : format === "no-year"
      ? {
          timeZone: setTimeZone,
          month: "long",
          day: "numeric",
        }
      : format === "date-time-with-weeks"
      ? {
          timeZone: setTimeZone,
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }
      : format === "plain-date"
      ? {
          timeZone: setTimeZone,
        }
      : format === "numeric-week"
      ? {
          timeZone: setTimeZone,
          weekday: "numeric",
        }
      : format === "year"
      ? {
          timeZone: setTimeZone,
          year: "numeric",
        }
      : format === "month-short-year"
      ? {
          timeZone: setTimeZone,
          month: "short",
          year: "numeric",
        }
      : {
          timeZone: setTimeZone,
          month: "long",
          day: "numeric",
          year: "numeric",
        };

  return options;
};

//time format
export const getTimeFormat = (time) => {
  let result = "";

  if (typeof time !== "undefined" && time !== "") {
    let getTime = time.split(" ");
    let newTime = time;
    if (getTime?.length > 1) {
      newTime = getTime[1];
    }

    result = `${newTime} AM `;
    if (
      Number(newTime.split(":")[0]) >= 12 &&
      Number(newTime.split(":")[0]) !== 24
    ) {
      result = `${newTime} PM `;
    }
  }
  return result;
};

//rgb to hex
export const hexToRgb = (hex) => {
  let result = "";
  console.log(hex);
  if (typeof hex !== "undefined" && hex !== "") {
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    result = `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
      result[3],
      16
    )} `;
  }

  return result;
};

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpoint error");
    });
  return data;
};

// Function to calculate tenure
export const calculateTenure = (date) => {
  const currentDate = new Date();
  const hire = new Date(date);

  let years = currentDate.getFullYear() - hire.getFullYear();
  let months = currentDate.getMonth() - hire.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (currentDate.getDate() < hire.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return { years, months };
};


