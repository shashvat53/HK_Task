import { toast } from "react-toastify";

export const LoginApi = ({ email, password }) => {
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
    method: "POST",
    headers: {
      Accept: "/", // Corrected Accept header
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return response.json();
  });
};

// To remain signed in even browser automatically remove user details
export const authenticate = (data, next, setCookie) => {
  if (typeof window !== "undefined") {
    const cookieExpireTime = parseInt(import.meta.env.VITE_COOKIE_EXPIRE_TIME); // Read the expiration time from env
    const expiresInCustomTime = new Date();
    expiresInCustomTime.setTime(
      expiresInCustomTime.getTime() + cookieExpireTime
    );

    setCookie("token", JSON.stringify(data), {
      expires: expiresInCustomTime,
    });
    next();
  }
};

// check whether user is signed in or not
export const isAuthenticated = (cookies) => {
  if (typeof window == "undefined") {
    return false;
  }

  if (cookies?.token) {
    return cookies;
  }
};

export const Logout = (removeCookie, next) => {
  if (typeof window !== "undefined") {
    removeCookie("token");
    toast.success("Logout successfully");
    next();
  }
};
