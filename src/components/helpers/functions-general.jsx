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
export const apiVersion = "/v1";

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

export const getUrlParam = (id) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const param = urlParams.get(id);
  // return param;
  return urlParams;
};
