import React from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ Component }) => {
  const user = useSelector((state) => state.users.user);
  return user.username ? <Component /> : null;
};

export default ProtectedRoute;
