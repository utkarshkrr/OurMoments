import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  accessCode: "",
  secretCode: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // ref to track if component is still mounted
  const isMounted = useRef(true);

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      history.push("/posts");
    }
  }, [history]);

  useEffect(() => {
    document.title = isSignup ? "Sign Up" : "Sign In";

    return () => {
      isMounted.current = false;
    };
  }, [isSignup]);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return alert("Please enter a valid email address.");
    }

    if (isSignup && !validatePassword(formData.password)) {
      return alert(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (isSignup && formData.accessCode !== process.env.REACT_APP_ACCESS_CODE) {
      return alert("Invalid access code.");
    }

    setIsLoading(true);

    try {
      if (isSignup) {
        await dispatch(signup(formData, history));
      } else {
        await dispatch(signin(formData, history));
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const goToForgot = () => {
    history.push("/forgot");
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  disabled={isLoading}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  required={false}
                  disabled={isLoading}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              disabled={isLoading}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              disabled={isLoading}
            />
            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                  disabled={isLoading}
                />
                <Input
                  name="accessCode"
                  label="Access Code"
                  handleChange={handleChange}
                  type="password"
                  xs={12}
                  sm={4}
                  disabled={isLoading}
                />
                <Input
                  name="secretCode"
                  label="Secret Code (to recover account later)"
                  handleChange={handleChange}
                  type="password"
                  xs={12}
                  sm={8}
                  disabled={isLoading}
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
          {!isSignup && (
            <Button
              onClick={goToForgot}
              color="secondary"
              fullWidth
              disabled={isLoading}
            >
              Forgot Credentials?
            </Button>
          )}
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode} disabled={isLoading}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
