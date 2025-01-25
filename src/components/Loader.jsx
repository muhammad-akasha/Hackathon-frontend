import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        color: "grey.500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress sx={{ color: "black" }} size={25} />
    </Box>
  );
};

export default Loader;
