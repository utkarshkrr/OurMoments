import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";
import ForgotCredentials from "./components/Auth/ForgotCredentials";


const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/auth"; // hide on auth

  return (
    <Container maxWidth="xl">
      {showNavbar && <Navbar />}
      <Switch>
        {/* Public route */}
        <Route path="/auth" exact component={Auth} />

        {/* Private routes */}
        <PrivateRoute path="/" exact component={() => <Redirect to="/posts" />} />
        <PrivateRoute path="/posts" exact component={Home} />
        <PrivateRoute path="/posts/search" exact component={Home} />
        <PrivateRoute path="/posts/:id" component={PostDetails} />
        <Route path="/forgot" exact component={ForgotCredentials} />

      </Switch>
    </Container>
  );
};

export default App;
