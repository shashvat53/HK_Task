import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isAuthenticated } from "../helper/auth";

const WithAuth = (WrappedComponent) => {
  // console.log(WrappedComponent.name, "0011");
  return (props) => {
    const [cookies] = useCookies(["user"]);
    const navigate = useNavigate();

    const accessToken = isAuthenticated(cookies);
    console.log(accessToken, "2323");

    useEffect(() => {
      if (accessToken && WrappedComponent.name === "Login") {
        navigate("/"); // Redirect to home if authenticated and WrappedComponent is Login
      } else if (!accessToken || accessToken === undefined) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    }, [accessToken, navigate, WrappedComponent.name]); // Dependency array ensures useEffect runs if accessToken or navigate changes

    // If not authenticated, we return null since the redirection will be handled by useEffect
    if (!accessToken && WrappedComponent.name !== "Login") {
      return null; // Return null to avoid rendering if there's no token and the component is not Sign
    }

    return <WrappedComponent {...props} />; // Render the wrapped component if authenticated
  };
};

export default WithAuth;
