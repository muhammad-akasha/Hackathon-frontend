import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  AccountBalance,
  People,
  CreditCard,
  Notifications,
} from "@mui/icons-material";

export default function DashboardHome() {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Saylani Micro Finance
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <Avatar
            alt="User Profile"
            src="/profile.jpg"
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Total Loans</Typography>
                <AccountBalance color="primary" />
              </Box>
              <Typography variant="h4" fontWeight="bold">
                PKR 12,000,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Active Borrowers</Typography>
                <People color="primary" />
              </Box>
              <Typography variant="h4" fontWeight="bold">
                1,250
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Pending Approvals</Typography>
                <CreditCard color="primary" />
              </Box>
              <Typography variant="h4" fontWeight="bold">
                85
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <Button variant="contained" color="primary" fullWidth>
              Approve Loans
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button variant="contained" color="secondary" fullWidth>
              Add New Borrower
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button variant="contained" color="success" fullWidth>
              View Reports
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
