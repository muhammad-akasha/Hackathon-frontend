import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { addUser } from "../reduxconfig/reducers/userSlice";
import { Box } from "@mui/material";
import MicrofinanceDashboard from "../components/FormDashboard.jsx";

const Home = () => {
  const selector = useSelector((state) => state.users.user);
  useEffect(() => {
    console.log(selector);
  }, [selector]);
  return (
    <Box>
      <MicrofinanceDashboard />
    </Box>
  );
};

export default Home;
