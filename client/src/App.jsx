import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import CreateListing from "./pages/CreateListing";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
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
    element: (
      <div>
        <PrivateRoute />
      </div>
    ),
    children: [
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
        path: "/create-listing",
        element: (
          <div>
            <Header />
            <CreateListing />
          </div>
        ),
      },
      {
        path: "/update-listing/:listingID",
        element: (
          <div>
            <Header />
            <UpdateListing />
          </div>
        ),
      },
    ],
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
  {
    path: "/signup",
    element: (
      <div>
        <Header />
        <Signup />
      </div>
    ),
  },
  ,
  {
    path: "/listing/:listingId",
    element: (
      <div>
        <Header />
        <Listing />
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
