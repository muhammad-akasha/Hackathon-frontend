import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import CelebrationIcon from "@mui/icons-material/Celebration";
import WeddingLoanForm from "./WeddingLoanForm";
import HomeConstructionLoanForm from "./HomeLoanForm";
import BusinessLoanForm from "./BusinessLoanForm";
import EducationLoanForm from "./EducationLoanForm";

const categories = [
  { id: "wedding", name: "Wedding Loans", icon: <CelebrationIcon /> },
  { id: "home", name: "Home Construction Loans", icon: <HomeWorkIcon /> },
  { id: "business", name: "Business Startup Loans", icon: <BusinessIcon /> },
  { id: "education", name: "Education Loans", icon: <SchoolIcon /> },
];

const forms = {
  wedding: (
    <>
      <WeddingLoanForm />
    </>
  ),
  home: (
    <HomeConstructionLoanForm />
  ),
  business: (
  <BusinessLoanForm />
  ),
  education: (
    <EducationLoanForm />
  ),
};

export default function MicrofinanceDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("wedding");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" , },
        }}
      >
        <Typography variant="h6" sx={{ position : "relative", padding: 2, textAlign: "center" }}>
          Loan Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {categories.find((cat) => cat.id === selectedCategory)?.name}
        </Typography>
        {forms[selectedCategory]}
      </Box>
    </Box>
  );
}
