import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function Loading() {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: Adds a semi-transparent background
            zIndex: 9999, // Makes sure the loader is on top of other elements
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
