import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { usercontext } from "../User Details/User_details";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useContext(usercontext);

  if (user.user == "")
    return alert("you are not logged in"), (<Navigate to="/"></Navigate>);
  return children;
};

export default RequireAuth;
