import React from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";
import ForgotCredentials from "./components/Auth/ForgotCredentials";
import HomePage from "./components/HomePage";

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/auth" && location.pathname !== "/forgot";

  return (
    <Container maxWidth="xl">
      {showNavbar && <Navbar />}

      <Switch>
        {/* Public routes */}
        <Route path="/auth" exact component={Auth} />
        <Route path="/forgot" exact component={ForgotCredentials} />

        {/* Private routes */}
        <PrivateRoute exact path="/" component={HomePage} />

        <PrivateRoute exact path="/posts" component={Home} />
        <PrivateRoute exact path="/posts/search" component={Home} />
        <PrivateRoute path="/posts/:id" component={PostDetails} />

        {/* Catch-all route */}
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </Container>
  );
};


export default App;