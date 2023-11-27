import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import expresslogo from '../../../assets/expresslogo.png'
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const drawerWidth = 240;

function NavBar(props) {
    const { user } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navItems = <List sx={{ display: 'flex', alignItems: 'center' }}>
        <NavLink className={({ isActive, isPending }) => isPending ? '' : isActive ? 'text-red-500' : ''} to={'/'}>
            <ListItemButton>
                <ListItemText>Home</ListItemText>
            </ListItemButton>
        </NavLink>
        <NavLink className={({ isActive, isPending }) => isPending ? '' : isActive ? 'text-red-500' : ''} to={'/dashboard'}>
            <ListItemButton>
                <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
        </NavLink>
        {

        }
        {user ?
            <NavLink className={({ isActive, isPending }) => isPending ? '' : isActive ? 'text-red-500' : ''} to={'/login'}>
                <ListItemButton>
                    <ListItemText>Login</ListItemText>
                </ListItemButton>
            </NavLink> :
            <NavLink className={({ isActive, isPending }) => isPending ? '' : isActive ? 'text-red-500' : ''} to={'/register'}>
                <ListItemButton>
                    <ListItemText>Register</ListItemText>
                </ListItemButton>
            </NavLink>
        }
    </List>

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            {navItems}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box component="nav" sx={{ display: 'flex', position: 'fixed' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: '#0000004D', boxShadow: 'none', color: 'black' }}>
                <Toolbar component={'div'} sx={{ py: 2, mx: 18, justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {/* <Avatar src={logo} /> */}
                        <Typography variant="h6" component="div">
                            <img src={expresslogo} alt="Logo" style={{ maxHeight: 40 }} />
                        </Typography>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block', lg: 'flex' } }}>
                        {navItems}
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
            {renderMenu}
        </Box>
    );
}

export default NavBar;