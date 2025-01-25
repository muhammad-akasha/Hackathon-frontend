import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { addUser } from "../reduxconfig/reducers/userSlice";
import CardComponent from "../components/Card.jsx";
import { Box } from "@mui/material";

const Home = () => {
  const selector = useSelector((state) => state.users.user);
  useEffect(() => {
    console.log(selector);
  }, [selector]);
  return (
    <Box>
      <CardComponent />
    </Box>
  );
};

export default Home;
