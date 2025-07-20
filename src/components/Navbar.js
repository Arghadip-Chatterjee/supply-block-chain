import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  QrCodeScanner,
  Add,
  Update,
  AdminPanelSettings,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Navbar = ({ userRole, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { account, disconnectWallet } = useWeb3();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    disconnectWallet();
    navigate('/login');
    handleClose();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const getRoleBasedMenuItems = () => {
    const commonItems = [
      { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { label: 'Track Product', icon: <QrCodeScanner />, path: '/track' }
    ];

    const roleSpecificItems = [];

    if (userRole === 'Farmer') {
      roleSpecificItems.push({ label: 'Create Product', icon: <Add />, path: '/create-product' });
    }

    if (['Processor', 'Warehouse', 'Distributor', 'Retailer'].includes(userRole)) {
      roleSpecificItems.push({ label: 'Update Product', icon: <Update />, path: '/update-product' });
    }

    if (userRole === 'Authority') {
      roleSpecificItems.push({ label: 'Admin Panel', icon: <AdminPanelSettings />, path: '/admin' });
    }

    return [...commonItems, ...roleSpecificItems];
  };

  const menuItems = getRoleBasedMenuItems();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mb: 3,
          background: 'linear-gradient(to bottom right, #34d399, #10b981, #047857)',
          color: '#ffffff',
          boxShadow: 4
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', letterSpacing: 1 }}
          >
            Tea Supply Chain - {userRole}
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    width: 250,
                    backgroundColor: '#ecfdf5',
                    height: '100%',
                    p: 2
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <List>
                    {menuItems.map((item) => (
                      <ListItem
                        button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        sx={{
                          '&:hover': { backgroundColor: 'rgba(16,185,129,0.2)' }
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontWeight: 'bold' }}
                        />
                      </ListItem>
                    ))}
                    <ListItem
                      button
                      onClick={handleLogout}
                      sx={{
                        mt: 2,
                        '&:hover': { backgroundColor: 'rgba(220,38,38,0.1)' }
                      }}
                    >
                      <ListItemIcon><AccountCircle /></ListItemIcon>
                      <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}

              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(16,185,129,0.2)'
                    }
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
