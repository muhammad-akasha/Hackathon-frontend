import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);
  return user.username ? <Component /> : null;
};

export default ProtectedRoute;
