import React from 'react';
import { useApolloClient } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../components/AuthContext'; 
import logo from '../assets/bitmap.png';
import { LOGOUT } from '../utils/mutations';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'Profile', path: '/Profile' },
  { label: 'Projects', path: '/projects' },
  { label: 'Connect', path: '/connect' },
  { label: 'Requests', path: '/requests' },
];

const settings = ['Profile Settings', 'Account Settings', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const { user, onLogout } = useAuth();
  const client = useApolloClient(); 

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

  const handleLogout = async () => {
    try {
      await client.mutate({
        mutation: LOGOUT,
      });

      await onLogout();

      history.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ boxShadow: theme.shadows[0], backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ maxWidth: '100%' }}>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            flexGrow: 1,
          }}>
            {/* Logo */}
            <img
              src={logo}
              alt="TraxSonic Logo"
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              style={{ maxHeight: '30px', display: 'block' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to={page.path} sx={{ textDecoration: 'none', color: '#ffffff ' }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            flexGrow: 1,
          }}>
            {/* Logo */}
            <img
              src={logo}
              alt="TraxSonic Logo"
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              style={{ maxHeight: '30px', display: 'block' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {user ? (
                pages.map((page) => (
                  <Button
                    key={page.label}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{
                      mx: 2,
                      color: location.pathname === page.path ? 'white' : 'gray',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    {page.label}
                  </Button>
                ))
              ) : null}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Taylor Gehrts"  />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

