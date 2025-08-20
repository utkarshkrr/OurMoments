import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
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
  const dispatch = useDispatch();
  const history = useHistory();

  // Set the page title dynamically based on the form mode
  useEffect(() => {
    document.title = isSignup ? "Sign Up" : "Sign In";
  }, [isSignup]);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSubmit = (e) => {
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

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
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
        <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half required={false} />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
                <Input
                  name="accessCode"
                  label="Access Code"
                  handleChange={handleChange}
                  type="password"
                  xs={12}
                  sm={4}
                />
                <Input
                  name="secretCode"
                  label="Secret Code (to recover account later)"
                  handleChange={handleChange}
                  type="password"
                  xs={12}
                  sm={8}
                />
              </>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {!isSignup && (
            <Button onClick={goToForgot} color="secondary" fullWidth>
              Forgot Credentials?
            </Button>
          )}
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;