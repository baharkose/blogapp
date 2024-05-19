import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const pages = ['home', 'blogs', 'newblog', 'about'];
const settings = ['myblog', 'profile'];

function Navbars() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { currentUserInfo, logout } = useAuthContext();
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
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#FBF6F3" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenNavMenu}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {isMobile ? null : <img src={Logo} alt="Logo" width={220} />}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Menu
              id="menu-appbar-responsive"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={page}
                key={index}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Profile" src={currentUserInfo?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUserInfo &&
                settings.map((setting, index) => (
                  <Link
                    to={setting}
                    key={index}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              {currentUserInfo && (
                <Link to="" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              )}
              {!currentUserInfo && (
                <Link to="auth" style={{ textDecoration: 'none' }}>
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
