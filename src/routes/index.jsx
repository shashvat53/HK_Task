import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import WithAuth from "../HOC/WithAuth";

// Wrapping Layout component
const ProtectedApp = WithAuth(App);
const ProtectedLogin = WithAuth(Login);
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedApp />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <ProtectedLogin />,
  },
]);

export default router;
