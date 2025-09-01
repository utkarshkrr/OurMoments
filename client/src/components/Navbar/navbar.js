import React, { useState, useEffect } from "react";
import { 
    AppBar, Button, Toolbar, Typography, Avatar, Tooltip, ClickAwayListener, Box, Divider,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import logo from "../../images/logo.gif";
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [open, setOpen] = useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleOpenLogoutDialog = (e) => {
        e.stopPropagation();
        setOpenLogoutDialog(true);
    };

    const handleCloseLogoutDialog = () => {
        setOpenLogoutDialog(false);
    };

    const handleConfirmLogout = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        history.push("/");
        handleTooltipClose();
        handleCloseLogoutDialog();
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleConfirmLogout();
        }

        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        if (storedProfile?.result?._id || storedProfile?.result?.googleId) {
            const userId = storedProfile.result._id || storedProfile.result.googleId;
            setUser({ ...storedProfile, result: { ...storedProfile.result, _id: userId } });
        } else {
            setUser(storedProfile);
        }
    }, [location]);

    return (
        <AppBar className={classes.appBar} color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt="icon" height="100" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div className={classes.profile}>
                            <Tooltip
                                classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }}
                                PopperProps={{ disablePortal: true }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                interactive
                                title={
                                    user?.result ? (
                                        <Box className={classes.tooltipContent}>
                                            <Typography variant="overline" color="textSecondary" className={classes.tooltipHeading}>
                                                Account
                                            </Typography>
                                            <Avatar
                                                className={classes.purple}
                                                alt={user.result.name}
                                                src={user.result.imageUrl}
                                            >
                                                {user.result.name.charAt(0)}
                                            </Avatar>
                                            <Typography variant="body1" className={classes.tooltipText}>
                                                {user.result.name}
                                            </Typography>
                                            <Typography variant="body2" className={classes.tooltipEmail}>
                                                {user.result.email}
                                            </Typography>
                                            <Divider className={classes.divider} />
                                            <Button
                                                variant="outlined"
                                                className={classes.logout}
                                                onClick={handleOpenLogoutDialog}
                                            >
                                                Logout
                                            </Button>
                                        </Box>
                                    ) : (
                                        ""
                                    )
                                }
                                placement="bottom-end"
                                arrow
                            >
                                <div
                                    className={classes.profileInfo}
                                    onClick={handleTooltipToggle}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Avatar
                                        className={classes.purple}
                                        alt={user.result.name}
                                        src={user.result.imageUrl}
                                    >
                                        {user.result.name.charAt(0)}
                                    </Avatar>
                                    <Typography className={classes.userName} variant="h6">
                                        {user.result.name}
                                    </Typography>
                                </div>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                ) : (
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.signIn}
                        onClick={() => history.push("/auth")}
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
            <Dialog
                open={openLogoutDialog}
                onClose={handleCloseLogoutDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleCloseLogoutDialog} color="primary" className={classes.cancelLogoutButton}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary" autoFocus className={classes.confirmLogoutButton}>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
};

export default Navbar;