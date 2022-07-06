import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const logoutUser = () => {
    handleCloseUserMenu();
    localStorage.removeItem("userData");
    setLoggedIn = false;
    navigate("/home");
  };

  useEffect(() => {
    let localUserData = JSON.parse(localStorage.getItem("userData")) || "";
    setUserData(localUserData);
    setLoggedIn(localUserData ? true : false);
  }, [loggedIn]);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#141414" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component={NavLink}
            to="/home"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MRms
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                component={NavLink}
                to="/home"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/about-us"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">About Us</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/services"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Services</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/portfolio"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Portfolio</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/contact-us"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Contact Us</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            component={NavLink}
            to="/home"
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MRms
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={NavLink}
              to="/home"
              onClick={handleCloseNavMenu}
              sx={{ mx: 3, my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/about-us"
              onClick={handleCloseNavMenu}
              sx={{ mx: 3, my: 2, color: "white", display: "block" }}
            >
              About us
            </Button>
            <Button
              component={NavLink}
              to="/services"
              onClick={handleCloseNavMenu}
              sx={{ mx: 3, my: 2, color: "white", display: "block" }}
            >
              Services
            </Button>
            <Button
              component={NavLink}
              to="/portfolio"
              onClick={handleCloseNavMenu}
              sx={{ mx: 3, my: 2, color: "white", display: "block" }}
            >
              Portfolio
            </Button>
            <Button
              component={NavLink}
              to="/contact-us"
              onClick={handleCloseNavMenu}
              sx={{ mx: 3, my: 2, color: "white", display: "block" }}
            >
              Contact Us
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircle sx={{ color: "white" }} />{" "}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <p className="mx-4">{userData.email || ""}</p>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={NavLink}
                    to="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={NavLink}
                    to="/profile"
                  >
                    profile
                  </MenuItem>
                  <MenuItem onClick={logoutUser} component={NavLink} to="/home">
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
