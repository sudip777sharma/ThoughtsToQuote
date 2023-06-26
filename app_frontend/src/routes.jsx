import CreateQuote from "./components/CreateQuote";
import EditDeleteQuote from "./components/EditDeleteQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import OtherProfile from "./components/OtherProfile";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "*",
    element: <h1>404 not found</h1>,
  },
  {
    path: "/editDeleteQuote/:quoteId",
    element: <EditDeleteQuote />,
  },
  {
    path: "/otherProfile/:userId",
    element: <OtherProfile />,
  },
];
