import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home/>
      </div>
    ),
  },
  {
    path:"/about",
    element:(
      <div>
        <About/>
      </div>
    )
  },
  {
    path:"/profile",
    element:(
      <div>
        <Profile/>
      </div>
    )
  },
  {
    path:"/sign-in",
    element:(
      <div>
        <Signin/>
      </div>
    )
  },
  {
    path:"/sign-out",
    element:(
      <div>
        <SignOut/>
      </div>
    )
  }

]);

const App = () => {
  return <RouterProvider router={router}/>
};

export default App;
