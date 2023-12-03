import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";
import Header from "./components/Header";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <Header />
        <About />
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div>
        <Header />
        <Profile />
      </div>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <div>
        <Header />
        <Signin />
      </div>
    ),
  },
  {
    path: "/sign-out",
    element: (
      <div>
        <Header />
        <SignOut />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
