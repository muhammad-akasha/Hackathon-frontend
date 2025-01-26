import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 4, textAlign: "center", width: "100%" }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Welcome to the Microfinance App of Saylani
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ fontStyle: "italic" }}
        >
          Empowering communities through financial services.
        </Typography>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "inline-block",
            padding: "10px 15px",
            border: "1px solid #1976d2",
            borderRadius: "5px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Sign in Or Create Account to Continue...
        </Link>
      </Paper>
    </Container>
  );
};

export default WelcomePage;
