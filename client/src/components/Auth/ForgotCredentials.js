import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Input from "./Input";
import useStyles from "./styles";
import * as api from "../../api";

const ForgotCredentials = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    secretCode: "",
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  // 🔹 Set the page title when the component mounts
  useEffect(() => {
    document.title = "Reset Credentials";
  }, []);

  // 🔹 Redirect if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      history.push("/posts");
    }
  }, [history]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateUserWithSecret(formData);
      alert("Account updated successfully. Please sign in again.");
      history.push("/auth");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating credentials.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5} style={{ marginTop: "120px" }}>
        <Typography variant="h4">Reset Credentials</Typography>
        <form
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={1}>
            <Input
              name="email"
              label="Registered Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="secretCode"
              label="Secret Code"
              handleChange={handleChange}
              type="password"
            />
            <Input name="newName" label="New Name" handleChange={handleChange} />
            <Input
              name="newEmail"
              label="New Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="newPassword"
              label="New Password"
              handleChange={handleChange}
              type="password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
          <Button fullWidth onClick={() => history.push('/auth')}>
            Back to Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotCredentials;