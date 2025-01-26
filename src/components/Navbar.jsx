import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../axios-interceptor/axios";
import { setUser } from "../reduxconfig/reducers/userSlice";
import Loader from "./Loader";

const drawerWidth = 240;
const navItems = ["Home", "Dashboard"];

function Navbar(props) {
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.loading.loading);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null); // State for profile dropdown menu
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      console.log(res);
      dispatch(setUser({}));
    } catch (error) {
      console.log(error);
    }
    handleProfileClose(); // Close the dropdown
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {/* Show profile dropdown only if logged in */}
        {user.username && (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={handleProfileClick}
            >
              <ListItemText className="text-start" primary="Profile" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ position: "relative", zIndex: 1201 }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box
            sx={{
              display: "flex", // Use flexbox for horizontal alignment
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%", // Take full width of the toolbar
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  key={item}
                >
                  <Button sx={{ color: "#fff" }}>{item}</Button>
                </Link>
              ))}
            </Box>
            {/* Conditional render for profile and logout */}
            {loading ? (
              <Loader />
            ) : user.username ? (
              <Button sx={{ color: "#fff" }} onClick={handleProfileClick}>
                Profile
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button sx={{ color: "#fff" }}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button sx={{ color: "#fff" }}>Signup</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Profile Menu (Dropdown) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            width: 200, // Ensure the menu width is applied properly
            padding: 0,
          },
        }}
      >
        {/* User Profile Info */}
        <Box
          sx={{
            width: "full",
            display: "flex",
            alignItems: "center",
            gap: 2, // Adjust spacing between image and text
            paddingX: 2,
            paddingY: 1,
            cursor: "pointer", // Make it look clickable
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)", // Add hover background color like MenuItem
            },
          }}
        >
          <Typography>{user.username}</Typography> {/* Display username */}
        </Box>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
