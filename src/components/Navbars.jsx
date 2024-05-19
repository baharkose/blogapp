import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const pages = ["home", "blogs", "newblog", "about"];
const settings = ["myblog", "profile"];

function Navbars() {
  const { currentUserInfo, logout, currentUser } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    // shahow is elevation
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#FBF6F3" }}>
      <Container
        maxWidth="md"
      >
        <Toolbar disableGutters>
          <img src={Logo} width={220}/>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={page}
                key={index}
                style={{ textDecoration: "none", fontFamily: "Mulish" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  style={{ textDecoration: "none", fontFamily: "Mulish" }}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    alignItems: "flex-end",
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUserInfo?.image} />
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
              {currentUserInfo &&
                settings.map((setting, index) => (
                  <Link
                    to={setting}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}

              {currentUserInfo && (
                <Link to="" style={{ textDecoration: "none" }}>
                  <MenuItem>
                    <Typography textAlign="center" onClick={logout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Link>
              )}

              {!currentUserInfo && (
                <Link to="auth" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbars;
