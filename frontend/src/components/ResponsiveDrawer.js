import React from 'react';
import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getCurrentUser } from './../Services/authService';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    logo: {
        textAlign: 'center',
        paddingTop: '80px',
    },
    darkColor: {
        color: theme.palette.primary.dark,
    },
    lightColor: {
        backgroundColor: theme.palette.primary.light,
        height: '100%',
    },
    listItem: {
        marginTop: '40px',
    },
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            height: '67px',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const ResponsiveDrawer = (props) => {
    const history = useHistory();
    //const location = useLocation();
    const classes = useStyles();
    const user = getCurrentUser();
    const [redirect, setRedirect] = useState('');

    const menuItems = [
        {
            text: 'Home',
            icon: <HomeIcon fontSize="large" className={classes.darkColor} />,
            path: '/',
            visible: !user,
        },
        {
            text: 'Profile',
            icon: <PersonIcon fontSize="large" className={classes.darkColor} />,
            path: user ? (user.role === 'doctor' ? `/AllDoctors/${user._id}` : `/profile`) : null,
            visible: user,
        },
        {
            text: 'Doctors',
            icon: <LocalHospitalIcon fontSize="large" className={classes.darkColor} />,
            path: '/Alldoctors',
            visible: true,
        },
        {
            text: 'Chats',
            icon: <ChatIcon fontSize="large" className={classes.darkColor} />,
            path: '/Chat',
            visible: user,
        },
        {
            text: 'Logout',
            icon: <ExitToAppIcon fontSize="large" className={classes.darkColor} />,
            path: '/logout',
            visible: user,
        },
    ];

    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        console.log('logging out');
        if (user) {
            localStorage.removeItem('token');
            props.logOut();
        }
    };

    const drawer = (
        <div className={classes.lightColor}>
            <h1 className={classes.logo}>Logo</h1>
            <div className={classes.toolbar} />
            <List>
                {menuItems.map((item) => {
                    if (item.visible) {
                        return (
                            <ListItem
                                button
                                className={classes.listItem}
                                key={item.text}
                                onClick={item.text === 'Logout' ? handleLogout : () => history.push(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant="h6" style={{ color: '#936B3D' }}>
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        );
                    }
                })}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar style={{ zIndex: '1' }} position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h2" style={{ color: '#936B3D' }}>
                        Dr. Net
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        style={{ zIndex: '10' }}
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: false,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
};
ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
