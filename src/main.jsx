import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Provider } from "react-redux";
import { store } from "./reduxconfig/store/store";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GetLoginUser from "./components/GetLoginUser";
import ProtectedRoute from "./components/ProtectedRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute Component={Home} />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GetLoginUser />
      <RouterProvider router={route}></RouterProvider>
    </Provider>
  </StrictMode>
);
