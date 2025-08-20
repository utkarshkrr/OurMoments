import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Avatar, Tooltip, ClickAwayListener } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import logo from "../../images/logo.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history.push("/");
    handleTooltipClose();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                interactive
                title={
                  <Button
                    variant="outlined"
                    className={classes.logout}
                    onClick={logout}
                  >
                    Logout
                  </Button>
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
    </AppBar>
  );
};

export default Navbar;